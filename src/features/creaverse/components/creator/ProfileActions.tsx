
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "@/icons";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileActionsProps {
  isFollowing: boolean;
  onToggleFollow: () => void;
  onSubscribe: () => void;
  onSendMessage: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  isFollowing,
  onToggleFollow,
  onSubscribe,
  onSendMessage
}) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  
  return (
    <div className="flex gap-2 mt-4">
      <Button 
        onClick={onToggleFollow}
        className={`flex-1 ${isFollowing ? 
          'bg-gray-200 hover:bg-gray-300 text-black' : 
          'bg-primary text-primary-foreground'}`}
        size="sm"
      >
        {currentUser ? (isFollowing ? 'Suivi(e)' : 'Suivre') : 'Suivre'}
      </Button>
      <Button 
        onClick={onSubscribe}
        className="flex-1 animated-gradient-bg text-white"
        size="sm"
      >
        S'abonner
      </Button>
      <Button 
        onClick={onSendMessage}
        className={`${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-black' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}
        size="sm"
      >
        <MessageCircle size={18} />
      </Button>
    </div>
  );
};

export default ProfileActions;
