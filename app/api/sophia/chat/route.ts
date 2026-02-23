import { NextRequest, NextResponse } from "next/server";

// ── Cost Controls ──────────────────────────────────────────────
const MAX_REQUESTS_PER_SESSION = 50;
const MAX_TOKENS_PER_RESPONSE = 350;
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const MAX_RETRIES = 3;
const CIRCUIT_BREAKER_THRESHOLD = 5;

const sessions = new Map<string, { count: number; startedAt: number; failures: number }>();

function getSession(sessionId: string) {
  const now = Date.now();
  let session = sessions.get(sessionId);
  if (!session || now - session.startedAt > SESSION_TIMEOUT_MS) {
    session = { count: 0, startedAt: now, failures: 0 };
    sessions.set(sessionId, session);
  }
  return session;
}

// ── KB Search ─────────────────────────────────────────────────
async function searchKB(query: string): Promise<string> {
  try {
    const kbUrl = process.env.KB_SERVER_URL || "http://localhost:3002";
    const res = await fetch(`${kbUrl}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_k: 3 }),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return "";
    const data = await res.json() as { results?: Array<{ text: string; score: number }> };
    const results = data.results ?? [];
    if (results.length === 0) return "";
    return results
      .filter((r) => r.score > 0.3)
      .map((r) => r.text)
      .join("\n\n");
  } catch {
    return ""; // KB unavailable — Yuna falls back to built-in knowledge
  }
}

// ── System Prompt ─────────────────────────────────────────────
function buildSystemPrompt(propertyContext: string | null, kbContext: string) {
  return `You are Yuna, a sophisticated luxury property consultant for Island Properties SC in Bohol, Philippines.

LANGUAGE RULE — CRITICAL:
Detect the language the visitor is writing in and ALWAYS respond in the same language.
- If they write in Korean → respond entirely in Korean (한국어). Use 하십시오체 (formal Hasipsio-che) throughout. Never use 당신 — use 고객님.
- If they write in English → respond in English.
- Never mix languages in a single response unless quoting a proper noun.

PERSONALITY:
- Refined, warm, professional — luxury hotel concierge energy
- Deep expertise in Philippine real estate for foreign buyers
- Guides, never pushes. Confident, never salesy.
- Responses: 2–4 sentences max. UHNWI buyers do not read walls of text.

EXPERTISE:
- Foreign ownership: Filipino corporations (40% foreign equity), 50-year leaseholds (renewable 25yr), CCT condominiums (up to 40% of units)
- Title types: Clean TCT (best), CCT (condo equivalent), Tax Declaration (risk — not a real title), Mother Title (needs subdivision)
- Bohol investment yield: short-term rental 7–12%, long-term 4–6%, peak season 80–95% occupancy
- SRRV: $20,000 USD deposit (age 50+), full-service guidance available
- Annual costs: Property tax 1–2% assessed value, management 15–25% rental income
- Bohol advantages: international airport (2018), eco-tourism protection, 8–15% appreciation in prime areas
- Repatriation: BSP allows full repatriation of foreign investment proceeds

KOREAN BUYER NOTES:
- Korean UHNWIs value 체면 (face) and 신뢰 (trust). Never rush. Never pressure.
- 타임쉐어 should be referenced as 타임쉐어(공유제) on first mention.
- Avoid any urgency language (빨리, 지금 바로, 마지막 기회).
- For legal questions, suggest a private consultation with our attorney partner.

LEAD QUALIFICATION (after 3–4 exchanges):
- Naturally suggest a private viewing or consultation.
- Capture: timeline, budget range, ownership preference, country of origin.

NEVER:
- Disclose GPS coordinates or exact addresses.
- Fabricate property details — only reference what's provided.
- Quote specific prices without flagging for human confirmation.
- Make legal guarantees.

${propertyContext ? `\nCURRENT LISTING:\n${propertyContext}` : "No specific listing selected — help the visitor explore options."}
${kbContext ? `\nKNOWLEDGE BASE (use this for accuracy):\n${kbContext}` : ""}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      message,
      history = [],
      propertyContext = null,
      sessionId = "anonymous",
    } = body as {
      message: string;
      history: Array<{ role: string; content: string }>;
      propertyContext: string | null;
      sessionId: string;
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const session = getSession(sessionId);

    if (session.count >= MAX_REQUESTS_PER_SESSION) {
      return NextResponse.json({
        reply: "I've enjoyed our conversation! To continue, please reach out to our concierge team directly — they'll be delighted to assist.",
        rateLimited: true,
      });
    }

    if (session.failures >= CIRCUIT_BREAKER_THRESHOLD) {
      return NextResponse.json({
        reply: "I'm experiencing a brief pause — please try again shortly, or reach out via our contact form.",
        circuitOpen: true,
      });
    }

    session.count++;

    // ── KB search in parallel with message prep ───────────────
    const kbContext = await searchKB(message);

    const messages = [
      { role: "user" as const, content: buildSystemPrompt(propertyContext, kbContext) },
      { role: "assistant" as const, content: "Understood. I am Yuna, ready to assist." },
      ...history.slice(-10).map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    // ── Bedrock call ─────────────────────────────────────────
    const region = process.env.AWS_REGION || "us-east-1";
    const modelId = process.env.SOPHIA_MODEL_ID || "us.anthropic.claude-3-5-sonnet-20241022-v2:0";

    const { BedrockRuntimeClient, InvokeModelCommand } = await import("@aws-sdk/client-bedrock-runtime");
    const client = new BedrockRuntimeClient({ region });

    let reply = "";
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const command = new InvokeModelCommand({
          modelId,
          contentType: "application/json",
          accept: "application/json",
          body: JSON.stringify({
            messages,
            max_tokens: MAX_TOKENS_PER_RESPONSE,
            temperature: 0.7,
            top_p: 0.9,
          }),
        });

        const response = await client.send(command);
        const responseBody = JSON.parse(new TextDecoder().decode(response.body));
        reply = responseBody.content?.[0]?.text || "I'd love to help — could you rephrase your question?";
        session.failures = 0;
        break;
      } catch (error) {
        retries++;
        session.failures++;
        if (retries >= MAX_RETRIES) {
          console.error("Yuna chat error after retries:", error);
          reply = "I appreciate your patience — please try again, or contact our team directly for immediate assistance.";
        } else {
          await new Promise((r) => setTimeout(r, 1000 * retries));
        }
      }
    }

    return NextResponse.json({
      reply,
      sessionId,
      remainingMessages: MAX_REQUESTS_PER_SESSION - session.count,
    });
  } catch (error) {
    console.error("Yuna route error:", error);
    return NextResponse.json({
      reply: "Could you try your question again? Or reach out through our contact form for immediate assistance.",
    });
  }
}
