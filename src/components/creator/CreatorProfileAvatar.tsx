
import React from "react";
import ProfileAvatar from "@/features/creaverse/components/creator/ProfileAvatar";

interface CreatorProfileAvatarProps {
  image: string;
  displayName: string;
  creatorStatus: "streaming" | "online" | "offline";
  hasStory: boolean;
}

const CreatorProfileAvatar: React.FC<CreatorProfileAvatarProps> = ({
  image,
  displayName,
  creatorStatus,
  hasStory
}) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-300 -z-10 scale-105"></div>
        <ProfileAvatar 
          image={image}
          displayName={displayName}
          size="xl"
          status={creatorStatus}
          hasStory={hasStory}
        />
      </div>
      
      {/* Indicateur de statut en ligne avec texte */}
      <div className="flex items-center gap-2 mt-3">
        <div className={`w-2 h-2 rounded-full ${creatorStatus === 'online' || creatorStatus === 'streaming' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        <span className="text-sm text-muted-foreground">
          {creatorStatus === 'online' ? 'En ligne' : creatorStatus === 'streaming' ? 'En direct' : 'Hors ligne'}
        </span>
      </div>
    </div>
  );
};

export default CreatorProfileAvatar;
