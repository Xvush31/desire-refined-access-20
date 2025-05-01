
import React from "react";
import { Badge } from "@/components/ui/badge";

interface CreatorBadgeProps {
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const CreatorBadge: React.FC<CreatorBadgeProps> = ({ 
  tier, 
  className = "",
  size = "md",
  showLabel = true
}) => {
  const getTierColor = () => {
    switch (tier) {
      case "bronze": return "from-amber-600 to-amber-500";
      case "silver": return "from-gray-400 to-gray-300";
      case "gold": return "from-yellow-400 to-yellow-300";
      case "platinum": return "from-blue-400 to-blue-300";
      case "diamond": return "from-purple-400 to-purple-300";
      default: return "from-gray-400 to-gray-300";
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case "sm": return "text-xs px-1.5 py-0.5";
      case "lg": return "text-sm px-3 py-1.5";
      case "md":
      default: return "text-xs px-2 py-0.5";
    }
  };

  return (
    <Badge
      variant="outline"
      className={`bg-gradient-to-r ${getTierColor()} text-white uppercase font-medium ${getSizeClasses()} ${className}`}
    >
      {showLabel ? tier : ""}
    </Badge>
  );
};

export default CreatorBadge;
