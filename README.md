<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 📚 Mahir Kitab Gundul V1.0

Aplikasi web berbasis AI untuk menganalisis teks Arab gundul dengan analisis mendalam nahwu (tata bahasa), sharaf (morfologi), dan balaghah (retorika).

## ✨ Fitur Utama

- 🔍 **Analisis Teks Arab**: Analisis detail I'rab, Sharaf, dan Balaghah untuk setiap kata
- ✍️ **Konversi ke Arab Gundul**: Terjemahan otomatis dari Bahasa Indonesia ke Arab Gundul
- 🤖 **AI Assistant (Kiai Cerdas)**: Asisten AI yang ahli dalam tata bahasa Arab
- 📖 **Perpustakaan Kitab**: Koleksi kitab kuning klasik
- 💾 **Database Supabase**: Penyimpanan history analisis (optional)
- 🔒 **Production Ready**: Siap deploy ke Vercel dengan security best practices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Gemini API Key dari [Google AI Studio](https://aistudio.google.com/app/apikey)

### Local Development

1. **Clone repository**
   ```bash
   git clone <your-repo-url>
   cd Mahir-Kitab-Gundul-V-1.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
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

4. **Run development server**
   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:3000`

## 📦 Deploy ke Production

Untuk panduan lengkap deployment ke Vercel dengan Supabase database, lihat **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/Mahir-Kitab-Gundul-V-1.0)

Jangan lupa set environment variables di Vercel Dashboard:
- `GEMINI_API_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_URL`

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini 2.5 Flash
- **Deployment**: Vercel

## 📁 Struktur Project

```
├── api/                    # Vercel Serverless Functions
│   ├── analyze.ts         # Analisis teks Arab
│   ├── assistant.ts       # AI Assistant
│   └── convert.ts         # Konversi ke Arab Gundul
├── components/            # React Components
│   ├── AnalysisTab.tsx
│   ├── AiAssistantTab.tsx
│   ├── KitabTab.tsx
│   └── ...
├── constants/             # Data statis dan konstanta
├── lib/                   # Libraries dan utilities
│   └── supabase.ts       # Supabase client
├── services/              # API Services
│   └── geminiService.ts  # API calls ke serverless functions
├── .env.example          # Template environment variables
├── vercel.json           # Vercel configuration
└── vite.config.ts        # Vite configuration
```

## 🔒 Security

- ✅ API keys tidak exposed ke client-side
- ✅ Semua API calls melalui serverless functions
- ✅ Environment variables untuk sensitive data
- ✅ CORS configuration yang proper
- ✅ Row Level Security di Supabase

## 📝 License

MIT License - Bebas digunakan untuk pembelajaran

## 🙏 Credits

Powered by Google Gemini AI & Supabase
