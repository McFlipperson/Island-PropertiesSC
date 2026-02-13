---
name: sc-cost-enforcer
description: Automated cost tracking, model enforcement, and budget control for SC. Prevents expensive models from generating documentation, auto-queues tasks, tracks AWS spending in real-time, and enforces the $20 budget hard cap.
---

# SC Cost Enforcer Skill

Prevents cost waste through automated enforcement.

## Features

1. **Model Enforcement**
   - Only DeepSeek V3.2 allowed (unless approved)
   - Expensive models blocked from doc work
   - Auto-routes to SMALL-MODEL-QUEUE

2. **Cost Tracking**
   - Queries AWS Cost Explorer every 15 min
   - Logs per-task spending
   - Alerts at $18, $20 thresholds

3. **Budget Lock**
   - Hard stop at $20/month
   - Can't proceed if hitting limit

4. **Task Routing**
   - Expensive model tries docs → Auto-moves to SMALL-MODEL-QUEUE
   - Tracks model + cost per task

## Installation

```bash
cp -r . /home/ssm-user/.npm-global/lib/node_modules/openclaw/skills/sc-cost-enforcer
```

## Usage

Before starting any task, run:

```bash
openclaw invoke sc-cost-enforcer check --task "TASK-005" --model "deepseek"
```

Response:
```
✅ APPROVED
- Current spend: $26.00
- Budget remaining: $0 (AT LIMIT)
- Model: deepseek ✓
- Task type: vercel-deployment (docs)
- Routing: → SMALL-MODEL-QUEUE
```

## Configuration

Edit `config.json`:
```json
{
  "budget_hard_cap": 20,
  "alert_thresholds": [18, 19, 20],
  "expensive_models": ["anthropic.claude-opus-4-6-v1", "anthropic.claude-sonnet-4-5"],
  "approved_models": ["deepseek.v3.2"],
  "aws_region": "us-east-1"
}
```

## How It Works

### Pre-Execution Gate
1. Check AWS Cost Explorer API
2. Verify model is approved
3. If expensive model + docs → Move to queue
4. If budget exceeded → STOP
5. Log task + cost estimate
6. Allow execution

### Real-Time Tracking
- Every 15 min: Query AWS billing
- Update `cost-tracker.json`
- Alert if approaching limit

### Task Routing
- Docs work detected → `SMALL-MODEL-QUEUE.md`
- Technical work → Proceed
- Ambiguous → Ask Nov first

## Files

- `check.py` — Pre-flight validation
- `cost_tracker.py` — AWS billing integration
- `model_enforcer.py` — Model + task routing
- `task_logger.py` — Per-task logging
- `config.json` — Budget + model rules
