# 🚀 Quick Deploy Reference

## ⚡ 3-Minute Deploy

### Step 1: Dapatkan API Keys (2 menit)
```bash
# 1. Gemini API Key
https://aistudio.google.com/app/apikey
→ Klik "Create API Key"
→ Copy: AIza...

# 2. Supabase (Optional)
https://supabase.com/dashboard
→ New Project
→ Settings → API
→ Copy: Project URL & anon key
```

### Step 2: Deploy ke Vercel (1 menit)
```bash
# Push to GitHub
git add .
git commit -m "Deploy"
git push

# Import di Vercel
https://vercel.com/new
→ Import Git Repository
→ Select Framework: Vite
→ Deploy
```

### Step 3: Set Environment Variables
```
Vercel Dashboard → Settings → Environment Variables

GEMINI_API_KEY=AIza...
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhb...
VITE_APP_URL=https://your-app.vercel.app
```

### Step 4: Redeploy
```
Vercel Dashboard → Deployments → Redeploy
```

## ✅ Verification Checklist

```bash
# Test analyze API
curl -X POST https://your-app.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"السلام عليكم"}'

# Test convert API  
curl -X POST https://your-app.vercel.app/api/convert \
  -H "Content-Type: application/json" \
  -d '{"text":"Selamat pagi"}'

# Test assistant API
curl -X POST https://your-app.vercel.app/api/assistant \
  -H "Content-Type: application/json" \
  -d '{"question":"Apa itu nahwu?"}'
```

## 🔧 Local Testing

```bash
# Setup
cp .env.example .env
# Edit .env dengan credentials
npm install

# Run
npm run dev
# Open http://localhost:3000

# Build test
npm run build
npm run preview
```

## 📊 Monitor

### Vercel Dashboard
- **Deployments**: https://vercel.com/dashboard/deployments
- **Logs**: Deployment → View Function Logs
- **Analytics**: Project → Analytics

### Supabase Dashboard  
- **Database**: https://app.supabase.com/project/_/database/tables
- **Table Editor**: View analysis_history
- **SQL Editor**: Run queries

## 🆘 Common Issues

### Build Error
```bash
# Clear cache
rm -rf node_modules dist .vercel
npm install
npm run build
```

### API Error 500
```bash
# Check Vercel logs
vercel logs [deployment-url]

# Verify env vars
vercel env ls
```

### Supabase Connection
```bash
# Test connection
curl https://[PROJECT_URL]/rest/v1/ \
  -H "apikey: [ANON_KEY]"
```

## 📱 Quick Commands

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build

# Preview
npm run preview

# Deploy (Vercel CLI)
vercel --prod

# Logs
vercel logs

# Env
vercel env add VARIABLE_NAME
vercel env ls
```

## 🎯 Production URLs

```
Frontend:  https://[your-app].vercel.app
API:       https://[your-app].vercel.app/api/*
Supabase:  https://[project-id].supabase.co
```

## 💡 Tips

1. **Free Tier Limits**
   - Vercel: 100GB bandwidth/month
   - Supabase: 500MB database, 2GB bandwidth
   - Gemini: Check Google AI Studio quota

2. **Performance**
   - Enable Vercel Edge caching
   - Use Supabase connection pooling
   - Monitor API response times

3. **Security**
   - Never commit `.env` file
   - Rotate API keys regularly
   - Enable Supabase RLS policies
   - Set CORS properly

4. **Cost Optimization**
   - Cache frequent queries
   - Implement rate limiting
   - Monitor usage dashboard

## 🔗 Important Links

- 📖 Full Guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 📝 Changes: [CHANGES.md](./CHANGES.md)
- 💾 Database Schema: [supabase-schema.sql](./supabase-schema.sql)
- 🏠 README: [README.md](./README.md)
