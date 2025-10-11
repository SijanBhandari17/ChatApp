import Picker from 'emoji-picker-react';
import { Button } from './ui/button';
import { Paperclip, Send, Smile, X } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useEffect, useRef, useState } from 'react';
import useConversation from '@/stores/conversationStore';
import useAuth from '@/stores/authStore';
import { Input } from './ui/input';
import { getSocket } from '@/sockets/socketConn';
import { api } from '@/lib/axiosConfig';

const MessageInput = ({ setMessage, bottomRef }) => {
  const { selectedConversation, updateConversations } = useConversation();
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    const handleReceiveMessage = ({ message }) => {
      console.log(message);
      if (message.conversation_id === selectedConversation._id)
        setMessage(prev => [...prev, message]);

      updateConversations(message.conversation_id, message);

      setTimeout(() => {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
    };
  }, [selectedConversation?._id]);

  const handleMessageSend = async () => {
    if (!inputMessage.trim() && files.length === 0) return;

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      let messageType = 'text';
      let attachments;
      if (files.length > 0 && inputMessage.trim()) {
        setUploading(true);
        messageType = 'mixed';
      } else if (files.length > 0) {
        const allPhotos = files.every(file => file.type.startsWith('image/'));
        const allVideos = files.every(file => file.type.startsWith('videos/'));

        setUploading(true);
        if (allPhotos) messageType = 'image';
        else if (allVideos) messageType = 'videos';
        else messageType = 'file';
      }
      if (files.length > 0) {
        try {
          const response = await api.post('messages/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          attachments = response.data?.body;
          console.log(attachments);
        } catch (err) {
          console.log(err);
        }
      }

      const socket = getSocket();
      socket.emit('send-message', {
        conversation_id: selectedConversation._id,
        sender_id: user._id,
        content: inputMessage,
        attachments,
        message_type: messageType,
        participants: selectedConversation.participants,
      });

      setInputMessage('');
      setFiles([]);
      setUploading(false);
      setTimeout(() => {
        console.log(bottomRef);
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
        console.log('sarena');
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  const onEmojiClick = emojiData => {
    setInputMessage(prev => prev + emojiData.emoji);
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    setFiles(prev => [...files, ...prev]);
    console.log(files);
  };
  const handleRemoveFile = fileToRemove => {
    console.log(fileToRemove);
    setFiles(files.filter(file => file !== fileToRemove));
  };

  return (
    <div className="border-border bg-card w-full flex-shrink-0 border-t p-4">
      <div className="relative mx-auto flex max-w-4xl items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0"
        >
          <Paperclip className="h-4 w-4" />
          <Input
            hidden
            ref={fileInputRef}
            accept="image/*,video/*"
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            multiple
          />
        </Button>

        <div className="relative flex-1">
          <div className="mb-4 flex max-h-25 gap-2 overflow-x-auto">
            {files?.length > 0 &&
              files.map((file, i) => {
                const url = URL.createObjectURL(file);
                return (
                  <div key={i} className="relative h-24 w-24 flex-shrink-0">
                    <img
                      src={url}
                      alt="Preview"
                      className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                    <button
                      onClick={() => handleRemoveFile(file)}
                      className="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
          </div>

          <Textarea
            placeholder="Type a message..."
            className="pr-10"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmojis(prev => !prev)}
            className="absolute top-1/2 right-1 -translate-y-1/2"
          >
            <Smile className="h-4 w-4" />
          </Button>

          {showEmojis && (
            <div className="absolute right-0 bottom-full mb-2">
              <Picker
                emojiStyle="google"
                previewConfig={{ showPreview: false }}
                searchDisabled
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}
        </div>

        <Button
          onClick={handleMessageSend}
          className="flex-shrink-0"
          disabled={(inputMessage.length === 0 && files.length === 0) || uploading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
