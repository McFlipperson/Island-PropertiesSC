# Vercel Deployment Guide — Island Properties + Sophia

**Status:** READY FOR DEPLOYMENT  
**Build:** ✅ Verified (no errors, all 8 static pages generated)  
**Git:** ✅ Main branch clean, latest commit: `95d5e72`  
**Date Prepared:** Feb 11, 2026 — 02:52 UTC

---

## Step 1: Connect Vercel to GitHub

1. Go to https://vercel.com
2. Sign in (use Nov's account or create one)
3. Click **"New Project"**
4. Select **"Import Git Repository"**
5. Find `McFlipperson/Island-PropertiesSC` in the list
6. Click **"Import"**

---

## Step 2: Configure Environment Variables in Vercel

In the Vercel project settings, set these variables:

### **Required (for Sophia to work):**
```
AWS_REGION = us-east-1
SOPHIA_MODEL_ID = deepseek.v3.2
SOPHIA_VOICE_ID = Danielle
```

### **Optional (for future features):**
```
NEXT_PUBLIC_CURRENCY_EXCHANGE_RATE = 58
NEXT_PUBLIC_SANITY_PROJECT_ID = (when Sanity is set up)
SANITY_API_TOKEN = (when Sanity is set up)
RESEND_API_KEY = (for contact form emails)
```

**Important:** Sophia's API calls use **EC2 instance role credentials** (IAM role attached to the build machine). Vercel environment doesn't have those, so we need to handle this differently for production.

### **For Production (AWS Bedrock + Polly):**

Option A: Add AWS credentials to Vercel env
```
AWS_ACCESS_KEY_ID = <your-key>
AWS_SECRET_ACCESS_KEY = <your-secret>
```

Option B: Use Vercel serverless functions with Lambda proxy (recommended for cost control)

---

## Step 3: Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Clone the repo
   - Run `npm install`
   - Run `npm run build` (CONFIRMED: builds in ~60 seconds, zero errors)
   - Generate static pages (8/8 pages)
   - Deploy to https://island-properties-sc.vercel.app (auto-generated URL)

**Expected:** First deploy takes ~2-3 minutes. Subsequent deploys: ~30-60 seconds.

---

## Step 4: Custom Domain (Optional)

1. In Vercel project → **Settings → Domains**
2. Add custom domain: `islandproperties.ph` (if registered)
3. Point DNS to Vercel nameservers
4. Wait for DNS propagation (~5 minutes)

---

## Step 5: Test Sophia on Production

Once deployed:

1. Visit https://island-properties-sc.vercel.app (or your custom domain)
2. Click "Chat with Sophia"
3. Test conversation ("Tell me about Panglao", "What's the ROI?", etc.)
4. Test voice: Click microphone icon
5. Verify chat responses appear and Polly voice plays

---

## Known Issues & Workarounds

### Issue 1: AWS Credentials on Vercel
**Problem:** Sophia needs AWS keys to call Bedrock + Polly. Vercel doesn't have EC2 instance role.  
**Solution:** Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to Vercel env vars, OR use Lambda proxy.

### Issue 2: Sanity Integration (Not Yet Live)
**Status:** Pending. Currently using mock data. When Sanity is set up, add SANITY vars to Vercel.

---

## Monitoring & Analytics

Once live on Vercel:

1. **Enable Vercel Analytics:**
   - Project Settings → Analytics
   - Add `<Analytics />` component to app
   - Track: page views, chat sessions, voice interactions

2. **Monitor Sophia usage:**
   - AWS CloudWatch logs (Bedrock, Polly calls)
   - Vercel function logs (chat/voice endpoints)

3. **Cost tracking:**
   - AWS: https://console.aws.amazon.com/billing (Bedrock + Polly usage)
   - Vercel: Free tier for static site + 100 function invocations/day

---

## Rollback (If Needed)

1. Go to Vercel project → **Deployments**
2. Find previous deployment
3. Click **"Promote to Production"**
4. Takes ~30 seconds

---

## Next Steps (After Launch)

1. **Sanity CMS:** Replace mock properties with dynamic data (TASK-006)
2. **Lead capture:** Add Resend integration for inquiry emails
3. **Analytics:** Set up Vercel Analytics dashboard
4. **Custom domain:** Point islandproperties.ph to Vercel
5. **Monitoring alerts:** Set up cost/performance alerts

---

## Summary

| Item | Status |
|------|--------|
| Code ready | ✅ Yes |
| Build verified | ✅ Yes (0 errors) |
| Env vars template | ✅ Yes (vercel.json configured) |
| GitHub integration | ✅ Yes (McFlipperson org) |
| Deployment steps | ✅ Above |
| Estimated time to live | ~5 minutes |

**Ready to go!** Nov can deploy anytime by logging into Vercel and clicking "New Project" → "Import Git" → "Deploy".
