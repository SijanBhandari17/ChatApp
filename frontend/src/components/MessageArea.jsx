import { useState } from 'react';
import recentChats from '@/lib/mockChats';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageSquare } from 'lucide-react';
import { Phone, Users, Video } from 'lucide-react';

const MessageArea = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const filteredChats = recentChats.filter(
    chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getInitials = name =>
    name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  const getAvatarBg = type => (type === 'group' ? 'bg-primary' : 'bg-secondary');
  return (
    <div className="flex flex-1 flex-col">
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <div className="border-border border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const chat = recentChats.find(c => c.id === selectedChat);
                  if (!chat) return null;

                  return (
                    <>
                      <Avatar className="h-10 w-10">
                        {chat.avatar ? <AvatarImage src={chat.avatar} /> : null}
                        <AvatarFallback className={getAvatarBg(chat.type)}>
                          {getInitials(chat.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold">{chat.name}</h2>
                        <p className="text-muted-foreground text-sm">
                          {chat.type === 'direct'
                            ? chat.isOnline
                              ? 'Online'
                              : 'Last seen 2h ago'
                            : `${Math.floor(Math.random() * 10) + 3} members`}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="bg-muted/20 flex flex-1 items-center justify-center">
            <div className="text-center">
              <MessageSquare className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
              <h3 className="mb-2 text-lg">Start your conversation</h3>
              <p className="text-muted-foreground">
                Send a message to get the conversation started!
              </p>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-border border-t p-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button>Send</Button>
            </div>
          </div>
        </>
      ) : (
        /* Welcome Screen */
        <div className="bg-muted/20 flex flex-1 items-center justify-center">
          <div className="max-w-md text-center">
            <div className="bg-primary mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full p-6">
              <MessageSquare className="text-primary-foreground h-8 w-8" />
            </div>
            <h2 className="mb-4 text-2xl">Welcome to ConnectNow</h2>
            <p className="text-muted-foreground mb-6">
              Select a conversation from the sidebar to start chatting, or create a new conversation
              to connect with someone new.
            </p>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Start New Chat
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
