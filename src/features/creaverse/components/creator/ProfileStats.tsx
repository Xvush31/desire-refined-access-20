
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EyeOff, Eye, TrendingUp } from "@/icons";
import { useTheme } from "@/hooks/use-theme";

interface ProfileStatsProps {
  tier: string;
  nextTier: string;
  tierProgress: number;
  tierColor: string;
  isOwner: boolean;
  showRevenue: boolean;
  onToggleRevenue: () => void;
  stats: {
    monthlyRevenue: number;
    monthlyRevenueChange: number;
  };
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  tier,
  nextTier,
  tierProgress,
  tierColor,
  isOwner,
  showRevenue,
  onToggleRevenue,
  stats
}) => {
  if (!isOwner) return null;
  
  return (
    <>
      <div className="flex items-center mb-2">
        <Badge
          className={`bg-gradient-to-r ${tierColor} text-white px-3 py-1 font-medium`}
        >
          PALIER {tier.toUpperCase()} - 85% DE REVENUS
        </Badge>
        <button 
          onClick={onToggleRevenue}
          className="ml-2 p-1 rounded-full bg-muted flex items-center justify-center"
          aria-label={showRevenue ? "Masquer les revenus" : "Afficher les revenus"}
        >
          {showRevenue ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      
      {showRevenue && (
        <div className="mb-3">
          <div className="flex items-center">
            <span className="text-2xl font-bold">${stats.monthlyRevenue}</span>
            <span className="text-sm ml-2">ce mois</span>
            <span className={`text-xs ml-2 ${stats.monthlyRevenueChange > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              <TrendingUp size={14} className="mr-0.5" />
              {stats.monthlyRevenueChange > 0 ? '+' : ''}{stats.monthlyRevenueChange}% vs. mois dernier
            </span>
          </div>
          <div className="mt-1 relative">
            <Progress value={tierProgress} className="h-2 bg-muted" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{tierProgress}% vers Palier {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileStats;
