# 📚 Mahir Kitab Gundul V1.0 - Production Deployment Guide

Aplikasi web untuk menganalisis teks Arab gundul dengan AI, lengkap dengan analisis nahwu, sharaf, dan balaghah.

## 🚀 Deployment ke Vercel

### Prerequisites
1. Akun [Vercel](https://vercel.com)
2. Akun [Supabase](https://supabase.com)
3. API Key dari [Google AI Studio](https://aistudio.google.com/app/apikey) untuk Gemini API

### Setup Database Supabase

1. **Buat Project Baru di Supabase**
   - Masuk ke [Supabase Dashboard](https://app.supabase.com)
   - Klik "New Project"
   - Isi detail project dan tunggu hingga selesai dibuat

2. **Buat Tabel Database** (Optional - untuk menyimpan history analisis)
   
   Jalankan SQL berikut di SQL Editor Supabase:

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
   ```

3. **Dapatkan Credentials Supabase**
   - Buka Settings → API
   - Copy `Project URL` (VITE_SUPABASE_URL)
   - Copy `anon public` key (VITE_SUPABASE_ANON_KEY)

### Setup Gemini API

1. Buka [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Klik "Create API Key"
3. Copy API Key yang dihasilkan

### Deploy ke Vercel

#### Option 1: Deploy via GitHub (Recommended)

1. **Push kode ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Import Project di Vercel**
   - Masuk ke [Vercel Dashboard](https://vercel.com/dashboard)
   - Klik "Add New" → "Project"
   - Import repository GitHub Anda
   - Pilih framework: **Vite**

3. **Setup Environment Variables**
   
   Di Vercel project settings, tambahkan environment variables berikut:

   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_APP_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Klik "Deploy"
   - Tunggu hingga build selesai

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login ke Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Tambahkan Environment Variables**
   ```bash
   vercel env add GEMINI_API_KEY
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   vercel env add VITE_APP_URL
   ```

## 🔧 Local Development

1. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd Mahir-Kitab-Gundul-V-1.0
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   
   Copy `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` dan isi dengan credentials Anda:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   VITE_APP_URL=http://localhost:3000
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:3000`

## 📁 Struktur Project

```
├── api/                    # Vercel Serverless Functions
│   ├── analyze.ts         # API untuk analisis teks Arab
│   ├── assistant.ts       # API untuk AI Assistant
│   └── convert.ts         # API untuk konversi ke Arab Gundul
├── components/            # React Components
├── constants/             # Constants dan data statis
├── lib/                   # Utilities dan Supabase client
│   └── supabase.ts       # Supabase client configuration
├── services/              # API Services
│   └── geminiService.ts  # Service untuk call API routes
├── .env.example          # Template environment variables
├── vercel.json           # Vercel configuration
└── vite.config.ts        # Vite configuration
```

## 🔒 Security Features

1. **API Key Protection**: Gemini API key hanya ada di serverless functions (tidak exposed ke client)
2. **CORS Configuration**: Proper CORS headers untuk security
3. **Environment Variables**: Sensitive data disimpan di environment variables
4. **Row Level Security**: Database Supabase menggunakan RLS policies

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini 2.5 Flash
- **Deployment**: Vercel

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API Key | ✅ Yes |
| `VITE_SUPABASE_URL` | Supabase Project URL | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anonymous Key | ✅ Yes |
| `VITE_APP_URL` | Application URL | ✅ Yes |

## 🐛 Troubleshooting

### Build Error di Vercel
- Pastikan semua environment variables sudah diisi
- Check logs di Vercel Dashboard → Deployments → View Function Logs

### API Error
- Verify GEMINI_API_KEY valid dan memiliki quota
- Check Network tab di browser untuk melihat error response

### Supabase Connection Error
- Verify VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY benar
- Check Supabase project masih active

## 📞 Support

Jika ada masalah atau pertanyaan, silakan buat issue di GitHub repository.

## 📄 License

MIT License - feel free to use this project for learning purposes.
