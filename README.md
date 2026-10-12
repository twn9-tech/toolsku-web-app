# RuangQR — Pembuat QR Code

Situs statis sederhana untuk membuat QR code dari tautan atau teks. Tidak membutuhkan akun, build step, atau backend.

## Cara menggunakan

1. Buka situs GitHub Pages repo.
2. Tempel tautan atau ketik teks pada kolom **Isi QR**.
3. Tekan **Buat QR code**.
4. Setelah pratinjau muncul, tekan **Unduh gambar QR**.

Bisa dijalankan secara lokal dengan membuka `index.html` atau memakai server sederhana:

```bash
python3 -m http.server 8000
```

Lalu buka <http://localhost:8000>.

## Privasi

Gambar QR dibuat melalui layanan eksternal QR Server. Isi yang dimasukkan dikirim ke layanan tersebut untuk membuat gambarnya; jangan gunakan kata sandi atau data rahasia.

## Deploy

GitHub Pages memakai branch `main`, folder `/ (root)`. File halaman utama adalah `index.html`.
