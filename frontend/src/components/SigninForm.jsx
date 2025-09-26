import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import useAuth from '@/stores/authStore';
import { cn } from '@/lib/utils';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signinDisabled, setSigninDisabled] = useState(true);
  const { login } = useAuth();

  const handleSigninFormSubmit = async e => {
    e.preventDefault();
    setError('');

    const data = { email, password };
    try {
      const response = await login(data);
    } catch (err) {
      const errorData = err.response?.data.error;
      if (errorData?.msg) {
        setError('Incorrect email or password');
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
        <form onSubmit={e => handleSigninFormSubmit(e)}>
          <div className="space-y-2">
            <div className="space-y-2">
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  className={
                    error
                      ? cn('bg-muted-foreground/10 border-red-500 pl-10')
                      : cn('bg-muted-foreground/10 pl-10')
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  className={
                    error
                      ? cn('bg-muted-foreground/10 border-red-500 pl-10')
                      : cn('bg-muted-foreground/10 pl-10')
                  }
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="text-muted-foreground absolute top-3 right-3 h-4 w-4"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>
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
          <Button className="w-full" size="lg" disabled={email == '' || password == ''}>
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
