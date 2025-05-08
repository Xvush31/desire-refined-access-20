
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';
import { XDOSE_DOMAIN } from '@/utils/creaverseLinks';

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
  
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = XDOSE_DOMAIN;
  };
  
  return (
    <div className={`${bgClass} p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-10`}>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleProfileClick} 
          className={`${textClass} hover:opacity-75`}
        >
          <ArrowLeft size={24} />
        </button>
        <a href={XDOSE_DOMAIN} className="flex items-center gap-3" onClick={handleProfileClick}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={performer.image} alt={performer.displayName} />
            <AvatarFallback>{performer.displayName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className={`font-medium ${textClass}`}>{performer.username}</span>
            <span className="text-xs text-gray-500">En ligne</span>
          </div>
        </a>
      </div>
      <Link to="/" className="hover:opacity-75">
        <Logo />
      </Link>
    </div>
  );
};

export default ChatHeader;
