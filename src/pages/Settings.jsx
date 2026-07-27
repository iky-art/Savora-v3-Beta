import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { useTheme } from "../ThemeContext.jsx";
import { useAuth } from "../AuthContext.jsx";
import { resetFinanceData } from "../storage.js";
import { SunIcon, MoonIcon, UserEditIcon, LogoutIcon } from "../components/icons.jsx";

export default function Settings() {

  const { theme, toggleTheme } = useTheme();
  const { session, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(session?.name || "");
  const [savedMsg, setSavedMsg] = useState("");

  const [notifOn, setNotifOn] = useState(() => {

    try {
      return localStorage.getItem("savora-v3-notif") !== "off";
    } catch {
      return true;
    }

  });

  const [currency, setCurrency] = useState(() => {

    try {
      return localStorage.getItem("savora-v3-currency") || "IDR";
    } catch {
      return "IDR";
    }

  });

  function toggleNotif() {

    setNotifOn((prev) => {

      const next = !prev;

      try {
        localStorage.setItem("savora-v3-notif", next ? "on" : "off");
      } catch {
        /* abaikan */
      }

      return next;

    });

  }

  function handleCurrencyChange(e) {

    const value = e.target.value;

    setCurrency(value);

    try {
      localStorage.setItem("savora-v3-currency", value);
    } catch {
      /* abaikan */
    }

  }

  function handleSaveProfile(e) {

    e.preventDefault();

    updateProfile({ name });

    setSavedMsg("Profil berhasil diperbarui.");

    setTimeout(() => setSavedMsg(""), 2500);

  }

  function handleReset() {

    const confirmReset = window.confirm(
      "Yakin ingin menghapus semua data keuangan (transaksi & target)? Tindakan ini tidak bisa dibatalkan."
    );

    if (!confirmReset) return;

    resetFinanceData();

    alert("Data keuangan berhasil dihapus.");

  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="page">

      <PageHeader title="Settings" subtitle="Atur akun & preferensimu" />

      {/* ==== PROFIL ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Profil</h3>

        <form className="settings-card-form" onSubmit={handleSaveProfile}>

          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={session?.email || ""} disabled />
          </div>

          {savedMsg && <p className="auth-success">{savedMsg}</p>}

          <button type="submit" className="btn btn-primary btn-sm">
            <UserEditIcon width={15} height={15} />
            Simpan Perubahan
          </button>

        </form>

      </div>

      {/* ==== TAMPILAN ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Tampilan</h3>

        <div className="settings-row">

          <div className="settings-row-label">
            <span className="settings-icon">
              {theme === "dark"
                ? <MoonIcon width={18} height={18} />
                : <SunIcon width={18} height={18} />}
            </span>
            <div>
              <p>Mode Tampilan</p>
              <span className="settings-hint">
                {theme === "dark" ? "Gelap" : "Terang"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className={`switch ${theme === "light" ? "switch-on" : ""}`}
            onClick={toggleTheme}
            aria-label="Ganti tema"
          >
            <span className="switch-knob" />
          </button>

        </div>

      </div>

      {/* ==== NOTIFIKASI ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Notifikasi</h3>

        <div className="settings-row">

          <div className="settings-row-label">
            <div>
              <p>Notifikasi Aplikasi</p>
              <span className="settings-hint">
                {notifOn ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className={`switch ${notifOn ? "switch-on" : ""}`}
            onClick={toggleNotif}
            aria-label="Aktifkan notifikasi"
          >
            <span className="switch-knob" />
          </button>

        </div>

      </div>

      {/* ==== PREFERENSI KEUANGAN ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Preferensi Keuangan</h3>

        <div className="settings-row">

          <div className="settings-row-label">
            <div>
              <p>Mata Uang</p>
              <span className="settings-hint">Format angka di seluruh aplikasi</span>
            </div>
          </div>

          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="settings-select"
          >
            <option value="IDR">IDR (Rp)</option>
            <option value="USD">USD ($)</option>
          </select>

        </div>

      </div>

      {/* ==== TENTANG ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Tentang</h3>

        <div className="about-box">
          <p>Savora — Beta</p>
          <p className="settings-hint">Versi 0.2.0</p>
          <p className="settings-hint" style={{ marginTop: 8 }}>
            Aplikasi pencatat tabungan &amp; keuangan pribadi.
          </p>
        </div>

      </div>

      {/* ==== DATA ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Data</h3>

        <button type="button" className="btn btn-danger btn-block" onClick={handleReset}>
          Reset Data Keuangan
        </button>

      </div>

      {/* ==== AKUN ==== */}

      <div className="settings-section">

        <button type="button" className="btn btn-outline btn-block" onClick={handleLogout}>
          <LogoutIcon width={16} height={16} />
          Keluar
        </button>

      </div>

    </div>
  );

}
