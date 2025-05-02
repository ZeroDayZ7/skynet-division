'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function useThemeManager() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;

    const resolved =
      t === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : t;

    root.classList.remove('light', 'dark');
    root.classList.add(resolved);

    // 🧠 Zapisz WSZYSTKO, także "system"
    localStorage.setItem('theme', t);
    setThemeState(t);
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const initial: Theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    applyTheme(initial);

    const systemPref = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    systemPref.addEventListener('change', handler);
    setMounted(true);

    return () => systemPref.removeEventListener('change', handler);
  }, []);

  const setTheme = (t: Theme) => {
    applyTheme(t);
  };

  return {
    mounted,
    resolvedTheme: theme,
    setTheme,
  };
}
