# Mengaktifkan Login Google di RuangQR

Proyek Supabase RuangQR sudah tersedia. Login Google belum dapat berfungsi sampai pemilik menambahkan OAuth Client ID dan Client Secret miliknya sendiri. Simpan secret hanya di dashboard Supabase; jangan taruh di source code, repo publik, atau chat.

## 1. Atur URL aplikasi di Supabase

Buka [Auth URL Configuration](https://supabase.com/dashboard/project/jwgpmtywxcmibduyxwig/auth/url-configuration), lalu atur:

- **Site URL:** `https://twn9-tech.github.io/toolsku-web-app/`
- **Redirect URL allow list:** tambahkan `https://twn9-tech.github.io/toolsku-web-app/`

Gunakan URL persis tersebut untuk produksi. Jika menguji di komputer sendiri, tambahkan URL lokal yang tepat secara terpisah.

## 2. Buat OAuth Client di Google Cloud

1. Buka [Google Auth Platform — Clients](https://console.cloud.google.com/auth/clients) dan pilih proyek Google Cloud milik Anda.
2. Buat **OAuth Client ID** dengan tipe **Web application**.
3. Pada **Authorized JavaScript origins**, tambahkan `https://twn9-tech.github.io`.
4. Pada **Authorized redirect URIs**, tambahkan callback Supabase berikut: `https://jwgpmtywxcmibduyxwig.supabase.co/auth/v1/callback`.
5. Simpan Client ID dan Client Secret yang diberikan Google.

## 3. Aktifkan provider Google di Supabase

Buka [Auth Providers — Google](https://supabase.com/dashboard/project/jwgpmtywxcmibduyxwig/auth/providers?provider=Google), aktifkan Google, lalu masukkan Client ID dan Client Secret dari Google Cloud dan simpan pengaturan.

## 4. Uji

Buka [RuangQR](https://twn9-tech.github.io/toolsku-web-app/), pilih **Profil → Masuk dengan Google**, lalu setujui layar Google. Setelah kembali ke situs, buat QR dan pastikan QR muncul di **Hasil & Riwayat** setelah halaman disegarkan.

Login email tidak memerlukan konfigurasi Google. Supabase dapat mengirim email verifikasi atau pemulihan kata sandi sesuai pengaturan Auth proyek. Untuk penggunaan produksi, tinjau pengaturan pengiriman email dan batas pengirim bawaan Supabase.
