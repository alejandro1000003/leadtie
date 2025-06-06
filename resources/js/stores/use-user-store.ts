// src/stores/useUserStore.ts
import { create } from 'zustand';
import { login, logout, getUser } from '../services/auth-service';

type UserContext = {
  name: string;
  email: string;
  token: string | null;
};

type UserStore = {
  user: UserContext | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  setUser: (user: UserContext | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  login: async (email: string, password: string) => {
    try {
      const token = await login(email, password);
      const userData = await getUser();
      set({ user: { ...userData, token } });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    logout();
    set({ user: null });
  },
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const userData = await getUser();
      set({ user: userData });
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
