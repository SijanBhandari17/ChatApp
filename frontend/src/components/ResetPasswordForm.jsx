import { Eye, EyeOff, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import useAuth from '@/stores/authStore';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const ResetPasswordForm = () => {
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onChangePassword = async data => {
    setServerError('');
    try {
      const response = await resetPassword({ password: data.confirmPassword, token, id });
    } catch (err) {
      const errorData = err.response.data.error[0].msg || err.response.data.error;
      setServerError(errorData);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Reset password</CardTitle>
        <CardDescription className="text-center">
          Create a new password and confirm it to complete the reset
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onChangePassword)}>
          <div className="space-y-2">
            <Label htmlFor="email">New Password</Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="password"
                placeholder="Enter new password"
                className={
                  errors.password || serverError
                    ? cn('bg-muted-foreground/10 border-red-500 pl-10')
                    : cn('bg-muted-foreground/10 pl-10')
                }
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                required
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
                placeholder="Confirm new password"
                className={
                  errors.confirmPassword || serverError
                    ? cn('bg-muted-foreground/10 border-red-500 pl-10')
                    : cn('bg-muted-foreground/10 pl-10')
                }
                {...register('confirmPassword')}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground absolute top-3 right-3"
              >
                {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          {serverError && <p className="mt-1 text-center text-sm text-red-600">{serverError}</p>}
          <Button className="w-full" disabled={isSubmitting} size="lg">
            {isSubmitting ? 'Changing...' : 'Change Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
