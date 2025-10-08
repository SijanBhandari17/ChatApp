import { Navigate } from 'react-router-dom';
import LoadingScreen from '@/components/Loading';
import useInitializeAuth from '@/hooks/useInitializeAuth';

const PublicRoute = ({ children }) => {
  const { user, loading } = useInitializeAuth();

  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};

export { PublicRoute };
