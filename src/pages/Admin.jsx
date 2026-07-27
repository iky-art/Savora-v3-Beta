import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { ShieldIcon, WalletIcon, TargetIcon, BudgetIcon } from "../components/icons.jsx";
import {
  getAppStats,
  getAnnouncement,
  setAnnouncement,
  resetFinanceData,
  formatCurrency
} from "../storage.js";

export default function Admin() {

  const [stats, setStats] = useState(getAppStats);
  const [announcement, setAnnouncementText] = useState(getAnnouncement);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    setStats(getAppStats());
  }, []);

  function handleSaveAnnouncement(e) {

    e.preventDefault();

    setAnnouncement(announcement);

    setSavedMsg("Pengumuman berhasil disimpan.");

    setTimeout(() => setSavedMsg(""), 2500);

  }

  function handleClearAnnouncement() {

    setAnnouncement("");
    setAnnouncementText("");

  }

  function handleWipeAll() {

    const confirmWipe = window.confirm(
      "PERINGATAN: ini akan menghapus SEMUA data keuangan aplikasi (bukan cuma akunmu). Lanjutkan?"
    );

    if (!confirmWipe) return;

    resetFinanceData();

    setStats(getAppStats());

    alert("Semua data keuangan telah dihapus.");

  }

  return (
    <div className="page">

      <PageHeader title="Admin Panel" subtitle="Khusus administrator Savora" />

      <div className="admin-badge">
        <ShieldIcon width={16} height={16} />
        Kamu masuk sebagai Administrator
      </div>

      {/* ==== STATS ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Ringkasan Aplikasi</h3>

        <div className="admin-stats-grid">

          <div className="admin-stat-card">
            <span className="settings-icon"><WalletIcon width={16} height={16} /></span>
            <strong>{stats.totalTransactions}</strong>
            <span className="settings-hint">Transaksi</span>
          </div>

          <div className="admin-stat-card">
            <span className="settings-icon"><TargetIcon width={16} height={16} /></span>
            <strong>{stats.totalGoals}</strong>
            <span className="settings-hint">Target Aktif</span>
          </div>

          <div className="admin-stat-card">
            <span className="settings-icon"><BudgetIcon width={16} height={16} /></span>
            <strong>{stats.totalBudgets}</strong>
            <span className="settings-hint">Anggaran</span>
          </div>

          <div className="admin-stat-card">
            <strong>{stats.storageSizeKB} KB</strong>
            <span className="settings-hint">Ukuran Data</span>
          </div>

        </div>

        <p className="settings-hint" style={{ marginTop: 10 }}>
          Total tersimpan di semua target: {formatCurrency(stats.totalSavedInGoals)}
        </p>

      </div>

      {/* ==== ANNOUNCEMENT ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Pengumuman Banner</h3>

        <form className="settings-card-form" onSubmit={handleSaveAnnouncement}>

          <div className="form-group">
            <label>Teks pengumuman (kosongkan untuk memakai pesan default)</label>
            <textarea
              value={announcement}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Contoh: Maintenance server tanggal 30 Juli, mohon maaf atas ketidaknyamanannya."
              className="admin-textarea"
            />
          </div>

          {savedMsg && <p className="auth-success">{savedMsg}</p>}

          <div className="form-row">
            <button type="submit" className="btn btn-primary btn-sm">
              Simpan Pengumuman
            </button>

            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleClearAnnouncement}
            >
              Hapus Pengumuman
            </button>
          </div>

        </form>

      </div>

      {/* ==== DANGER ZONE ==== */}

      <div className="settings-section">

        <h3 className="settings-title">Zona Berbahaya</h3>

        <button type="button" className="btn btn-danger btn-block" onClick={handleWipeAll}>
          Hapus Semua Data Aplikasi
        </button>

      </div>

    </div>
  );

}
