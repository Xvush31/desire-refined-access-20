
import React from "react";
import { Progress } from "@/components/ui/progress";

interface CreatorTierProgressProps {
  tier: string;
  tierRevenue: string;
  nextTier: string;
  nextTierRevenue: string;
  tierProgress: number;
}

const CreatorTierProgress: React.FC<CreatorTierProgressProps> = ({
  tier,
  tierRevenue,
  nextTier,
  nextTierRevenue,
  tierProgress
}) => {
  return (
    <div className="mt-6 px-1">
      <div className="flex justify-between mb-1">
        <div className="text-sm font-medium">
          {tier.charAt(0).toUpperCase() + tier.slice(1)} <span className="text-muted-foreground text-xs">{tierRevenue}</span>
        </div>
        <div className="text-sm font-medium">
          {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)} <span className="text-muted-foreground text-xs">{nextTierRevenue}</span>
        </div>
      </div>
      
      <Progress className="h-2" value={tierProgress} />
      
      <p className="text-xs text-muted-foreground mt-1 text-center">
        {tierProgress}% vers le niveau {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)} ({nextTierRevenue})
      </p>
    </div>
  );
};

export default CreatorTierProgress;
