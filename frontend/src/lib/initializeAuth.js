import { useEffect } from 'react';
import useAuth from '@/stores/authStore';

const useInitializeAuth = () => {
  const { user, setUser, loading, setLoading, initAuth } = useAuth();

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const initializeAuth = async () => {
      setLoading(true);
      try {
        const response = await initAuth();
        setUser(response.data?.body);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, [user, initAuth]);

  return { user, loading };
};

export { useInitializeAuth };
