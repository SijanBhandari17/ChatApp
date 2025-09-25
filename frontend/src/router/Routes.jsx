import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import RouterErrorElement from './ErrorComponent';
import OTPForm from '@/components/OTPForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import AuthForm from '@/components/AuthForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <RouterErrorElement />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
    children: [
      { path: ':tab', element: <AuthForm /> },
      { path: 'otp', element: <OTPForm /> },
      { path: 'resetpassword', element: <ForgotPasswordForm /> },
    ],
    errorElement: <RouterErrorElement />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
