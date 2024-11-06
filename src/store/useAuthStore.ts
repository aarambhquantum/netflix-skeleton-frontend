import { create } from 'zustand';
import { User } from '../types/auth';

interface AuthStore {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      set({ user: { username, isAuthenticated: true } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));