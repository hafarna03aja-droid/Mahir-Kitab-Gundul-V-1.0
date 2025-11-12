"""Simple HTTP server untuk preview berkas"""
import http.server
import socketserver
import os
from pathlib import Path

PORT = 8000
DIRECTORY = "data/berkas/previews"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    """Start server untuk preview"""
    # Pastikan direktori ada
    Path(DIRECTORY).mkdir(parents=True, exist_ok=True)
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("="*70)
        print(f"🌐 SERVER PREVIEW BERKAS")
        print("="*70)
        print(f"✅ Server berjalan di: http://localhost:{PORT}")
        print(f"📁 Directory: {Path(DIRECTORY).absolute()}")
        print()
        print("📋 Daftar preview yang tersedia:")
        
        preview_dir = Path(DIRECTORY)
        if preview_dir.exists():
            html_files = list(preview_dir.glob("*.html"))
            if html_files:
                for i, file in enumerate(html_files, 1):
                    print(f"   {i}. http://localhost:{PORT}/{file.name}")
            else:
                print("   (Belum ada file preview)")
        
        print()
        print("💡 Tips:")
        print("   - Buka URL di browser")
        print("   - Tekan Ctrl+C untuk stop server")
        print("   - Jalankan python main.py untuk upload berkas baru")
        print("="*70)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server dihentikan")

if __name__ == "__main__":
    start_server()
