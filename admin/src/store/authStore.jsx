import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuth: (payload) => {
        set({ isAuthenticated: true, user: payload.user });
        localStorage.setItem('admin-token', payload.token);
      },
      clearAuth: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem('admin-token');
      },
    }),
    {
      name: 'admin-auth',
    },
  ),
);

export default useAuthStore;
