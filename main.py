def menu_kelola_berkas():
    """Menu untuk mengelola berkas/file pembelajaran"""
    from modules.kelola_berkas import KelolaBerkas
    
    kelola = KelolaBerkas()
    
    while True:
        print("\n" + "="*70)
        print("📁 KELOLA BERKAS PEMBELAJARAN")
        print("="*70)
        print("1. 📤 Upload File Teks Arab")
        print("2. 📋 Lihat Daftar Berkas")
        print("3. 📖 Baca Berkas")
        print("4. 🌐 Preview Berkas di Browser")
        print("5. 📋 Copy Teks Arab dari Berkas")
        print("6. 🗑️  Hapus Berkas")
        print("0. 🔙 Kembali ke Menu Utama")
        print("="*70)
        
        pilihan = input("Pilih menu (0-6): ").strip()
        
        if pilihan == "1":
            kelola.upload_file()
        elif pilihan == "2":
            kelola.lihat_daftar()
        elif pilihan == "3":
            kelola.baca_berkas()
        elif pilihan == "4":
            kelola.preview_berkas()
        elif pilihan == "5":
            kelola.copy_teks_arab()
        elif pilihan == "6":
            kelola.hapus_berkas()
        elif pilihan == "0":
            break
        else:
            print("❌ Pilihan tidak valid!")
        
        input("\n⏎ Tekan Enter untuk melanjutkan...")

def main():
    """Fungsi utama aplikasi"""
    while True:
        print("\n" + "="*70)
        print("📚 MAHIR KITAB GUNDUL V1.0")
        print("="*70)
        print("1. 📖 Mulai Pembelajaran")
        print("2. ✍️  Latihan Soal")
        print("3. 📊 Lihat Progress")
        print("4. ⚙️  Pengaturan")
        print("5. 📁 Kelola Berkas Pembelajaran")
        print("0. 🚪 Keluar")
        print("="*70)
        
        pilihan = input("Pilih menu (0-5): ").strip()
        
        if pilihan == "1":
            # menu_pembelajaran()  # Function existing
            print("Menu Pembelajaran")
        elif pilihan == "2":
            # menu_latihan()  # Function existing
            print("Menu Latihan")
        elif pilihan == "3":
            # menu_progress()  # Function existing
            print("Menu Progress")
        elif pilihan == "4":
            # menu_pengaturan()  # Function existing
            print("Menu Pengaturan")
        elif pilihan == "5":
            menu_kelola_berkas()
        elif pilihan == "0":
            print("\n✨ Jazakallahu khairan! Semoga ilmunya bermanfaat.")
            break
        else:
            print("❌ Pilihan tidak valid!")