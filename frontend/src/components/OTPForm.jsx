import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '@/stores/authStore';
import { useLocation, useNavigate } from 'react-router-dom';

const OTPForm = () => {
  const [otp, setOtp] = useState('');
  const [resend, setResend] = useState(false);
  const [verifyDisabled, setVerifyDisabled] = useState(false);
  const [error, setError] = useState('');
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email ?? '';

  useEffect(() => {
    if (!email) {
      navigate('/auth/signup', { replace: true });
    }
  }, [email, navigate]);

  const handleOTPSubmit = async () => {
    setVerifyDisabled(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/register/otp', {
        otp,
        email,
      });
      setVerifyDisabled(false);
    } catch (err) {
      if (err.response.data?.error) setError(err.response.data?.error);
      console.log(err);
      setVerifyDisabled(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Verify your email</CardTitle>
        <CardDescription className="text-center">
          We've sent a 6-digit code to your email address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="space-y-4">
          <Label htmlFor="inputOTP" className="block text-center">
            Enter verification code
          </Label>
          <div className="flex justify-center">
            <InputOTP value={otp} maxLength={6} onChange={setOtp} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup className="space-x-2 border-none">
                <InputOTPSlot className="bg-muted-foreground/5" index={0} />
                <InputOTPSlot className="bg-muted-foreground/5" index={1} />
                <InputOTPSlot className="bg-muted-foreground/5" index={2} />
                <InputOTPSlot className="bg-muted-foreground/5" index={3} />
                <InputOTPSlot className="bg-muted-foreground/5" index={4} />
                <InputOTPSlot className="bg-muted-foreground/5" index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex items-center justify-center">
          <Button size="lg" onClick={handleOTPSubmit} className="w-full" disabled={otp.length != 6}>
            Verify Code
          </Button>
        </div>
        <div className="flex items-center justify-center">
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

export default OTPForm;
