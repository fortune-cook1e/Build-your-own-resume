import { UserEntity } from '@/types/entity/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: UserEntity | null;
}

interface UserActions {
  setUser: (user: UserEntity | null) => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: 'user' },
  ),
);
