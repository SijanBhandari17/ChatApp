import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';
import SignInForm from './SigninForm';
import SignupForm from './SingupForm';

const AuthForm = () => {
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
        <SignInForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignupForm />
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
