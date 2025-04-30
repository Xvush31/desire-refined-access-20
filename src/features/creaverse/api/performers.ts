
import { PerformerData } from "../types/performer";

// Mock data pour les tests
const mockPerformers: Record<string, PerformerData> = {
  "1": {
    id: 1,
    username: "sophia_star",
    displayName: "Sophia Star",
    description: "Créatrice de contenu lifestyle et voyage 🌍✨",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
    followers: "432K",
    tier: "gold",
    tierProgress: 65,
    isLive: false,
    isActive: true,
    lastActive: "il y a 5 min",
    nextEvent: {
      type: "Live Stream",
      timeRemaining: "2h"
    },
    stats: {
      monthlyRevenue: 8420,
      monthlyRevenueChange: 12,
      watchMinutes: "1.2M",
      retentionRate: "78%",
      superfans: 1240
    }
  },
  "2": {
    id: 2,
    username: "marcus_creative",
    displayName: "Marcus Creative",
    description: "Photographie et art digital 📷🎨",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    followers: "215K",
    tier: "silver",
    tierProgress: 40,
    isLive: true,
    isActive: true,
    stats: {
      monthlyRevenue: 4150,
      monthlyRevenueChange: -3,
      watchMinutes: "850K",
      retentionRate: "64%",
      superfans: 680
    }
  },
  "3": {
    id: 3,
    username: "elena_fitness",
    displayName: "Elena Fitness",
    description: "Coach fitness et nutrition 💪🥗",
    image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3",
    followers: "678K",
    tier: "platinum",
    tierProgress: 85,
    isLive: false,
    isActive: false,
    lastActive: "il y a 3h",
    nextEvent: {
      type: "Workshop",
      timeRemaining: "2j"
    },
    stats: {
      monthlyRevenue: 12340,
      monthlyRevenueChange: 8,
      watchMinutes: "2.4M",
      retentionRate: "82%",
      superfans: 2100
    }
  }
};

// Fonction pour récupérer les données d'un performeur
export const fetchPerformerData = (performerId: string): Promise<PerformerData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const performer = mockPerformers[performerId];
      if (performer) {
        resolve(performer);
      } else {
        reject(new Error("Performer not found"));
      }
    }, 800); // Simule un délai réseau
  });
};

// Fonction pour récupérer tous les performeurs
export const fetchAllPerformers = (): Promise<PerformerData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.values(mockPerformers));
    }, 1000); // Simule un délai réseau
  });
};
