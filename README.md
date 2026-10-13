# RuangQR — Pembuat QR Code

Aplikasi web statis berbahasa Indonesia untuk membuat QR dari tautan, Wi-Fi, teks, email, nomor telepon, dan lokasi. QR dibuat di browser dan dapat diunduh sebagai PNG atau SVG. Login opsional dengan Google atau email menambahkan penyimpanan riwayat privat lintas perangkat melalui Supabase.

## Cara menggunakan

1. Buka **Profil** untuk masuk menggunakan Google atau email dan kata sandi, atau pilih buat akun email.
2. Di **Buat QR**, pilih jenis konten, isi detail, lalu atur warna bila diperlukan.
3. Tekan **Buat QR Code**. QR dibuat di perangkat. Jika sudah login, konten dan warna QR juga disimpan ke akun Supabase.
4. Buka **Hasil & Riwayat** untuk mengunduh hasil, memulihkan QR lama, atau menghapus riwayat. Data akun tetap tersedia setelah refresh dan di perangkat lain. Guest hanya memiliki hingga 10 entri sementara selama sesi halaman.

Untuk alasan privasi, riwayat sebelum login tidak otomatis diunggah saat Anda masuk. QR Wi-Fi dapat memuat kata sandi; bila Anda login saat membuatnya, payload tersebut akan tersimpan di akun cloud.

## Menyiapkan Google OAuth

Login Google membutuhkan konfigurasi OAuth milik pemilik proyek. Ikuti [GOOGLE-OAUTH-SETUP.md](./GOOGLE-OAUTH-SETUP.md). Jangan pernah memasukkan Google Client Secret ke kode, GitHub, atau chat.

Login email memakai Supabase Auth. Jika konfirmasi email aktif di proyek Supabase, pengguna baru harus membuka tautan verifikasi yang dikirim ke emailnya.

## Instal sebagai aplikasi

RuangQR mendukung instalasi PWA di browser kompatibel. Buka situs lewat HTTPS, lalu tekan **Instal**. Jika browser tidak menampilkan prompt otomatis, tombol tersebut memberi petunjuk dari menu browser. Di iPhone/iPad: buka lewat Safari, pilih **Bagikan → Tambahkan ke Layar Utama**.

Service worker menyimpan halaman, pustaka QR, dan library autentikasi agar generator QR dapat dibuka offline setelah pemuatan pertama. Login dan sinkronisasi riwayat membutuhkan internet. Tombol **Segarkan** memuat ulang aplikasi.

## Privasi dan keamanan

Tanpa login, isi QR dan riwayat hanya berada sementara di memori browser. Dengan login, payload QR, jenis konten, warna, dan waktu pembuatan dikirim ke proyek Supabase agar riwayat akun tersinkron. Tabel memakai Row Level Security (RLS); pengguna hanya dapat membaca, menambah, dan menghapus entri miliknya sendiri. Tombol hapus meminta konfirmasi sebelum menghapus riwayat akun.

Jangan simpan data yang tidak ingin Anda simpan di cloud. Hapus riwayat cloud dari aplikasi untuk menghapus data yang tersimpan di akun. Pustaka QRCode.js dan Supabase JS dibundel secara lokal dengan lisensinya masing-masing.

## Deploy

GitHub Pages memakai branch `main`, folder `/ (root)`. Halaman utama: `index.html`. Backend Supabase: proyek `ruangqr` (region Singapore). Kunci frontend yang digunakan adalah publishable key; jangan pernah memasukkan service-role key ke berkas publik.
