import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, CheckCheck, MessageSquare } from 'lucide-react';
import useConversation from '@/stores/conversationStore';
import useAuth from '@/stores/authStore';
import MessageAreaSkeleton from './MessageSkeletion';
import { formatRelative } from 'date-fns';
import MessageInput from './MessageInput';

const TextArea = () => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const { selectedConversation, getSelectedConversationMessages } = useConversation();
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shouldAdjustScroll, setShouldAdjustScroll] = useState(false);
  const previousScrollHeightRef = useRef(0);
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

        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: 'auto' });
        }, 100);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    const fetchMoreMessages = async () => {
      previousScrollHeightRef.current = containerRef.current.scrollHeight;

      try {
        const response = await getSelectedConversationMessages({
          c_id: selectedConversation._id,
          page: currentPage + 1,
          limit: 50,
        });
        setMessages(prev => [...response.data.body, ...prev]);
        setHasNextPage(response.data.pagination.hasNextPage);
        setCurrentPage(prev => prev + 1);
        setShouldAdjustScroll(true);
      } catch (err) {
        console.log(err);
      }
    };

    const handleScroll = () => {
      if (containerRef.current.scrollTop === 0 && hasNextPage) {
        fetchMoreMessages();
      }
    };
    const container = containerRef.current;

    if (!container) {
      return;
    }
    container.addEventListener('scroll', handleScroll);
    return () => containerRef.current?.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, messages.length, currentPage]);

  useLayoutEffect(() => {
    if (shouldAdjustScroll && containerRef.current) {
      const newScrollHeight = containerRef.current.scrollHeight;
      const heightDifference = newScrollHeight - previousScrollHeightRef.current;
      containerRef.current.scrollTop = heightDifference;
      setShouldAdjustScroll(false);
    }
  }, [shouldAdjustScroll, messages]);

  if (loading) return <MessageAreaSkeleton />;

  if (messages.length === 0) {
    return (
      <>
        <div className="bg-muted/20 flex flex-1 items-center justify-center">
          <div className="text-center">
            <MessageSquare className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
            <h3 className="mb-2 text-lg">Start your conversation</h3>
            <p className="text-muted-foreground">Send a message to get the conversation started!</p>
          </div>
        </div>
        <MessageInput setMessage={setMessages} />
      </>
    );
  }

  return (
    <>
      <div ref={containerRef} className="bg-muted/20 flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-4xl space-y-4">
          {messages.map(message => {
            const senderName = selectedConversation.recipient?.find(
              u => u._id === message.sender_id,
            );
            return (
              <div
                key={message._id}
                className={`flex gap-2 ${message.sender_id === user._id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-[70%] flex-col ${message.sender_id === user._id ? 'items-end' : 'items-start'}`}
                >
                  {message.content?.length > 0 && (
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender_id === user._id
                          ? 'bg-primary text-primary-foreground'
                          : 'border-border bg-card border'
                      } ${message.attachments?.length > 0 && 'mb-2'}`}
                    >
                      <div>
                        {selectedConversation.conversation_type === 'group' && (
                          <p className="mb-1 text-xs opacity-70">{senderName?.userName}</p>
                        )}
                        <p className="break-words">{message?.content}</p>
                      </div>
                    </div>
                  )}

                  {message.attachments?.length > 0 && (
                    <div className="flex space-x-2">
                      {message.attachments.map((a, i) => {
                        return <img key={i} src={a.url} alt="" className="mb-2 max-h-45" />;
                      })}
                    </div>
                  )}

                  <div className="mt-1 flex items-center gap-1 px-3">
                    <span className="text-muted-foreground text-xs">
                      {message.createdAt
                        ? formatRelative(new Date(message.createdAt), new Date())
                        : ''}
                      {'  '}
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
        <div ref={bottomRef} /> {/* marker */}
      </div>
      <MessageInput setMessage={setMessages} bottomRef={bottomRef} />
    </>
  );
};

export default TextArea;
