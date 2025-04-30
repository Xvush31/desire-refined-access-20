
import { PerformerData } from "../types/performer";
import { ContentItem } from "../components/content/ContentCard";

// Mock data pour les tests
const mockPerformers: Record<string, PerformerData> = {
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

// Mock data for the content collections
const mockCollections = {
  "1": [
    {
      id: "coll-1",
      name: "Voyages exotiques",
      description: "Mes aventures dans des destinations paradisiaques",
      thumbnail: "https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3",
      itemCount: 32,
      itemTypes: {
        videos: 12,
        images: 18,
        audio: 2
      }
    },
    {
      id: "coll-2",
      name: "Lifestyle urbain",
      description: "La vie quotidienne dans les grandes métropoles",
      thumbnail: "https://images.unsplash.com/photo-1548266652-99cf27701ced?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      itemCount: 45,
      itemTypes: {
        videos: 22,
        images: 20,
        text: 3
      }
    },
    {
      id: "coll-3",
      name: "Conseils mode",
      description: "Astuces et inspirations pour votre style personnel",
      thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3",
      itemCount: 28,
      itemTypes: {
        videos: 10,
        images: 15,
        text: 3
      }
    }
  ],
  "2": [
    {
      id: "coll-4",
      name: "Portrait urbain",
      description: "Portraits en milieu urbain avec éclairage naturel",
      thumbnail: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3",
      itemCount: 24,
      itemTypes: {
        videos: 8,
        images: 16
      }
    },
    {
      id: "coll-5",
      name: "Architecture moderne",
      description: "Lignes et formes de l'architecture contemporaine",
      thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      itemCount: 32,
      itemTypes: {
        videos: 7,
        images: 25
      }
    }
  ],
  "3": [
    {
      id: "coll-6",
      name: "Entraînement HIIT",
      description: "Séances d'entraînement haute intensité",
      thumbnail: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      itemCount: 48,
      itemTypes: {
        videos: 35,
        images: 10,
        audio: 3
      }
    },
    {
      id: "coll-7",
      name: "Nutrition équilibrée",
      description: "Conseils et recettes pour une alimentation saine",
      thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      itemCount: 42,
      itemTypes: {
        videos: 18,
        images: 20,
        text: 4
      }
    },
    {
      id: "coll-8",
      name: "Yoga débutant",
      description: "Initiation aux postures de base du yoga",
      thumbnail: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      itemCount: 36,
      itemTypes: {
        videos: 20,
        images: 12,
        audio: 4
      }
    }
  ]
};

// Function to get performer collections
export const fetchPerformerCollections = (performerId: string): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCollections[performerId as keyof typeof mockCollections] || []);
    }, 800);
  });
};

// Generate mock content items based on formats
export const fetchPerformerContent = (
  performerId: string, 
  format: "all" | "video" | "image" | "audio" | "text" = "all",
  limit: number = 20,
  includeMetrics: boolean = true
): Promise<ContentItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const performer = mockPerformers[performerId];
      if (!performer) {
        resolve([]);
        return;
      }
      
      let contentCount = 0;
      let contentTypes: ("video" | "image" | "audio" | "text")[] = [];
      
      if (format === "all") {
        contentTypes = ["video", "image", "audio", "text"];
        contentCount = performer.content?.total || 20;
      } else {
        contentTypes = [format];
        switch (format) {
          case "video": contentCount = performer.content?.formats?.videos || 10; break;
          case "image": contentCount = performer.content?.formats?.photos || 10; break;
          case "audio": contentCount = performer.content?.formats?.audio || 5; break;
          case "text": contentCount = performer.content?.formats?.text || 5; break;
        }
      }
      
      // Get content count or use limit if smaller
      const count = Math.min(contentCount, limit);
      
      // Generate mock content
      const content: ContentItem[] = Array.from({ length: count }, (_, i) => {
        const formatIndex = i % contentTypes.length;
        const format = contentTypes[formatIndex];
        const isPremium = Math.random() > 0.7;
        const isVip = Math.random() > 0.9;
        const isTrending = Math.random() > 0.8;
        
        // Pick from performer collections if available
        const collections = performer.content?.collections || [];
        const itemCollections = collections.length > 0 && Math.random() > 0.5 
          ? [collections[Math.floor(Math.random() * collections.length)]] 
          : [];
        
        const type = isVip ? "vip" : isPremium ? "premium" : "standard";
        const valueScore = Math.floor(Math.random() * 100);
        
        // Get random thumbnail based on format
        const getRandomThumbnail = () => {
          const imageId = 1000000000 + Math.floor(Math.random() * 1000000);
          return `https://picsum.photos/seed/${performerId}-${i}-${format}/800/450`;
        };
        
        // Format-specific properties
        let formatProperties: Partial<ContentItem> = {};
        switch (format) {
          case "video":
            formatProperties = {
              duration: `${Math.floor(Math.random() * 15) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
              metrics: includeMetrics ? {
                views: Math.floor(Math.random() * 100000) + 1000,
                likes: Math.floor(Math.random() * 10000) + 100,
                engagement: Number((Math.random() * 10 + 2).toFixed(1)),
                completionRate: Math.floor(Math.random() * 40) + 60,
                watchTime: `${Math.floor(Math.random() * 9) + 1}m ${Math.floor(Math.random() * 50) + 10}s`
              } : undefined
            };
            break;
          case "image":
            formatProperties = {
              metrics: includeMetrics ? {
                views: Math.floor(Math.random() * 80000) + 1000,
                likes: Math.floor(Math.random() * 8000) + 100,
                engagement: Number((Math.random() * 15 + 5).toFixed(1))
              } : undefined
            };
            break;
          case "audio":
            formatProperties = {
              duration: `${Math.floor(Math.random() * 5) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
              metrics: includeMetrics ? {
                views: Math.floor(Math.random() * 50000) + 500,
                likes: Math.floor(Math.random() * 5000) + 50,
                engagement: Number((Math.random() * 8 + 1).toFixed(1))
              } : undefined
            };
            break;
          case "text":
            formatProperties = {
              metrics: includeMetrics ? {
                views: Math.floor(Math.random() * 30000) + 200,
                likes: Math.floor(Math.random() * 3000) + 20,
                engagement: Number((Math.random() * 5 + 1).toFixed(1))
              } : undefined
            };
            break;
        }
        
        return {
          id: `${performerId}-${format}-${i}`,
          title: `${format === "video" ? "Vidéo" : format === "image" ? "Photo" : format === "audio" ? "Audio" : "Article"} #${i+1} - ${performer.displayName}`,
          thumbnail: getRandomThumbnail(),
          type,
          format,
          trending: isTrending,
          trendingRank: isTrending ? Math.floor(Math.random() * 10) + 1 : undefined,
          valueScore,
          publishDate: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2025`,
          collections: itemCollections,
          revenue: includeMetrics && Math.random() > 0.7 ? Math.floor(Math.random() * 500) + 50 : undefined,
          ...formatProperties
        };
      });
      
      resolve(content);
    }, 1200);
  });
};

// Function to get trending content across creators
export const fetchTrendingContent = (
  limit: number = 10
): Promise<ContentItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate trending content from various performers
      const content: ContentItem[] = Array.from({ length: limit }, (_, i) => {
        // Pick a random performer
        const performerIds = Object.keys(mockPerformers);
        const performerId = performerIds[Math.floor(Math.random() * performerIds.length)];
        const performer = mockPerformers[performerId];
        
        // Randomize content type and format
        const format = Math.random() > 0.5 ? "video" : "image";
        const isPremium = Math.random() > 0.4;  // More premium content in trending
        
        const getRandomThumbnail = () => {
          return `https://picsum.photos/seed/trending-${i}-${format}/800/450`;
        };
        
        // Format-specific properties
        const formatProperties = format === "video" 
          ? {
              duration: `${Math.floor(Math.random() * 15) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
              metrics: {
                views: Math.floor(Math.random() * 1000000) + 100000, // Higher views for trending
                likes: Math.floor(Math.random() * 100000) + 10000,
                engagement: Number((Math.random() * 20 + 10).toFixed(1)), // Higher engagement
                completionRate: Math.floor(Math.random() * 20) + 80 // Higher completion rate
              }
            }
          : {
              metrics: {
                views: Math.floor(Math.random() * 800000) + 50000,
                likes: Math.floor(Math.random() * 80000) + 5000,
                engagement: Number((Math.random() * 25 + 10).toFixed(1))
              }
            };
        
        return {
          id: `trending-${i}`,
          title: `Contenu tendance ${i+1} - ${performer.displayName}`,
          thumbnail: getRandomThumbnail(),
          type: isPremium ? "premium" : "standard",
          format,
          trending: true,
          trendingRank: i + 1,
          valueScore: Math.floor(Math.random() * 20) + 80, // Higher value score for trending
          publishDate: `${Math.floor(Math.random() * 7) + 1}/05/2025`, // Recent dates for trending
          collections: performer.content?.collections && performer.content.collections.length > 0 
            ? [performer.content.collections[Math.floor(Math.random() * performer.content.collections.length)]] 
            : [],
          ...formatProperties
        };
      });
      
      resolve(content);
    }, 1000);
  });
};
