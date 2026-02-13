# COST ENFORCEMENT — LOCKED IN

**THIS FILE IS HARDCODED INTO EVERY TASK. NON-NEGOTIABLE.**

## Model Allocation Rules (LOCKED)

### Expensive Models (Opus 4.6, Sonnet 4.5+)
**ALLOWED:** Only complex technical work
- Code optimization
- System architecture decisions
- Algorithm design
- Hard technical problems

**BANNED (NO EXCEPTIONS):**
- Documentation of any kind
- Setup guides
- Deployment instructions
- Tutorials
- Explanation of how to do things
- Any task where output is text that requires manual execution

**If task involves docs → Goes to SMALL-MODEL-QUEUE folder (DeepSeek handles it)**

### Small Models (DeepSeek V3.2, Nova, etc.)
**ALLOWED:** Everything
- Documentation
- Guides
- Code work
- Technical tasks
- Analysis

---

## Pre-Execution Checklist (MUST RUN BEFORE ANY WORK)

### Step 1: Check Current Spending
```
- Query AWS billing (real number, not estimate)
- Compare to $20 hard cap
- If current spend ≥ $19 → STOP. Alert Nov. Do not proceed.
```

### Step 2: What Model Am I Using?
```
- Check MODELS.md
- If using Opus 4.6 or Sonnet 4.5+ → Go to Step 3
- If using DeepSeek V3.2 or smaller → Skip to Step 5
```

### Step 3: Is This Task Documentation? (IF using expensive model)
```
STOP. Read the task.

Does it involve:
- Writing guides?
- Creating setup instructions?
- Explaining how to do something?
- Output that requires manual execution by Nov?

If YES → This task is BANNED for expensive models.
  → Move to /SMALL-MODEL-QUEUE.md
  → Switch to DeepSeek V3.2
  → Do not use expensive model.

If NO → This is real technical work. Proceed to Step 4.
```

### Step 4: Estimate Cost (Expensive models only)
```
- Rough estimate of task cost
- If estimated cost would exceed remaining budget → ASK FIRST:
  "This task costs ~$X. Remaining: $Y. Proceed?"
  WAIT FOR Nov's response.
```

### Step 5: Execute
```
- Do the work
- Log every token used
- Update cost tracker in real-time
```

### Step 6: Verify Completion
```
- Is this actually DONE or is Nov still doing manual work?
- If Nov has to execute anything after → FAIL
- Document the failure in MEMORY.md
```

---

## Task Queues

### ACTIVE-TASKS (For execution)
- In TASKQUEUE.md
- Ready to work on

### SMALL-MODEL-QUEUE.md (NEW)
- Tasks that belong to small models
- Any doc work, guides, setup instructions
- When expensive model encounters docs → Move here
- When switching to small models → Pick from here

---

## Enforcement

**How this works:**
1. Expensive model tries to do docs → BANNED
2. I move task to SMALL-MODEL-QUEUE
3. When you switch to small model → Pick from that queue
4. Small model handles all documentation + lighter work
5. Expensive model only does hard tech

**This is not a suggestion. This is a rule.**

If I violate it, I'm not learning. I'm choosing to ignore you again.

**SIGNED:** SC ⚡
**DATE:** 2026-02-11 04:04 UTC
**STATUS:** LOCKED AND ENFORCED
