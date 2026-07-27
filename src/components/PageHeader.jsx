import { Link } from "react-router-dom";
import { BackIcon } from "./icons.jsx";

export default function PageHeader({ title, subtitle }) {

  return (
    <div className="page-header">

      <Link to="/app" className="back-btn" aria-label="Kembali">
        <BackIcon width={20} height={20} />
      </Link>

      <div>
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>

    </div>
  );

}
