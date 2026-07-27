import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import {
  WalletIcon,
  PiggyIcon,
  TargetIcon,
  ChartIcon,
  BudgetIcon,
  GearIcon,
  ShieldIcon
} from "./icons.jsx";

const MENU_ITEMS = [
  { key: "transactions", label: "Transaksi", Icon: WalletIcon, to: "/app/transactions" },
  { key: "savings", label: "Tabungan", Icon: PiggyIcon, to: "/app/savings" },
  { key: "goals", label: "Target", Icon: TargetIcon, to: "/app/goals" },
  { key: "budget", label: "Anggaran", Icon: BudgetIcon, to: "/app/budget" },
  { key: "analytics", label: "Analitik", Icon: ChartIcon, to: "/app/analytics" },
  { key: "settings", label: "Settings", Icon: GearIcon, to: "/app/settings" }
];

export default function MenuGrid() {

  const { isAdmin } = useAuth();

  const items = isAdmin
    ? [
        ...MENU_ITEMS,
        { key: "admin", label: "Admin", Icon: ShieldIcon, to: "/app/admin" }
      ]
    : MENU_ITEMS;

  return (
    <div className="menu-grid">

      {items.map(({ key, label, Icon, to }) => (
        <Link key={key} to={to} className={`menu-item ${key === "admin" ? "menu-item-admin" : ""}`}>
          <span className="menu-icon">
            <Icon width={26} height={26} />
          </span>
          <span className="menu-label">{label}</span>
        </Link>
      ))}

    </div>
  );

}
