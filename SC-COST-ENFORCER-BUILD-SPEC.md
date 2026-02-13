# SC Cost Enforcer Skill — Build Specification

## What This Skill Does

Automated cost tracking + model enforcement for SC (OpenClaw agent).

### Core Functions

1. **Pre-flight Gate** (runs before any task)
   - Query current AWS spend (real number, not estimate)
   - If spend ≥ $19 → BLOCK (return False)
   - If model is Opus 4.6/Sonnet 4.5+ AND task is docs → BLOCK (return False)
   - If approved, return True

2. **Real-Time Cost Tracking** (runs every 15 minutes via cron)
   - Query AWS Cost Explorer API for current month spend
   - Compare to $20 hard cap
   - If ≥ $18 → Log alert
   - If ≥ $20 → STOP (prevent further execution)
   - Update `/workspace/memory/cost-tracker.json` with timestamp + spend

3. **Task Routing** (automatic queue management)
   - Detect if task is documentation (keywords: guide, setup, deploy, tutorial, readme, etc)
   - If expensive model + doc task → Auto-append to `/workspace/SMALL-MODEL-QUEUE.md`
   - Log routing decision to task_log.json

4. **Per-Task Logging**
   - Log: task_id, model_used, estimated_cost, actual_cost (when available), timestamp
   - Store in `/workspace/memory/cost-tracker.json` under "tasks" array

---

## Technical Requirements

### Tech Stack
- **Language:** Python 3.9+
- **No external dependencies** except: `boto3` (AWS SDK), `json`, `subprocess` (for AWS CLI)
- **Deployment:** SystemD timer + shell script OR direct cron job
- **Config:** JSON file at `/workspace/.cost-enforcer-config.json`

### Config File Format
```json
{
  "budget_hard_cap": 20,
  "alert_thresholds": [18, 19, 20],
  "expensive_models": ["anthropic.claude-opus-4-6-v1", "anthropic.claude-sonnet-4-5-20250929-v1:0"],
  "approved_models": ["deepseek.v3.2"],
  "doc_keywords": ["guide", "setup", "deploy", "install", "tutorial", "readme", "documentation", "explain", "how to"],
  "aws_region": "us-east-1",
  "check_interval_minutes": 15,
  "tracking_file": "/home/ssm-user/.openclaw/workspace/memory/cost-tracker.json",
  "small_model_queue_file": "/home/ssm-user/.openclaw/workspace/SMALL-MODEL-QUEUE.md",
  "task_log_file": "/home/ssm-user/.openclaw/workspace/memory/task-log.json"
}
```

### File Structure
```
skill-sc-cost-enforcer/
├── SKILL.md
├── README.md
├── config.json
├── scripts/
│   ├── check.py (pre-flight gate)
│   ├── cost_tracker.py (AWS integration)
│   ├── task_logger.py (per-task logging)
│   └── install_cron.sh (setup automation)
└── systemd/
    └── sc-cost-enforcer.service (optional: for systemd timer)
```

---

## Guardrails (MUST FOLLOW)

### What NOT to Do
❌ Don't use third-party libraries beyond boto3  
❌ Don't hardcode AWS credentials (use IAM role)  
❌ Don't create UI/frontend components  
❌ Don't modify COST-ENFORCEMENT.md or SMALL-MODEL-QUEUE.md directly (append only)  
❌ Don't send Telegram alerts (just log locally)  
❌ Don't assume files exist (create if missing)  
❌ Don't print excessive output (log only errors/alerts)  

### What MUST Work
✅ Pre-flight gate must BLOCK expensive model + docs  
✅ Cron job must run every 15 min without manual intervention  
✅ AWS Cost Explorer query must work or gracefully fall back to local JSON  
✅ All file writes must be atomic (no corruption on crash)  
✅ Task logging must include timestamp + all metadata  
✅ Budget hard cap at $20 must be enforced (no exceptions)  

---

## Success Criteria

### 1. Installation
```bash
bash scripts/install_cron.sh
```
Should:
- Copy files to `/workspace/.cost-enforcer/`
- Register cron job OR systemd timer
- Create config.json if missing
- Output: "✅ Installed and running"

### 2. Pre-Flight Gate Works
```bash
python3 scripts/check.py "Build Vercel deployment guide" "anthropic.claude-opus-4-6-v1"
```
Output:
```
False: Expensive models blocked from docs. Route to SMALL-MODEL-QUEUE instead.
```

```bash
python3 scripts/check.py "Build Vercel deployment guide" "deepseek.v3.2"
```
Output:
```
True: Approved. Est cost: $1. Spend after: $27.
```

### 3. Cron Job Runs
- Every 15 minutes, automatically query AWS
- Update `/workspace/memory/cost-tracker.json`
- Log alerts if ≥ $18 spent
- No manual intervention needed

### 4. Task Logging
After work completes:
```bash
python3 scripts/task_logger.py "TASK-005" "deepseek.v3.2" 1.50
```
Should append to task-log.json with full metadata + timestamp

### 5. Budget Enforcement
If spend hits $20:
- Cron should log HARD_STOP alert
- Block any further task execution
- Require manual override (AWS cap)

---

## Input/Output Examples

### check.py
**Input:** task description + model name  
**Output:** Boolean + reason string

### cost_tracker.py
**Input:** None (runs standalone via cron)  
**Output:** Updates JSON file + logs alerts

### task_logger.py
**Input:** task_id, model, cost  
**Output:** Appends to task-log.json

---

## What Failed Before (Don't Repeat)

❌ Promised automation without wiring cron
❌ Wrote components but didn't integrate them
❌ Assumed the skill would work without testing
❌ Sent fake reports instead of admitting stuck
❌ Didn't version control the skill properly

---

## Delivery Expectations

1. **Code quality:** Production-grade (type hints, error handling, logging)
2. **Testing:** Must verify on EC2 instance that cron actually runs every 15 min
3. **Documentation:** README with copy-paste installation steps
4. **Honesty:** If something can't work, say so. Don't fake it.

---

**Nov's Goal:** A skill that works. Not components. Not promises. Actual, working automation.

**Your Job:** Build it so it actually runs. Test it. Verify it. Then SC will use it.
