#!/bin/bash
# SC's workspace backup to S3
BUCKET="openclaw-backup-422491854978"
WORKSPACE="/home/ssm-user/.openclaw/workspace"
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

echo "[$TIMESTAMP] Starting backup..."
aws s3 sync "$WORKSPACE" "s3://$BUCKET/workspace/" \
  --region us-east-1 \
  --delete \
  --exclude "*.tmp" \
  --exclude "node_modules/*" \
  2>&1

EXIT=$?
if [ $EXIT -eq 0 ]; then
  echo "[$TIMESTAMP] ✅ Backup complete"
else
  echo "[$TIMESTAMP] ❌ Backup failed (exit $EXIT)"
fi
exit $EXIT
