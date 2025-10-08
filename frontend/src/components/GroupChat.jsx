import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Users, X } from 'lucide-react';
import { useState } from 'react';
import { inputDeboucer } from '@/lib/inputDebouncer';
import { ScrollArea } from './ui/scroll-area';
import { api } from '@/lib/axiosConfig';
import useAuth from '@/stores/authStore';
import useConversation from '@/stores/conversationStore';

const GroupChatForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUsers, setSearchedUser] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [groupTitle, setGroupTitle] = useState('');
  const { setConversations, conversations } = useConversation();
  const { user } = useAuth();

  const handleSearchUser = async e => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) return;
    try {
      const response = await inputDeboucer(searchQuery);
      setSearchedUser(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUserToGroup = user => {
    if (!addedUsers.find(u => u._id === user._id)) {
      setAddedUsers(prev => [...prev, user]);
      setSearchQuery('');
      setSearchedUser([]);
    }
  };

  const handleRemoveUser = userId => {
    setAddedUsers(prev => prev.filter(user => user._id !== userId));
  };

  const handleCancel = () => {
    setSearchedUser([]);
    setAddedUsers([]);
    setSearchQuery('');
  };

  const handleCreateGroup = async () => {
    const participants = addedUsers.map(user => user._id);
    participants.push(user._id);
    try {
      const response = await api.post('/conversation/create/group', {
        participants,
        created_by: user._id,
        title: groupTitle,
      });
      setConversations([response.data.body, ...conversations]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={e => e.preventDefault()}
          className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          <Users className="mr-2 h-4 w-4" />
          Create Group Chat
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a group chat</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Group name is required. Minimum 3 participants needed.
          </p>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Group Name</Label>
            <Input
              value={groupTitle}
              onChange={e => setGroupTitle(e.target.value)}
              id="title"
              placeholder="Enter group name..."
              required
            />
          </div>
          {/* Added Users Section */}
          {addedUsers?.length > 0 && (
            <div className="grid gap-3">
              <Label>Added Members ({addedUsers.length})</Label>
              <ScrollArea className="max-h-32 rounded-md border p-2">
                <div className="space-y-2">
                  {addedUsers.map(user => (
                    <div
                      key={user._id}
                      className="bg-accent/50 flex items-center gap-3 rounded-md p-2"
                    >
                      <Avatar className="h-10 w-10">
                        {user.profile_image ? (
                          <AvatarImage src={user.profile_image} />
                        ) : (
                          <AvatarFallback className="bg-black/10">
                            {user.userName?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.userName}</p>
                        <p className="text-muted-foreground text-xs">{user.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRemoveUser(user._id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Search Section */}
          <div className="grid gap-3">
            <Label htmlFor="search">Search People</Label>
            <Input
              value={searchQuery}
              onChange={handleSearchUser}
              id="search"
              placeholder="Type a name..."
            />
          </div>

          {/* Search Results */}
          {searchedUsers?.length > 0 && (
            <ScrollArea className="max-h-64 rounded-md border">
              {searchedUsers.map(user => (
                <div
                  key={user._id}
                  className="hover:bg-accent flex cursor-pointer items-center gap-3 p-2 transition-colors"
                  onClick={() => handleAddUserToGroup(user)}
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
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleCreateGroup}
            type="submit"
            disabled={addedUsers.length < 2 || groupTitle.length === 0}
          >
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupChatForm;
