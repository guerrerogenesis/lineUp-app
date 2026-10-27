import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";
const THEME_COLORS = { light: "#F4F3F8", dark: "#121229" };

function initialTheme() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // sin acceso a localStorage
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Tema claro / oscuro con la clase `dark` en <html> (Tailwind darkMode: "class"). */
export function useTheme() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // sin persistencia
    }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((current) => (current === "dark" ? "light" : "dark")), []);

  return { theme, isDark: theme === "dark", toggleTheme };
}
