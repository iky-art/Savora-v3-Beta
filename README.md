# Savora v3

Aplikasi pencatat tabungan & keuangan pribadi — dibangun dengan **React (JSX) + Vite**.

## ✨ Fitur

- 🔐 Register & Login (session tersimpan lokal di browser)
- 🏠 Dashboard — sapaan real-time & ringkasan saldo
- 💸 Transaksi — catat pemasukan, pengeluaran, tabungan
- 🐷 Tabungan — fokus pantau semua setoran tabunganmu
- 🎯 Target Tabungan — dengan progress bar otomatis
- 📊 Analitik — statistik keuangan & insight sederhana
- ⚙️ Settings — edit profil, dark/light mode, notifikasi, mata uang, reset data, logout
- 📱 Responsive — nyaman di HP maupun desktop
- ⚡ PWA — bisa di-install ke homescreen & jalan offline

## 🛠️ Tech Stack

- ⚛️ React 18
- ⚡ Vite
- 🧭 React Router (HashRouter)
- Vanilla CSS (dark/light theme via CSS variables)

## 📂 Struktur

```
savora-v3/
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── pages/          # Landing, Login, Register, Home, Transactions,
│   │                     Savings, Goals, Analytics, Settings
│   ├── components/      # ProfileCard, MenuGrid, PageHeader, dll
│   ├── AuthContext.jsx  # register/login/logout/session
│   ├── ThemeContext.jsx # dark/light mode
│   ├── storage.js       # data transaksi & target (localStorage)
│   ├── App.jsx           # routing
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Instalasi & Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## 📦 Build Produksi

```bash
npm run build
npm run preview
```

## 📝 Catatan

- Data disimpan lokal di browser (`localStorage`) — belum terhubung ke server/database.
- Fitur AI Assistant sebelumnya **sudah dihapus** dan digantikan fitur keuangan (Transaksi, Tabungan, Target, Analitik).
