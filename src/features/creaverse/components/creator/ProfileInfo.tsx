
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Award } from "@/icons";

interface ProfileInfoProps {
  image: string;
  displayName: string;
  description: string;
  followers: string;
  stats: {
    retentionRate: string;
    watchMinutes: string;
    superfans: number;
  };
  nextEvent?: {
    type: string;
    timeRemaining: string;
  };
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  image, 
  displayName, 
  description, 
  followers, 
  stats, 
  nextEvent 
}) => {
  return (
    <div className="flex items-start">
      <div className="mr-4">
        <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-pink-500 p-0.5 bg-gradient-to-br from-pink-500 to-purple-600">
          <AvatarImage 
            src={image} 
            alt={displayName} 
            className="object-cover rounded-full" 
          />
          <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white">
            {displayName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {nextEvent && (
          <Badge variant="outline" className="mt-2 w-full justify-center flex items-center gap-1 bg-muted">
            <Award size={12} className="text-brand-red" />
            {nextEvent.type}: {nextEvent.timeRemaining}
          </Badge>
        )}
      </div>
      
      <div className="flex-1">
        <h2 className="font-bold mb-1">{displayName}</h2>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-3">
          <div>
            <span className="font-semibold">{followers}</span>
            <span className="text-muted-foreground ml-1">abonnés</span>
          </div>
          <div>
            <span className="font-semibold">{stats.retentionRate}</span>
            <span className="text-muted-foreground ml-1">fidélisation</span>
          </div>
          <div>
            <span className="font-semibold">{stats.superfans.toLocaleString()}</span>
            <span className="text-muted-foreground ml-1">super-fans</span>
          </div>
          <div>
            <span className="font-semibold">{stats.watchMinutes}</span>
            <span className="text-muted-foreground ml-1">minutes vues</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
