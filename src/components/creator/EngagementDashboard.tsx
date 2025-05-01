
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import CreatorStatus from "./dashboard/CreatorStatus";
import AchievementBadges from "./dashboard/AchievementBadges";
import UpcomingEventsRow from "./dashboard/UpcomingEventsRow";

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
  
  return (
    <section className={`px-4 py-3 ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} border-b ${theme === 'light' ? 'border-gray-200' : 'border-zinc-800'}`}>
      {/* Status du créateur */}
      <CreatorStatus 
        isOnline={true} 
        weeklyEngagementChange="+12%" 
      />
      
      {/* Badges d'achèvement */}
      <AchievementBadges />
      
      {/* Événements à venir */}
      <UpcomingEventsRow />
    </section>
  );
};

export default EngagementDashboard;
