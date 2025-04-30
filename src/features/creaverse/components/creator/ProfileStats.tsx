
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

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
  tier,
  nextTier,
  tierProgress,
  tierColor,
  isOwner,
  showRevenue,
  onToggleRevenue,
  stats
}) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-100' : 'bg-zinc-800';
  const textClass = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  
  // Générer des données de revenus simulées
  const revenueData = generateRevenueData(stats.monthlyRevenue, stats.monthlyRevenue * 0.1);
  
  // Couleur du graphique basée sur la croissance
  const chartColor = stats.monthlyRevenueChange >= 0 ? "#4CAF50" : "#F44336";
  
  return (
    <div className="mt-2">
      {isOwner && (
        <div className={`p-3 rounded-lg ${bgClass} mb-3`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Revenus mensuels</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggleRevenue} 
              className="h-6 w-6"
            >
              {showRevenue ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />}
            </Button>
          </div>
          
          {showRevenue ? (
            <>
              <div className="flex items-baseline">
                <span className="text-lg font-bold mr-2">{stats.monthlyRevenue.toLocaleString('fr-FR')}€</span>
                <span className={`text-xs ${stats.monthlyRevenueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.monthlyRevenueChange >= 0 ? '+' : ''}{stats.monthlyRevenueChange}%
                </span>
              </div>
              
              {/* Mini graphique de revenus */}
              <div className="h-20 mt-1">
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
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className={`px-2 py-1 ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} shadow rounded text-xs`}>
                              Jour {payload[0].payload.day}: {payload[0].value}€
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
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
            </>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <p className="text-sm">Revenus masqués</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-2">
        <div className="flex items-center justify-between text-xs mb-1">
          <span>{tier}</span>
          <span>{nextTier}</span>
        </div>
        <Progress
          value={tierProgress}
          className="h-2"
          indicatorClassName={`bg-gradient-to-r ${tierColor}`}
        />
      </div>
    </div>
  );
};

export default ProfileStats;
