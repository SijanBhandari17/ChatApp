import { Navigate } from 'react-router-dom';
import LoadingScreen from '@/components/Loading';
import useInitializeAuth from '@/hooks/useInitializeAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useInitializeAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/" replace />;

  return children;
};

export { ProtectedRoute };
