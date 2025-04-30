
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { PerformerData } from "@/features/creaverse/types/performer";
import ProfileInfo from "@/features/creaverse/components/creator/ProfileInfo";
import ProfileStats from "@/features/creaverse/components/creator/ProfileStats";
import ProfileActions from "@/features/creaverse/components/creator/ProfileActions";
import { getTierColor, getNextTier } from "@/features/creaverse/utils/tierUtils";
import CreatorBadge from "@/features/creaverse/components/creator/CreatorBadge";
import ProfileAvatar from "@/features/creaverse/components/creator/ProfileAvatar";

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
  const tierColor = getTierColor(performer.tier);
  const nextTier = getNextTier(performer.tier);
  
  // Déterminer si le créateur a une story active (simulé ici)
  const hasStory = performer.isActive || performer.isLive;
  
  // Déterminer le statut du créateur
  const creatorStatus = performer.isLive ? "streaming" : 
                     performer.isActive ? "online" : "offline";
  
  return (
    <section className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} px-4 pt-6 pb-4 relative`}>
      <div className="flex items-start">
        <div className="mr-4">
          <ProfileAvatar 
            image={performer.image}
            displayName={performer.displayName}
            size="xl"
            status={creatorStatus}
            hasStory={hasStory}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <h1 className="text-xl font-bold mr-2">{performer.displayName}</h1>
            <CreatorBadge tier={performer.tier} size="md" />
          </div>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {performer.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="text-sm">
              <span className="font-bold">{performer.followers}</span>
              <span className="text-muted-foreground ml-1">abonnés</span>
            </div>
            
            <div className="h-4 w-px bg-muted-foreground/30"></div>
            
            <div className="text-sm">
              <span className="font-bold">{performer.stats.superfans}</span>
              <span className="text-muted-foreground ml-1">super-fans</span>
            </div>
            
            <div className="h-4 w-px bg-muted-foreground/30"></div>
            
            <div className="text-sm">
              <span className="font-bold">{performer.stats.retentionRate}</span>
              <span className="text-muted-foreground ml-1">fidélisation</span>
            </div>
          </div>
          
          <ProfileStats 
            tier={performer.tier}
            nextTier={nextTier}
            tierProgress={performer.tierProgress}
            tierColor={tierColor}
            isOwner={isOwner}
            showRevenue={showRevenue}
            onToggleRevenue={onToggleRevenue}
            stats={{
              monthlyRevenue: performer.stats.monthlyRevenue,
              monthlyRevenueChange: performer.stats.monthlyRevenueChange
            }}
          />
        </div>
      </div>
      
      <ProfileActions 
        isFollowing={isFollowing}
        onToggleFollow={onToggleFollow}
        onSubscribe={onSubscribe}
        onSendMessage={onSendMessage}
      />
    </section>
  );
};

export default CreatorHeader;
