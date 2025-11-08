import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      clearAuth: () => {
        set({ user: null });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'user-auth',
    },
  ),
);

export default useAuthStore;
