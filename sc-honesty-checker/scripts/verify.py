#!/usr/bin/env python3
"""SC Honesty Checker - Verification before claiming work is done"""

import json
from pathlib import Path
from datetime import datetime

class HonestyChecker:
    def __init__(self):
        self.log_file = Path.home() / ".openclaw" / "workspace" / "logs" / "honesty-checker.log"
        self.log_file.parent.mkdir(parents=True, exist_ok=True)

    def log(self, msg: str, level: str = "INFO"):
        with open(self.log_file, 'a') as f:
            f.write(f"{datetime.now().isoformat()} - {level} - {msg}\n")
        print(f"{level}: {msg}")

    def verify_files_exist(self, paths: list) -> bool:
        """Check if files actually exist"""
        for path in paths:
            p = Path(path)
            if not p.exists():
                self.log(f"MISSING: {path}", "ERROR")
                return False
        self.log(f"All {len(paths)} files exist", "OK")
        return True

    def verify_executable(self, scripts: list) -> bool:
        """Check if scripts are executable"""
        for script in scripts:
            p = Path(script)
            if not p.is_file() or not (p.stat().st_mode & 0o111):
                self.log(f"NOT EXECUTABLE: {script}", "ERROR")
                return False
        self.log(f"All {len(scripts)} scripts executable", "OK")
        return True

    def verify_recent_logs(self, log_path: str, minutes: int = 15) -> bool:
        """Check if logs were updated recently"""
        p = Path(log_path)
        if not p.exists():
            self.log(f"LOG NOT FOUND: {log_path}", "ERROR")
            return False
        
        age_seconds = (datetime.now() - datetime.fromtimestamp(p.stat().st_mtime)).total_seconds()
        if age_seconds > minutes * 60:
            self.log(f"LOG STALE: {log_path} is {age_seconds/60:.0f} min old", "ERROR")
            return False
        
        self.log(f"LOG FRESH: {log_path}", "OK")
        return True

    def verify_build_passes(self, build_dir: str) -> bool:
        """Check if build directory exists (indicates build succeeded)"""
        p = Path(build_dir)
        if not p.exists() or not p.is_dir():
            self.log(f"BUILD NOT FOUND: {build_dir}", "ERROR")
            return False
        self.log(f"BUILD EXISTS: {build_dir}", "OK")
        return True

    def verify_cron_heartbeat(self, heartbeat_path: str, expected_interval_min: int = 120) -> bool:
        """Check if cron heartbeat is recent"""
        p = Path(heartbeat_path)
        if not p.exists():
            self.log(f"NO HEARTBEAT: {heartbeat_path}", "ERROR")
            return False
        
        age_seconds = (datetime.now() - datetime.fromtimestamp(p.stat().st_mtime)).total_seconds()
        if age_seconds > expected_interval_min * 60 * 1.5:  # 1.5x tolerance
            self.log(f"HEARTBEAT STALE: {age_seconds/60:.0f} min old (expected <{expected_interval_min})", "ERROR")
            return False
        
        self.log(f"HEARTBEAT FRESH: {heartbeat_path}", "OK")
        return True

    def can_claim_complete(self, checks: dict) -> tuple:
        """Run all checks. Return (can_claim, reasons)"""
        results = {}
        
        for check_name, check_fn in checks.items():
            try:
                result = check_fn()
                results[check_name] = result
            except Exception as e:
                self.log(f"CHECK FAILED: {check_name} - {e}", "ERROR")
                results[check_name] = False
        
        all_pass = all(results.values())
        failed = [k for k, v in results.items() if not v]
        
        if all_pass:
            self.log("✅ ALL CHECKS PASSED - OK TO CLAIM COMPLETE", "OK")
            return True, []
        else:
            self.log(f"❌ CHECKS FAILED: {', '.join(failed)}", "ERROR")
            return False, failed

if __name__ == "__main__":
    checker = HonestyChecker()
    print("SC Honesty Checker initialized")
