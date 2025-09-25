import { Outlet } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const AuthPage = () => {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="w-sm space-y-4">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="bg-primary rounded-lg p-2">
            <MessageSquare className="text-primary-foreground h-6 w-6" />
          </div>
          <span className="text-2xl font-semibold">ConnectNow</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
