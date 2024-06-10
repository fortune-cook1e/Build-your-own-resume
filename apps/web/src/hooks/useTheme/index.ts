import { Theme as ThemeType, useSystemStore } from '@/store/system';
import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useToast } from 'ui';

export const useTheme = () => {
  const { toast } = useToast();
  const { setTheme: setNextTheme } = useNextTheme();
  const theme = useSystemStore((state) => state.theme);
  const setTheme = useSystemStore((state) => state.setTheme);
  const [tipShowed, setTipShowed] = useState(false);
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
    !tipShowed &&
      toast({
        title: 'Change theme  successfully',
        description: 'Theme mode is in Beta. Please use with caution',
        duration: 2000,
      });
    setTipShowed(true);
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
