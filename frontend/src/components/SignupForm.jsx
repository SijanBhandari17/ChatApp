import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const SignupForm = () => {
  const signupFormSchema = z
    .object({
      email: z.string().trim().normalize().email({ message: 'Invalid email address' }),
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupFormSchema) });

  // const onSubmit = async (data) => {
  //   try{
  //     await
  //   }
  // }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Create account</CardTitle>
        <CardDescription className="text-center">
          Join ConnectNow and start connecting with others
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="bg-muted-foreground/10 pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signupEmail">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="signupEmail"
              type="email"
              placeholder="Enter your email"
              className="bg-muted-foreground/10 pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signupPassword">Password</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="signupPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className="bg-muted-foreground/10 pl-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground absolute top-3 right-3"
            >
              {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
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
              className="bg-muted-foreground/10 pr-10 pl-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-muted-foreground hover:text-foreground absolute top-3 right-3"
            >
              {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Link to="/auth/otp">
          <Button className="w-full" size="lg">
            Create Account
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
