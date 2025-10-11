import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useAuth from '@/stores/authStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';
import { Search, MessageSquare, LogOut, MoreVertical } from 'lucide-react';
import { Input } from './ui/input';
import useConversation from '@/stores/conversationStore';
import GroupChatForm from './GroupChat';
import ProfilePicDialog from './ProfilePicDialog';
import { inputDeboucer } from '@/lib/inputDebouncer';
import { ScrollArea } from './ui/scroll-area';
import { api } from '@/lib/axiosConfig';

const Header = () => {
  const { user, logout, setUser } = useAuth();
  const { resetConversation } = useConversation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUsers, setSearchedUser] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleLogoutClick = async () => {
    try {
      await logout();
      setUser(null);
      resetConversation();
      localStorage.removeItem('accessToken');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchUser = async e => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setPopoverOpen(false);
      setSearchedUser([]);
      return;
    }
    try {
      const response = await inputDeboucer(value);
      if (!value || value !== e.target.value.trim()) return;
      setSearchedUser(response);
      setPopoverOpen(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUserClick = async selectedUser => {
    try {
      const response = await api.post('/conversation/direct', {
        participants: [selectedUser._id, user._id],
      });
      console.log(response);
      setPopoverOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="from-primary to-primary/80 rounded-xl bg-gradient-to-br p-2 shadow-sm">
            <MessageSquare className="text-primary-foreground h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">ConnectNow</h1>
        </Link>

        {user ? (
          <>
            {/* Search */}
            <div className="relative ml-4 max-w-md flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search people or conversations..."
                value={searchQuery}
                onChange={handleSearchUser}
                className="border-border/50 bg-muted/50 focus:bg-background focus:border-primary/50 focus:ring-primary/20 h-10 w-full rounded-full pr-4 pl-10 transition-all focus:ring-2"
              />

              {/* Search Results Dropdown */}
              {popoverOpen && (
                <div className="border-border/50 bg-popover animate-in fade-in-0 zoom-in-95 absolute top-full right-0 left-0 mt-2 overflow-y-auto rounded-xl border shadow-xl">
                  <ScrollArea className="max-h-64 rounded-md border">
                    {searchedUsers?.map(user => (
                      <div
                        key={user._id}
                        className="hover:bg-accent flex cursor-pointer items-center gap-3 p-2 transition-colors"
                        onClick={() => handleUserClick(user)}
                      >
                        <Avatar className="h-12 w-12">
                          {user.profile_image ? (
                            <AvatarImage src={user.profile_image} />
                          ) : (
                            <AvatarFallback className="bg-black/10">
                              {user.userName?.[0]?.toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.userName}</p>
                          <p className="text-muted-foreground text-sm">{user.email}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>

            <div className="flex-1"></div>

            {/* User Profile Section */}
            <div className="flex flex-shrink-0 items-center gap-2">
              <div className="border-border/50 bg-muted/30 hover:bg-muted/50 hidden items-center gap-3 rounded-full border py-1 pr-3 pl-1 transition-all md:flex">
                <Avatar className="border-background h-8 w-8 border-2 shadow-sm">
                  <AvatarImage src={user.profile_image_url} className="object-cover" />
                  <AvatarFallback className="from-primary/30 to-primary/20 text-primary bg-gradient-to-br text-sm font-semibold">
                    {user.userName[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="max-w-[120px] truncate text-sm font-medium">{user.userName}</p>
              </div>

              {/* Mobile Avatar */}
              <Avatar className="border-border h-9 w-9 border-2 shadow-sm md:hidden">
                <AvatarImage src={user.profile_image_url} className="object-cover" />
                <AvatarFallback className="from-primary/30 to-primary/20 text-primary bg-gradient-to-br font-semibold">
                  {user.userName[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent h-9 w-9 rounded-full transition-all hover:shadow-sm"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl">
                  <ProfilePicDialog />
                  <GroupChatForm />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogoutClick}
                    className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer rounded-lg"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1"></div>
            <nav className="hidden items-center gap-1 md:flex">
              <a
                className="hover:text-primary hover:bg-accent rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                href="#features"
              >
                Features
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <Link to="/auth/signin">
                <Button variant="ghost" size="sm" className="rounded-full font-medium">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button
                  size="sm"
                  className="rounded-full font-medium shadow-sm transition-all hover:shadow"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
