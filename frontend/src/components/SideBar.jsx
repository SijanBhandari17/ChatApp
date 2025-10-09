import { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import useConversation from '@/stores/conversationStore';

const SideBar = () => {
  const {
    conversations,
    getConversations,
    setConversations,
    setSelectedConversation,
    selectedConversation,
  } = useConversation();

  useEffect(() => {
    const getUserConversations = async () => {
      try {
        const response = await getConversations();
        setConversations(response.data?.body);
      } catch (err) {
        console.log(err);
      }
    };
    getUserConversations();
  }, [getConversations, setConversations]);

  return (
    <aside className="border-border flex w-80 flex-col overflow-hidden border-r">
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h3 className="text-muted-foreground px-2 py-3 text-sm font-medium">Recent Chats</h3>
          {conversations?.map(chat => (
            <div
              key={chat._id}
              onClick={() => setSelectedConversation(chat)}
              className={`hover:bg-sidebar mb-1 flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                selectedConversation === chat ? 'bg-sidebar-accent' : ''
              }`}
            >
              <div className="relative">
                {chat.conversation_type === 'direct' ? (
                  <>
                    <Avatar className="h-12 w-12">
                      {chat.recipient ? (
                        <AvatarImage
                          className="object-cover"
                          src={chat.recipient[0]?.profile_image_url}
                        />
                      ) : null}
                      <AvatarFallback className="bg-black/10">
                        {chat.recipient[0]?.userName?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="border-background absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 bg-green-500"></div>
                    )}
                  </>
                ) : (
                  <>
                    <Avatar className="h-12 w-12">
                      {chat.recipient ? (
                        <AvatarImage className="object-cover" src={chat.group_image} />
                      ) : null}
                      <AvatarFallback className="bg-black/10">
                        {chat.title?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <p className="truncate font-medium">
                    {chat.title ? chat.title : chat.recipient[0]?.userName}
                  </p>
                  <span className="text-muted-foreground text-xs">
                    {chat.last_message?.createdAt
                      ? formatDistanceToNow(new Date(chat.last_message?.createdAt), {
                          addSuffix: true,
                        })
                      : ''}
                  </span>
                </div>
                <p className="text-muted-foreground truncate text-sm">
                  {chat.last_message?.content
                    ? chat.last_message?.content
                    : chat.last_message?.message_type}
                </p>
              </div>

              {chat.unreadCount > 0 && (
                <Badge variant="default" className="ml-2 h-5 min-w-5 text-xs">
                  {chat.unreadCount}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
