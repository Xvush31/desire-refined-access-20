
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { PerformerData } from "@/features/creaverse/types/performer";
import { getNextTier } from "@/features/creaverse/utils/tierUtils";
import { CircleDollarSign, Video, Users } from "lucide-react";

import CreatorProfileAvatar from "./CreatorProfileAvatar";
import CreatorProfileInfo from "./CreatorProfileInfo";
import CreatorStatsDisplay from "./CreatorStatsDisplay";
import CreatorTierProgress from "./CreatorTierProgress";
import CreatorRevenueDisplay from "./CreatorRevenueDisplay";
import CreatorUpcomingEvent from "./CreatorUpcomingEvent";
import { generateRevenueData } from "./utils/revenueUtils";

interface CreatorHeaderProps {
  performer: PerformerData;
  isOwner: boolean;
  showRevenue: boolean;
  onToggleRevenue: () => void;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onSubscribe: () => void;
  onSendMessage: () => void;
}

const CreatorHeader: React.FC<CreatorHeaderProps> = ({
  performer,
  isOwner,
  showRevenue,
  onToggleRevenue,
  isFollowing,
  onToggleFollow,
  onSubscribe,
  onSendMessage
}) => {
  const { theme } = useTheme();
  const nextTier = getNextTier(performer.tier);
  
  // Générer des données pour le graphique de revenus
  const revenueData = generateRevenueData(performer.stats.monthlyRevenue, performer.stats.monthlyRevenueChange);
  
  // Déterminer si le créateur a une story active
  const hasStory = performer.isActive || performer.isLive;
  
  // Déterminer le statut du créateur
  const creatorStatus = performer.isLive ? "streaming" : 
                     performer.isActive ? "online" : "offline";
  
  return (
    <section className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} px-4 py-6 relative rounded-b-xl`}>
      {/* Avatar du créateur avec bordure de couleur */}
      <CreatorProfileAvatar 
        image={performer.image}
        displayName={performer.displayName}
        creatorStatus={creatorStatus}
        hasStory={hasStory}
      />
      
      {/* Informations du profil */}
      <CreatorProfileInfo 
        displayName={performer.displayName}
        username={performer.username}
        tier={performer.tier}
        description={performer.description}
        isOwner={isOwner}
        isFollowing={isFollowing}
        onSendMessage={onSendMessage}
        onToggleFollow={onToggleFollow}
      />
      
      {/* Statistiques du créateur */}
      <CreatorStatsDisplay 
        followers={parseInt(performer.followers.replace(/,/g, ''))}
        subscriptions={performer.stats.subscriptions || 0}
        superfans={performer.stats.superfans}
        retentionRate={performer.stats.retentionRate}
        watchMinutes={parseInt(performer.stats.watchMinutes.replace(/,/g, ''))}
      />
      
      {/* Barre de progression du palier */}
      <CreatorTierProgress 
        tier={performer.tier}
        tierRevenue={performer.tierRevenue}
        nextTier={nextTier}
        nextTierRevenue={performer.nextTierRevenue}
        tierProgress={performer.tierProgress}
      />
      
      {/* Section revenus (visible uniquement par le créateur) */}
      {isOwner && showRevenue && (
        <CreatorRevenueDisplay 
          monthlyRevenue={performer.stats.monthlyRevenue}
          monthlyRevenueChange={performer.stats.monthlyRevenueChange}
          revenueData={revenueData}
        />
      )}

      {/* Informations des revenus en grille */}
      {isOwner && showRevenue && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="bg-muted/20 p-3 rounded-lg">
            <CircleDollarSign size={18} className="mb-1 text-brand-red" />
            <p className="text-xs text-muted-foreground">Abonnements</p>
            <p className="font-semibold">${Math.round(performer.stats.monthlyRevenue * 0.65)}</p>
          </div>
          <div className="bg-muted/20 p-3 rounded-lg">
            <Video size={18} className="mb-1 text-brand-red" />
            <p className="text-xs text-muted-foreground">Contenus Premium</p>
            <p className="font-semibold">${Math.round(performer.stats.monthlyRevenue * 0.25)}</p>
          </div>
          <div className="bg-muted/20 p-3 rounded-lg">
            <Users size={18} className="mb-1 text-brand-red" />
            <p className="text-xs text-muted-foreground">Pourboires</p>
            <p className="font-semibold">${Math.round(performer.stats.monthlyRevenue * 0.10)}</p>
          </div>
        </div>
      )}
      
      {/* Section "Live à venir" */}
      {performer.nextEvent && (
        <CreatorUpcomingEvent event={performer.nextEvent} />
      )}
    </section>
  );
};

export default CreatorHeader;
