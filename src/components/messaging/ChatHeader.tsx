
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from '@/hooks/use-theme';

interface ChatHeaderProps {
  performer: {
    id: number;
    username: string;
    displayName: string;
    image: string;
  };
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ performer }) => {
  const { theme } = useTheme();
  const textClass = theme === 'light' ? 'text-black' : 'text-white';
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  return (
    <div className={`${bgClass} p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-10`}>
      <div className="flex items-center gap-3">
        <Link to={`/performer/${performer.id}`} className={`${textClass} hover:opacity-75`}>
          <ArrowLeft size={24} />
        </Link>
        <Link to={`/performer/${performer.id}`} className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={performer.image} alt={performer.displayName} />
            <AvatarFallback>{performer.displayName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className={`font-medium ${textClass}`}>{performer.username}</span>
            <span className="text-xs text-gray-500">En ligne</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button className={`${textClass} hover:opacity-75`}>
          <Phone size={20} />
        </button>
        <button className={`${textClass} hover:opacity-75`}>
          <Video size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
