"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wykonaj tylko raz po zamontowaniu komponentu
    const initializeTheme = () => {
      // 1. Sprawdź, czy motyw jest zapisany w localStorage
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        // Jeśli jest zapisany, ustaw go
        setTheme(savedTheme);
      } else {
        // 2. Jeśli nie ma w localStorage, sprawdź preferencje systemowe
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = prefersDark ? "dark" : "light";
        setTheme(initialTheme);
        // Zapisz do localStorage
        localStorage.setItem("theme", initialTheme);
      }

      // Oznacz komponent jako zamontowany
      setMounted(true);
    };

    initializeTheme();
  }, [setTheme]); // setTheme jako zależność, bo pochodzi z useTheme

  // Synchronizuj localStorage przy każdej zmianie motywu
  useEffect(() => {
    if (mounted && theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    // localStorage jest aktualizowane w drugim useEffect
  };

  return (
    <Button onClick={toggleTheme} variant="ghost" size="icon">
      {isDark ? (
        <Sun />
      ) : (
        <Moon />
      )}
      <span className="sr-only">Zmień motyw</span>
    </Button>
  );
}