
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformerData } from "../../types/performer";
import { useTheme } from "@/hooks/use-theme";
import { TrendingUp, Users, Clock, Star } from "lucide-react";

interface CreatorStatsProps {
  performer: PerformerData;
}

const CreatorStats: React.FC<CreatorStatsProps> = ({ performer }) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  const stats = [
    {
      title: "Engagement Rate",
      value: "6.8%",
      change: "+0.5%",
      icon: <TrendingUp size={18} className="text-green-500" />,
      description: "Basé sur les interactions"
    },
    {
      title: "Nouveaux Abonnés",
      value: `+${Math.floor(performer.stats.superfans * 0.1)}`,
      change: "+2.3%",
      icon: <Users size={18} className="text-blue-500" />,
      description: "Sur les 30 derniers jours"
    },
    {
      title: "Temps de Visionnage",
      value: performer.stats.watchMinutes,
      change: "+18%",
      icon: <Clock size={18} className="text-purple-500" />,
      description: "Total cumulé"
    },
    {
      title: "Satisfaction",
      value: `${performer.stats.rating}/5.0`,
      change: "+0.2",
      icon: <Star size={18} className="text-yellow-500" />,
      description: "Note moyenne"
    }
  ];
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Statistiques Clés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className={bgClass}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                {stat.icon}
                <span className="ml-2">{stat.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-green-500 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreatorStats;
