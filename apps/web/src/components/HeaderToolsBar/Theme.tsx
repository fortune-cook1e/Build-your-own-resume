import { Theme as ThemeType, useSystemStore } from '@/store/system';
import { Moon, SunDim } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from 'ui';

const Theme = () => {
  const { toast } = useToast();
  const { setTheme: setNextTheme } = useTheme();
  const theme = useSystemStore((state) => state.theme);
  const setTheme = useSystemStore((state) => state.setTheme);

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

  const onThemeClick = (theme: ThemeType) => {
    setNextTheme(theme);
    setTheme(theme);
    toast({
      title: 'Change theme  successfully',
      description: 'Theme mode is in Beta. Please use with caution',
      duration: 2000,
    });
  };

  useEffect(() => {
    onThemeChange(theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl dark:text-white"
        >
          <SunDim className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onThemeClick('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onThemeClick('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onThemeClick('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Theme;
