# RuangQR — Pembuat QR Code

Aplikasi web statis berbahasa Indonesia untuk membuat QR dari tautan, Wi-Fi, teks, email, nomor telepon, dan lokasi. Warna QR dan latar dapat disesuaikan; hasil bisa diunduh dalam PNG atau SVG. Tidak memerlukan akun, build step, atau backend.

## Cara menggunakan

1. Gunakan bar navigasi bawah untuk membuka **Profil**, **Buat QR**, atau **Hasil QR**.
2. Di tab **Buat QR**, pilih jenis konten dan isi detailnya; atur warna bila perlu.
3. Tekan **Buat QR Code**; aplikasi berpindah ke tab **Hasil QR**. Unduh PNG atau SVG.
4. Tab **Profil** memuat ringkasan aplikasi, kebijakan privasi, dan ketentuan penggunaan.

Buka `index.html` langsung, atau jalankan `python3 -m http.server 8000` dan kunjungi <http://localhost:8000>.

## Instal sebagai aplikasi

RuangQR mendukung instalasi PWA di browser yang kompatibel. Buka situs melalui HTTPS, lalu tekan **Instal**. Jika browser tidak menampilkan prompt otomatis, tombol tersebut memberi petunjuk untuk memasang dari menu browser. Di iPhone/iPad: buka melalui Safari, pilih **Bagikan → Tambahkan ke Layar Utama**.

Service worker menyimpan halaman, generator QR lokal, dan ikon sehingga aplikasi dapat dibuka serta dipakai offline setelah pertama kali dimuat saat online. Tombol **Segarkan** di header memuat ulang aplikasi; data formulir tidak disimpan setelah refresh demi privasi.

## Privasi

QR dibuat sepenuhnya di browser menggunakan pustaka lokal; konten dan warna tidak dikirim ke server. Pustaka QRCode.js disertakan dengan lisensi MIT di `QRCODEJS-LICENSE.txt`.

## Deploy

GitHub Pages memakai branch `main`, folder `/ (root)`. Halaman utama: `index.html`.
