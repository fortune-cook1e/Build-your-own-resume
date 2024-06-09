import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface SystemState {
  theme: Theme;
}

interface SystemActions {
  setTheme: (theme: Theme) => void;
}

export const useSystemStore = create<SystemState & SystemActions>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'system',
    },
  ),
);
