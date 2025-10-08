import { Button } from './ui/button';
import { Paperclip, Send, Smile } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import useConversation from '@/stores/conversationStore';
import useAuth from '@/stores/authStore';

const MessageInput = ({ setMessage }) => {
  const { selectedConversation, sendDirectMessage, updateConversations } = useConversation();
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState('');

  const handleMessageSend = async () => {
    if (!inputMessage.trim()) return;
    try {
      const response = await sendDirectMessage({
        conversation_id: selectedConversation._id,
        sender_id: user._id,
        content: inputMessage.trim(),
        message_type: 'text',
      });
      setMessage(prev => [...prev, response.data.body]);
      updateConversations(selectedConversation._id, response.data.body);
      setInputMessage('');
      console.log(response.data.body);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-border bg-card w-full flex-shrink-0 border-t p-4">
      <div className="mx-auto flex max-w-4xl items-end gap-2">
        <Button variant="ghost" size="sm" className="flex-shrink-0">
          <Paperclip className="h-4 w-4" />
        </Button>

        <div className="relative flex-1">
          <Textarea
            placeholder="Type a message..."
            className="pr-10"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
          />
          <Button variant="ghost" size="sm" className="absolute top-1/2 right-1 -translate-y-1/2">
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleMessageSend}
          className="flex-shrink-0"
          disabled={inputMessage.length === 0}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
