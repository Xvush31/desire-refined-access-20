import React, { useState } from 'react';
import { Image, Send, DollarSign, Paperclip } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { toast } from 'sonner';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onSendMedia: (file: File) => void;
  onSendTip: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onSendMedia, onSendTip }) => {
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-100' : 'bg-zinc-800';
  const textClass = theme === 'light' ? 'text-black' : 'text-white';

  const handleMediaInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
      if (allowedTypes.includes(file.type)) {
        onSendMedia(file);
      } else {
        toast.error("Format de fichier non supporté");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-inherit">
      <div className={`flex items-center gap-2 ${bgClass} rounded-full p-2`}>
        <label className="cursor-pointer p-2 hover:opacity-75">
          <Image size={24} className={textClass} />
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleMediaInput}
          />
        </label>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message..."
          className={`flex-1 bg-transparent outline-none ${textClass} placeholder:text-gray-500`}
        />
        
        <button 
          type="button"
          onClick={onSendTip}
          className="p-2 hover:opacity-75"
        >
          <DollarSign size={24} className={textClass} />
        </button>
        
        {message && (
          <button type="submit" className="p-2 hover:opacity-75">
            <Send size={24} className={textClass} />
          </button>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
