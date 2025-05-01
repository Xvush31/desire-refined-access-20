
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
      case "bronze": return "from-amber-700 to-amber-500";
      case "silver": return "from-gray-400 to-gray-300";
      case "gold": return "from-yellow-500 to-amber-300";
      case "platinum": return "from-gray-300 to-gray-100";
      case "diamond": return "from-blue-400 to-purple-500";
      default: return "from-gray-400 to-gray-300";
    }
  };
  
  const getTierTextColor = () => {
    switch (tier) {
      case "bronze": return "text-white";
      case "silver": return "text-gray-800";
      case "gold": return "text-gray-800";
      case "platinum": return "text-gray-800";
      case "diamond": return "text-white";
      default: return "text-white";
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
      className={cn(
        "bg-gradient-to-r uppercase font-medium",
        getTierColor(),
        getTierTextColor(), 
        getSizeClasses(),
        className
      )}
    >
      {showLabel ? tier : ""}
    </Badge>
  );
};

export default CreatorBadge;
