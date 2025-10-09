import Picker from 'emoji-picker-react';
import { Button } from './ui/button';
import { Paperclip, Send, Smile, X } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useRef, useState } from 'react';
import useConversation from '@/stores/conversationStore';
import useAuth from '@/stores/authStore';
import { Input } from './ui/input';

const MessageInput = ({ setMessage, bottomRef }) => {
  const { selectedConversation, sendDirectMessage, updateConversations } = useConversation();
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleMessageSend = async () => {
    if (!inputMessage.trim() && files.length === 0) return;

    try {
      const formData = new FormData();

      formData.append('conversation_id', selectedConversation._id);
      formData.append('sender_id', user._id);
      formData.append('content', inputMessage);

      files.forEach(file => {
        formData.append('files', file);
      });

      let messageType = 'text';
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

      formData.append('message_type', messageType);
      console.log(formData);

      const response = await sendDirectMessage(formData);
      setMessage(prev => [...prev, response.data.body]);
      updateConversations(selectedConversation._id, response.data.body);

      setInputMessage('');
      setFiles([]);
      setUploading(false);
      setTimeout(() => {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      console.log(response.data.body);
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
