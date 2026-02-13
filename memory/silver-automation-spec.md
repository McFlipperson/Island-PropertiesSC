# Silver Buying Automation — Design Spec

## Current Problem
- Nov runs FB ads for junk silver buying in Bohol/Cebu
- Gets 25-50 seller inquiries per day
- 96% are time-wasters (no real silver, wrong items, low quantity)
- Spends 4+ hours daily screening sellers
- Only ~1-2 legitimate sellers per day

## Automation Goal
Reduce screening time from 4+ hours to <1 hour by:
1. Auto-replying in Bisaya to qualify sellers
2. Analyzing seller photos to assess silver quality/quantity
3. Scoring leads and prioritizing the best ones
4. Only alerting Nov for high-quality leads

## Chatbot Flow (Bisaya)

### Stage 1: Initial Response (Auto — Immediate)
**Trigger:** New FB message from ad

**Bot message (Bisaya):**
"Salamat sa pag-message! 🥈 Kami ang Island Silver Buyers. Para ma-check namo ang imong silver, palihug send og:

1️⃣ Photo sa imong silver items (kubyertos, barya, kadena, etc.)
2️⃣ Pila ka piraso/kilos
3️⃣ Asa ka location?

Mag-reply mi within 1 hour! 💰"

**Translation:**
"Thanks for messaging! We are Island Silver Buyers. To check your silver, please send:
1. Photo of your silver items (cutlery, coins, chains, etc.)
2. How many pieces/kilos
3. Where are you located?"

### Stage 2: Photo Analysis (AI — 1-2 min)
**When:** Seller sends photo

**AI checks for:**
- Is this actually silver? (color, tarnish patterns, markings)
- What type? (cutlery, coins, jewelry, bars)
- Approximate quantity
- Quality indicators (925 stamp, tarnish level, condition)
- Red flags (plated items, stainless steel, fake)

**Scoring:**
- 🟢 HIGH (70-100): Likely genuine silver, good quantity → Alert Nov immediately
- 🟡 MEDIUM (40-69): Possibly silver, needs verification → Queue for review
- 🔴 LOW (0-39): Likely not silver or too small quantity → Polite decline

### Stage 3: Qualified Response

**If HIGH score (Bisaya):**
"Nindot! 👀 Murag legit nga silver ni. Gusto namo ma-check personally. Available ka karon? Mag-set ta og schedule para ma-test ug ma-weigh. Asa ka exact nga location?"

**Translation:** "Nice! This looks like legit silver. We want to check it personally. Are you available now? Let's set a schedule to test and weigh. What's your exact location?"

**If MEDIUM score (Bisaya):**
"Salamat sa photos! Murag silver ni pero kinahanglan namo i-test personally. Pila ka estimate sa total weight? Kung more than 500g, pwede mi mu-schedule og pick-up."

**Translation:** "Thanks for the photos! This looks like silver but we need to test personally. How much is the estimated total weight? If more than 500g, we can schedule a pick-up."

**If LOW score (Bisaya):**
"Salamat sa interest! Based sa photos, dili mi ka-buy ani kay murag dili pure silver / gamay ra kaayo. Kung naa kay lain silver items, feel free to send photos! 🙏"

**Translation:** "Thanks for your interest! Based on the photos, we can't buy this as it doesn't appear to be pure silver / too small quantity. If you have other silver items, feel free to send photos!"

## Technical Implementation

### Option A: Facebook Messenger Bot (Recommended)
- Use Facebook Graph API / Messenger Platform
- Webhook receives messages → processes → auto-replies
- Can be hosted on same EC2 or as Lambda function
- Image analysis via Bedrock (Claude Sonnet for vision)
- Cost: ~$0.01-0.05 per conversation

### Option B: Manual Assist via SC
- Sellers message on FB → Nov forwards photo to SC on Telegram
- SC analyzes and gives recommendation
- Nov copy-pastes response
- Lower automation but simpler to start

### Option C: Hybrid
- Start with Option B (quick to implement)
- Build toward Option A as volume grows

## Estimated Impact
- Current: 4+ hours screening, 1-2 good leads
- After automation: <1 hour reviewing pre-screened leads, same 1-2 good leads
- **Time saved: 3+ hours per day = 90+ hours per month**
- That time redirected to Island Properties = faster path to million

## Implementation Priority
1. **Phase 1 (This week):** Option B — SC assists via Telegram with photo analysis
2. **Phase 2 (Week 2-3):** Build simple FB auto-reply with qualification questions  
3. **Phase 3 (Month 2):** Full automation with image analysis

---

*Created by SC ⚡ — Ready to implement when Nov gives the go-ahead*
