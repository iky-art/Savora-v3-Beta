import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { useTheme } from "../ThemeContext.jsx";
import { useAuth } from "../AuthContext.jsx";
import { resetFinanceData, exportData, importData } from "../storage.js";
import {
  SunIcon,
  MoonIcon,
  UserEditIcon,
  LogoutIcon,
  DownloadIcon,
  UploadIcon,
  LockIcon,
  AlertIcon,
  ShieldIcon,
  GlobeIcon
} from "../components/icons.jsx";

export default function Settings() {

  const { theme, toggleTheme } = useTheme();
  const { session, updateProfile, changePassword, deleteAccount, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(session?.name || "");
  const [savedMsg, setSavedMsg] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [notifOn, setNotifOn] = useState(() => {
    try { return localStorage.getItem("savora-v3-notif") !== "off"; }
    catch { return true; }
  });

  const [currency, setCurrency] = useState(() => {
    try { return localStorage.getItem("savora-v3-currency") || "IDR"; }
    catch { return "IDR"; }
  });

  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem("savora-v3-language") || "id"; }
    catch { return "id"; }
  });

  function toggleNotif() {

    setNotifOn((prev) => {
      const next = !prev;
      try { localStorage.setItem("savora-v3-notif", next ? "on" : "off"); } catch {}
      return next;
    });

  }

  function handleCurrencyChange(e) {
    const value = e.target.value;
    setCurrency(value);
    try { localStorage.setItem("savora-v3-currency", value); } catch {}
  }

  function handleLanguageChange(e) {
    const value = e.target.value;
    setLanguage(value);
    try { localStorage.setItem("savora-v3-language", value); } catch {}
  }

  function handleSaveProfile(e) {

    e.preventDefault();

    updateProfile({ name });

    setSavedMsg("Profil berhasil diperbarui.");

    setTimeout(() => setSavedMsg(""), 2500);

  }

  function handleChangePassword(e) {

    e.preventDefault();
    setPasswordError("");
    setPasswordMsg("");

    if (newPassword.length < 6) {
      setPasswordError("Password baru minimal 6 karakter.");
      return;
    }

    const result = changePassword({ currentPassword, newPassword });

    if (!result.ok) {
      setPasswordError(result.message);
      return;
    }

    setPasswordMsg("Password berhasil diganti.");
    setCurrentPassword("");
    setNewPassword("");

    setTimeout(() => setPasswordMsg(""), 2500);

  }

  function handleExport() {

    const json = exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "savora-data.json";
    a.click();

    URL.revokeObjectURL(url);

  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleImportFile(e) {

    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      const result = importData(reader.result);

      if (result.ok) {
        alert("Data berhasil diimpor. Silakan buka kembali halaman ini.");
      } else {
        alert(result.message);
      }

    };

    reader.readAsText(file);

    e.target.value = "";

  }

  function handleReset() {

    const confirmReset = window.confirm(
      "Yakin ingin menghapus semua data keuangan (transaksi, target, anggaran)? Tindakan ini tidak bisa dibatalkan."
    );

    if (!confirmReset) return;

    resetFinanceData();

    alert("Data keuangan berhasil dihapus.");

  }

  function handleDeleteAccount() {

    const confirmDelete = window.confirm(
      "Yakin ingin menghapus akun ini secara permanen? Semua data akan hilang."
    );

    if (!confirmDelete) return;

    deleteAccount();
    navigate("/");

  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="page">

      <PageHeader title="Settings" subtitle="Atur akun & preferensimu" />

      {isAdmin && (
        <Link to="/app/admin" className="admin-link-banner">
          <ShieldIcon width={18} height={18} />
          <span>Kamu adalah Administrator — buka Admin Panel</span>
        </Link>
      )}

      {/* ==== PROFIL ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Profil</h3>

        <form className="settings-card-form" onSubmit={handleSaveProfile}>

          <div className="form-group">
            <label>Nama</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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

      {/* ==== KEAMANAN ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Keamanan</h3>

        <form className="settings-card-form" onSubmit={handleChangePassword}>

          <div className="form-group">
            <label>Password Saat Ini</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label>Password Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
            />
          </div>

          {passwordError && <p className="auth-error">{passwordError}</p>}
          {passwordMsg && <p className="auth-success">{passwordMsg}</p>}

          <button type="submit" className="btn btn-primary btn-sm">
            <LockIcon width={15} height={15} />
            Ganti Password
          </button>

        </form>

      </div>

      {/* ==== TAMPILAN ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Tampilan</h3>

        <div className="settings-row">

          <div className="settings-row-label">
            <span className="settings-icon">
              {theme === "dark" ? <MoonIcon width={18} height={18} /> : <SunIcon width={18} height={18} />}
            </span>
            <div>
              <p>Mode Tampilan</p>
              <span className="settings-hint">{theme === "dark" ? "Gelap" : "Terang"}</span>
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
              <span className="settings-hint">{notifOn ? "Aktif" : "Nonaktif"}</span>
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

      {/* ==== PREFERENSI ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Preferensi</h3>

        <div className="settings-row">

          <div className="settings-row-label">
            <div>
              <p>Mata Uang</p>
              <span className="settings-hint">Format angka di seluruh aplikasi</span>
            </div>
          </div>

          <select value={currency} onChange={handleCurrencyChange} className="settings-select">
            <option value="IDR">IDR (Rp)</option>
            <option value="USD">USD ($)</option>
          </select>

        </div>

        <div className="settings-row" style={{ marginTop: 10 }}>

          <div className="settings-row-label">
            <span className="settings-icon"><GlobeIcon width={16} height={16} /></span>
            <div>
              <p>Bahasa</p>
              <span className="settings-hint">Bahasa tampilan aplikasi</span>
            </div>
          </div>

          <select value={language} onChange={handleLanguageChange} className="settings-select">
            <option value="id">Indonesia</option>
            <option value="en">English</option>
          </select>

        </div>

      </div>

      {/* ==== DATA ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Data</h3>

        <div className="form-row">

          <button type="button" className="btn btn-outline btn-sm" onClick={handleExport}>
            <DownloadIcon width={15} height={15} />
            Export Data
          </button>

          <button type="button" className="btn btn-outline btn-sm" onClick={handleImportClick}>
            <UploadIcon width={15} height={15} />
            Import Data
          </button>

          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            onChange={handleImportFile}
            style={{ display: "none" }}
          />

        </div>

        <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={handleReset}
          style={{ marginTop: 10 }}
        >
          Reset Data Keuangan
        </button>

      </div>

      {/* ==== TENTANG ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Tentang</h3>

        <div className="about-box">
          <p>Savora — Beta</p>
          <p className="settings-hint">Versi 0.3.0</p>
          <p className="settings-hint" style={{ marginTop: 8 }}>
            Aplikasi pencatat tabungan &amp; keuangan pribadi.
          </p>
        </div>

      </div>

      {/* ==== ZONA BAHAYA ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Zona Berbahaya</h3>

        <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={handleDeleteAccount}
        >
          <AlertIcon width={15} height={15} />
          Hapus Akun Permanen
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
