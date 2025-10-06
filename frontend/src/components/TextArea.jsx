import { useEffect, useRef, useState } from 'react';
import { Check, CheckCheck, MessageSquare } from 'lucide-react';
import useConversation from '@/stores/conversationStore';
import useAuth from '@/stores/authStore';
import LoadingScreen from './Loading';

const TextArea = () => {
  const containerRef = useRef(null);
  const { selectedConversation, getSelectedConversationMessages } = useConversation();
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const limit = 50;

  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await getSelectedConversationMessages({
          c_id: selectedConversation._id,
          page: 1,
          limit,
        });
        setMessages(response.data.body);
        setCurrentPage(1);
        setHasNextPage(response.data.pagination.hasNextPage);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    const container = containerRef.current;

    if (!hasNextPage || !container) return;

    console.log(container?.scrollTop === 0);

    if (container?.scrollTop === 0) return;

    const fetchMoreMessages = async () => {
      try {
        const response = await getSelectedConversationMessages({
          c_id: selectedConversation._id,
          page: currentPage + 1,
          limit: 50,
        });
        setMessages(prev => [...response.data.body, ...prev]);
        setHasNextPage(response.data.pagination.hasNextPage);
        setCurrentPage(prev => prev + 1);
      } catch (err) {
        console.log(err);
      } finally {
        setHasNextPage(false);
      }
    };

    const handleScroll = () => {
      console.log('scrolling');
      if (container.scrollTop === 0) {
        console.log('Top reached');
        fetchMoreMessages();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [selectedConversation]);

  useEffect(() => {
    if (messages.length > 0 && currentPage === 1) {
      const container = containerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [selectedConversation, currentPage]);

  if (loading) return <LoadingScreen className="items-center justify-center" />;

  if (messages.length === 0) {
    return (
      <div className="bg-muted/20 flex flex-1 items-center justify-center">
        <div className="text-center">
          <MessageSquare className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h3 className="mb-2 text-lg">Start your conversation</h3>
          <p className="text-muted-foreground">Send a message to get the conversation started!</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-muted/20 flex-1 overflow-y-auto p-4">
      <div className="mx-auto max-w-4xl space-y-4">
        {messages.map(message => {
          return (
            <div
              key={message._id}
              className={`flex gap-2 ${message.sender_id === user._id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-[70%] flex-col ${message.sender_id === user._id ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender_id === user._id
                      ? 'bg-primary text-primary-foreground'
                      : 'border-border bg-card border'
                  }`}
                >
                  <p className="break-words">{message.content}</p>
                </div>

                <div className="mt-1 flex items-center gap-1 px-3">
                  <span className="text-muted-foreground text-xs">
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : message.timestamp}
                  </span>
                  {message.sender_id === user._id &&
                    (message.isRead ? (
                      <CheckCheck className="h-3 w-3 text-blue-500" />
                    ) : (
                      <Check className="text-muted-foreground h-3 w-3" />
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextArea;
