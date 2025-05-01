
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Award } from "@/icons";
import RelationshipBadge from "../relationship/RelationshipBadge";
import { RelationshipLevel } from "../../api/services/relationshipService";

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
  relationshipLevel?: RelationshipLevel;
  showRelationship?: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  image, 
  displayName = "", // Provide default empty string to avoid undefined
  description, 
  followers, 
  stats, 
  nextEvent,
  relationshipLevel = RelationshipLevel.None,
  showRelationship = true
}) => {
  // Get initials safely by checking if displayName exists first
  const getInitials = () => {
    if (!displayName) return ""; // Return empty string if displayName is undefined
    return displayName.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-start">
      <div className="mr-4">
        <Avatar className="w-20 h-20 md:w-24 md:h-24 border border-border p-0.5 bg-gradient-to-br from-muted/60 to-muted">
          <AvatarImage 
            src={image} 
            alt={displayName || "Profile"} // Provide fallback alt text
            className="object-cover rounded-full" 
          />
          <AvatarFallback className="bg-gradient-to-br from-muted/80 to-muted/40 text-foreground">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        
        {showRelationship && relationshipLevel > RelationshipLevel.None && (
          <div className="mt-2 flex justify-center">
            <RelationshipBadge level={relationshipLevel} size="sm" />
          </div>
        )}
        
        {nextEvent && (
          <Badge variant="outline" className="mt-2 w-full justify-center flex items-center gap-1 bg-muted">
            <Award size={12} className="text-brand-red" />
            {nextEvent.type}: {nextEvent.timeRemaining}
          </Badge>
        )}
      </div>
      
      <div className="flex-1">
        <h2 className="font-bold mb-1">{displayName || "Unknown"}</h2>
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
