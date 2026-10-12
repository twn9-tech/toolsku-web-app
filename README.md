# RuangQR — Pembuat QR Code

Aplikasi web statis berbahasa Indonesia untuk membuat QR dari tautan, Wi-Fi, teks, email, nomor telepon, dan lokasi. Warna QR dan latar dapat disesuaikan; hasil bisa diunduh dalam PNG atau SVG. Tidak memerlukan akun, build step, atau backend.

## Cara menggunakan

1. Pilih jenis konten.
2. Isi detail yang diminta.
3. Atur warna QR/latar bila perlu.
4. Tekan **Buat QR Code**, lalu unduh PNG atau SVG.

Buka `index.html` langsung, atau jalankan `python3 -m http.server 8000` dan kunjungi <http://localhost:8000>.

## Privasi

Konten dan pilihan warna dikirim ke layanan eksternal QR Server untuk menghasilkan gambar. Hindari memasukkan kata sandi, data pribadi, atau informasi sensitif.

## Deploy

GitHub Pages memakai branch `main`, folder `/ (root)`. Halaman utama: `index.html`.
