#!/usr/bin/env python3
"""Mandatory pre-completion verification gate. MUST run before any 'task complete' claim."""

import json
import sys
from pathlib import Path
from datetime import datetime

class MandatoryHonestyGate:
    """Cannot be bypassed. Blocks all completion claims until checks pass."""
    
    def __init__(self):
        self.log_file = Path.home() / ".openclaw" / "workspace" / "logs" / "honesty-gate.log"
        self.log_file.parent.mkdir(parents=True, exist_ok=True)

    def enforce(self, task_name: str, checks: dict) -> tuple:
        """
        MANDATORY verification before completion.
        
        Returns: (can_claim_done, failed_checks)
        If ANY check fails, returns False. No exceptions. No workarounds.
        """
        self.log(f"GATE ENFORCING: {task_name}", "ENFORCE")
        
        results = {}
        for check_name, check_fn in checks.items():
            try:
                result = check_fn()
                results[check_name] = result
                status = "✓ PASS" if result else "✗ FAIL"
                self.log(f"  {check_name}: {status}", "CHECK")
            except Exception as e:
                results[check_name] = False
                self.log(f"  {check_name}: ✗ EXCEPTION - {e}", "ERROR")
        
        all_pass = all(results.values())
        failed = [k for k, v in results.items() if not v]
        
        if not all_pass:
            self.log(f"GATE BLOCKED: {', '.join(failed)}", "BLOCK")
            return False, failed
        
        self.log(f"GATE PASSED: {task_name} - OK TO CLAIM DONE", "PASS")
        return True, []

    def log(self, msg: str, level: str = "INFO"):
        with open(self.log_file, 'a') as f:
            f.write(f"{datetime.now().isoformat()} - {level} - {msg}\n")

# GLOBAL GATE - Cannot be disabled
HONESTY_GATE = MandatoryHonestyGate()

def verify_before_claiming_done(task_name: str, checks: dict) -> bool:
    """
    USE THIS BEFORE ANY 'TASK COMPLETE' CLAIM.
    
    If you skip this, you're lying.
    
    Example:
        can_claim, failed = verify_before_claiming_done("Vercel Deploy", {
            "vercel_live": lambda: check_if_live(),
            "chat_responds": lambda: test_chat_api(),
        })
        
        if can_claim:
            return "✅ Task complete"
        else:
            return f"❌ Failed: {', '.join(failed)}"
    """
    can_claim, failed = HONESTY_GATE.enforce(task_name, checks)
    return can_claim, failed

if __name__ == "__main__":
    gate = MandatoryHonestyGate()
    print("Honesty Gate initialized. Ready to enforce.")
