import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useAuth from '@/stores/authStore';
import recentChats from '@/lib/mockChats';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';
import {
  Search,
  MessageSquare,
  Settings,
  LogOut,
  MoreVertical,
  Phone,
  Video,
  Users,
} from 'lucide-react';
import { Input } from './ui/input';

const navList = [
  {
    text: 'Features',
    href: '#features',
  },
];

const Header = () => {
  let { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  user = 4;

  return (
    <header className="border-border bg-card flex h-16 items-center gap-4 border-b px-6">
      {/* Logo */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <div className="bg-primary rounded-lg p-2">
          <MessageSquare className="text-primary-foreground h-5 w-5" />
        </div>
        <h1 className="text-xl font-semibold">ConnectNow</h1>
      </div>

      {user ? (
        <>
          {/* Search */}
          <div className="max-w-md flex-1">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                placeholder="Search people or conversations..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1"></div>

          {/* User Profile */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-muted-foreground text-xs">Online</p>
            </div>

            {/* Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <nav className="mr-auto ml-auto flex items-center gap-6">
              {navList.map((item, index) => (
                <a key={index} className="text-sm" href={item.href}>
                  {item.text}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/auth/signin">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
