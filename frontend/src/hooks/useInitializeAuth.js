import { useEffect } from 'react';
import useAuth from '@/stores/authStore';
import { getFromLocalStorage } from '@/lib/saveToLocalStorage';

const useInitializeAuth = () => {
  const { user, setUser, loading, setLoading, initAuth } = useAuth();

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const accessToken = getFromLocalStorage('accessToken');
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
        console.error('Auth initialization failed:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [user, initAuth, setUser, setLoading]);

  return { user, loading };
};

export default useInitializeAuth;
