import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MessageSquare, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const ForgotPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  if (isSubmitted) {
    return (
      <div className="bg-muted/30 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <MessageSquare className="text-primary-foreground h-6 w-6" />
              </div>
              <span className="text-2xl font-semibold">ConnectNow</span>
            </div>
            <p className="text-muted-foreground">Check your email for the reset link.</p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">Email sent!</CardTitle>
              <CardDescription className="text-center">
                If the email exits in our system , an email is send to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-center">
                <p className="text-muted-foreground text-sm">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button variant="outline" className="w-full">
                  Send Another Email
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <Button variant="link" className="text-sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="bg-primary rounded-lg p-2">
              <MessageSquare className="text-primary-foreground h-6 w-6" />
            </div>
            <span className="text-2xl font-semibold">ConnectNow</span>
          </div>
          <p className="text-muted-foreground">No worries! We'll send you reset instructions.</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl">Forgot password?</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault();
                setIsSubmitted(true);
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button className="w-full" size="lg">
                {'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center">
              <Button variant="link" className="text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Remember your password?{' '}
          <Button variant="link" className="h-auto px-0 text-sm">
            Sign in here
          </Button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
