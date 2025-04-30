
import React from "react";
import { Badge } from "@/components/ui/badge";
import { RelationshipLevel, relationshipLevels } from "../../api/services/relationshipService";
import { Award, Heart, Star, StarHalf, Trophy, User } from "lucide-react";

interface RelationshipBadgeProps {
  level: RelationshipLevel;
  showName?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const RelationshipBadge: React.FC<RelationshipBadgeProps> = ({ 
  level, 
  showName = true,
  size = "md",
  className = "" 
}) => {
  const levelInfo = relationshipLevels[level];
  
  // Default to "None" level if the provided level is invalid
  const safeLevel = levelInfo || relationshipLevels[RelationshipLevel.None];
  
  const getIcon = () => {
    switch (safeLevel.icon) {
      case "heart": return <Heart size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
      case "star-half": return <StarHalf size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
      case "star": return <Star size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
      case "award": return <Award size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
      case "trophy": return <Trophy size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
      default: return <User size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
    }
  };
  
  const getColorClass = () => {
    return `bg-${safeLevel.color}`;
  };
  
  const getSizeClass = () => {
    return size === "sm" 
      ? "px-1.5 py-0.5 text-xs"
      : size === "md"
        ? "px-2 py-1 text-xs"
        : "px-2.5 py-1 text-sm";
  };
  
  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 ${getColorClass()} text-white font-medium ${getSizeClass()} ${className}`}
    >
      {getIcon()}
      {showName && <span>{safeLevel.name}</span>}
    </Badge>
  );
};

export default RelationshipBadge;
