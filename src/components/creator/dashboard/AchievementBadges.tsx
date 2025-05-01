
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star, CircleCheck, Award } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface Achievement {
  icon: React.ReactNode;
  text: string;
}

interface AchievementBadgesProps {
  achievements?: Achievement[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ 
  achievements 
}) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-zinc-800/50';
  
  const defaultAchievements = [
    { icon: <Star className="text-yellow-500" size={16} />, text: "Top 3% Créateurs" },
    { icon: <CircleCheck className="text-green-500" size={16} />, text: "Réponse rapide" },
    { icon: <Award className="text-purple-500" size={16} />, text: "Creator of the Month" },
  ];

  const badgesToShow = achievements || defaultAchievements;

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {badgesToShow.map((achievement, index) => (
        <Badge key={index} variant="outline" className={`${bgClass} border-0 flex items-center gap-1`}>
          {achievement.icon}
          <span>{achievement.text}</span>
        </Badge>
      ))}
    </div>
  );
};

export default React.memo(AchievementBadges);
