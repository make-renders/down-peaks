"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Para evitar problemas con la hidratación, se asegura que el componente esté montado
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle theme"
      className="relative flex h-8 w-8 items-center justify-center transition-transform duration-300 ease-in-out "
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* Sol (Light Mode) */}
      <SunIcon
        className={`h-[1.2rem] w-[1.2rem] transition-transform duration-300 ease-in-out ${
          theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      {/* Luna (Dark Mode) */}
      <MoonIcon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ease-in-out ${
          theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        }`}
      />
    </button>
  );
}
