import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
