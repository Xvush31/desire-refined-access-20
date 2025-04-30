
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { PerformerData } from "@/features/creaverse/types/performer";
import ProfileInfo from "@/features/creaverse/components/creator/ProfileInfo";
import ProfileStats from "@/features/creaverse/components/creator/ProfileStats";
import ProfileActions from "@/features/creaverse/components/creator/ProfileActions";
import { getTierColor, getNextTier } from "@/features/creaverse/utils/tierUtils";

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
  
  return (
    <section className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} px-4 pt-6 pb-4`}>
      <ProfileInfo 
        image={performer.image}
        displayName={performer.displayName}
        description={performer.description}
        followers={performer.followers}
        stats={performer.stats}
        nextEvent={performer.nextEvent}
      />
      
      <div className="flex-1">
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
