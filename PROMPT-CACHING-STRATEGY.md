# Prompt Caching Implementation Strategy (Ready to Deploy)

## WHAT WE'RE DOING

Enabling 1-hour prompt caching on SC Constitution so every chat reuses the cached system prompt instead of reprocessing it.

## COST IMPACT

**Without caching:**
- Every chat: Process full SC Constitution (~2,000 tokens)
- 100 chats/day: 200,000 tokens/day = ~$0.16/day

**With caching (1-hour TTL):**
- First chat per hour: Full process (~2,000 tokens)
- Next 99 chats in that hour: Use cached version (~200 tokens each)
- 100 chats/day: ~2,000 + (99 × 200) = ~21,800 tokens = ~$0.017/day
- **Savings: 90% reduction**

## HOW IT WORKS

### Configuration
```
System Prompt (cached):
[
  {
    "type": "text",
    "text": "SC Constitution + values + rules",
    "cache_control": {"type": "ephemeral", "ttl": 3600}  # 1 hour
  }
]
```

### Per-Request Flow
```
User message → System prompt (check cache) → LLM → Response

First request (10:00 AM):
  - System prompt not cached yet
  - Process 2,000 tokens
  - Cache it for 1 hour

Second request (10:15 AM):
  - System prompt found in cache
  - Read from cache (90% cheaper)
  - Add new query
  - Get response

Request after 11:01 AM:
  - Cache expired (1 hour TTL)
  - Rebuild cache
  - Repeat cycle
```

## WHAT GETS CACHED

These are static for Nov:
- SC Constitution (values, principles)
- Budget rules (can't spend over $20/month)
- Decision framework (property qualification criteria)
- Ray's preferences (communication style, risk tolerance)

These are NOT cached (change per request):
- User question
- Retrieved knowledge base context
- Property data being evaluated
- Conversation history

## WHEN TO USE

Prompt caching works best for:
✅ Repeated system instructions (SC Constitution)
✅ Large static context (PH real estate law KB)
✅ Long user profiles/preferences
✅ Standing rules/policies

❌ Does NOT help with:
- Unique queries (cache miss every time)
- Short system prompts (not worth caching overhead)
- Real-time data (changes every request)

## IMPLEMENTATION (When AWS Works)

```python
# Script: /home/ssm-user/.openclaw/workspace/scripts/test-prompt-caching.py

# Test with STS first
aws sts get-caller-identity

# Run caching test
python3 test-prompt-caching.py

# Output: Shows cache hits/misses + cost savings
```

## DEPLOYMENT CHECKLIST

- [ ] Verify IAM credentials (aws sts get-caller-identity works)
- [ ] Run prompt caching test
- [ ] Verify cache creation + hits
- [ ] Measure actual cost reduction
- [ ] Wire into Sara chat API
- [ ] Test with real property inquiries
- [ ] Monitor CloudWatch for cache effectiveness

## TROUBLESHOOTING

**If STS fails:** Credentials are wrong or don't have permissions
- Create new IAM key in AWS console
- Ensure key is activated (takes 10-30 seconds)

**If Bedrock call fails:** Key may be valid but Bedrock permissions missing
- Add policy: `bedrock:InvokeModel`
- Add policy: `bedrock:GetModelInvocationLoggingConfiguration`

**If cache hit rate low:** TTL too short
- Increase TTL from 1 hour to 2-4 hours (if query patterns allow)

## MONITORING

Once active, check CloudWatch logs:
```
Model calls with cache_creation_input_tokens > 0 = cache miss (pay full price)
Model calls with cache_read_input_tokens > 0 = cache hit (pay 90% less)

Goal: 80%+ cache hit rate during business hours
```

## NEXT STEPS

1. Fix AWS credentials
2. Run test-prompt-caching.py
3. Verify 90% savings
4. Wire into production Sara deployment
5. Monitor effectiveness

---

**Status:** Ready to deploy, blocked on AWS credentials.
