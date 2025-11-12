# Preview Berkas - Dokumentasi

## Fitur Baru: Preview Berkas di Browser

Fitur ini memungkinkan Anda untuk melihat konten berkas teks Arab dalam tampilan yang indah dan mudah dibaca di browser.

### Cara Menggunakan

1. **Dari Menu Utama:**
   ```bash
   python main.py
   ```
   
2. **Pilih Menu Kelola Berkas (5)**

3. **Pilih Preview Berkas di Browser (4)**

4. **Masukkan ID berkas yang ingin di-preview**

5. **Browser akan otomatis terbuka dengan tampilan preview yang cantik**

### Fitur Preview

✨ **Tampilan Menarik:**
- Design modern dengan gradient ungu-biru
- Font Arab yang optimal untuk pembacaan
- Layout responsif (mobile-friendly)
- Dark mode compatible

📊 **Informasi Lengkap:**
- Judul kitab
- Kategori (Nahwu/Sharaf/Fiqih/Aqidah)
- Tingkat kesulitan (Pemula/Menengah/Lanjut)
- Tanggal upload
- Ukuran file
- Jumlah karakter

🎨 **Typography:**
- Font size besar (1.8em) untuk kenyamanan membaca
- Line height optimal (2.5) untuk teks Arab
- Text alignment: justified
- Direction: RTL (Right-to-Left) untuk bahasa Arab

### Struktur File

```
data/
└── berkas/
    ├── uploads/           # File asli yang diupload
    ├── previews/          # File HTML preview
    └── database_berkas.json  # Database metadata
```

### File Preview

File HTML preview disimpan di `data/berkas/previews/` dengan nama:
- Format: `preview_{id}.html`
- Contoh: `preview_1.html`, `preview_2.html`

### Testing

Untuk test otomatis:
```bash
python test_upload_and_preview.py
```

Script ini akan:
1. Upload file `contoh_teks_arab.txt` otomatis
2. Generate HTML preview
3. Buka preview di browser default

### Teknologi

- **Python**: Backend processing
- **HTML5**: Struktur preview
- **CSS3**: Styling dengan gradient dan responsive design
- **Browser API**: Untuk membuka preview otomatis

### Browser Support

Preview kompatibel dengan semua browser modern:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### Tips

💡 **File preview tetap tersimpan** sehingga Anda bisa:
- Membuka kembali tanpa regenerate
- Share URL ke orang lain (jika di server)
- Bookmark untuk akses cepat

💡 **Untuk tampilan terbaik:**
- Gunakan browser dengan support font Arab
- Aktifkan JavaScript (untuk fitur tambahan di masa depan)
- Zoom browser di 100%

### Troubleshooting

**Browser tidak terbuka otomatis?**
- Check izin aplikasi Python untuk membuka browser
- Coba buka manual URL yang ditampilkan di terminal

**Tampilan tidak sesuai?**
- Pastikan encoding UTF-8
- Refresh browser (Ctrl+R / Cmd+R)
- Clear cache browser

**File tidak ditemukan?**
- Pastikan file sudah diupload
- Check folder `data/berkas/uploads/`
- Verifikasi database di `database_berkas.json`

### Update Mendatang

🚀 Planned features:
- Export to PDF
- Print optimization
- Share via link
- Multiple themes (Light/Dark/Classic)
- Font size adjustment
- Search within preview
- Bookmark/highlight text
