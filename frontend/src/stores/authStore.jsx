import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create(set => ({
  user: null,

  setUser: user => set({ user }),
  login: async userData => {
    return await axios.post('http://localhost:3000/login', userData, { withCredentials: true });
  },

  forgotPassword: async userData => {
    return await axios.post('http://localhost:3000/forgot-password', userData);
  },

  resetPassword: async userData => {
    return await axios.post('http://localhost:3000/reset-password', userData);
  },
}));

const useAuth = () => {
  const { user, login, logout, forgotPassword, resetPassword, setUser } = useAuthStore();
  return { user, login, logout, forgotPassword, resetPassword, setUser };
};

export default useAuth;
