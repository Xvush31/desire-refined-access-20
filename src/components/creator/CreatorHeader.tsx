
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { PerformerData } from "@/features/creaverse/types/performer";
import { getTierColor, getNextTier } from "@/features/creaverse/utils/tierUtils";
import CreatorBadge from "@/features/creaverse/components/creator/CreatorBadge";
import ProfileAvatar from "@/features/creaverse/components/creator/ProfileAvatar";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

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
  const generateRevenueData = () => {
    const data = [];
    let value = performer.stats.monthlyRevenue * 0.8;
    const trend = performer.stats.monthlyRevenueChange > 0 ? 0.4 : -0.2;
    
    for (let i = 0; i < 30; i++) {
      const daily = ((Math.random() - 0.3) * 2) * (performer.stats.monthlyRevenue * 0.05);
      const trendEffect = (i / 30) * performer.stats.monthlyRevenue * trend;
      value = Math.max(300, value + daily + (trendEffect / 30));
      data.push({ day: i + 1, value: Math.round(value) });
    }
    return data;
  };
  
  const revenueData = generateRevenueData();
  const chartColor = performer.stats.monthlyRevenueChange >= 0 ? "#10b981" : "#ef4444";
  
  // Déterminer si le créateur a une story active
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
            src={performer.image}
            alt={performer.displayName}
            size="xl"
            status={creatorStatus as "online" | "offline" | "busy"}
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
        
        {/* Boutons d'action pour les visiteurs */}
        {!isOwner && (
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
        )}
      </div>
      
      {/* Statistiques du créateur - version améliorée */}
      <div className="space-y-5">
        {/* Première ligne: abonnés et abonnements */}
        <div className="flex justify-center items-center gap-8">
          <div className="text-center flex items-center gap-2">
            <span className="text-rose-400 text-lg">●</span>
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl">{performer.followers}</span>
              <span className="text-muted-foreground text-sm">abonnés</span>
            </div>
          </div>
          
          <div className="text-center flex items-center gap-2">
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl">{performer.stats.subscriptions}</span>
              <span className="text-muted-foreground text-sm">abonnements</span>
            </div>
          </div>
        </div>

        {/* Deuxième ligne: super-fans et fidélisation */}
        <div className="flex justify-center items-center gap-8">
          <div className="text-center flex items-center gap-2">
            <span className="text-yellow-400 text-lg">★</span>
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl">{performer.stats.superfans.toLocaleString('fr-FR')}</span>
              <span className="text-muted-foreground text-sm">super-fans</span>
            </div>
          </div>
          
          <div className="text-center flex items-center gap-2">
            <span className="text-blue-400 text-lg">↑</span>
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl">{performer.stats.retentionRate}</span>
              <span className="text-muted-foreground text-sm">fidélisation</span>
            </div>
          </div>
        </div>

        {/* Troisième ligne: minutes regardées */}
        <div className="text-center">
          <span className="font-bold text-xl">{performer.stats.watchMinutes}</span>
          <span className="text-muted-foreground text-sm ml-1">min regardées</span>
        </div>
      </div>
      
      {/* Barre de progression du palier avec informations détaillées */}
      <div className="mt-6 px-1">
        <div className="flex justify-between mb-1">
          <div className="text-sm font-medium">
            {performer.tier.charAt(0).toUpperCase() + performer.tier.slice(1)} <span className="text-muted-foreground text-xs">{performer.tierRevenue}</span>
          </div>
          <div className="text-sm font-medium">
            {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)} <span className="text-muted-foreground text-xs">{performer.nextTierRevenue}</span>
          </div>
        </div>
        
        <Progress className="h-2" value={performer.tierProgress} />
        
        <p className="text-xs text-muted-foreground mt-1 text-center">
          {performer.tierProgress}% vers le niveau {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)} ({performer.nextTierRevenue})
        </p>
      </div>
      
      {/* Section revenus (visible uniquement par le créateur) */}
      {isOwner && showRevenue && (
        <div className="mt-6 bg-gray-50 dark:bg-zinc-800/70 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium">Revenus ce mois</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold">${performer.stats.monthlyRevenue.toLocaleString('fr-FR')}</span>
              <span className={`ml-2 ${performer.stats.monthlyRevenueChange >= 0 ? 'text-green-500' : 'text-red-500'} font-medium text-sm flex items-center`}>
                {performer.stats.monthlyRevenueChange >= 0 ? '↗' : '↘'} {Math.abs(performer.stats.monthlyRevenueChange)}%
              </span>
            </div>
          </div>
          
          <div className="h-24 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={chartColor} 
                  fill="url(#revenueGradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Section "Live à venir" */}
      {performer.nextEvent && (
        <div className="mt-6 bg-gray-50 dark:bg-zinc-800/70 rounded-xl p-4">
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
              <div className="font-medium mb-1">{performer.nextEvent.title}</div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {performer.nextEvent.date}, {performer.nextEvent.time} <span className="text-red-500 ml-1">({performer.nextEvent.timeRemaining})</span>
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
