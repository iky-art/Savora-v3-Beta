import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { ArrowUpIcon, ArrowDownIcon, PiggyIcon } from "../components/icons.jsx";
import { calculateSummary, formatCurrency } from "../storage.js";

export default function Analytics() {

  const [summary, setSummary] = useState(calculateSummary);

  useEffect(() => {
    setSummary(calculateSummary());
  }, []);

  const max = Math.max(summary.income, summary.expense, summary.saving, 1);

  const bars = [
    { key: "income", label: "Pemasukan", value: summary.income, Icon: ArrowUpIcon, color: "var(--success)" },
    { key: "expense", label: "Pengeluaran", value: summary.expense, Icon: ArrowDownIcon, color: "var(--danger)" },
    { key: "saving", label: "Tabungan", value: summary.saving, Icon: PiggyIcon, color: "var(--accent-1)" }
  ];

  let insight = "Belum ada data transaksi untuk dianalisis.";

  if (summary.income > summary.expense) {
    insight = "Keuangan kamu terlihat sehat — pemasukan lebih besar dari pengeluaran. Pertahankan ya!";
  } else if (summary.expense > summary.income) {
    insight = "Pengeluaran kamu lebih besar dari pemasukan bulan ini. Coba dievaluasi lagi.";
  }

  return (
    <div className="page">

      <PageHeader title="Analitik" subtitle="Statistik keuanganmu" />

      <div className="balance-card">
        <p className="settings-hint">Saldo Saat Ini</p>
        <h2 className="savings-summary-value">{formatCurrency(summary.balance)}</h2>
      </div>

      <div className="analytics-bars">

        {bars.map(({ key, label, value, Icon, color }) => (
          <div key={key} className="analytics-bar-row">

            <span className="settings-icon" style={{ color }}>
              <Icon width={16} height={16} />
            </span>

            <div className="analytics-bar-track-wrap">
              <div className="analytics-bar-top">
                <span>{label}</span>
                <strong>{formatCurrency(value)}</strong>
              </div>

              <div className="analytics-bar-track">
                <div
                  className="analytics-bar-fill"
                  style={{
                    width: `${(value / max) * 100}%`,
                    background: color
                  }}
                />
              </div>
            </div>

          </div>
        ))}

      </div>

      <div className="topic-card" style={{ marginTop: 20 }}>
        <h3>Insight</h3>
        <p>{insight}</p>
      </div>

    </div>
  );

}
