import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import { Button } from './ui/button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema } from '@/lib/validator';
import axios from 'axios';
import { cn } from '@/lib/utils';
import useAuth from '@/stores/authStore';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupFormSchema) });

  const onSubmit = async data => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        userName: data.userName,
        email: data.email,
        password: data.confirmPassword,
      });
      console.log(response);
      navigate('/auth/otp', { state: { email: data.email } });
    } catch (err) {
      if (err.response?.status == 409) {
        setServerError(err.response.data.error);
      }
      console.log(err);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Create account</CardTitle>
        <CardDescription className="text-center">
          Join ConnectNow and start connecting with others
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="userName">User Name</Label>
            <div className="relative">
              <User className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="userName"
                type="text"
                placeholder="User name"
                className={
                  errors.userName
                    ? cn('bg-muted-foreground/10 border-red-500 pl-10')
                    : cn('bg-muted-foreground/10 pl-10')
                }
                {...register('userName')}
              />
              {errors.userName && <p className="text-sm text-red-600">{errors.userName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="email"
                type="email"
                className={
                  errors.email || serverError
                    ? cn('bg-muted-foreground/10 border-red-500 pl-10')
                    : cn('bg-muted-foreground/10 pl-10')
                }
                placeholder="Email"
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              {serverError && <p className="text-sm text-red-600">{serverError}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className={
                  errors.password
                    ? cn('bg-muted-foreground/10 border-red-500 pr-10 pl-10')
                    : cn('bg-muted-foreground/10 pr-10 pl-10')
                }
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground absolute top-3 right-3"
              >
                {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className={
                  errors.confirmPassword
                    ? cn('bg-muted-foreground/10 border-red-500 pr-10 pl-10')
                    : cn('bg-muted-foreground/10 pr-10 pl-10')
                }
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground absolute top-3 right-3"
              >
                {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
