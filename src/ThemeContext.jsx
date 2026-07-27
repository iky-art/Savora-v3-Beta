import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "savora-theme";

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(() => {

    try {
      return localStorage.getItem(STORAGE_KEY) || "dark";
    } catch {
      return "dark";
    }

  });

  useEffect(() => {

    document.body.classList.toggle("light", theme === "light");

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* localStorage tidak tersedia, abaikan */
    }

  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );

}

export function useTheme() {
  return useContext(ThemeContext);
}
