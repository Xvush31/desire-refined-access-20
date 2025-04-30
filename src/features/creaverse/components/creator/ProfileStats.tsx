
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

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
    watchMinutes?: string;
    retentionRate?: string;
    superfans?: number;
  };
}

// Données d'exemple pour le graphique de revenus
const generateRevenueData = (baseValue: number, fluctuation: number) => {
  const data = [];
  let currentValue = baseValue - (baseValue * 0.2); // Démarrer légèrement plus bas
  
  for (let i = 0; i < 30; i++) {
    // Ajouter une tendance de croissance générale + fluctuation quotidienne
    const trend = (i / 30) * (baseValue * 0.3); // Croissance progressive sur le mois
    const daily = ((Math.random() - 0.5) * 2) * fluctuation; // Fluctuation quotidienne
    
    currentValue = currentValue + daily + (trend / 30);
    
    data.push({
      day: i + 1,
      value: Math.max(0, Math.round(currentValue))
    });
  }
  
  return data;
};

const ProfileStats: React.FC<ProfileStatsProps> = ({
  isOwner,
  showRevenue,
  onToggleRevenue,
  stats
}) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-zinc-800/70';
  
  // Générer des données de revenus simulées
  const revenueData = generateRevenueData(stats.monthlyRevenue, stats.monthlyRevenue * 0.1);
  
  // Couleur du graphique basée sur la croissance
  const chartColor = stats.monthlyRevenueChange >= 0 ? "#10b981" : "#ef4444";
  
  if (!isOwner) return null;
  
  return (
    <div className="mt-2">
      <div className={`p-4 rounded-xl ${bgClass} mb-3`}>
        <div className="flex items-start justify-between mb-2">
          <span className="text-lg font-medium">Revenus ce mois</span>
          <div className="flex items-center">
            {showRevenue ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">${stats.monthlyRevenue.toLocaleString('fr-FR')}</span>
                <span className={`${stats.monthlyRevenueChange >= 0 ? 'text-green-500' : 'text-red-500'} font-medium text-sm flex items-center`}>
                  {stats.monthlyRevenueChange >= 0 ? '↗' : '↘'} {Math.abs(stats.monthlyRevenueChange)}%
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground">Masqués</span>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggleRevenue} 
              className="ml-2 h-8 w-8"
            >
              {showRevenue ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </Button>
          </div>
        </div>
        
        {showRevenue && (
          <div className="h-24 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={chartColor} 
                  strokeWidth={2}
                  fill="url(#revenueGradient)" 
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileStats;
