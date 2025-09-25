import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const navList = [
  {
    text: 'Features',
    href: '#features',
  },
];

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2">
            <MessageSquare className="text-primary-foreground h-4 w-4" />
          </div>
          <h1 className="text-xl font-semibold">ConnectNow</h1>
        </div>
        <nav className="flex items-center gap-6">
          {navList.map((item, index) => {
            return (
              <a key={index} className="text-sm" href={item.href}>
                {item.text}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div>
            <Link to="/auth/signin">
              <Button className="cursor-pointer" variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/auth/signup">
              <Button className="cursor-pointer" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
