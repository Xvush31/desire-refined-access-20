
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Users, Star, TrendingUp, CircleCheck, Award } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface PerformerData {
  id: number;
  username: string;
  displayName: string;
  stats: {
    rating: number;
  };
  nextEvent?: {
    type: string;
    timeRemaining: string;
  };
}

interface EngagementDashboardProps {
  performer: PerformerData;
  isOwner: boolean;
}

const EngagementDashboard: React.FC<EngagementDashboardProps> = ({ performer, isOwner }) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-zinc-800/50';
  const bgClassActive = theme === 'light' ? 'bg-gray-100' : 'bg-zinc-800';
  
  const achievements = [
    { icon: <Star className="text-yellow-500" size={16} />, text: "Top 3% Créateurs" },
    { icon: <CircleCheck className="text-green-500" size={16} />, text: "Réponse rapide" },
    { icon: <Award className="text-purple-500" size={16} />, text: "Creator of the Month" },
  ];

  const upcomingEvents = [
    {
      icon: <Clock size={16} className="text-brand-red" />,
      title: "Live exclusif",
      time: "Aujourd'hui, 20:00",
      isActive: true
    },
    {
      icon: <Calendar size={16} />,
      title: "Nouveau contenu",
      time: "Demain",
      isActive: false
    },
    {
      icon: <Users size={16} />,
      title: "Q&A avec fans",
      time: "Vendredi, 19:00",
      isActive: false
    }
  ];

  return (
    <section className={`px-4 py-3 ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} border-b ${theme === 'light' ? 'border-gray-200' : 'border-zinc-800'}`}>
      {/* Pulse et statut du créateur */}
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
          <span className="text-sm font-medium">+12% d'engagement cette semaine</span>
        </div>
      </div>

      {/* Badges d'achèvement et de qualité */}
      <div className="flex flex-wrap gap-2 mb-3">
        {achievements.map((achievement, index) => (
          <Badge key={index} variant="outline" className={`${bgClass} border-0 flex items-center gap-1`}>
            {achievement.icon}
            <span>{achievement.text}</span>
          </Badge>
        ))}
      </div>
      
      {/* Calendrier et événements à venir */}
      <div className="mb-2">
        <h3 className="text-sm font-semibold mb-2 flex items-center">
          <Calendar size={14} className="mr-1" />
          Prochains événements
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className={`${event.isActive ? bgClassActive : bgClass} px-3 py-2 rounded-lg flex items-center gap-2 min-w-[180px]`}
            >
              {event.icon}
              <div>
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
              {event.isActive && (
                <Badge className="ml-auto bg-brand-red text-white text-xs">Bientôt</Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementDashboard;
