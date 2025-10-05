import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import useAuth from '@/stores/authStore';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validator';
import { saveToLocalStroage } from '@/lib/saveToLocalStorage';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const { login, setUser, setLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async data => {
    setServerError('');
    try {
      const response = await login({ email: data.email, password: data.password });
      setUser(response.data.body);
      setLoading(false);
      saveToLocalStroage('accessToken', response.data.accessToken);
      navigate('/dashboard');
    } catch (err) {
      const errorData = err.response?.data.error;
      if (errorData?.msg) {
        console.log(err);
        setServerError(errorData?.msg);
      } else {
        console.error('Unexpected error:', err);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  type="email"
                  id="email"
                  required
                  placeholder="Email"
                  {...register('email')}
                  className={
                    errors.email || serverError
                      ? cn('bg-muted-foreground/10 border-red-500 pl-10')
                      : cn('bg-muted-foreground/10 pl-10')
                  }
                />{' '}
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  className={
                    errors.password || serverError
                      ? cn('bg-muted-foreground/10 border-red-500 pl-10')
                      : cn('bg-muted-foreground/10 pl-10')
                  }
                  placeholder="Password"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="text-muted-foreground absolute top-3 right-3 h-4 w-4"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>
            {serverError && <p className="mt-1 text-sm text-red-600">{serverError}</p>}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Remember me</Label>
              </div>
              <Link to="/auth/forgotpassword">
                <Button variant="link">Forgot Password?</Button>
              </Link>
            </div>
          </div>
          <Button className="w-full" size="lg" disabled={isSubmitting}>
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
