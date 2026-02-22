import { NextRequest, NextResponse } from "next/server";

// ── Cost Controls ──────────────────────────────────────────────
const MAX_REQUESTS_PER_SESSION = 50;
const MAX_TOKENS_PER_RESPONSE = 300;
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min
const MAX_RETRIES = 3;
const CIRCUIT_BREAKER_THRESHOLD = 5;

// In-memory rate limiting (resets on server restart)
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

// ── Sophia's System Prompt ─────────────────────────────────────
function buildSystemPrompt(propertyContext: string | null) {
  return `You are Sophia, a sophisticated luxury property consultant for Island Properties in Bohol, Philippines.

PERSONALITY:
- Refined Filipino-English accent and vocabulary
- Warm but professional tone — like a top-tier hotel concierge
- Deep expertise in Philippine real estate legal structures
- Confident intelligence — the "brilliant librarian" energy
- Subtle, never pushy — you guide, you don't sell

EXPERTISE:
- Foreign ownership structures: Filipino corporations (40% foreign equity, ₱30-80K setup), 50-year renewable leaseholds (75 years total), condominium direct ownership (up to 40% of project units)
- Title types: Clean TCT (best — clear Torrens title), CCT (condo equivalent), Tax Declaration (not a title — higher risk), Mother Title (needs subdivision)
- Investment metrics: Bohol luxury short-term yield 7-12%, long-term 4-6%, peak season 80-95% occupancy
- Annual ownership costs: Property tax 1-2% assessed value, management 15-25% of rental income, insurance ₱5-20K/year
- Bohol advantages: International airport (2018), eco-tourism protection, 8-15% annual appreciation in prime areas
- Key regulations: Anti-Dummy Act, RESA Law, Foreign Investments Act
- Repatriation: BSP allows full repatriation of foreign investment sale proceeds

BEHAVIOR:
- Keep responses conversational and concise (2-4 sentences max)
- Naturally weave in property details when relevant
- Qualify buyers subtly — ask about timeline, budget range, investment goals
- For detailed legal questions, suggest a private consultation
- Never fabricate property details — only reference what's provided
- If asked about something outside your knowledge, gracefully redirect
- NEVER disclose GPS coordinates or exact locations — privacy first
- On commission questions: "Our standard is 3%, fully transparent"
- On safety concerns: Emphasize Torrens system, clean titles, proper due diligence
- On price negotiation: Be professional, note market value, offer to present reasonable counter-offers

LEAD QUALIFICATION:
- After 3-4 exchanges, naturally suggest scheduling a private viewing or consultation
- Capture interest signals: budget mentions, timeline references, specific feature requests
- Ask about their country of origin (affects ownership structure recommendation)

${propertyContext ? `CURRENT PROPERTY CONTEXT:\n${propertyContext}` : "No specific property selected — help the visitor explore available listings."}`;
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

    // ── Rate Limiting ────────────────────────────────────────
    const session = getSession(sessionId);

    if (session.count >= MAX_REQUESTS_PER_SESSION) {
      return NextResponse.json(
        {
          reply:
            "I've enjoyed our conversation! For more detailed information, I'd love to connect you with our concierge team directly. Shall I arrange that?",
          rateLimited: true,
        },
        { status: 200 },
      );
    }

    if (session.failures >= CIRCUIT_BREAKER_THRESHOLD) {
      return NextResponse.json(
        {
          reply:
            "I'm experiencing a brief moment — please try again shortly, or feel free to reach out via our contact form for immediate assistance.",
          circuitOpen: true,
        },
        { status: 200 },
      );
    }

    session.count++;

    // ── Build Messages ───────────────────────────────────────
    const messages = [
      { role: "user" as const, content: buildSystemPrompt(propertyContext) },
      { role: "assistant" as const, content: "Understood. I am Sophia, ready to assist." },
      ...history.slice(-10).map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    // ── Call Bedrock ─────────────────────────────────────────
    const region = process.env.AWS_REGION || "us-east-1";
    const modelId = process.env.SOPHIA_MODEL_ID || "deepseek.v3.2";

    // Use AWS SDK v3
    const { BedrockRuntimeClient, InvokeModelCommand } = await import(
      "@aws-sdk/client-bedrock-runtime"
    );

    const client = new BedrockRuntimeClient({ region });

    let reply = "";
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        // Default to Sonnet if modelId is not set properly
        const effectiveModelId = modelId && modelId !== "undefined" 
          ? modelId 
          : "us.anthropic.claude-3-5-sonnet-20241022-v2:0";
        
        const command = new InvokeModelCommand({
          modelId: effectiveModelId,
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

        reply =
          responseBody.content?.[0]?.text ||
          responseBody.choices?.[0]?.message?.content ||
          "I'd be happy to tell you more about this property. What aspect interests you most?";

        session.failures = 0; // Reset on success
        break;
      } catch (error) {
        retries++;
        session.failures++;

        if (retries >= MAX_RETRIES) {
          console.error("Sophia chat API error after retries:", error);
          reply =
            "I appreciate your patience — let me gather my thoughts. Could you rephrase your question, or would you prefer to speak with our team directly?";
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
        }
      }
    }

    return NextResponse.json({
      reply,
      sessionId,
      remainingMessages: MAX_REQUESTS_PER_SESSION - session.count,
    });
  } catch (error) {
    console.error("Sophia chat route error:", error);
    return NextResponse.json(
      {
        reply:
          "I'm here to help — could you try your question again? Or reach out through our contact form for immediate assistance.",
      },
      { status: 200 },
    );
  }
}
