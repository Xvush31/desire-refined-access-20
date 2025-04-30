
import { PerformerData } from "../types/performer";

// Simulated API fetch function for performer data
export const fetchPerformerData = async (performerId: string): Promise<PerformerData> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  // Return mock data
  return {
    id: Number(performerId),
    username: `creator${performerId}`,
    displayName: ["Lola Mystik", "Lucas Zen", "Sophie Dream", "Marc Elite", "Nina Secret"][Number(performerId) % 5],
    image: `https://picsum.photos/seed/${performerId}/200/200`,
    videos: 87,
    followers: "12.5K",
    following: 320,
    description: "Créatrice de contenu exclusif et artiste passionnée. Je partage mon univers avec vous ✨",
    joinDate: "2023-01-15",
    tags: ["Danse", "Voyages", "Lifestyle", "Mode"],
    tier: ["bronze", "silver", "gold", "platinum", "diamond"][Number(performerId) % 5] as "bronze" | "silver" | "gold" | "platinum" | "diamond",
    tierProgress: 75,
    stats: {
      likes: "265K",
      views: "1.2M",
      rating: 4.8,
      retentionRate: "86%",
      watchMinutes: "850K",
      monthlyRevenue: 7245,
      monthlyRevenueChange: 12,
      superfans: 1250
    },
    nextEvent: {
      type: "Live exclusif",
      timeRemaining: "Aujourd'hui, 20:00"
    }
  };
};
