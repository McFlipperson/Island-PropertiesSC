# Sophia Overnight Build Plan

## Scope: Complete Budget-Friendly Voice AI
- Sticky chat widget (bottom right)
- AWS Polly voice (Filipino/English)
- Conversation routing through Bedrock (me)
- Next.js integration ready
- Cost controls built-in
- Testing & documentation

## Security & Cost Limits

### API Rate Limits
- Max 50 Bedrock calls per session
- Max 20 Polly TTS generations per session  
- 5-minute cooldown between voice generations
- Auto-fallback to text if voice fails

### Error Handling
- Max 3 retries per API call
- Circuit breaker: stop after 5 consecutive failures
- Graceful degradation (text-only mode if voice fails)
- Error logging without sensitive data

### Cost Controls
- Conversation length limits (max 2000 tokens per response)
- Session timeout (30 min max per user)
- Daily usage caps (configurable)
- Alert at 80% of daily budget

### Development Safety
- Test with mock data first
- Staged rollout (dev → staging → production)
- Kill switches for emergency shutdown
- Detailed cost monitoring dashboard

## Success Criteria
✅ Working chat widget
✅ Voice responses via AWS Polly
✅ Intelligent conversations via Bedrock
✅ Cost controls active
✅ Ready for your Next.js app
✅ Complete documentation & testing

## Delivery: Ready by your morning coffee ☕

Starting autonomous build mode in 3... 2... 1... 🚀