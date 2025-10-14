import { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { format } from 'date-fns';
import useConversation from '@/stores/conversationStore';
import useFilterStore from '@/stores/filterStore';
import { api } from '@/lib/axiosConfig';
import useAuth from '@/stores/authStore';

const SideBar = () => {
  const {
    conversations,
    getConversations,
    setConversations,
    setSelectedConversation,
    selectedConversation,
  } = useConversation();
  const { filteredUser, setFilteredUser } = useFilterStore();
  const { user } = useAuth();

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

  const handleUserClick = async selectedUser => {
    try {
      const response = await api.post('/conversation/direct', {
        participants: [selectedUser._id, user._id],
      });
      setFilteredUser([]);
      setSelectedConversation({ ...response.data.body.conversation, recipient: [selectedUser] });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  if (filteredUser?.length > 0) {
    return (
      <aside className="border-border flex w-80 flex-col overflow-hidden border-r">
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {filteredUser?.map(chat => (
              <div
                key={chat._id}
                onClick={() => handleUserClick(chat)}
                className={`hover:bg-sidebar mb-1 flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                  selectedConversation === chat ? 'bg-sidebar-accent' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    {chat.profile_image_url ? (
                      <AvatarImage className="object-cover" src={chat?.profile_image_url} />
                    ) : null}
                    <AvatarFallback className="bg-black/10">
                      {chat?.userName?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-col items-start">
                    <p className="truncate font-medium">{chat.userName}</p>
                    <p className="text-muted-foreground truncate">{chat.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="border-border flex w-80 flex-col overflow-hidden border-r">
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {conversations?.length > 0 ? (
            <h3 className="text-muted-foreground px-2 py-3 text-sm font-medium">Recent Chats</h3>
          ) : (
            <p className="text-muted-foreground text-center">It's quiet around here</p>
          )}
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
                      ? format(new Date(chat.last_message.createdAt), 'HH:mm')
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
