
export interface PerformerData {
  id: number;
  username: string;
  displayName: string;
  description: string;
  image: string;
  followers: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  tierProgress: number;
  tierRevenue: string;
  nextTierRevenue: string;
  isLive?: boolean;
  isActive?: boolean;
  lastActive?: string;
  coverImage?: string; // Added coverImage property
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
    subscriptions?: number;
    rating: number;
    engagementRate?: string;
    completionRate?: string;
    averageWatchTime?: string;
    trendingScore?: number;
  };
  content?: {
    total: number;
    premium: number;
    trending: number;
    formats?: {
      videos: number;
      photos: number;
      audio: number;
      text: number;
    };
    collections?: string[];
  };
}
