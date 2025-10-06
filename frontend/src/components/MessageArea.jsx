import { Button } from './ui/button';
import { Input } from './ui/input';
import { Paperclip, Send, Smile, Users } from 'lucide-react';
import useConversation from '@/stores/conversationStore';
import ChatHeader from './ChatHeader';
import TextArea from './TextArea';

const MessageArea = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="bg-sidebar-accent/10 flex w-full flex-1 flex-col overflow-hidden">
      {selectedConversation ? (
        <>
          <ChatHeader />
          <TextArea />
          <div className="border-border bg-card w-full flex-shrink-0 border-t p-4">
            <div className="mx-auto flex max-w-4xl items-end gap-2">
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>

              <div className="relative flex-1">
                <Input placeholder="Type a message..." className="pr-10" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1/2 right-1 -translate-y-1/2"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>

              <Button className="flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-muted/20 flex flex-1 items-center justify-center">
          <div className="max-w-md text-center">
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
