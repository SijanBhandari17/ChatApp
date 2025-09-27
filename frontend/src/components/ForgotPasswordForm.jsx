import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Link } from 'react-router-dom';
import useAuth from '@/stores/authStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { emailCheckSchema } from '@/lib/validator';

const ForgotPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(emailCheckSchema),
  });

  const handleResetLink = async data => {
    try {
      const response = await forgotPassword({ email: data.email });
      console.log(response);
      setIsSubmitted(true);
    } catch (err) {
      const errorData = err.response?.data.message;
      console.log(err);
    }
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Email sent!</CardTitle>
          <CardDescription className="text-center">
            If the email exits in our system , an email is sent to {getValues('email')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <Link to="/auth/signin">
              <Button variant="link" className="text-sm">
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Forgot password?</CardTitle>
        <CardDescription className="text-center">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(handleResetLink)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className={
                  errors.password
                    ? cn('bg-muted-foreground/10 border-red-500 pl-10')
                    : cn('bg-muted-foreground/10 pl-10')
                }
                {...register('email')}
                required
              />
              {errors.password && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          <Button className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <Link to="/auth/signin">
            <Button variant="link" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
