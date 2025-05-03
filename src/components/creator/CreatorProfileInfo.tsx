
import React from "react";
import CreatorBadge from "@/features/creaverse/components/creator/CreatorBadge";

interface CreatorProfileInfoProps {
  displayName: string;
  username: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  description: string;
  isOwner: boolean;
  isFollowing: boolean;
  onSendMessage: () => void;
  onToggleFollow: () => void;
}

const CreatorProfileInfo: React.FC<CreatorProfileInfoProps> = ({
  displayName,
  username,
  tier,
  description,
  isOwner,
  isFollowing,
  onSendMessage,
  onToggleFollow
}) => {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-2 mb-1">
        <h1 className="text-2xl font-bold">{displayName}</h1>
        <CreatorBadge tier={tier} size="md" className="uppercase" />
      </div>
      
      <p className="text-muted-foreground text-sm mb-1">@{username}</p>
      
      <p className="text-sm text-center max-w-md mx-auto mt-3 mb-5">
        {description}
      </p>
      
      {/* Boutons d'action pour les visiteurs */}
      {!isOwner && (
        <div className="flex justify-center gap-3 mb-6">
          <button 
            onClick={onSendMessage} 
            className="bg-white dark:bg-zinc-800 text-black dark:text-white border border-gray-200 dark:border-zinc-700 rounded-full px-6 py-2 flex items-center gap-1 text-sm font-medium"
          >
            Message
          </button>
          
          <button 
            onClick={onToggleFollow} 
            className={`${isFollowing ? 'bg-white dark:bg-zinc-800 text-black dark:text-white border border-gray-200 dark:border-zinc-700' : 'bg-black text-white dark:bg-white dark:text-black'} rounded-full px-6 py-2 flex items-center gap-1 text-sm font-medium`}
          >
            {isFollowing ? 'Abonné' : 'Suivre'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatorProfileInfo;
