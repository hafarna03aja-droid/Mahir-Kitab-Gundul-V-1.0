# 🔧 Troubleshooting Guide

## 🚨 Common Errors & Solutions

### 1. Build Errors

#### Error: "Cannot find module '@vercel/node'"
```bash
# Solution
npm install @vercel/node @supabase/supabase-js
npm run build
```

#### Error: "GEMINI_API_KEY not set"
```bash
# Local Development
echo "GEMINI_API_KEY=your_key_here" >> .env

# Vercel
vercel env add GEMINI_API_KEY
# Paste your key, then redeploy
```

#### Error: "Property 'env' does not exist on type 'ImportMeta'"
```bash
# Solution: Already fixed with vite-env.d.ts
# If still error, restart TypeScript server:
# VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### 2. Runtime Errors

#### Error: "Gagal menganalisis teks"
**Possible Causes:**
1. Invalid Gemini API Key
2. API quota exceeded
3. Network error

**Solutions:**
```bash
# Check API Key validity
curl https://generativelanguage.googleapis.com/v1/models?key=YOUR_KEY

# Check Vercel logs
vercel logs [deployment-url]

# Verify env variable in Vercel
Vercel Dashboard → Settings → Environment Variables
```

#### Error: "Failed to fetch" / CORS Error
**Cause:** API URL mismatch

**Solution:**
```bash
# Update VITE_APP_URL in .env
VITE_APP_URL=https://your-actual-app.vercel.app

# Or for production, set in Vercel env vars
```

#### Error: "Supabase connection failed"
**Solutions:**
```bash
# 1. Verify credentials
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# 2. Test Supabase connection
curl https://YOUR_PROJECT.supabase.co/rest/v1/ \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# 3. Check Supabase project is active
# Visit: https://app.supabase.com
```

### 3. Deployment Issues

#### Error: "Build failed on Vercel"
**Steps:**
```bash
# 1. Test build locally first
npm run build

# 2. If local build works, check Vercel logs
Vercel Dashboard → Deployments → [Failed Deployment] → View Logs

# 3. Common causes:
# - Missing environment variables
# - Node version mismatch
# - Dependency issues

# 4. Fix and redeploy
git add .
git commit -m "Fix build"
git push
```

#### Error: "Function invocation timeout"
**Cause:** Gemini API taking too long

**Solutions:**
```bash
# 1. Increase timeout in vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30
    }
  }
}

# 2. Or optimize API calls
# - Reduce response size
# - Add timeout handling
```

### 4. Database Issues

#### Error: "relation 'analysis_history' does not exist"
**Solution:**
```sql
-- Run in Supabase SQL Editor
-- Copy from supabase-schema.sql and execute
CREATE TABLE analysis_history (...);
```

#### Error: "permission denied for table analysis_history"
**Solution:**
```sql
-- Enable RLS and add policies
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON analysis_history FOR INSERT
  WITH CHECK (true);
```

### 5. API Key Issues

#### Error: "API key not valid. Please pass a valid API key."
**Gemini API Key Issues:**
```bash
# 1. Generate new key
https://aistudio.google.com/app/apikey

# 2. Update in Vercel
vercel env rm GEMINI_API_KEY
vercel env add GEMINI_API_KEY
# Paste new key

# 3. Redeploy
vercel --prod
```

#### Error: "Quota exceeded"
**Solution:**
```bash
# Check quota: https://aistudio.google.com/app/apikey
# Options:
# 1. Wait for quota reset
# 2. Implement caching
# 3. Upgrade to paid tier
```

### 6. Local Development Issues

#### Error: "Port 3000 already in use"
```bash
# Solution 1: Kill process
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows (find PID then kill)

# Solution 2: Use different port
npm run dev -- --port 3001
```

#### Error: "Module not found"
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 🔍 Debugging Tools

### Check Vercel Deployment
```bash
# CLI
vercel logs [deployment-url]
vercel inspect [deployment-url]

# Dashboard
https://vercel.com/dashboard
→ Deployments → [Your deployment] → View Function Logs
```

### Check Supabase
```bash
# Test API endpoint
curl https://[PROJECT-ID].supabase.co/rest/v1/analysis_history \
  -H "apikey: [YOUR-KEY]" \
  -H "Authorization: Bearer [YOUR-KEY]"

# View logs
Supabase Dashboard → Logs → API Logs
```

### Test API Endpoints Locally
```bash
# Start dev server
npm run dev

# Test analyze endpoint
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"السلام عليكم"}'

# Test convert endpoint
curl -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"text":"Halo dunia"}'
```

### Browser DevTools
```javascript
// Check environment variables (client-side only)
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_APP_URL);

// Monitor API calls
// Network tab → Filter: Fetch/XHR
// Check request/response
```

## 📊 Performance Issues

### Slow API Response
```bash
# 1. Check Gemini API response time
# Add timing in api/analyze.ts:
const start = Date.now();
const response = await ai.models.generateContent(...);
console.log(`Gemini took: ${Date.now() - start}ms`);

# 2. Optimize:
# - Reduce prompt size
# - Use simpler schema
# - Cache results
```

### High Bandwidth Usage
```bash
# Monitor in Vercel Dashboard
https://vercel.com/dashboard → Analytics → Bandwidth

# Solutions:
# - Enable compression
# - Optimize images
# - Implement caching
```

## 🆘 Get Help

### Check Logs
```bash
# Vercel
vercel logs --follow

# Browser
F12 → Console tab

# Supabase  
Supabase Dashboard → Logs
```

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Docs](https://vitejs.dev)
- [Gemini API Docs](https://ai.google.dev/docs)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [Supabase Discord](https://discord.supabase.com)

## 📝 Report Issues

If masalah tetap ada:

1. **Collect Information:**
   ```bash
   # Environment
   node --version
   npm --version
   
   # Error messages
   vercel logs [url] > error.log
   
   # Config
   cat vercel.json
   cat package.json
   ```

2. **Create GitHub Issue:**
   - Include error messages
   - Steps to reproduce
   - Environment details
   - Screenshots if applicable

## ✅ Health Check

Run ini untuk verify semuanya OK:

```bash
# 1. Build test
npm run build
# ✅ Should succeed without errors

# 2. Environment vars (local)
grep -v '^#' .env | grep -v '^$'
# ✅ Should show all 4 variables

# 3. Dependencies
npm list @vercel/node @supabase/supabase-js @google/genai
# ✅ All should be installed

# 4. API files
ls api/*.ts
# ✅ Should show: analyze.ts, assistant.ts, convert.ts

# 5. Config files
ls vercel.json tsconfig.json vite.config.ts
# ✅ All should exist
```

Jika semua ✅ green, aplikasi siap di-deploy! 🚀
