import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Phone, Users, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SideBar = () => {
  return (
    <div className="border-border flex w-80 flex-col border-r">
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h3 className="text-muted-foreground px-2 py-3 text-sm font-medium">Recent Chats</h3>

          {/* {filteredChats.map(chat => ( */}
          {/*   <div */}
          {/*     key={chat.id} */}
          {/*     onClick={() => setSelectedChat(chat.id)} */}
          {/*     className={`hover:bg-accent flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${ */}
          {/*       selectedChat === chat.id ? 'bg-accent' : '' */}
          {/*     }`} */}
          {/*   > */}
          {/*     <div className="relative"> */}
          {/*       <Avatar className="h-12 w-12"> */}
          {/*         {chat.avatar ? <AvatarImage src={chat.avatar} /> : null} */}
          {/*         <AvatarFallback className={getAvatarBg(chat.type)}> */}
          {/*           {getInitials(chat.name)} */}
          {/*         </AvatarFallback> */}
          {/*       </Avatar> */}
          {/*       {chat.isOnline && chat.type === 'direct' && ( */}
          {/*         <div className="border-background absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 bg-green-500"></div> */}
          {/*       )} */}
          {/*     </div> */}
          {/**/}
          {/*     <div className="min-w-0 flex-1"> */}
          {/*       <div className="mb-1 flex items-center justify-between"> */}
          {/*         <p className="truncate font-medium">{chat.name}</p> */}
          {/*         <span className="text-muted-foreground text-xs">{chat.timestamp}</span> */}
          {/*       </div> */}
          {/*       <p className="text-muted-foreground truncate text-sm">{chat.lastMessage}</p> */}
          {/*     </div> */}
          {/**/}
          {/*     {chat.unreadCount > 0 && ( */}
          {/*       <Badge variant="default" className="ml-2 h-5 min-w-5 text-xs"> */}
          {/*         {chat.unreadCount} */}
          {/*       </Badge> */}
          {/*     )} */}
          {/*   </div> */}
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
