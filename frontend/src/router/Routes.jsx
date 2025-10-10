import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import RouterErrorElement from './ErrorComponent';
import OTPForm from '@/components/OTPForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import AuthForm from '@/components/AuthForm';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import DashBoard from '@/pages/DashboardPage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { useEffect } from 'react';
import { closeConnection, initConnection } from '@/sockets/socketConn';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashBoard />
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorElement />,
  },
  {
    path: '/',
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
    errorElement: <RouterErrorElement />,
  },
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <AuthPage />
      </PublicRoute>
    ),
    children: [
      { path: ':tab', element: <AuthForm /> },
      { path: 'otp', element: <OTPForm /> },
      { path: 'forgotpassword', element: <ForgotPasswordForm /> },
      { path: 'resetpassword', element: <ResetPasswordForm /> },
    ],
    errorElement: <RouterErrorElement />,
  },
]);

export default function App() {
  useEffect(() => {
    initConnection();
    return () => {
      closeConnection();
    };
  }, []);

  return <RouterProvider router={router} />;
}
