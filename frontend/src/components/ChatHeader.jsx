import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { BellOff, Info, MoreVertical, Trash2 } from 'lucide-react';
import { Phone, Video } from 'lucide-react';
import useConversation from '@/stores/conversationStore';
import { formatRelative } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { getSocket } from '@/sockets/socketConn';
import { useEffect, useState } from 'react';

const CallIcons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        <Phone className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Video className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Info className="mr-2 h-4 w-4" />
            Chat Info
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellOff className="mr-2 h-4 w-4" />
            Mute Notifications
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Chat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ChatHeader = () => {
  const { selectedConversation } = useConversation();
  const [onlineStatus, setOnlineStatus] = useState(false);

  useEffect(() => {
    if (selectedConversation.conversation_type !== 'direct') return;

    const socket = getSocket();
    const recipientId = selectedConversation.recipient?.[0]?._id;
    if (!recipientId) return;

    socket.emit('get-user-status', { userId: recipientId });
    socket.emit('join-conversation', {
      conversationId: selectedConversation._id,
    });

    const handleStatusResponse = data => {
      if (data.userId === recipientId) {
        setOnlineStatus(data.isOnline);
      }
    };

    socket.on('user-status-response', handleStatusResponse);

    return () => {
      socket.off('user-status-response', handleStatusResponse);
    };
  }, [selectedConversation]);
  console.log({ selectedConversation });

  return (
    <div className="border-border w-full flex-shrink-0 border-b p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {selectedConversation?.conversation_type === 'direct' ? (
            <>
              <Avatar className="h-10 w-10">
                {selectedConversation?.recipient ? (
                  <AvatarImage
                    className="object-cover"
                    src={selectedConversation?.recipient[0]?.profile_image_url}
                  />
                ) : null}
                <AvatarFallback>
                  {selectedConversation?.recipient[0]?.userName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{selectedConversation?.recipient?.[0]?.userName}</h2>
                <p className="text-muted-foreground text-sm">
                  {selectedConversation?.conversation_type === 'direct' && onlineStatus
                    ? 'Online'
                    : `Last seen ${formatRelative(
                        new Date(selectedConversation?.recipient[0].last_active_at),
                        new Date(),
                      )}`}
                </p>
              </div>
            </>
          ) : (
            <>
              <Avatar className="h-10 w-10">
                {selectedConversation.recipient ? (
                  <AvatarImage
                    className="object-cover"
                    src={selectedConversation?.recipient?.profile_image}
                  />
                ) : null}
                <AvatarFallback>{selectedConversation?.title?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{selectedConversation.title}</h2>
                <p className="text-muted-foreground text-sm">
                  {selectedConversation.participants?.length} participants
                </p>
              </div>
            </>
          )}
        </div>
        <CallIcons />
      </div>
    </div>
  );
};

export default ChatHeader;
