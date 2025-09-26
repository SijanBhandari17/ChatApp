import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create(set => ({
  user: null,
  login: async userData => {
    return await axios.post('http://localhost:3000/login', userData);
  },
  forgotPassword: async userData => {
    return await axios.post('http://localhost:3000/forgot-password', userData);
  },
  resetPassword: async userData => {
    return await axios.post('http://localhost:3000/reset-password', userData);
  },
}));

const useAuth = () => {
  const { user, login, logout, forgotPassword, resetPassword } = useAuthStore();
  return { user, login, logout, forgotPassword, resetPassword };
};

export default useAuth;
