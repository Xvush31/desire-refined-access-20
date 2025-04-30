
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, EyeOff, Eye, TrendingUp, Award } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface PerformerData {
  id: number;
  username: string;
  displayName: string;
  image: string;
  followers: string;
  description: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  tierProgress: number;
  stats: {
    retentionRate: string;
    watchMinutes: string;
    monthlyRevenue: number;
    monthlyRevenueChange: number;
    superfans: number;
  };
  nextEvent?: {
    type: string;
    timeRemaining: string;
  };
}

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
  
  const getTierColor = (tier: string) => {
    switch(tier) {
      case "bronze": return "from-amber-700 to-amber-500";
      case "silver": return "from-gray-400 to-gray-300";
      case "gold": return "from-yellow-500 to-amber-300";
      case "platinum": return "from-slate-300 to-gray-100";
      case "diamond": return "from-blue-300 to-cyan-100";
      default: return "from-amber-700 to-amber-500";
    }
  };
  
  const tierColor = getTierColor(performer.tier);
  const nextTier = performer.tier === "bronze" ? "silver" : 
                  performer.tier === "silver" ? "gold" : 
                  performer.tier === "gold" ? "platinum" : "diamond";
  
  const renderRevenueBadge = () => {
    if (!isOwner) return null;
    
    return (
      <div className="flex items-center mb-2">
        <Badge
          className={`bg-gradient-to-r ${tierColor} text-white px-3 py-1 font-medium`}
        >
          PALIER {performer.tier.toUpperCase()} - 85% DE REVENUS
        </Badge>
        <button 
          onClick={onToggleRevenue}
          className="ml-2 p-1 rounded-full bg-muted flex items-center justify-center"
          aria-label={showRevenue ? "Masquer les revenus" : "Afficher les revenus"}
        >
          {showRevenue ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    );
  };
  
  const renderRevenueStats = () => {
    if (!isOwner || !showRevenue) return null;
    
    const changeClass = performer.stats.monthlyRevenueChange > 0 ? "text-green-500" : "text-red-500";
    const changePrefix = performer.stats.monthlyRevenueChange > 0 ? "+" : "";
    
    return (
      <div className="mb-3">
        <div className="flex items-center">
          <span className="text-2xl font-bold">${performer.stats.monthlyRevenue}</span>
          <span className="text-sm ml-2">ce mois</span>
          <span className={`text-xs ml-2 ${changeClass} flex items-center`}>
            <TrendingUp size={14} className="mr-0.5" />
            {changePrefix}{performer.stats.monthlyRevenueChange}% vs. mois dernier
          </span>
        </div>
        <div className="mt-1 relative">
          <Progress value={performer.tierProgress} className="h-2 bg-muted" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{performer.tierProgress}% vers Palier {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} px-4 pt-6 pb-4`}>
      <div className="flex items-start">
        {/* Avatar du créateur */}
        <div className="mr-4">
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-pink-500 p-0.5 bg-gradient-to-br from-pink-500 to-purple-600">
            <AvatarImage 
              src={performer.image} 
              alt={performer.displayName} 
              className="object-cover rounded-full" 
            />
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white">
              {performer.displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {performer.nextEvent && (
            <Badge variant="outline" className="mt-2 w-full justify-center flex items-center gap-1 bg-muted">
              <Award size={12} className="text-brand-red" />
              {performer.nextEvent.type}: {performer.nextEvent.timeRemaining}
            </Badge>
          )}
        </div>
        
        {/* Informations et statistiques */}
        <div className="flex-1">
          {/* Badge de niveau et revenus (visible uniquement par le créateur) */}
          {renderRevenueBadge()}
          
          {/* Statistiques de revenus (visibles uniquement par le créateur) */}
          {renderRevenueStats()}
          
          {/* Nom et description */}
          <h2 className="font-bold mb-1">{performer.displayName}</h2>
          <p className="text-sm text-muted-foreground mb-2">{performer.description}</p>
          
          {/* Métriques d'impact */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-3">
            <div>
              <span className="font-semibold">{performer.followers}</span>
              <span className="text-muted-foreground ml-1">abonnés</span>
            </div>
            <div>
              <span className="font-semibold">{performer.stats.retentionRate}</span>
              <span className="text-muted-foreground ml-1">fidélisation</span>
            </div>
            <div>
              <span className="font-semibold">{performer.stats.superfans.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">super-fans</span>
            </div>
            <div>
              <span className="font-semibold">{performer.stats.watchMinutes}</span>
              <span className="text-muted-foreground ml-1">minutes vues</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div className="flex gap-2 mt-4">
        <Button 
          onClick={onToggleFollow}
          className={`flex-1 ${isFollowing ? 
            'bg-gray-200 hover:bg-gray-300 text-black' : 
            'bg-primary text-primary-foreground'}`}
          size="sm"
        >
          {isFollowing ? 'Suivi(e)' : 'Suivre'}
        </Button>
        <Button 
          onClick={onSubscribe}
          className="flex-1 animated-gradient-bg text-white"
          size="sm"
        >
          S'abonner
        </Button>
        <Button 
          onClick={onSendMessage}
          className={`${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-black' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}
          size="sm"
        >
          <MessageCircle size={18} />
        </Button>
      </div>
    </section>
  );
};

export default CreatorHeader;
