import { Theme as ThemeType, useSystemStore } from '@/store/system';
import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const { setTheme: setNextTheme } = useNextTheme();
  const theme = useSystemStore((state) => state.theme);
  const setTheme = useSystemStore((state) => state.setTheme);
  const [index, setIndex] = useState(0);

  const onThemeChange = (theme: ThemeType) => {
    // two kinds of theme need to be set
    // 1. tailwindcss theme
    // 2. shadcnUi theme

    const isSystem = theme === 'system';
    const isDark = theme === 'dark';
    const systemMatch = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (isDark || (systemMatch && isSystem)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const onThemeSelect = (theme: ThemeType) => {
    setNextTheme(theme);
    setTheme(theme);
  };

  const toggleTheme = () => {
    const themeValues: ThemeType[] = ['light', 'dark'];
    const value = themeValues[index];
    onThemeSelect(value);
    const _index = (index + 1) % themeValues.length;
    setIndex(_index);
  };

  useEffect(() => {
    onThemeChange(theme);
  }, [theme]);

  return {
    onThemeSelect,
    toggleTheme,
  };
};
