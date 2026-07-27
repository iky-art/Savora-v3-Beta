import { Link } from "react-router-dom";
import {
  WalletIcon,
  PiggyIcon,
  TargetIcon,
  ChartIcon,
  GearIcon
} from "./icons.jsx";

const MENU_ITEMS = [
  { key: "transactions", label: "Transaksi", Icon: WalletIcon, to: "/app/transactions" },
  { key: "savings", label: "Tabungan", Icon: PiggyIcon, to: "/app/savings" },
  { key: "goals", label: "Target", Icon: TargetIcon, to: "/app/goals" },
  { key: "analytics", label: "Analitik", Icon: ChartIcon, to: "/app/analytics" },
  { key: "settings", label: "Settings", Icon: GearIcon, to: "/app/settings" }
];

export default function MenuGrid() {

  return (
    <div className="menu-grid">

      {MENU_ITEMS.map(({ key, label, Icon, to }) => (
        <Link key={key} to={to} className="menu-item">
          <span className="menu-icon">
            <Icon width={26} height={26} />
          </span>
          <span className="menu-label">{label}</span>
        </Link>
      ))}

    </div>
  );

}
