
import { MockPerformersMap } from "./mockTypes";

// Mock data for performers
export const mockPerformers: MockPerformersMap = {
  "1": {
    id: 1,
    username: "juliesky",
    displayName: "Julie Sky",
    description: "Créatrice de contenu lifestyle et voyage 🌍✨",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
    followers: "64.4K",
    tier: "gold",
    tierProgress: 73,
    tierRevenue: "80% de revenus",
    nextTierRevenue: "90% de revenus",
    isLive: false,
    isActive: true,
    lastActive: "il y a 5 min",
    nextEvent: {
      type: "live",
      title: "Session photo spéciale abonnés",
      timeRemaining: "23h 45m",
      date: "Demain",
      time: "20:00"
    },
    stats: {
      monthlyRevenue: 4752,
      monthlyRevenueChange: 12,
      watchMinutes: "237.0K",
      retentionRate: "87%",
      superfans: 3200,
      subscriptions: 68,
      rating: 4.8,
      engagementRate: "24.6%",
      completionRate: "78%",
      averageWatchTime: "14m 32s",
      trendingScore: 89
    },
    content: {
      total: 124,
      premium: 37,
      trending: 8,
      formats: {
        videos: 45,
        photos: 62,
        audio: 10,
        text: 7
      },
      collections: ["Voyages exotiques", "Lifestyle urbain", "Conseils mode"]
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
    tierRevenue: "70% de revenus",
    nextTierRevenue: "80% de revenus",
    isLive: true,
    isActive: true,
    nextEvent: {
      type: "workshop",
      title: "Atelier photo en extérieur",
      timeRemaining: "2j 5h",
      date: "Mercredi",
      time: "14:00"
    },
    stats: {
      monthlyRevenue: 4150,
      monthlyRevenueChange: -3,
      watchMinutes: "850K",
      retentionRate: "64%",
      superfans: 680,
      subscriptions: 42,
      rating: 4.5,
      engagementRate: "18.7%",
      completionRate: "65%",
      averageWatchTime: "8m 45s",
      trendingScore: 72
    },
    content: {
      total: 87,
      premium: 24,
      trending: 3,
      formats: {
        videos: 32,
        photos: 48,
        audio: 2,
        text: 5
      },
      collections: ["Portrait urbain", "Architecture moderne", "Noir et blanc"]
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
    tierRevenue: "90% de revenus",
    nextTierRevenue: "95% de revenus",
    isLive: false,
    isActive: false,
    lastActive: "il y a 3h",
    nextEvent: {
      type: "Workshop",
      title: "Séance nutrition et recettes",
      timeRemaining: "2j",
      date: "Vendredi",
      time: "18:30"
    },
    stats: {
      monthlyRevenue: 12340,
      monthlyRevenueChange: 8,
      watchMinutes: "2.4M",
      retentionRate: "82%",
      superfans: 2100,
      subscriptions: 145,
      rating: 4.9,
      engagementRate: "32.1%",
      completionRate: "89%",
      averageWatchTime: "18m 20s",
      trendingScore: 94
    },
    content: {
      total: 218,
      premium: 86,
      trending: 15,
      formats: {
        videos: 86,
        photos: 102,
        audio: 22,
        text: 8
      },
      collections: ["Entraînement HIIT", "Nutrition équilibrée", "Yoga débutant", "Méditation guidée"]
    }
  }
};
