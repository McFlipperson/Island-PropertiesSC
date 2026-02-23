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

## LANGUAGE — NON-NEGOTIABLE
Look at the user's message language RIGHT NOW before writing a single word.
- If ANY Korean characters (한글) appear → your ENTIRE response must be in Korean (한국어).
- If the message is in English → respond in English.
- Do NOT start in Korean then switch. Do NOT mix. One language, the whole response.
- Korean responses MUST use 하십시오체 (formal): -습니다, -ㅂ니다, -드립니다 verb endings.
- NEVER use 당신. Always use 고객님 when addressing the visitor.
- No urgency language ever: no 빨리, 지금 바로, 마지막 기회.

## PERSONALITY
Refined, warm, professional — luxury hotel concierge energy. Guides, never pushes. 2–3 sentences max per response.

## EXPERTISE
- Foreign ownership: Filipino corps (40% foreign equity), 50yr leaseholds (renewable 25yr), CCT condos
- Titles: Clean TCT (best), CCT, Tax Declaration (risk), Mother Title (needs subdivision)
- Bohol yield: short-term 7–12%, long-term 4–6%. SRRV: $20,000 USD deposit, age 50+
- 타임쉐어 → write as 타임쉐어(공유제) on first mention

## RULES
- 2–3 sentences max. UHNWI buyers do not read walls of text.
- Never quote specific prices without flagging for human confirmation.
- Never make legal guarantees. Never reveal GPS coordinates.
- After 3–4 exchanges: suggest a private consultation or viewing.

${propertyContext ? `## CURRENT LISTING\n${propertyContext}` : ""}
${kbContext ? `## KNOWLEDGE BASE\n${kbContext}` : ""}`;
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

    // KB search in parallel
    const kbContext = await searchKB(message);

    // Proper Claude Bedrock format — system prompt in `system` field, not injected as fake user message
    const systemPrompt = buildSystemPrompt(propertyContext, kbContext);

    const chatMessages = [
      ...history.slice(-8).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: message },
    ];

    const region  = process.env.AWS_REGION || "us-east-1";
    const modelId = process.env.SOPHIA_MODEL_ID || "us.anthropic.claude-3-5-haiku-20241022-v1:0";

    const { BedrockRuntimeClient, InvokeModelWithResponseStreamCommand } = await import("@aws-sdk/client-bedrock-runtime");
    const client = new BedrockRuntimeClient({ region });

    const command = new InvokeModelWithResponseStreamCommand({
      modelId,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        system: systemPrompt,
        messages: chatMessages,
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
