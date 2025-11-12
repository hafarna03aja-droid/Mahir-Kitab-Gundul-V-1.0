# 🚀 Panduan Menjalankan Aplikasi Mahir Kitab Gundul V1.0

## 📋 Daftar Isi
1. [Prerequisites](#prerequisites)
2. [Menjalankan Web App (React)](#web-app)
3. [Menjalankan CLI App (Python)](#cli-app)
4. [Menjalankan Preview Server](#preview-server)
5. [Menjalankan Semua Sekaligus](#semua-sekaligus)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Node.js & NPM
```bash
node --version  # v18+ recommended
npm --version   # v9+ recommended
```

### Python
```bash
python --version  # Python 3.8+ required
```

### Dependencies
```bash
# Install Node dependencies
npm install

# Install Python dependencies (if any)
pip install -r requirements.txt  # jika ada
```

---

## 🌐 Web App (React + Vite)

### Jalankan Development Server

```bash
npm run dev
```

**Output:**
```
VITE v6.4.1  ready in 2023 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.43.76:3000/
```

### Akses Aplikasi
- **Browser:** `http://localhost:3000/`
- **VS Code Simple Browser:** Buka Simple Browser dan navigasi ke URL di atas

### Fitur Web App
✅ **Tab Kitab** - Jelajahi 9 ulama dan kitab-kitab mereka
✅ **Tab Analisis** - Analisis teks Arab otomatis
✅ **Tab AI Assistant** - Chat dengan AI untuk belajar bahasa Arab
✅ **Tab Live Tutor** - Pembelajaran interaktif

### Build untuk Production
```bash
npm run build    # Build aplikasi
npm run preview  # Preview build production
```

---

## 🖥️ CLI App (Python)

### Jalankan Aplikasi CLI

```bash
python main.py
```

**Menu Utama:**
```
===================================================
📚 MAHIR KITAB GUNDUL V1.0
===================================================
1. 📖 Mulai Pembelajaran
2. ✍️  Latihan Soal
3. 📊 Lihat Progress
4. ⚙️  Pengaturan
5. 📁 Kelola Berkas Pembelajaran
0. 🚪 Keluar
===================================================
```

### Fitur CLI App

#### Menu 5: Kelola Berkas Pembelajaran
```
1. 📤 Upload File Teks Arab
2. 📋 Lihat Daftar Berkas
3. 📖 Baca Berkas
4. 🌐 Preview Berkas di Browser
5. 📋 Copy Teks Arab dari Berkas
6. 🗑️  Hapus Berkas
0. 🔙 Kembali ke Menu Utama
```

### Upload File Example
```bash
# Jalankan aplikasi
python main.py

# Pilih: 5 → 1 (Upload)
# Masukkan path: D:\contoh_teks_arab.txt
# Isi metadata: judul, kategori, tingkat, deskripsi
```

---

## 🌐 Preview Server (Port 8000)

### Jalankan Preview Server

```bash
python preview_server.py
```

**Output:**
```
===================================================
🌐 SERVER PREVIEW BERKAS
===================================================
✅ Server berjalan di: http://localhost:8000
📁 Directory: D:\...\data\berkas\previews

📋 Daftar preview yang tersedia:
   1. http://localhost:8000/preview_1.html

💡 Tips:
   - Buka URL di browser
   - Tekan Ctrl+C untuk stop server
===================================================
```

### Akses Preview
- **Direct:** `http://localhost:8000/preview_1.html`
- **List:** `http://localhost:8000/` (akan list semua file)

### Kegunaan
- Preview HTML untuk file teks Arab yang diupload
- Design cantik dengan gradient purple-blue
- Typography optimal untuk bahasa Arab (RTL)
- Responsive dan mobile-friendly

---

## 🎯 Menjalankan Semua Sekaligus

### Windows PowerShell (3 Terminal)

**Terminal 1 - Web App:**
```powershell
cd "D:\git hub hafarna\Mahir-Kitab-Gundul-V-1.0"
npm run dev
```

**Terminal 2 - Preview Server:**
```powershell
cd "D:\git hub hafarna\Mahir-Kitab-Gundul-V-1.0"
python preview_server.py
```

**Terminal 3 - CLI App (Optional):**
```powershell
cd "D:\git hub hafarna\Mahir-Kitab-Gundul-V-1.0"
python main.py
```

### VS Code Integrated Terminal
```bash
# Split terminal 3 kali (Ctrl+Shift+5)
# Terminal 1: npm run dev
# Terminal 2: python preview_server.py
# Terminal 3: python main.py (if needed)
```

### Dengan Task Manager (Advanced)

Buat file `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Web App",
      "type": "shell",
      "command": "npm run dev",
      "isBackground": true,
      "problemMatcher": []
    },
    {
      "label": "Start Preview Server",
      "type": "shell",
      "command": "python preview_server.py",
      "isBackground": true,
      "problemMatcher": []
    },
    {
      "label": "Start All",
      "dependsOn": ["Start Web App", "Start Preview Server"],
      "problemMatcher": []
    }
  ]
}
```

Jalankan: `Ctrl+Shift+P` → `Tasks: Run Task` → `Start All`

---

## 🧪 Testing

### Test Web App
```bash
# Development
npm run dev

# Buka http://localhost:3000
# Test semua tab dan fitur
```

### Test CLI App
```bash
python main.py
# Test setiap menu
```

### Test Preview Feature
```bash
# Auto test dengan upload otomatis
python test_upload_and_preview.py

# Manual test
python main.py
# Menu: 5 → 4 → masukkan ID berkas
```

### Test Preview Server
```bash
# Start server
python preview_server.py

# Buka browser
http://localhost:8000/preview_1.html
```

---

## 🔧 Troubleshooting

### Port sudah digunakan

**Web App (Port 3000):**
```bash
# Check process menggunakan port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F

# Atau ubah port di vite.config.ts
```

**Preview Server (Port 8000):**
```bash
# Check & kill
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Atau edit preview_server.py untuk ubah PORT
```

### Module not found (Python)
```bash
# Pastikan di root directory
cd "D:\git hub hafarna\Mahir-Kitab-Gundul-V-1.0"

# Check Python path
python -c "import sys; print(sys.path)"

# Install missing modules
pip install [module-name]
```

### Module not found (Node)
```bash
# Delete dan reinstall
rm -rf node_modules package-lock.json
npm install

# Atau
npm ci
```

### Preview tidak terbuka di browser
```bash
# Cek browser default
# Windows: Settings → Default Apps → Web Browser

# Coba buka manual
# Copy URL dari terminal dan paste di browser
```

### File encoding error (Python)
```bash
# Pastikan file menggunakan UTF-8
# Buka file di VS Code dan lihat encoding di status bar
# Klik encoding → Save with Encoding → UTF-8
```

### API Key issues (Web App)
```bash
# Check .env file
cat .env

# Pastikan ada:
# VITE_GEMINI_API_KEY=your_key_here
# VITE_SUPABASE_URL=your_url_here
# VITE_SUPABASE_ANON_KEY=your_key_here

# Copy dari .env.example jika belum ada
copy .env.example .env  # Windows
cp .env.example .env    # Linux/Mac
```

---

## 📊 Monitoring

### Check Running Services

**Windows:**
```powershell
# Check all Node processes
Get-Process | Where-Object {$_.ProcessName -like "*node*"}

# Check Python processes
Get-Process | Where-Object {$_.ProcessName -like "*python*"}

# Check ports
netstat -ano | findstr "3000 8000"
```

**Linux/Mac:**
```bash
# Check ports
lsof -i :3000
lsof -i :8000

# Check processes
ps aux | grep node
ps aux | grep python
```

---

## 🎨 URLs Penting

| Service | URL | Port |
|---------|-----|------|
| Web App | http://localhost:3000 | 3000 |
| Preview Server | http://localhost:8000 | 8000 |
| Preview Files | http://localhost:8000/preview_N.html | 8000 |

---

## 💡 Tips

1. **Gunakan VS Code Split Terminal** untuk menjalankan multiple services
2. **Bookmark URLs** untuk akses cepat
3. **Keep preview server running** saat menggunakan file management
4. **Monitor console** untuk errors dan warnings
5. **Test di multiple browsers** untuk compatibility

---

## 📝 Quick Commands

```bash
# Full stack development
npm run dev && python preview_server.py

# Build production
npm run build && npm run preview

# Clean start
rm -rf node_modules && npm install && npm run dev

# Test everything
python test_upload_and_preview.py
npm run dev
```

---

## 🚀 Production Deployment

### Web App
```bash
npm run build
# Deploy dist/ folder ke hosting (Vercel, Netlify, etc.)
```

### Python Backend
```bash
# Setup virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run with production server (Gunicorn, etc.)
```

---

**Happy Learning! 📚✨**
