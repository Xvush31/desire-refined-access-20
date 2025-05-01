
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CreatorBadgeProps {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const CreatorBadge = ({ 
  tier, 
  className = "",
  size = "md",
  showLabel = true
}: CreatorBadgeProps) => {
  const tierConfig = {
    bronze: {
      color: 'from-amber-700 to-amber-500',
      text: 'Bronze',
      textColor: 'text-white',
    },
    silver: {
      color: 'from-gray-400 to-gray-300',
      text: 'Silver',
      textColor: 'text-gray-800',
    },
    gold: {
      color: 'from-yellow-500 to-amber-300',
      text: 'Gold',
      textColor: 'text-gray-800',
    },
    platinum: {
      color: 'from-gray-300 to-gray-100',
      text: 'Platinum',
      textColor: 'text-gray-800',
    },
    diamond: {
      color: 'from-blue-400 to-purple-500',
      text: 'Diamond',
      textColor: 'text-white',
    },
  };

  const { color, text, textColor } = tierConfig[tier];
  
  const getSizeClasses = () => {
    switch(size) {
      case "sm": return "text-xs px-1.5 py-0.5";
      case "lg": return "text-sm px-3 py-1";
      default: return "text-xs px-2 py-0.5";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        'bg-gradient-to-r uppercase font-medium',
        color,
        textColor,
        getSizeClasses(),
        className
      )}
    >
      {showLabel ? text : ""}
    </Badge>
  );
};

export default CreatorBadge;
