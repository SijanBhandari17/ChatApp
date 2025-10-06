import { Button } from './ui/button';
import { Users } from 'lucide-react';
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
