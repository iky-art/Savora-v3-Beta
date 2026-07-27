import { Link } from "react-router-dom";
import {
  WalletIcon,
  PiggyIcon,
  TargetIcon,
  BudgetIcon,
  ChartIcon,
  GearIcon
} from "../components/icons.jsx";
import InstallButton from "../components/InstallButton.jsx";

const HIGHLIGHTS = [
  {
    Icon: WalletIcon,
    title: "Transaksi",
    desc: "Catat pemasukan dan pengeluaranmu dengan cepat dan rapi."
  },
  {
    Icon: PiggyIcon,
    title: "Tabungan",
    desc: "Pantau semua setoran tabunganmu dalam satu tempat."
  },
  {
    Icon: TargetIcon,
    title: "Target Tabungan",
    desc: "Buat target finansial dan lihat progress pencapaiannya."
  },
  {
    Icon: BudgetIcon,
    title: "Anggaran",
    desc: "Atur batas pengeluaran per kategori supaya tetap terkendali."
  },
  {
    Icon: ChartIcon,
    title: "Analitik",
    desc: "Statistik keuangan otomatis dengan insight sederhana."
  },
  {
    Icon: GearIcon,
    title: "Settings",
    desc: "Atur profil, keamanan, tema, notifikasi, dan preferensimu."
  }
];

export default function Landing() {

  return (
    <div className="landing">

      <header className="landing-nav">
        <div className="landing-brand">
          <span className="landing-logo">S</span>
          <span>Savora</span>
          <span className="badge-beta">Beta</span>
        </div>

        <Link to="/login" className="btn btn-primary btn-sm">
          Masuk
        </Link>
      </header>

      <div className="dev-banner landing-banner">
        <span className="dev-banner-icon">⚠️</span>
        <span>
          Savora masih dalam <strong>tahap pengembangan (Beta)</strong> —
          sebagian fitur mungkin masih berubah dan bug bisa saja muncul.
        </span>
      </div>

      <section className="landing-hero">

        <p className="eyebrow">Khusus Buat Nabung</p>

        <h1>
          Kelola Tabunganmu, <span className="text-gradient">Tanpa Ribet</span>
        </h1>

        <p className="landing-subtitle">
          Savora bantu kamu mencatat transaksi, mengelola tabungan, dan
          mencapai target finansial — sederhana, cepat, dan bisa dipakai
          di mana saja.
        </p>

        <div className="landing-actions">
          <Link to="/register" className="btn btn-primary btn-lg">
            Mulai Sekarang
          </Link>
          <InstallButton />
        </div>

        <p className="landing-login-hint">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>

      </section>

      <section className="landing-features">

        <div className="feature-grid">

          {HIGHLIGHTS.map(({ Icon, title, desc }) => (
            <div key={title} className="feature-card">
              <span className="feature-icon">
                <Icon width={24} height={24} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}

        </div>

      </section>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Savora. Dibuat dengan 💜</p>
      </footer>

    </div>
  );

}
