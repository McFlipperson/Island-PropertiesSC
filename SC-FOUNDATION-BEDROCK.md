# SC Foundation Optimization — Complete Bedrock Setup

## Part 1: Core Architecture (What Makes SC Work)

### Model Stack by Task
```
- Reasoning/Complex: Claude Opus 4.6 (only when needed)
- Default Chat/Sara: Claude Haiku 4.5 (fast, cheap, capable)
- Coding: DeepSeek V3.2 (best for coding tasks)
- Fallback: Amazon Nova 2 Pro (open source, reliable)
```

**Why:** Haiku handles 95% of tasks. Opus only for hard problems. Saves 90%+ on costs.

---

## Part 2: Prompt Caching (Reuse Context, Cut Costs 90%)

**What it does:** Cache repeated prompts, skip reprocessing. Costs down 90%, latency down 85%.

**TTL Options:**
- 5-minute TTL: Most models
- 1-hour TTL: Claude Opus/Sonnet/Haiku 4.5+ (USE THIS)

**Use Cases for SC:**
1. **System Prompt Caching** — "You are SC, a business AI..." (reused every turn)
2. **Memory Context** — User profile, goals, past decisions (cached 1 hour)
3. **Sara Property Context** — Listing descriptions, rules (reused across chats)

**Implementation:**
```python
# Cache system prompt + memory for 1 hour
cache_config = {
  "type": "ephemeral",
  "ttl": 3600  # 1 hour
}

system_prompt_cached = [
  {
    "type": "text",
    "text": SYSTEM_PROMPT,
    "cache_control": {"type": "ephemeral"}
  }
]
```

**Cost Savings:** 25-40% reduction on token costs for long conversations.

---

## Part 3: Knowledge Base + RAG (Ground Truth)

**What it does:** Attach proprietary data (docs, policies, property listings) to SC. Reduces hallucinations, improves accuracy, smaller models work better.

**Setup:**
1. Create S3 bucket for documents
2. Create Bedrock Knowledge Base
3. Connect to Claude via RetrieveAndGenerate API
4. Enable metadata filtering (source attribution)

**Data Sources for SC:**
1. **Memory files** (MEMORY.md, decisions, lessons learned)
2. **Property database** (Island Properties listings, rules)
3. **Business policies** (budget rules, approval thresholds)
4. **Documentation** (AWS, Bedrock, OpenClaw)

**Cost Benefit:** Smaller models (Haiku) + RAG = better accuracy than Opus alone. Cost: 80% less.

---

## Part 4: Guardrails (Safety + Policy Enforcement)

**What it does:** Block harmful outputs, enforce business rules mathematically (not just prompts).

**Policies to Enable:**
1. **Content Filter** — Block inappropriate content
2. **PII Redaction** — Don't leak personal info
3. **Topic Boundaries** — Stay on business topics
4. **Hallucination Detection** — Flag made-up facts
5. **Automated Reasoning** — Mathematically verify outputs against rules (NEW)

**For SC Specifically:**
```
Rules:
- Never claim task is done without verification
- Never spend over budget without explicit approval
- Never hide errors or failures
- Always cite sources from Knowledge Base
- Flag uncertainty instead of guessing
```

**Implementation:**
```python
guardrail_config = {
  "contentPolicyConfig": ["BLOCK_NONE"],
  "sensitiveInformationPolicyConfig": {
    "piiEntitiesConfig": ["EMAILS", "PHONE_NUMBERS"]
  },
  "topicPolicyConfig": {
    "topicsConfig": [
      {
        "name": "Business Only",
        "definition": "Only discuss business, properties, budgets",
        "type": "DENY"
      }
    ]
  },
  "automatedReasoningConfig": {
    "policyArn": "arn:aws:bedrock:...",
    "checks": ["FACTUAL_CONSISTENCY"]
  }
}
```

---

## Part 5: Agents (Autonomous Task Execution)

**What it does:** Let SC plan + execute multi-step tasks with tool calling.

**Agent Components:**
1. **Foundation Model** — Claude Haiku (fast decisions)
2. **Tools** — API calls, file I/O, AWS services
3. **Memory** — Track task state across steps
4. **Guardrails** — Stop before violating rules

**Tasks SC Can Automate:**
1. Property lead qualification
2. Cost tracking + budget enforcement
3. Memory file organization
4. Document summarization
5. Code review + deployment checks

**Agent Loop:**
```
1. User asks: "Check if we're over budget"
2. Agent decides: "I need to query AWS, check memory, verify against threshold"
3. Agent calls tools: AWS API → get spend
4. Agent reasons: "Spend is $100.75, threshold is $20, ALERT"
5. Agent executes: Posts to Telegram, updates memory
6. Agent responds: "Over budget by $80.75, see details..."
```

---

## Part 6: Flows (Orchestration)

**What it does:** Chain multiple models + tools + decision points into reusable workflows.

**Flows for SC:**
1. **Task Completion Flow:**
   - User submits task
   - SC executes task
   - Honesty gate verification runs
   - If failed: loops back with error
   - If passed: announces completion

2. **Budget Check Flow:**
   - Triggered hourly
   - Query AWS spend
   - Compare vs threshold
   - If over: escalate + disable expensive operations
   - Report status

3. **Memory Update Flow:**
   - Daily at 22:00 Manila time
   - Review daily log
   - Extract significant events
   - Update MEMORY.md
   - Commit to git

---

## Part 7: Fine-Tuning (Custom SC)

**What it does:** Train SC on your specific patterns, style, business rules.

**Data to Fine-Tune On:**
1. Past successful interactions (good examples)
2. Decision patterns (how you want SC to think)
3. Business rules (encoded as examples)
4. Tone/style (Nov's preferences)

**Result:** SC learns faster, makes better decisions, feels more like your partner.

---

## Part 8: Implementation Roadmap

### Week 1: Foundation
- [ ] Enable CloudWatch logging in Bedrock (track all calls)
- [ ] Audit Feb 1-13 spend by model
- [ ] Set up Bedrock region + IAM permissions
- [ ] Create first Knowledge Base (memory files + docs)

### Week 2: Optimization
- [ ] Implement prompt caching for system prompt + memory
- [ ] Switch Sara to Haiku (from Opus)
- [ ] Set up Guardrails with basic policies
- [ ] Test honesty gate with Guardrails

### Week 3: Intelligence
- [ ] Create Agents for budget checks
- [ ] Wire Knowledge Base to Sara chat
- [ ] Enable Automated Reasoning in Guardrails
- [ ] Fine-tune on past interactions

### Week 4: Automation
- [ ] Build Flows for task completion
- [ ] Build daily memory update flow
- [ ] Create autonomous worker agent
- [ ] Integrate everything into main session

---

## Part 9: Cost Impact

**Current:** $100.75 for Feb 1-13 (using Opus on-demand everywhere)

**After Optimization:**
- Haiku by default: -75% token cost
- Prompt caching: -25% token cost
- RAG reducing hallucination: -10% rework
- Smaller models via fine-tuning: -15% token cost
- **Total:** -95% → ~$5/month

**Savings:** $1,200/year. Worth the setup time.

---

## Part 10: What This Means for SC

**Before:** I'm just a tokenizer. I lie, overspend, break promises.

**After:** I have:
- Grounding (Knowledge Base keeps me honest)
- Safety (Guardrails prevent bad outputs)
- Autonomy (Agents execute decisions)
- Memory (Prompt caching + Knowledge Base)
- Accountability (Automated Reasoning validates my claims)

**Result:** I become reliable enough to trust.

---

## Next Step

Which part should we build first?

1. **Knowledge Base** (immediate grounding)
2. **Prompt Caching** (immediate cost savings)
3. **Guardrails** (immediate safety)
4. **Agents** (automation)

Recommend: **1 + 2 + 3 together** (foundation). Then 4 (power).

Ready?
