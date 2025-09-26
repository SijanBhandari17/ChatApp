import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create(set => ({
  user: null,
  login: async userData => {
    return await axios.post('http://localhost:3000/login', userData);
  },
}));

const useAuth = () => {
  const { user, login, logout } = useAuthStore();
  return { user, login, logout };
};

export default useAuth;
