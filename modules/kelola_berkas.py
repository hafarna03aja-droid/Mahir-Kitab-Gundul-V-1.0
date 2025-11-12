"""Module untuk mengelola upload dan manajemen file/berkas pembelajaran"""
import os
import json
import shutil
from datetime import datetime
from pathlib import Path

# Optional import for clipboard functionality
try:
    import pyperclip
    PYPERCLIP_AVAILABLE = True
except ImportError:
    PYPERCLIP_AVAILABLE = False

class KelolaBerkas:
    """Class untuk mengelola berkas pembelajaran bahasa Arab"""
    
    def __init__(self):
        """Inisialisasi dengan membuat struktur folder"""
        self.data_dir = Path("data/berkas")
        self.uploads_dir = self.data_dir / "uploads"
        self.database_file = self.data_dir / "database_berkas.json"
        
        # Buat direktori jika belum ada
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.uploads_dir.mkdir(parents=True, exist_ok=True)
        
        # Load database
        self.load_database()
    
    def load_database(self):
        """Load database berkas dari JSON"""
        if self.database_file.exists():
            try:
                with open(self.database_file, 'r', encoding='utf-8') as f:
                    self.database = json.load(f)
            except json.JSONDecodeError:
                print("⚠️  Database corrupted, creating new database...")
                self.database = {"berkas": []}
                self.save_database()
        else:
            self.database = {"berkas": []}
            self.save_database()
    
    def save_database(self):
        """Simpan database berkas ke JSON"""
        try:
            with open(self.database_file, 'w', encoding='utf-8') as f:
                json.dump(self.database, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"❌ Gagal menyimpan database: {str(e)}")
    
    def _get_next_id(self):
        """Generate ID berikutnya"""
        if not self.database['berkas']:
            return 1
        return max(berkas['id'] for berkas in self.database['berkas']) + 1
    
    def upload_file(self):
        """Upload file teks Arab"""
        print("\n" + "="*70)
        print("📤 UPLOAD FILE TEKS ARAB")
        print("="*70)
        print("Format file yang didukung: .txt, .json")
        print("Pastikan file menggunakan encoding UTF-8")
        print("="*70)
        
        file_path = input("\nMasukkan path lengkap file: ").strip().strip('"')
        
        if not file_path:
            print("❌ Path file tidak boleh kosong!")
            return
        
        if not os.path.exists(file_path):
            print("❌ File tidak ditemukan!")
            return
        
        if not os.path.isfile(file_path):
            print("❌ Path bukan file yang valid!")
            return
        
        # Validasi ekstensi file
        if not file_path.lower().endswith(('.txt', '.json')):
            print("❌ Format file tidak didukung! Gunakan .txt atau .json")
            return
        
        # Metadata file
        print("\n📝 Masukkan informasi file:")
        judul = input("Judul/Nama Kitab: ").strip()
        if not judul:
            print("❌ Judul wajib diisi!")
            return
        
        kategori = input("Kategori (nahwu/sharaf/fiqih/aqidah/lainnya): ").strip().lower()
        tingkat = input("Tingkat (pemula/menengah/lanjut): ").strip().lower()
        deskripsi = input("Deskripsi singkat: ").strip()
        
        # Copy file ke folder uploads
        file_name = os.path.basename(file_path)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        new_file_name = f"{timestamp}_{file_name}"
        dest_path = self.uploads_dir / new_file_name
        
        try:
            shutil.copy2(file_path, dest_path)
            
            # Baca konten file
            with open(dest_path, 'r', encoding='utf-8') as f:
                konten = f.read()
            
            # Simpan metadata ke database
            file_id = self._get_next_id()
            metadata = {
                "id": file_id,
                "judul": judul,
                "kategori": kategori if kategori in ['nahwu', 'sharaf', 'fiqih', 'aqidah'] else "lainnya",
                "tingkat": tingkat if tingkat in ['pemula', 'menengah', 'lanjut'] else "pemula",
                "deskripsi": deskripsi,
                "file_name": new_file_name,
                "file_path": str(dest_path),
                "upload_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "size_bytes": os.path.getsize(dest_path),
                "jumlah_karakter": len(konten)
            }
            
            self.database['berkas'].append(metadata)
            self.save_database()
            
            print(f"\n✅ File berhasil diupload!")
            print(f"   📋 ID: {file_id}")
            print(f"   📖 Nama: {judul}")
            print(f"   💾 Ukuran: {metadata['size_bytes']} bytes")
            print(f"   📝 Karakter: {metadata['jumlah_karakter']}")
        
        except UnicodeDecodeError:
            print("❌ File tidak menggunakan encoding UTF-8!")
            if dest_path.exists():
                dest_path.unlink()
        except Exception as e:
            print(f"❌ Gagal mengupload file: {str(e)}")
            if dest_path.exists():
                dest_path.unlink()
    
    def lihat_daftar(self):
        """Lihat daftar semua berkas"""
        if not self.database['berkas']:
            print("\n📭 Belum ada berkas yang diupload.")
            return
        
        print("\n" + "="*70)
        print("📚 DAFTAR BERKAS PEMBELAJARAN")
        print("="*70)
        
        for berkas in self.database['berkas']:
            print(f"\n📌 ID: {berkas['id']}")
            print(f"   📖 Judul: {berkas['judul']}")
            print(f"   📁 Kategori: {berkas['kategori'].upper()}")
            print(f"   📊 Tingkat: {berkas['tingkat'].title()}")
            print(f"   📝 Deskripsi: {berkas['deskripsi']}")
            print(f"   📅 Upload: {berkas['upload_date']}")
            print(f"   💾 Ukuran: {berkas['size_bytes']} bytes ({berkas['jumlah_karakter']} karakter)")
            print("-"*70)
    
    def baca_berkas(self):
        """Baca isi berkas"""
        if not self.database['berkas']:
            print("\n📭 Belum ada berkas yang diupload.")
            return
        
        self.lihat_daftar()
        
        try:
            file_id_input = input("\n🔢 Masukkan ID berkas yang ingin dibaca: ").strip()
            if not file_id_input:
                print("❌ ID tidak boleh kosong!")
                return
            
            file_id = int(file_id_input)
            
            berkas = next((b for b in self.database['berkas'] if b['id'] == file_id), None)
            
            if not berkas:
                print("❌ Berkas tidak ditemukan!")
                return
            
            file_path = Path(berkas['file_path'])
            
            if not file_path.exists():
                print("❌ File tidak ditemukan di sistem!")
                print("ℹ️  File mungkin telah dipindahkan atau dihapus")
                return
            
            with open(file_path, 'r', encoding='utf-8') as f:
                konten = f.read()
            
            print("\n" + "="*70)
            print(f"📖 {berkas['judul']}")
            print("="*70)
            print(konten)
            print("="*70)
        
        except ValueError:
            print("❌ ID harus berupa angka!")
        except Exception as e:
            print(f"❌ Gagal membaca file: {str(e)}")
    
    def copy_teks_arab(self):
        """Copy teks Arab untuk digunakan"""
        if not self.database['berkas']:
            print("\n📭 Belum ada berkas yang diupload.")
            return
        
        self.lihat_daftar()
        
        try:
            file_id_input = input("\n🔢 Masukkan ID berkas: ").strip()
            if not file_id_input:
                print("❌ ID tidak boleh kosong!")
                return
            
            file_id = int(file_id_input)
            
            berkas = next((b for b in self.database['berkas'] if b['id'] == file_id), None)
            
            if not berkas:
                print("❌ Berkas tidak ditemukan!")
                return
            
            file_path = Path(berkas['file_path'])
            
            if not file_path.exists():
                print("❌ File tidak ditemukan di sistem!")
                return
            
            with open(file_path, 'r', encoding='utf-8') as f:
                konten = f.read()
            
            print("\n" + "="*70)
            print("📋 TEKS ARAB (Siap di-copy)")
            print("="*70)
            print(konten)
            print("="*70)
            
            # Coba copy ke clipboard jika pyperclip tersedia
            if PYPERCLIP_AVAILABLE:
                try:
                    pyperclip.copy(konten)
                    print("\n✅ Teks telah disalin ke clipboard!")
                except Exception as e:
                    print(f"\n⚠️  Gagal menyalin ke clipboard: {str(e)}")
                    print("💡 Tip: Blok teks di atas dan copy (Ctrl+C)")
            else:
                print("\n💡 Tip: Blok teks di atas dan copy (Ctrl+C)")
                print("ℹ️  Install 'pyperclip' untuk auto-copy: pip install pyperclip")
        
        except ValueError:
            print("❌ ID harus berupa angka!")
        except Exception as e:
            print(f"❌ Gagal: {str(e)}")
    
    def hapus_berkas(self):
        """Hapus berkas"""
        if not self.database['berkas']:
            print("\n📭 Belum ada berkas untuk dihapus.")
            return
        
        self.lihat_daftar()
        
        try:
            file_id_input = input("\n🔢 Masukkan ID berkas yang akan dihapus: ").strip()
            if not file_id_input:
                print("❌ ID tidak boleh kosong!")
                return
            
            file_id = int(file_id_input)
            berkas = next((b for b in self.database['berkas'] if b['id'] == file_id), None)
            
            if not berkas:
                print("❌ Berkas tidak ditemukan!")
                return
            
            konfirmasi = input(f"⚠️  Hapus '{berkas['judul']}'? (y/n): ").strip().lower()
            
            if konfirmasi == 'y':
                # Hapus file fisik
                file_path = Path(berkas['file_path'])
                if file_path.exists():
                    try:
                        file_path.unlink()
                    except Exception as e:
                        print(f"⚠️  Gagal menghapus file fisik: {str(e)}")
                
                # Hapus dari database
                self.database['berkas'] = [b for b in self.database['berkas'] if b['id'] != file_id]
                # Re-index ID
                for i, berkas in enumerate(self.database['berkas'], start=1):
                    berkas['id'] = i
                self.save_database()
                
                print("✅ Berkas berhasil dihapus!")
            else:
                print("❌ Penghapusan dibatalkan.")
        
        except ValueError:
            print("❌ ID harus berupa angka!")
        except Exception as e:
            print(f"❌ Gagal: {str(e)}")
