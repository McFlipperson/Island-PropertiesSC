import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const LEDGER_DIR  = join(process.env.HOME || "/home/ssm-user", ".openclaw/workspace/cost-tracker");
const LEDGER_FILE = join(LEDGER_DIR, "costs.jsonl");

// Model pricing (USD per 1K tokens)
const RATES: Record<string, { input: number; output: number }> = {
  "claude-3-5-haiku":  { input: 0.001,  output: 0.005  },
  "claude-3-5-sonnet": { input: 0.003,  output: 0.015  },
  "claude-3-sonnet":   { input: 0.003,  output: 0.015  },
  "claude-3-haiku":    { input: 0.00025, output: 0.00125 },
  "titan-embed":       { input: 0.0002,  output: 0      },
  "polly-neural":      { input: 0,       output: 0      }, // tracked by chars below
  "default":           { input: 0.001,  output: 0.005  },
};

function getRate(modelId: string) {
  for (const [key, rate] of Object.entries(RATES)) {
    if (modelId.includes(key)) return rate;
  }
  return RATES.default;
}

export type CostEntry = {
  ts:           string;
  date:         string;
  source:       string;
  model:        string;
  session_id:   string;
  input_tokens: number;
  output_tokens: number;
  cost_usd:     number;
  note?:        string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Omit<CostEntry, "ts" | "date" | "cost_usd"> & { chars?: number };

    const rate = getRate(body.model);
    const cost_usd = body.source === "polly"
      ? ((body.chars ?? 0) / 1000) * 0.016
      : ((body.input_tokens / 1000) * rate.input) + ((body.output_tokens / 1000) * rate.output);

    const now = new Date();
    const entry: CostEntry = {
      ts:            now.toISOString(),
      date:          now.toISOString().slice(0, 10),
      source:        body.source,
      model:         body.model,
      session_id:    body.session_id,
      input_tokens:  body.input_tokens,
      output_tokens: body.output_tokens,
      cost_usd:      Math.round(cost_usd * 1_000_000) / 1_000_000,
      note:          body.note,
    };

    if (!existsSync(LEDGER_DIR)) mkdirSync(LEDGER_DIR, { recursive: true });
    appendFileSync(LEDGER_FILE, JSON.stringify(entry) + "\n");

    return NextResponse.json({ ok: true, cost_usd: entry.cost_usd });
  } catch (err) {
    console.error("Cost log error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
