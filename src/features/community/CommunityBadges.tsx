
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Users } from "lucide-react";

export type CommunityBadge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isEarned: boolean;
  progress?: number;
  maxProgress?: number;
};

const badges: CommunityBadge[] = [
  {
    id: "early-adopter",
    name: "Pionnier",
    description: "Membre depuis le lancement de la plateforme",
    icon: "🚀",
    color: "#D2C7BA",
    isEarned: true
  },
  {
    id: "content-creator",
    name: "Créateur",
    description: "A publié plus de 5 vidéos sur la plateforme",
    icon: "🎬",
    color: "#D2C7BA",
    isEarned: true
  },
  {
    id: "top-referrer",
    name: "Influenceur",
    description: "A parrainé plus de 10 nouveaux membres",
    icon: "👑",
    color: "#D2C7BA",
    isEarned: false,
    progress: 7,
    maxProgress: 10
  },
  {
    id: "premium-member",
    name: "Premium",
    description: "Abonné Premium depuis plus de 3 mois",
    icon: "⭐",
    color: "#D2C7BA",
    isEarned: false,
    progress: 2,
    maxProgress: 3
  },
  {
    id: "popular-content",
    name: "Star montante",
    description: "Une de vos vidéos a atteint 1000 vues",
    icon: "🌟",
    color: "#D2C7BA",
    isEarned: true
  },
  {
    id: "community-pillar",
    name: "Pilier",
    description: "Actif sur la plateforme depuis plus d'un an",
    icon: "🏛️",
    color: "#D2C7BA",
    isEarned: false,
    progress: 8,
    maxProgress: 12
  }
];

export const CommunityBadges = () => {
  return (
    <div className="bg-secondary/30 rounded-2xl p-6 my-8">
      <div className="flex items-center mb-6">
        <Users size={24} className="mr-3" />
        <h2 className="text-2xl font-bold">Badges Communautaires</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className={`p-4 rounded-xl border ${badge.isEarned ? 'bg-card border-[#D2C7BA]' : 'bg-card/50 border-muted'}`}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{badge.icon}</span>
              <div>
                <h3 className="font-medium">{badge.name}</h3>
                <div className="flex items-center">
                  {badge.isEarned && (
                    <BadgeCheck size={16} className="text-[#D2C7BA] mr-1" />
                  )}
                  <span className={`text-xs ${badge.isEarned ? 'text-[#D2C7BA]' : 'text-muted-foreground'}`}>
                    {badge.isEarned ? 'Obtenu' : 'Non obtenu'}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{badge.description}</p>
            
            {!badge.isEarned && badge.progress !== undefined && (
              <div className="mt-3">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#D2C7BA]" 
                    style={{ width: `${(badge.progress / badge.maxProgress!) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {badge.progress}/{badge.maxProgress}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityBadges;
