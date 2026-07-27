import { useState, useEffect } from "react";

function getGreeting(hour) {

  if (hour >= 4 && hour < 11) {
    return { text: "Selamat Pagi", emoji: "☀️" };
  }

  if (hour >= 11 && hour < 15) {
    return { text: "Selamat Siang", emoji: "🌤️" };
  }

  if (hour >= 15 && hour < 18) {
    return { text: "Selamat Sore", emoji: "🌇" };
  }

  return { text: "Selamat Malam", emoji: "🌙" };

}

function formatTime(date) {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function formatDate(date) {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export default function Greeting({ name }) {

  const [now, setNow] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const { text, emoji } = getGreeting(now.getHours());

  return (
    <div className="greeting">

      <p className="greeting-text">
        {text}, {name} {emoji}
      </p>

      <p className="greeting-clock">{formatTime(now)}</p>

      <p className="greeting-date">{formatDate(now)}</p>

    </div>
  );

}
