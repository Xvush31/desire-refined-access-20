
import React from 'react';

interface TierProgressBarProps {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  nextTierProgress: number;
}

const TierProgressBar: React.FC<TierProgressBarProps> = ({ tier, nextTierProgress }) => {
  const getTierProgressColor = () => {
    switch (tier) {
      case 'bronze': return 'from-amber-700 to-amber-500';
      case 'silver': return 'from-gray-400 to-gray-300';
      case 'gold': return 'from-yellow-500 to-amber-300';
      case 'platinum': return 'from-gray-300 to-gray-100';
      case 'diamond': return 'from-blue-400 to-purple-500';
      default: return 'from-gray-400 to-gray-300';
    }
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs mb-1">
        <div>Progress to next tier</div>
        <div>{nextTierProgress}%</div>
      </div>
      <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${getTierProgressColor()}`}
          style={{ width: `${nextTierProgress}%` }}
        />
      </div>
    </div>
  );
};

export default TierProgressBar;
