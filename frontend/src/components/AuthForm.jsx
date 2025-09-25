import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { tab } = useParams();
  const navigate = useNavigate();

  const currentTab = tab === 'signup' ? 'signup' : 'signin';

  return (
    <Tabs value={currentTab} onValueChange={value => navigate(`/auth/${value}`)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      name="email"
                      className="bg-muted-foreground/10 pl-10"
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
                      className="bg-muted-foreground/10 pl-10"
                      name="password"
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
                  <Link to="/auth/resetpassword">
                    <Button variant="link">Forgot Password?</Button>
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
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
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
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
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
