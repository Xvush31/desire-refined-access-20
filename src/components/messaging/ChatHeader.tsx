
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';

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
  const navigate = useNavigate();
  const textClass = theme === 'light' ? 'text-black' : 'text-white';
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  // Ensure performer has valid displayName and username
  const safeDisplayName = performer?.displayName || "";
  const safeUsername = performer?.username || "";
  
  return (
    <div className={`${bgClass} p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-10`}>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate(`/performer/${performer.id}`)} 
          className={`${textClass} hover:opacity-75`}
        >
          <ArrowLeft size={24} />
        </button>
        <Link to={`/performer/${performer.id}`} className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={performer.image} alt={safeDisplayName} />
            <AvatarFallback>{safeDisplayName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className={`font-medium ${textClass}`}>{safeUsername}</span>
            <span className="text-xs text-gray-500">En ligne</span>
          </div>
        </Link>
      </div>
      <Link to="/" className="hover:opacity-75">
        <Logo />
      </Link>
    </div>
  );
};

export default ChatHeader;
