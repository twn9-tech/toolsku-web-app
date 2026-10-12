# RuangQR — Pembuat QR Code

Aplikasi web statis berbahasa Indonesia untuk membuat QR dari tautan, Wi-Fi, teks, email, nomor telepon, dan lokasi. Warna QR dan latar dapat disesuaikan; hasil bisa diunduh dalam PNG atau SVG. Tidak memerlukan akun, build step, atau backend.

## Cara menggunakan

1. Pada layar pertama, pilih jenis konten dan isi detail yang diminta.
2. Atur warna QR/latar bila perlu, lalu tekan **Buat QR Code**.
3. Setelah selesai, situs otomatis berpindah ke layar kedua. Unduh PNG atau SVG di sana.
4. Gunakan tab **Isi QR** untuk kembali tanpa menggulir halaman.

Buka `index.html` langsung, atau jalankan `python3 -m http.server 8000` dan kunjungi <http://localhost:8000>.

## Privasi

Konten dan pilihan warna dikirim ke layanan eksternal QR Server untuk menghasilkan gambar. Hindari memasukkan kata sandi, data pribadi, atau informasi sensitif.

## Deploy

GitHub Pages memakai branch `main`, folder `/ (root)`. Halaman utama: `index.html`.
