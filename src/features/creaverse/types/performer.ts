
export interface PerformerData {
  id: number;
  username: string;
  displayName: string;
  image: string;
  videos: number;
  followers: string;
  following: number;
  description: string;
  joinDate: string;
  tags: string[];
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  tierProgress: number;
  stats: {
    likes: string;
    views: string;
    rating: number;
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
