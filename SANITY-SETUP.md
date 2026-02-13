# SANITY CMS SETUP GUIDE

## Overview
Sanity is a headless CMS that lets Nov add/edit properties without code changes. Nov adds properties in Sanity → Island Properties frontend fetches them dynamically.

## Step 1: Create Sanity Project (5 min)

**Nov's Action:**
1. Go to https://sanity.io/get-started
2. Sign up with email
3. Create project: "Island Properties"
4. Select "Free" plan
5. **Copy Project ID** (looks like: abc12345def67890) → paste into Step 2 below

---

## Step 2: Get API Credentials

In Sanity dashboard:
1. Go to Settings → API
2. Create token: **Read** permission only
3. Copy token → save in file `/workspace/.sanity-token`

Nov, run this command and paste your token:
```bash
echo "YOUR_SANITY_API_TOKEN_HERE" > /home/ssm-user/.openclaw/workspace/.sanity-token
```

---

## Step 3: SC Will Create Sanity Schema (Property Structure)

Property schema will include:
```
{
  title: string (e.g., "Beachfront Villa, Panglao")
  price: number (in PHP)
  location: string (Panglao, Mactan, etc.)
  bedrooms: number
  bathrooms: number
  squareMeters: number
  keyFeatures: array (e.g., ["100% foreign ownership", "beach access"])
  annualYield: number (e.g., 7.2)
  roi: number (e.g., 120000 - annual rental income)
  images: array of URLs
  description: text
  availability: string (available, sold, negotiating)
  featured: boolean (show on homepage)
}
```

---

## Step 4: Migrate Mock Data to Sanity

Nov will manually add 3 properties to Sanity dashboard (10 min):
- Property 1: Beachfront Villa
- Property 2: Panglao Luxury Estate
- Property 3: Mactan Development Plot

Or: SC can create the 3 documents programmatically once Nov provides Project ID + API token.

---

## Step 5: Wire Island Properties Frontend

Update `island-properties/src/components/Properties.jsx`:

**Before:**
```jsx
const MOCK_PROPERTIES = [
  { id: 1, title: "Beachfront Villa", ... },
  ...
]
```

**After:**
```jsx
import { client } from '../lib/sanity';

useEffect(() => {
  client.fetch(`*[_type == "property"]`).then(setProperties);
}, []);
```

---

## Step 6: Deploy + Test

1. Update `.env.local` with Sanity Project ID
2. Push to GitHub
3. Redeploy to Vercel
4. Test: Add new property in Sanity → See it live on Island Properties

---

## Timeline
- Nov Setup: 10 min (signup + credentials)
- SC Schema + Migration: 20 min (autonomous)
- Frontend wiring: 15 min (autonomous)
- Deploy: 5 min (Nov on Vercel)

**Total: 50 min to dynamic CMS**

---

## Files to Create
- `/workspace/sanity-schema.js` — Property schema definition
- `/workspace/sanity-migration.js` — Batch upload of 3 mock properties
- `/workspace/island-properties/src/lib/sanity.js` — Client configuration
- `/workspace/SANITY-CREDENTIALS.md` — Nov's secrets (Project ID, token)

---

## Safety Notes
- Read-only token = no accidental deletions
- Nov controls Sanity dashboard (never expose token publicly)
- API calls from frontend use read-only token
- All edits go through Sanity UI (audit trail)

