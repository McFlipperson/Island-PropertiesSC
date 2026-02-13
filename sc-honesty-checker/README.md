# SC Honesty Checker

Pre-message verification system. Prevents "I built it" lies by forcing verification before completion claims.

## How It Works

Before SC says "work is done," this runs checks:
- Files exist? ✓
- Scripts executable? ✓  
- Logs recent? ✓
- Build passed? ✓
- Cron fired? ✓

If all pass → "Work is done"
If any fail → "I didn't finish. Here's why"

## Usage

```python
checker = HonestyChecker()

# Define what "done" means for this task
checks = {
    "files_exist": lambda: checker.verify_files_exist([
        "/path/to/file1",
        "/path/to/file2"
    ]),
    "scripts_executable": lambda: checker.verify_executable([
        "/path/to/script.py"
    ]),
    "logs_fresh": lambda: checker.verify_recent_logs("/path/to/logs")
}

# Run verification
can_claim, failed_checks = checker.can_claim_complete(checks)

if can_claim:
    print("✅ Task complete. I can claim this is done.")
else:
    print(f"❌ Task incomplete. Failed checks: {failed_checks}")
```

## Logs

```bash
tail -f /home/ssm-user/.openclaw/workspace/logs/honesty-checker.log
```

## Core Rules

1. **File verification** — Does the code actually exist?
2. **Executability** — Are scripts runnable?
3. **Recency** — Did logs update recently?
4. **Build status** — Did compilation succeed?
5. **Heartbeat** — Is the cron actually running?

If ANY check fails, return FALSE. No way around it.
