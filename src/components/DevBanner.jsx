import { useState, useEffect } from "react";
import { getAnnouncement } from "../storage.js";

export default function DevBanner() {

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setAnnouncement(getAnnouncement());
  }, []);

  if (announcement) {

    return (
      <div className="dev-banner admin-announcement">
        <span className="dev-banner-icon">📢</span>
        <span>{announcement}</span>
      </div>
    );

  }

  return (
    <div className="dev-banner">
      <span className="dev-banner-icon">⚠️</span>
      <span>
        Savora masih dalam <strong>tahap pengembangan (Beta)</strong> —
        sebagian fitur mungkin masih berubah.
      </span>
    </div>
  );

}
