
import React from "react";
import { PerformerData } from "../../types/performer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";
import { TrendingUp, Star, Users, Clock } from "lucide-react";

interface CreatorStatsProps {
  performer: PerformerData;
}

const CreatorStats: React.FC<CreatorStatsProps> = ({ performer }) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Statistiques de Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp size={18} className="mr-2 text-brand-red" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Vues totales</span>
                  <span className="font-medium">{performer.stats.views}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">J'aime</span>
                  <span className="font-medium">{performer.stats.likes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Minutes visionnées</span>
                  <span className="font-medium">{performer.stats.watchMinutes}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users size={18} className="mr-2 text-brand-red" />
              Audience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Abonnés</span>
                  <span className="font-medium">{performer.followers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Super-fans</span>
                  <span className="font-medium">{performer.stats.superfans}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Taux de fidélisation</span>
                  <span className="font-medium">{performer.stats.retentionRate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star size={18} className="mr-2 text-brand-red" />
              Qualité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Note moyenne</span>
                  <span className="font-medium">{performer.stats.rating} / 5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Vidéos publiées</span>
                  <span className="font-medium">{performer.videos}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Niveau du compte</span>
                  <span className="font-medium capitalize">{performer.tier}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock size={18} className="mr-2 text-brand-red" />
              Historique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">A rejoint XVush</span>
                  <span className="font-medium">{performer.joinDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Progression vers niveau supérieur</span>
                  <span className="font-medium">{performer.tierProgress}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Prochain événement</span>
                  <span className="font-medium">
                    {performer.nextEvent ? `${performer.nextEvent.type} (${performer.nextEvent.timeRemaining})` : 'Aucun'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorStats;
