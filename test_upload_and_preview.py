"""Script untuk test upload dan preview otomatis"""
from modules.kelola_berkas import KelolaBerkas
from pathlib import Path
import webbrowser

def auto_test():
    """Test otomatis upload dan preview"""
    kelola = KelolaBerkas()
    
    print("🧪 AUTO TEST: Upload & Preview")
    print("="*70)
    
    # File contoh
    contoh_file = Path("contoh_teks_arab.txt")
    
    if not contoh_file.exists():
        print("❌ File contoh_teks_arab.txt tidak ditemukan!")
        return
    
    print(f"\n📁 File ditemukan: {contoh_file}")
    
    # Baca konten
    with open(contoh_file, 'r', encoding='utf-8') as f:
        konten = f.read()
    
    # Upload file (simulasi manual input)
    print("\n📤 Mengupload file...")
    
    import shutil
    from datetime import datetime
    
    file_name = contoh_file.name
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    new_file_name = f"{timestamp}_{file_name}"
    dest_path = kelola.uploads_dir / new_file_name
    
    shutil.copy2(contoh_file, dest_path)
    
    # Simpan metadata
    file_id = kelola._get_next_id()
    metadata = {
        "id": file_id,
        "judul": "Contoh Teks Arab - Ilmu Nahwu",
        "kategori": "nahwu",
        "tingkat": "pemula",
        "deskripsi": "Contoh teks Arab tentang pembahasan dasar ilmu nahwu",
        "file_name": new_file_name,
        "file_path": str(dest_path),
        "upload_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "size_bytes": dest_path.stat().st_size,
        "jumlah_karakter": len(konten)
    }
    
    kelola.database['berkas'].append(metadata)
    kelola.save_database()
    
    print(f"✅ File berhasil diupload!")
    print(f"   📋 ID: {file_id}")
    print(f"   📖 Judul: {metadata['judul']}")
    
    # Generate preview
    print(f"\n🌐 Generating HTML preview...")
    html_content = kelola._generate_html_preview(metadata, konten)
    
    # Simpan preview
    preview_file = kelola.preview_dir / f"preview_{file_id}.html"
    with open(preview_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✅ Preview berhasil dibuat!")
    print(f"📁 File: {preview_file}")
    
    # Buka di browser
    preview_url = f"file:///{preview_file.absolute().as_posix()}"
    print(f"\n🚀 Membuka preview di browser...")
    print(f"🔗 URL: {preview_url}")
    
    webbrowser.open(preview_url)
    
    print(f"\n✅ Test selesai!")
    print(f"\n💡 Anda sekarang bisa:")
    print(f"   - Menjalankan python main.py")
    print(f"   - Pilih menu 5 (Kelola Berkas)")
    print(f"   - Pilih menu 4 (Preview Berkas di Browser)")

if __name__ == "__main__":
    auto_test()
