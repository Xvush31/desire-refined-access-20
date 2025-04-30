
export interface PerformerData {
  id: number;
  username: string;
  displayName: string;
  description: string;
  image: string;
  followers: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  tierProgress: number;
  tierRevenue: string; // Ajout du pourcentage de revenus par tier
  nextTierRevenue: string; // Ajout du pourcentage de revenus du prochain tier
  isLive?: boolean;
  isActive?: boolean;
  lastActive?: string;
  nextEvent?: {
    type: string;
    title: string;
    timeRemaining: string;
    date: string;
    time: string;
  };
  stats: {
    monthlyRevenue: number;
    monthlyRevenueChange: number;
    watchMinutes: string;
    retentionRate: string;
    superfans: number;
    subscriptions?: number; // Ajout du nombre d'abonnements
    rating: number;
  };
}
