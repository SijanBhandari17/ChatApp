import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          <MessageSquare className="text-primary h-6 w-6" />
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
            <Button className="cursor-pointer" variant="ghost" size="sm">
              Sign in
            </Button>
          </div>
          <div>
            <Button className="cursor-pointer" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
