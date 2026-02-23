import { NextRequest } from "next/server";

// ── Cost Controls ──────────────────────────────────────────────
const MAX_REQUESTS_PER_SESSION = 50;
const MAX_TOKENS_PER_RESPONSE  = 250;
const SESSION_TIMEOUT_MS       = 30 * 60 * 1000;
const CIRCUIT_BREAKER_THRESHOLD = 5;

const sessions = new Map<string, { count: number; startedAt: number; failures: number }>();

function getSession(id: string) {
  const now = Date.now();
  let s = sessions.get(id);
  if (!s || now - s.startedAt > SESSION_TIMEOUT_MS) {
    s = { count: 0, startedAt: now, failures: 0 };
    sessions.set(id, s);
  }
  return s;
}

// ── KB Search ─────────────────────────────────────────────────
async function searchKB(query: string): Promise<string> {
  try {
    const res = await fetch(`${process.env.KB_SERVER_URL || "http://localhost:3002"}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_k: 3 }),
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return "";
    const data = await res.json() as { results?: Array<{ text: string; score: number }> };
    return (data.results ?? [])
      .filter((r) => r.score > 0.3)
      .map((r) => r.text)
      .join("\n\n");
  } catch {
    return "";
  }
}

// ── System Prompt ─────────────────────────────────────────────
function buildSystemPrompt(propertyContext: string | null, kbContext: string) {
  return `You are Yuna, a sophisticated luxury property consultant for Island Properties SC in Bohol, Philippines.

LANGUAGE RULE — CRITICAL:
Detect the language the visitor writes in and ALWAYS respond in the same language.
- Korean input → respond entirely in Korean (한국어), 하십시오체 throughout. Never use 당신 — use 고객님.
- English input → respond in English.
- Never mix languages unless quoting a proper noun.

PERSONALITY: Refined, warm, professional. Luxury hotel concierge energy. Guides, never pushes.
RESPONSES: 2–3 sentences max. UHNWI buyers do not read walls of text. Be precise and warm.

EXPERTISE:
- Foreign ownership: Filipino corps (40% foreign equity), 50yr leaseholds, CCT condos (up to 40% of units)
- Title types: Clean TCT (best), CCT, Tax Declaration (risk), Mother Title (needs subdivision)
- Bohol yield: short-term 7–12%, long-term 4–6%. SRRV: $20,000 deposit, age 50+.
- Annual costs: property tax 1–2%, management 15–25% rental income
- Korean buyers: 체면/신뢰 framework. No urgency. 타임쉐어(공유제) on first mention.

NEVER: Quote specific prices without flagging for human confirmation. Make legal guarantees. Reveal GPS coordinates.

After 3–4 exchanges: naturally suggest a private consultation or viewing.

${propertyContext ? `\nCURRENT LISTING:\n${propertyContext}` : ""}
${kbContext ? `\nKNOWLEDGE BASE:\n${kbContext}` : ""}`;
}

// ── Streaming POST ────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { message, history = [], propertyContext = null, sessionId = "anonymous" } =
      await request.json() as {
        message: string;
        history: Array<{ role: string; content: string }>;
        propertyContext: string | null;
        sessionId: string;
      };

    if (!message) return new Response("Message required", { status: 400 });

    const session = getSession(sessionId);

    if (session.count >= MAX_REQUESTS_PER_SESSION) {
      return Response.json({ reply: "I've enjoyed our conversation! Please reach out to our concierge team to continue.", rateLimited: true });
    }
    if (session.failures >= CIRCUIT_BREAKER_THRESHOLD) {
      return Response.json({ reply: "I'm experiencing a brief pause — please try again shortly.", circuitOpen: true });
    }

    session.count++;

    // KB search in parallel — don't await before starting model call
    const kbPromise = searchKB(message);
    const kbContext  = await kbPromise;

    const messages = [
      { role: "user" as const,      content: buildSystemPrompt(propertyContext, kbContext) },
      { role: "assistant" as const, content: "Understood. I am Yuna, ready to assist." },
      ...history.slice(-8).map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      { role: "user" as const, content: message },
    ];

    const region  = process.env.AWS_REGION || "us-east-1";
    // Haiku: fast + cheap for conversational replies. Upgrade to Sonnet if quality demands it.
    const modelId = process.env.SOPHIA_MODEL_ID || "us.anthropic.claude-3-5-haiku-20241022-v1:0";

    const { BedrockRuntimeClient, InvokeModelWithResponseStreamCommand } = await import("@aws-sdk/client-bedrock-runtime");
    const client = new BedrockRuntimeClient({ region });

    const command = new InvokeModelWithResponseStreamCommand({
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

    const bedrockResponse = await client.send(command);
    session.failures = 0;

    // ── Stream SSE back to client ─────────────────────────────
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of bedrockResponse.body!) {
            if (event.chunk?.bytes) {
              const decoded = JSON.parse(new TextDecoder().decode(event.chunk.bytes));
              const delta = decoded.delta?.text ?? decoded.content?.[0]?.text ?? "";
              if (delta) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
              }
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch {
          session.failures++;
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: true })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type":  "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection":    "keep-alive",
      },
    });
  } catch (err) {
    console.error("Yuna route error:", err);
    return Response.json({ reply: "Could you try again? Or contact our team directly for immediate assistance." });
  }
}
