"""Script test untuk preview berkas"""
from modules.kelola_berkas import KelolaBerkas

def test_preview():
    """Test fungsi preview"""
    kelola = KelolaBerkas()
    
    print("🧪 Testing Preview Functionality")
    print("="*70)
    
    # Lihat daftar berkas
    if not kelola.database['berkas']:
        print("\n⚠️  Tidak ada berkas untuk di-test.")
        print("💡 Silakan upload file terlebih dahulu menggunakan menu utama.")
        return
    
    print("\n📋 Daftar berkas yang tersedia:")
    kelola.lihat_daftar()
    
    # Test preview berkas pertama
    if kelola.database['berkas']:
        print(f"\n🔍 Testing preview untuk berkas ID 1...")
        first_berkas = kelola.database['berkas'][0]
        
        # Baca konten
        from pathlib import Path
        file_path = Path(first_berkas['file_path'])
        
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                konten = f.read()
            
            # Generate HTML
            html_content = kelola._generate_html_preview(first_berkas, konten)
            
            # Simpan preview
            preview_file = kelola.preview_dir / "test_preview.html"
            with open(preview_file, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            print(f"\n✅ Test preview berhasil!")
            print(f"📁 File preview: {preview_file}")
            print(f"🌐 URL: file:///{preview_file.absolute().as_posix()}")
            
            # Buka di browser
            import webbrowser
            webbrowser.open(f"file:///{preview_file.absolute().as_posix()}")
        else:
            print("❌ File tidak ditemukan!")

if __name__ == "__main__":
    test_preview()
