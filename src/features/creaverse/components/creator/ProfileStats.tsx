
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, TrendingUp, Users, Star, Clock, Video } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    subscriptions?: number;
    engagementRate?: string;
    completionRate?: string;
    averageWatchTime?: string;
    trendingScore?: number;
  };
  content?: {
    total: number;
    premium: number;
    trending: number;
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
  stats,
  content
}) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-zinc-800/70';
  
  // Générer des données de revenus simulées
  const revenueData = generateRevenueData(stats.monthlyRevenue, stats.monthlyRevenue * 0.1);
  
  // Couleur du graphique basée sur la croissance
  const chartColor = stats.monthlyRevenueChange >= 0 ? "#10b981" : "#ef4444";
  
  if (!isOwner) return null;
  
  return (
    <div className="mt-4 space-y-4">
      {/* Carte principale de revenus */}
      <Card className={`${bgClass} border-0`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold">Revenus ce mois</CardTitle>
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
          <CardDescription>Tendance sur les 30 derniers jours</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          {showRevenue && (
            <div className="h-24">
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
        </CardContent>
      </Card>

      {/* Grille des métriques détaillées */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Audience */}
        <Card className={`${bgClass} border-0`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users size={16} className="mr-2" /> Audience
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Abonnements</p>
              <p className="text-lg font-bold">{stats.subscriptions}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Superfans</p>
              <p className="text-lg font-bold">{stats.superfans}</p>
            </div>
          </CardContent>
        </Card>

        {/* Engagement */}
        <Card className={`${bgClass} border-0`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Star size={16} className="mr-2" /> Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Taux</p>
              <p className="text-lg font-bold">{stats.engagementRate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Rétention</p>
              <p className="text-lg font-bold">{stats.retentionRate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Visionnages */}
        <Card className={`${bgClass} border-0`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock size={16} className="mr-2" /> Visionnages
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Minutes totales</p>
              <p className="text-lg font-bold">{stats.watchMinutes}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Temps moyen</p>
              <p className="text-lg font-bold">{stats.averageWatchTime}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contenu */}
        <Card className={`${bgClass} border-0`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Video size={16} className="mr-2" /> Contenu
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold">{content?.total || 0}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Premium</p>
                <p className="font-semibold">{content?.premium || 0}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tendance</p>
                <p className="font-semibold flex items-center">
                  {content?.trending || 0}
                  <TrendingUp size={14} className="ml-1 text-brand-red" />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileStats;
