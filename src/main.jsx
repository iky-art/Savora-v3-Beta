import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* ==========================================
   PWA - SERVICE WORKER REGISTRATION
   Hanya aktif di build production (npm run build
   + preview/deploy). Di mode dev (npm run dev)
   TIDAK didaftarkan supaya tidak nge-cache versi
   lama saat sedang development.
========================================== */

if ("serviceWorker" in navigator && import.meta.env.PROD) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => {
        console.warn("Service worker gagal didaftarkan:", err);
      });

  });

}
