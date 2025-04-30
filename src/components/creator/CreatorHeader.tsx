
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
    <section className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} px-4 py-6 relative rounded-b-xl`}>
      {/* Avatar du créateur avec bordure de couleur */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-300 -z-10 scale-105"></div>
          <ProfileAvatar 
            image={performer.image}
            displayName={performer.displayName}
            size="xl"
            status={creatorStatus}
            hasStory={hasStory}
          />
        </div>
        
        {/* Indicateur de statut en ligne avec texte */}
        <div className="flex items-center gap-2 mt-3">
          <div className={`w-2 h-2 rounded-full ${creatorStatus === 'online' || creatorStatus === 'streaming' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-muted-foreground">{creatorStatus === 'online' ? 'En ligne' : creatorStatus === 'streaming' ? 'En direct' : 'Hors ligne'}</span>
        </div>
      </div>
      
      {/* Informations du profil */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-2xl font-bold">{performer.displayName}</h1>
          <CreatorBadge tier={performer.tier} size="md" className="uppercase" />
        </div>
        
        <p className="text-muted-foreground text-sm mb-1">@{performer.username}</p>
        
        <p className="text-sm text-center max-w-md mx-auto mt-3 mb-5">
          {performer.description}
        </p>
        
        {/* Boutons d'action */}
        <div className="flex justify-center gap-3 mb-6">
          <button 
            onClick={onSendMessage} 
            className="bg-white dark:bg-zinc-800 text-black dark:text-white border border-gray-200 dark:border-zinc-700 rounded-full px-6 py-2 flex items-center gap-1 text-sm font-medium"
          >
            Message
          </button>
          
          <button 
            onClick={onToggleFollow} 
            className={`${isFollowing ? 'bg-white dark:bg-zinc-800 text-black dark:text-white border border-gray-200 dark:border-zinc-700' : 'bg-black text-white dark:bg-white dark:text-black'} rounded-full px-6 py-2 flex items-center gap-1 text-sm font-medium`}
          >
            {isFollowing ? 'Abonné' : 'Suivre'}
          </button>
        </div>
      </div>
      
      {/* Statistiques du créateur */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-xl font-bold">{performer.followers}</div>
          <div className="text-xs text-muted-foreground">abonnés</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-bold flex items-center justify-center">
            <span className="text-yellow-500 mr-1">★</span> 
            {performer.stats.superfans.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">super-fans</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-bold">{performer.stats.retentionRate}</div>
          <div className="text-xs text-muted-foreground">fidélisation</div>
        </div>
      </div>
      
      {/* Statistiques additionnelles */}
      <div className="mb-4 text-center">
        <div className="text-lg font-bold">{performer.stats.watchMinutes || '237.0K'} min regardées</div>
      </div>
      
      {/* Barre de progression du palier */}
      <div className="mt-4 px-1">
        <div className="flex items-center justify-between text-xs mb-1">
          <div>
            <span className="font-medium">{performer.tier.charAt(0).toUpperCase() + performer.tier.slice(1)}</span>
            <span className="text-muted-foreground ml-1">80% de revenus</span>
          </div>
          <div>
            <span className="font-medium">{nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}</span>
            <span className="text-muted-foreground ml-1">90% de revenus</span>
          </div>
        </div>
        
        <div className="h-2 w-full bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500" 
            style={{ width: `${performer.tierProgress}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-1 text-center">
          73% vers le niveau Platinum (90% de revenus)
        </p>
      </div>
      
      {/* Section "Live à venir" */}
      {performer.nextEvent && (
        <div className="mt-6 bg-gray-100 dark:bg-zinc-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M17 9A5 5 0 0 0 7 9a5 5 0 0 0 10 0z"></path>
                <rect width="16" height="10" x="4" y="11" rx="2"></rect>
                <circle cx="12" cy="13" r="3"></circle>
                <path d="M12 16v2"></path>
                <path d="M8 16v2"></path>
                <path d="M16 16v2"></path>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-red-500">Live à venir</div>
              <div className="font-medium mb-1">Session photo spéciale abonnés</div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Demain, 20:00 <span className="text-red-500">(23h 45m)</span>
                </div>
                <button className="bg-white dark:bg-zinc-700 text-sm px-4 py-1 rounded-full">Rappel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreatorHeader;
