# ToolsKu — Alat Online Gratis

Aplikasi web statis berbahasa Indonesia berisi enam alat praktis: penghitung kata, pembuat QR code, generator password, kalkulator, konverter satuan, dan kalkulator diskon.

## Menjalankan secara lokal

Tidak memerlukan instalasi dependency atau build step. Buka `index.html` langsung di browser, atau jalankan server lokal:

```bash
python3 -m http.server 8000
```

Lalu buka <http://localhost:8000>.

## Fitur

- **Penghitung kata** — menghitung kata, karakter, dan estimasi waktu baca; salin/bersihkan teks.
- **Pembuat QR Code** — membuat QR dari teks/URL melalui layanan eksternal QR Server. Jangan masukkan data rahasia.
- **Generator password** — panjang 8–40 karakter dengan opsi huruf besar/kecil, angka, dan simbol.
- **Kalkulator** — operasi aritmetika dasar dengan pemeriksaan input.
- **Konverter satuan** — panjang, berat, dan suhu.
- **Kalkulator diskon** — harga akhir dan jumlah penghematan dalam Rupiah.
- Desain responsif untuk desktop dan ponsel; tidak memerlukan akun/backend.

## Deploy ke GitHub Pages

1. Buka **Settings → Pages** pada repo.
2. Pada **Build and deployment**, pilih **Deploy from a branch**.
3. Pilih branch `main` dan folder `/ (root)`, lalu **Save**.
4. Setelah proses deployment selesai, situs tersedia di URL GitHub Pages yang ditampilkan di halaman tersebut.

## Catatan privasi

Fitur utama berjalan di browser. Fitur QR mengirimkan teks/URL yang dimasukkan ke `api.qrserver.com` untuk menghasilkan gambar. Jangan gunakan untuk informasi sensitif.

## Lisensi

Belum ditentukan. Tambahkan file lisensi jika ingin menetapkan ketentuan penggunaan kode.
