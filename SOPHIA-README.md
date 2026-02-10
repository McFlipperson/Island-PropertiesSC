# Sophia Voice AI — Testing & Integration Guide

## What's Built

Sophia is a luxury voice AI property consultant integrated into your Island Properties Next.js app.

### Components Created
- `components/sophia/sophia-chat.tsx` — Main chat interface (glassmorphism, Framer Motion animations)
- `components/sophia/sophia-fab.tsx` — Floating "Talk to Sophia" button (bottom-right)
- `components/sophia/sophia-listing-wrapper.tsx` — Passes property data to Sophia on listing pages
- `components/sophia/index.ts` — Barrel export

### API Routes
- `app/api/sophia/chat/route.ts` — Conversation AI via AWS Bedrock (DeepSeek V3.2)
- `app/api/sophia/voice/route.ts` — Text-to-speech via AWS Polly (Danielle voice)

### Modified Files
- `store/use-ui-store.ts` — Added Sophia state (open/close, speaking, property context)
- `app/(site)/layout.tsx` — Replaced WhatsApp FAB with Sophia FAB + Chat
- `app/(site)/listings/[slug]/page.tsx` — Passes property context to Sophia

### New Dependencies
- `@aws-sdk/client-bedrock-runtime` — Bedrock API
- `@aws-sdk/client-polly` — Polly TTS

---

## Setup Instructions

### 1. AWS Permissions (Required)
Your EC2 role `EC2-SSM-Core` needs these policies:
- ✅ `AmazonS3FullAccess` (already added)
- ⬜ `AmazonPollyFullAccess` (Nov needs to add this)
- ⬜ Bedrock model access for `deepseek.v3.2` (may need to enable in Bedrock console)

**To add Polly:**
1. AWS Console → IAM → Roles → `EC2-SSM-Core`
2. Add permissions → `AmazonPollyFullAccess` → Attach

**To enable DeepSeek V3.2 in Bedrock:**
1. AWS Console → Amazon Bedrock → Model access
2. Find DeepSeek V3.2 → Request access (if not already enabled)

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Required variables:
```env
AWS_REGION=us-east-1
SOPHIA_MODEL_ID=deepseek.v3.2
SOPHIA_VOICE_ID=Danielle
```

For full site functionality, also set your Sanity credentials.

### 3. Run Development Server
```bash
cd island-properties
npm run dev
```

### 4. Test Sophia
1. Open `http://localhost:3000`
2. Click "Talk to Sophia" button (bottom-right)
3. She should greet you with voice
4. Type a question about properties
5. She responds with text + voice

On a listing page, Sophia automatically knows about that specific property.

---

## Cost Controls Built In

### Chat API
- Max 50 messages per session
- Max 300 tokens per response
- 30-minute session timeout
- 3 retries per API call
- Circuit breaker after 5 consecutive failures
- Graceful fallback messages (never shows errors to users)

### Voice API
- Max 20 voice generations per session
- 3-second cooldown between requests
- 500 character max per voice generation
- Cached responses (1-hour browser cache)

### Estimated Costs
- DeepSeek V3.2: ~$0.01 per conversation
- AWS Polly: ~$0.002 per voice response
- **Total per visitor conversation: ~$0.05**

---

## Architecture

```
User clicks "Talk to Sophia"
  → SophiaFab toggles isSophiaOpen in Zustand
  → SophiaChat renders with greeting
  → On listing pages, SophiaListingWrapper sets property context in store
  → User types message
  → POST /api/sophia/chat (Bedrock DeepSeek V3.2)
  → Response displayed + POST /api/sophia/voice (AWS Polly)
  → Audio plays automatically (can be muted)
```

---

## Customization

### Change Sophia's Voice
Edit `SOPHIA_VOICE_ID` in `.env.local`:
- `Danielle` — Sophisticated, clear (default)
- `Joanna` — Professional, warm
- `Salli` — Friendly, approachable
- `Ruth` — Authoritative, mature

### Change Sophia's LLM
Edit `SOPHIA_MODEL_ID` in `.env.local`:
- `deepseek.v3.2` — Cheapest, good quality (default)
- `anthropic.claude-sonnet-4-20250514-v1:0` — Better quality, 20x more expensive
- `meta.llama4-maverick-17b-instruct-v1:0` — Good balance

### Customize Personality
Edit the system prompt in `app/api/sophia/chat/route.ts` → `buildSystemPrompt()` function.

---

## Next Steps (Future Enhancements)
- [ ] ElevenLabs voice upgrade (premium Filipino accent) when budget allows
- [ ] Speech-to-text input (let visitors talk to Sophia)
- [ ] Lead capture integration (save conversations to CRM)
- [ ] Analytics dashboard (track conversation topics, conversion rates)
- [ ] Multi-language support (Tagalog, Bisaya)
- [ ] Sophia avatar/image for the chat header
