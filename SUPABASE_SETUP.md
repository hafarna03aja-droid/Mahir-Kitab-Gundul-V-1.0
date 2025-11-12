# 🗄️ Supabase Setup Guide - Step by Step

## 📋 Overview
Supabase akan digunakan untuk menyimpan history analisis teks Arab. Database ini **OPTIONAL** - aplikasi tetap berfungsi tanpanya.

## 🚀 Setup Supabase (10 menit)

### Step 1: Buat Project Baru

1. **Buka Supabase**
   ```
   https://supabase.com
   ```

2. **Sign In / Sign Up**
   - Login dengan GitHub (recommended)
   - Atau gunakan email

3. **Create New Project**
   - Klik "New Project"
   - Organization: Pilih atau buat baru
   - **Project Name**: `mahir-kitab-gundul`
   - **Database Password**: Buat password yang kuat (SIMPAN INI!)
   - **Region**: Southeast Asia (Singapore) - untuk latency terbaik
   - **Pricing Plan**: Free (cukup untuk development)
   - Klik "Create New Project"
   - ⏳ Tunggu ~2 menit hingga project ready

### Step 2: Dapatkan API Credentials

1. **Buka Project Settings**
   ```
   Project Dashboard → Settings (⚙️ icon) → API
   ```

2. **Copy Credentials**
   
   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   ✅ Copy ini untuk `VITE_SUPABASE_URL`

   **Project API Keys → anon public:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   ✅ Copy ini untuk `VITE_SUPABASE_ANON_KEY`

### Step 3: Buat Database Schema

1. **Buka SQL Editor**
   ```
   Project Dashboard → SQL Editor (kiri sidebar)
   ```

2. **Buat New Query**
   - Klik "New Query"

3. **Copy & Paste SQL Schema**
   
   Copy seluruh isi dari file `supabase-schema.sql` atau paste ini:

   ```sql
   -- Tabel untuk menyimpan history analisis
   CREATE TABLE analysis_history (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     original_text TEXT NOT NULL,
     vocalized_text TEXT NOT NULL,
     translation TEXT NOT NULL,
     irab_analysis JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Index untuk performa
   CREATE INDEX idx_analysis_history_user_id ON analysis_history(user_id);
   CREATE INDEX idx_analysis_history_created_at ON analysis_history(created_at DESC);

   -- Enable Row Level Security
   ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

   -- Policy: Users can view their own history
   CREATE POLICY "Users can view own history"
     ON analysis_history FOR SELECT
     USING (auth.uid() = user_id);

   -- Policy: Users can insert their own history
   CREATE POLICY "Users can insert own history"
     ON analysis_history FOR INSERT
     WITH CHECK (auth.uid() = user_id);

   -- Policy: Allow anonymous users to insert (optional)
   CREATE POLICY "Allow anonymous insert"
     ON analysis_history FOR INSERT
     WITH CHECK (true);
   ```

4. **Run Query**
   - Klik "RUN" atau tekan `Ctrl + Enter`
   - ✅ Harus muncul "Success. No rows returned"

### Step 4: Verify Database

1. **Cek Table Editor**
   ```
   Table Editor (sidebar) → analysis_history
   ```
   
   ✅ Harus melihat table dengan columns:
   - id (uuid)
   - user_id (uuid)
   - original_text (text)
   - vocalized_text (text)
   - translation (text)
   - irab_analysis (jsonb)
   - created_at (timestamptz)

2. **Test Insert (Optional)**
   ```sql
   INSERT INTO analysis_history (
     original_text,
     vocalized_text,
     translation,
     irab_analysis
   ) VALUES (
     'السلام',
     'السَّلَامُ',
     'Keselamatan',
     '{"test": "data"}'::jsonb
   );
   ```
   
   Kemudian cek di Table Editor → Refresh

### Step 5: Setup Environment Variables

#### **Local Development (.env)**

1. **Buat file .env**
   ```bash
   cp .env.example .env
   ```

2. **Edit .env**
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key

   # Application URL
   VITE_APP_URL=http://localhost:3000
   ```

3. **Test Local**
   ```bash
   npm run dev
   ```

#### **Vercel Production**

1. **Buka Vercel Project**
   ```
   https://vercel.com/dashboard
   → Your Project → Settings → Environment Variables
   ```

2. **Add Variables**
   
   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://xxxxxxxxxxxxx.supabase.co`
   - Environment: Production, Preview, Development
   - ✅ Save

   **Variable 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Environment: Production, Preview, Development
   - ✅ Save

3. **Redeploy**
   ```
   Deployments → Latest → ⋯ Menu → Redeploy
   ```

## ✅ Verification

### Test Supabase Connection

#### **Test 1: Direct API**
```bash
# Replace with your actual values
curl https://xxxxxxxxxxxxx.supabase.co/rest/v1/analysis_history \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Harus return: `[]` atau data yang ada

#### **Test 2: From Application**

1. Buka aplikasi
2. Analisis teks Arab
3. Check browser console: `F12 → Console`
4. Cek di Supabase Table Editor - should see new row

#### **Test 3: Using Code**
```typescript
// Test in browser console (F12)
const { supabase } = await import('./lib/supabase');
const { data, error } = await supabase
  .from('analysis_history')
  .select('*')
  .limit(5);
console.log('Data:', data);
console.log('Error:', error);
```

## 🔧 Troubleshooting

### Error: "relation 'analysis_history' does not exist"
**Solution:** Run SQL schema di SQL Editor

### Error: "JWT expired" atau "Invalid API key"
**Solution:** 
1. Verify credentials di Settings → API
2. Copy paste ulang (jangan ada space extra)
3. Restart dev server: `Ctrl+C` then `npm run dev`

### Error: "permission denied for table"
**Solution:** Check RLS policies di Table Editor → analysis_history → RLS

### No data appears in table
**Solution:**
1. Check browser console for errors
2. Verify `isSupabaseConfigured()` returns true
3. Check `services/supabaseService.ts` is being used

## 📊 Monitor Supabase

### Dashboard Metrics
```
Project Dashboard → Reports
```
- Database size
- API requests
- Bandwidth usage

### View Logs
```
Project Dashboard → Logs → API Logs
```
- See all requests
- Debug issues

### Database Management
```
Database → Tables → analysis_history
```
- View data
- Edit rows
- Export CSV

## 🎯 Usage Limits (Free Tier)

| Resource | Limit |
|----------|-------|
| Database Size | 500 MB |
| Bandwidth | 2 GB |
| API Requests | Unlimited |
| Rows | 50,000 |

## 💡 Tips

### 1. Backup Data
```sql
-- Export data
COPY analysis_history TO '/tmp/backup.csv' CSV HEADER;
```

### 2. Clean Old Data
```sql
-- Delete data older than 30 days
DELETE FROM analysis_history 
WHERE created_at < NOW() - INTERVAL '30 days';
```

### 3. Monitor Usage
```
Settings → Usage → Database
```
Check usage regularly

### 4. Enable Realtime (Optional)
```sql
-- Enable realtime for table
ALTER PUBLICATION supabase_realtime ADD TABLE analysis_history;
```

## 🔗 Useful Links

- **Dashboard**: https://app.supabase.com
- **Docs**: https://supabase.com/docs
- **SQL Reference**: https://supabase.com/docs/guides/database
- **API Reference**: https://supabase.com/docs/reference/javascript

## 📞 Support

- **Discord**: https://discord.supabase.com
- **GitHub**: https://github.com/supabase/supabase
- **Status**: https://status.supabase.com

---

## ✅ Checklist

Setup completed when:

- [ ] Supabase project created
- [ ] SQL schema executed successfully
- [ ] Table `analysis_history` visible in Table Editor
- [ ] API credentials copied
- [ ] Environment variables set (local .env)
- [ ] Environment variables set (Vercel)
- [ ] Test insert works
- [ ] Application can connect to Supabase
- [ ] Data appears in table after analysis

**Selamat! Supabase siap digunakan!** 🎉
