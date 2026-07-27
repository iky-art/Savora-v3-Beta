import { useState, useEffect } from "react";
import DevBanner from "../components/DevBanner.jsx";
import Greeting from "../components/Greeting.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import MenuGrid from "../components/MenuGrid.jsx";
import { useTheme } from "../ThemeContext.jsx";
import { useAuth } from "../AuthContext.jsx";
import { calculateSummary, formatCurrency } from "../storage.js";

export default function Home() {

  const { theme } = useTheme();
  const { session } = useAuth();

  const [summary, setSummary] = useState(calculateSummary);

  useEffect(() => {
    setSummary(calculateSummary());
  }, []);

  const name = session?.name || "Guest";
  const username = session?.email ? session.email.split("@")[0] : "guest";

  return (
    <div className="page">

      <DevBanner />

      <Greeting name={name} />

      <div className="balance-card">
        <p className="settings-hint">Saldo Saat Ini</p>
        <h2 className="savings-summary-value">{formatCurrency(summary.balance)}</h2>

        <div className="balance-mini-row">
          <span>Pemasukan: {formatCurrency(summary.income)}</span>
          <span>Pengeluaran: {formatCurrency(summary.expense)}</span>
        </div>
      </div>

      <ProfileCard
        name={name}
        username={username}
        platform="web"
        theme={theme === "dark" ? "dark" : "light"}
      />

      <MenuGrid />

    </div>
  );

}
