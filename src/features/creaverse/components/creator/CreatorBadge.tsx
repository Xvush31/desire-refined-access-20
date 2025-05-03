
import React from 'react';
import { cn } from '@/lib/utils';

interface CreatorBadgeProps {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  className?: string;
  size?: string; // Added size prop
}

const CreatorBadge = ({ tier, className, size = 'default' }: CreatorBadgeProps) => {
  const tierConfig = {
    bronze: {
      color: 'bg-gradient-to-r from-amber-700 to-amber-500',
      text: 'Bronze',
      textColor: 'text-white',
    },
    silver: {
      color: 'bg-gradient-to-r from-gray-400 to-gray-300',
      text: 'Silver',
      textColor: 'text-gray-800',
    },
    gold: {
      color: 'bg-gradient-to-r from-yellow-500 to-amber-300',
      text: 'Gold',
      textColor: 'text-gray-800',
    },
    platinum: {
      color: 'bg-gradient-to-r from-gray-300 to-gray-100',
      text: 'Platinum',
      textColor: 'text-gray-800',
    },
    diamond: {
      color: 'bg-gradient-to-r from-blue-400 to-purple-500',
      text: 'Diamond',
      textColor: 'text-white',
    },
  };

  const { color, text, textColor } = tierConfig[tier];
  
  const sizeClasses = {
    small: 'text-[10px] px-1.5 py-0',
    default: 'text-xs px-2 py-0.5',
    large: 'text-sm px-2.5 py-1',
  };
  
  const sizeClass = size === 'small' ? sizeClasses.small : 
                    size === 'large' ? sizeClasses.large : 
                    sizeClasses.default;

  return (
    <span 
      className={cn(
        'font-semibold rounded-full',
        color,
        textColor,
        sizeClass,
        className
      )}
    >
      {text}
    </span>
  );
};

export default CreatorBadge;
