"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
    >
      {theme === "dark" ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
    </button>
  );
}