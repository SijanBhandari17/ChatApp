import { api } from '@/lib/axiosConfig';
import { create } from 'zustand';

const useAuthStore = create((set, store) => ({
  user: null,
  loading: true,
  setUser: user => set({ user }),

  updateUser: profileLink =>
    set(state => ({
      user: {
        ...state.user,
        profile_image_url: profileLink,
      },
    })),

  setLoading: loading => set({ loading }),

  login: async userData => {
    return await api.post('login', userData, { withCredentials: true });
  },

  forgotPassword: async userData => {
    return await api.post('forgot-password', userData);
  },

  resetPassword: async userData => {
    return await api.post('reset-password', userData);
  },

  logout: async () => {
    return await api.get('logout', { withCredentials: true });
  },

  initAuth: async () => {
    return await api.get('dashboard/user-info');
  },

  resetUser: () => {
    set(store.getInitialState);
  },
}));

const useAuth = () => {
  const {
    user,
    login,
    logout,
    loading,
    forgotPassword,
    resetPassword,
    setUser,
    setLoading,
    initAuth,
    resetUser,
    updateUser,
  } = useAuthStore();
  return {
    user,
    login,
    logout,
    loading,
    forgotPassword,
    resetPassword,
    setUser,
    setLoading,
    initAuth,
    resetUser,
    updateUser,
  };
};

export default useAuth;
