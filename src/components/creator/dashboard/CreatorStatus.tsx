
import React from "react";
import { TrendingUp } from "lucide-react";

interface CreatorStatusProps {
  isOnline?: boolean;
  weeklyEngagementChange?: string;
}

const CreatorStatus: React.FC<CreatorStatusProps> = ({ 
  isOnline = true, 
  weeklyEngagementChange = "+12%" 
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium">En ligne maintenant</span>
      </div>
      
      <div className="flex items-center">
        <TrendingUp size={16} className="text-green-500 mr-1" />
        <span className="text-sm font-medium">{weeklyEngagementChange} d'engagement cette semaine</span>
      </div>
    </div>
  );
};

export default React.memo(CreatorStatus);
