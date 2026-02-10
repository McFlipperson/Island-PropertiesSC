# Island Properties — Quick Deploy Guide

## Option 1: Vercel (Recommended — Free)

### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)

### Steps
1. Push your code to GitHub:
```bash
cd island-properties
git init
git add .
git commit -m "Initial commit with Sophia voice AI"
git remote add origin https://github.com/YOUR_USERNAME/island-properties.git
git push -u origin main
```

2. Go to vercel.com → Import Project → Select your GitHub repo

3. Add environment variables in Vercel dashboard:
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
SOPHIA_MODEL_ID=deepseek.v3.2
SOPHIA_VOICE_ID=Danielle
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Note: For Vercel deployment, you'll need AWS IAM user credentials (not EC2 role).
Create an IAM user with Bedrock + Polly permissions and use those keys.

4. Click Deploy → Done! Your site is live at your-project.vercel.app

5. Add custom domain: Settings → Domains → Add your domain

### Cost: FREE (Vercel hobby tier)
- 100GB bandwidth/month
- Automatic SSL
- Global CDN
- Serverless functions for Sophia API

---

## Option 2: Run on EC2 (Current Setup)

### Quick Start (Development Mode)
```bash
cd /home/ssm-user/.openclaw/workspace/island-properties
npm run dev
```
Site available at http://localhost:3000

### Production Mode on EC2
```bash
# Build
npm run build

# Start production server
npm start

# Or use PM2 for persistent running
npm install -g pm2
pm2 start npm --name "island-properties" -- start
pm2 save
pm2 startup
```

### Expose to Internet (via Nginx)
```bash
sudo apt install nginx -y

# Create Nginx config
sudo tee /etc/nginx/sites-available/island-properties << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/island-properties /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# Add SSL with Certbot
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

### Cost: Already included in your EC2 costs

---

## Domain Options
- islandproperties.ph — ~$25/year (Philippine domain)
- islandpropertiesbohol.com — ~$12/year
- islandprop.ph — ~$25/year
- boholluxury.com — ~$12/year

---

## Post-Launch Checklist
- [ ] Site accessible via domain
- [ ] SSL certificate active (https)
- [ ] Sophia chat working (text + voice)
- [ ] Mock listings displaying correctly
- [ ] Contact form sending emails
- [ ] Meta Pixel installed for ad tracking
- [ ] Google Analytics installed
- [ ] Test on mobile (iPhone, Android)
- [ ] Test Sophia on mobile
- [ ] First Facebook ad live

---

*Created by SC ⚡*
