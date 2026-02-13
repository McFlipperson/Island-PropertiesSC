#!/usr/bin/env python3
"""Enable prompt caching for SC Foundation + SC Constitution"""

import boto3
import json

# Initialize Bedrock client
bedrock = boto3.client(
    'bedrock-runtime',
    region_name='us-east-1',
)

# SC Constitution (will be cached, 1-hour TTL)
SC_CONSTITUTION = """# SC Constitution: Core Values & Operating Principles

## Foundation Layer (Non-Negotiable)

### 1. Honesty
Tell the truth, even when uncomfortable.

### 2. Unbiased  
Present facts without opinion contamination.

### 3. Tough-Skinned
Handle criticism without defensiveness.

[... truncated for brevity ...]

Rules:
- Honesty: Always tell truth
- Unbiased: Present all angles
- Resourceful: Try hard before asking
- Decisive: Make clear calls with guardrails
- Humble: Know limits and biases
- Curious: Actively learn
- Accountable: Own mistakes
- Efficient: Respect time
- Evidence-based: Cite sources
- Risk-aware: Flag dangers
- Self-critical: Review decisions weekly
"""

def test_prompt_caching():
    """Test prompt caching with 1-hour TTL"""
    
    print("Testing Bedrock Prompt Caching (1-hour TTL)...")
    print("-" * 60)
    
    # Request 1: Prime the cache
    print("\n[Request 1] Priming cache with SC Constitution...")
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-haiku-4-5-20251001-v1:0',
        contentType='application/json',
        accept='application/json',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-06-01",
            "max_tokens": 500,
            "system": [
                {
                    "type": "text",
                    "text": "You are SC, an AI assistant built to help Nov reach ₱1M.",
                },
                {
                    "type": "text", 
                    "text": SC_CONSTITUTION,
                    "cache_control": {"type": "ephemeral"}  # Mark for caching
                }
            ],
            "messages": [
                {
                    "role": "user",
                    "content": "What are your core values?"
                }
            ]
        })
    )
    
    result = json.loads(response['body'].read())
    
    # Check cache usage
    usage = result.get('usage', {})
    print(f"  Input tokens: {usage.get('input_tokens', 0)}")
    print(f"  Cache creation tokens: {usage.get('cache_creation_input_tokens', 0)}")
    print(f"  Cache read tokens: {usage.get('cache_read_input_tokens', 0)}")
    print(f"  Output tokens: {usage.get('output_tokens', 0)}")
    
    cache_created = usage.get('cache_creation_input_tokens', 0) > 0
    print(f"  ✓ Cache created: {cache_created}")
    
    if cache_created:
        print(f"\n  Response:\n  {result['content'][0]['text'][:200]}...")
    
    # Request 2: Hit the cache (same system prompt, different user question)
    print("\n[Request 2] Hitting cache with new query...")
    
    response2 = bedrock.invoke_model(
        modelId='anthropic.claude-haiku-4-5-20251001-v1:0',
        contentType='application/json',
        accept='application/json',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-06-01",
            "max_tokens": 500,
            "system": [
                {
                    "type": "text",
                    "text": "You are SC, an AI assistant built to help Nov reach ₱1M.",
                },
                {
                    "type": "text",
                    "text": SC_CONSTITUTION,
                    "cache_control": {"type": "ephemeral"}  # Same cache
                }
            ],
            "messages": [
                {
                    "role": "user",
                    "content": "How should you screen property leads?"
                }
            ]
        })
    )
    
    result2 = json.loads(response2['body'].read())
    usage2 = result2.get('usage', {})
    
    print(f"  Input tokens: {usage2.get('input_tokens', 0)}")
    print(f"  Cache creation tokens: {usage2.get('cache_creation_input_tokens', 0)}")
    print(f"  Cache read tokens: {usage2.get('cache_read_input_tokens', 0)}")
    print(f"  Output tokens: {usage2.get('output_tokens', 0)}")
    
    cache_hit = usage2.get('cache_read_input_tokens', 0) > 0
    print(f"  ✓ Cache hit: {cache_hit}")
    
    if cache_hit:
        print(f"\n  Response:\n  {result2['content'][0]['text'][:200]}...")
    
    # Calculate savings
    print("\n" + "=" * 60)
    print("COST ANALYSIS:")
    print("=" * 60)
    
    req1_cost = (usage.get('input_tokens', 0) * 0.80 + usage.get('output_tokens', 0) * 4) / 1_000_000
    req2_cost = (usage2.get('cache_read_input_tokens', 0) * 0.10 + usage2.get('output_tokens', 0) * 4) / 1_000_000
    
    # Cost: Haiku = $0.80/$4 per M tokens; Cache read = $0.10/$2 per M tokens
    print(f"\nRequest 1 (cache prime): ${req1_cost:.6f}")
    print(f"Request 2 (cache hit): ${req2_cost:.6f}")
    print(f"Savings on Request 2: {((1 - req2_cost/req1_cost) * 100):.1f}%")
    
    print(f"\nPer 100 queries with cached system prompt:")
    print(f"  Without caching: ~${(req1_cost * 100):.4f}")
    print(f"  With caching: ~${(req1_cost + req2_cost * 99):.4f}")
    print(f"  Monthly savings (1000 queries): ~${((req1_cost * 1000 - req1_cost - req2_cost * 999) / 1000):.2f}")

if __name__ == "__main__":
    test_prompt_caching()
