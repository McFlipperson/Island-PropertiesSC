# SC Cost Enforcer Skill — OPTIMIZED BUILD SPEC

**Revised for First-Pass Success** | Feb 11, 2026 | For Sonnet 4.5

---

## What This Skill Does

Automated cost tracking + model enforcement. Prevents waste through:
1. Pre-flight checks (block expensive model + docs)
2. Real-time cost tracking (every 15 min)
3. Task routing (docs → small models)
4. Per-task logging (full audit trail)

---

## CRITICAL SUCCESS FACTORS (Address First)

### Issue 1: AWS IAM Permissions
**Problem:** EC2 role might NOT have `ce:GetCostAndUsage` permission  
**Solution:**
- Try Cost Explorer API first
- If fails → fall back to local JSON file
- Log the failure, don't crash

### Issue 2: Cron vs SystemD
**Problem:** Different deployment paths, user might not know which to use  
**Solution:** 
- Default to **SystemD timer** (more reliable)
- Fallback to **crontab** if SystemD unavailable
- `install_cron.sh` detects which and installs accordingly

### Issue 3: File Locking
**Problem:** Multiple processes writing to same JSON file = corruption  
**Solution:**
- Use file locking (fcntl module, already built-in)
- Write to temp file first, then atomic rename
- Include 3-second retry if locked

### Issue 4: Logging Output
**Problem:** Print statements get lost in cron, hard to debug  
**Solution:**
- All logging to `/workspace/logs/cost-enforcer.log`
- Structured JSON format (easy to parse)
- Include timestamp + severity level

### Issue 5: Test Verification
**Problem:** Code might look right but cron never actually runs  
**Solution:**
- `install_cron.sh` creates a test marker file
- Cron job updates marker every 15 min
- User can verify: `ls -l /tmp/cost-enforcer-heartbeat` → should be recent

---

## ARCHITECTURE

### Deployment: SystemD Timer (Primary)

```
/etc/systemd/system/sc-cost-enforcer.service
/etc/systemd/system/sc-cost-enforcer.timer

Timer runs: Every 15 minutes
On trigger: Runs cost_tracker.py via service
```

### Deployment: Crontab (Fallback)

```
*/15 * * * * /home/ssm-user/.cost-enforcer/scripts/cost_tracker.py >> /home/ssm-user/.openclaw/workspace/logs/cost-enforcer.log 2>&1
```

---

## FILE STRUCTURE

```
.cost-enforcer/
├── config.json                          (config)
├── README.md                            (docs)
├── SKILL.md                             (metadata)
├── scripts/
│   ├── check.py                         (pre-flight gate, runs on-demand)
│   ├── cost_tracker.py                  (background task, runs every 15 min)
│   ├── task_logger.py                   (log task completion, runs on-demand)
│   └── install_cron.sh                  (installation, runs once)
└── systemd/
    ├── sc-cost-enforcer.service         (systemd service def)
    └── sc-cost-enforcer.timer           (systemd timer def, every 15 min)
```

---

## IMPLEMENTATION SPECIFICS

### check.py (Pre-Flight Gate)

**Input:** task_name (str), model_name (str)  
**Output:** (bool, str) — (approved, reason)  
**Errors:** Return (False, error_message) — don't crash

**Logic:**
```
1. Load config.json
2. Read current spend from cost-tracker.json
3. If spend ≥ $19 → return (False, "Over budget")
4. If model in expensive_models AND task in doc_keywords → return (False, "Route to small model")
5. Estimate cost (expensive=$5, small=$1)
6. If (current + cost) ≥ $20 → return ("warn", "Ask approval")
7. return (True, "Approved")
```

**Resilience:** No AWS calls. Just reads local file.

---

### cost_tracker.py (Background Task)

**Input:** None (runs standalone via cron/systemd)  
**Output:** Updates cost-tracker.json + writes to log  
**Errors:** Log error, don't crash

**Logic:**
```
1. Lock cost-tracker.json (3-second retry if locked)
2. Try: Query AWS Cost Explorer API
   - Get current month spend
   - Compare to $20 cap
3. If API fails: Use local file value (fallback)
4. Write: { "total_spent": X, "last_update": timestamp, "alerts": [...] }
5. If spend ≥ $18 → Append alert to log
6. If spend ≥ $20 → Log HARD_STOP alert
7. Update heartbeat file (/tmp/cost-enforcer-heartbeat)
8. Unlock file
```

**Resilience:** Fails gracefully, doesn't block on AWS.

---

### task_logger.py (On-Demand)

**Input:** task_id (str), model (str), cost (float)  
**Output:** Appends to task-log.json  
**Errors:** Log error, don't crash

**Logic:**
```
1. Lock task-log.json
2. Read existing tasks
3. Append: { "id": X, "model": Y, "cost": Z, "ts": now, "routed": bool }
4. Write file
5. Unlock file
```

**Resilience:** Atomic writes, no data loss.

---

### install_cron.sh (Setup)

**Steps:**
```
1. Check if systemd available
   - If yes: Copy .service + .timer files, run `systemctl enable`
   - If no: Fall back to crontab install
2. Create log directory
3. Set permissions (755 on scripts)
4. Create empty cost-tracker.json + task-log.json
5. Test: Run cost_tracker.py once (verify AWS connection)
6. If test passes: Output "✅ Installed and running"
7. If test fails: Output warning, but install anyway (will use local fallback)
```

---

## SUCCESS TESTS (MUST PASS)

### Test 1: Installation Works
```bash
bash scripts/install_cron.sh
```
Expected: "✅ Installed and running"

### Test 2: Pre-Flight Gate Works
```bash
python3 check.py "Build Vercel deployment guide" "anthropic.claude-opus-4-6-v1"
→ False: Expensive models blocked from docs...

python3 check.py "Build Vercel deployment guide" "deepseek.v3.2"
→ True: Approved. Est cost: $1...
```

### Test 3: Cron Actually Runs Every 15 Minutes
```bash
# After installation, wait 15+ minutes, then check:
ls -l /tmp/cost-enforcer-heartbeat

# File should exist and be recent (within last 2 minutes)
# If older than 2 minutes → cron failed
```

### Test 4: Spend Tracking Works
```bash
# After 2-3 cron cycles, check:
cat /workspace/memory/cost-tracker.json

# Should show:
# {
#   "total_spent": 26.00,
#   "last_update": "2026-02-11T23:45:00",
#   "alerts": ["Spend at $18", "Spend at $26"]
# }
```

### Test 5: Task Logging Works
```bash
python3 task_logger.py "TASK-005" "deepseek.v3.2" 1.50

# Check:
cat /workspace/memory/task-log.json

# Should have entry with timestamp
```

---

## GUARDRAILS (MUST ENFORCE)

❌ **Don't:**
- Use external APIs beyond AWS SDK
- Hardcode paths (use config)
- Print to stdout in background tasks (log to file)
- Assume files exist (create if missing)
- Ignore errors (log + continue gracefully)
- Crash the cron job (wrap in try/except)

✅ **Do:**
- File locking for concurrent writes
- Atomic writes (write to temp, then rename)
- Structured logging (JSON format)
- Fallback mechanisms (AWS API → local JSON)
- Heartbeat file (for verification)
- Detailed error messages in logs

---

## DEPLOYMENT CHECKLIST

- [ ] All 5 test cases pass on EC2
- [ ] Cron heartbeat file updates every 15 minutes
- [ ] cost-tracker.json gets updated every 15 minutes
- [ ] Pre-flight gate blocks expensive model + docs
- [ ] Logs written to /workspace/logs/cost-enforcer.log
- [ ] No crashes in systemd journal (check: `journalctl -u sc-cost-enforcer.service`)

---

## DELIVERY EXPECTATIONS

1. **Code quality:** Production-grade, type hints, error handling
2. **Testing:** ALL 5 success tests must pass on actual EC2
3. **Documentation:** README with installation + troubleshooting
4. **Honesty:** If something can't work, say so upfront (e.g., "AWS permissions not available")

---

**Success Metric:** Cron runs every 15 minutes without intervention, cost tracking updates, pre-flight gate blocks expensive model + docs. That's it.

**Failure Mode:** Don't promise it works. Test it. Prove it works. Then say it works.
