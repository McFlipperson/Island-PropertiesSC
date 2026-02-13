# Deploy Island Properties to Vercel

## Step 1: Push to GitHub
```bash
cd island-properties
git init
git add .
git commit -m "Island Properties with Sara voice AI"
git remote add origin https://github.com/YOUR_USERNAME/island-properties.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel
1. Go to vercel.com and sign in with GitHub
2. Click "New Project"
3. Select `island-properties` repo
4. Click "Import"

## Step 3: Add Environment Variables
In Vercel dashboard, go to Settings → Environment Variables and add:

```
AWS_REGION=us-east-1
SOPHIA_MODEL_ID=us.anthropic.claude-3-5-sonnet-20241022-v2:0
SOPHIA_VOICE_ID=Danielle
NEXT_PUBLIC_SANITY_PROJECT_ID=(optional - uses mock data if empty)
NEXT_PUBLIC_SANITY_DATASET=production
```

**CRITICAL:** For Vercel to access AWS Bedrock, you need AWS credentials:

### Option A: AWS IAM User (Recommended)
1. Go to AWS IAM → Users → Create User "vercel-deployer"
2. Attach policies:
   - `AmazonBedrockFullAccess`
   - (Optional) `AmazonPollyFullAccess`
3. Create Access Key
4. In Vercel, add:
   ```
   AWS_ACCESS_KEY_ID=(your key)
   AWS_SECRET_ACCESS_KEY=(your secret)
   ```

### Option B: AWS Role ARN (If using role)
1. Copy your EC2 role ARN
2. Add to Vercel as `AWS_ROLE_ARN`

## Step 4: Deploy
Click "Deploy" → Vercel will build and deploy automatically

Your site will be live at: `https://island-properties-XXXXX.vercel.app`

## Step 5: Test Sara
1. Open your site
2. Click "Talk to Sara" button (bottom-right)
3. Ask: "Can I own this property as a foreigner?"
4. Sara should respond with voice

## Custom Domain (Optional)
1. In Vercel dashboard: Settings → Domains
2. Add your domain (e.g., islandproperties.ph)
3. Update DNS records per Vercel instructions

---

**That's it.** Sara will be live and working. No sandbox issues, AWS will work properly on Vercel's infrastructure.
