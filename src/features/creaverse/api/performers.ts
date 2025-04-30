
import { PerformerData } from "../types/performer";

// Données mockées pour les créateurs
const performerDetails: Record<string, PerformerData> = {
  "1": {
    id: 1,
    username: "juliesky",
    displayName: "Julie Sky",
    image: "https://picsum.photos/seed/perf1/150/150",
    videos: 63,
    followers: "64.4K",
    following: 68,
    description: "Passionnée et créative, Julie aime partager des moments intimes et authentiques. Elle se spécialise dans les vidéos solo et les danses sensuelles.",
    joinDate: "Jan 2022",
    tags: ["Amateur", "Solo", "Danse", "Lingerie", "Jeux de rôle"],
    tier: "gold",
    tierProgress: 73,
    stats: {
      likes: "5.7M",
      views: "28.4M",
      rating: 4.8,
      retentionRate: "87%",
      watchMinutes: "237K",
      monthlyRevenue: 4752,
      monthlyRevenueChange: 12,
      superfans: 3200
    },
    nextEvent: {
      type: "Live",
      timeRemaining: "3h24min"
    }
  },
  "2": {
    id: 2,
    username: "maxpower",
    displayName: "Max Power",
    image: "https://picsum.photos/seed/perf2/150/150",
    videos: 42,
    followers: "850K",
    following: 123,
    description: "Max propose des vidéos énergiques et passionnées avec différentes partenaires. Il se démarque par son énergie et sa créativité.",
    joinDate: "Mar 2021",
    tags: ["Couple", "Fitness", "POV", "Extérieur", "Sportif"],
    tier: "silver",
    tierProgress: 58,
    stats: {
      likes: "3.2M",
      views: "18.7M",
      rating: 4.6,
      retentionRate: "82%",
      watchMinutes: "184K",
      monthlyRevenue: 3268,
      monthlyRevenueChange: 8,
      superfans: 1850
    }
  },
  "3": {
    id: 3,
    username: "lexilove",
    displayName: "Lexi Love",
    image: "https://picsum.photos/seed/perf3/150/150",
    videos: 63,
    followers: "1.5M",
    following: 42,
    description: "Lexi est connue pour son charisme et sa douceur dans des scènes sensuelles. Elle aime explorer différents univers et fantasmes.",
    joinDate: "Nov 2020",
    tags: ["Glamour", "Lingerie", "Roleplay", "Romance", "ASMR"],
    tier: "platinum",
    tierProgress: 31,
    stats: {
      likes: "7.9M",
      views: "35.2M",
      rating: 4.9,
      retentionRate: "93%", 
      watchMinutes: "412K",
      monthlyRevenue: 8745,
      monthlyRevenueChange: 18,
      superfans: 5800
    },
    nextEvent: {
      type: "Nouveau contenu",
      timeRemaining: "demain"
    }
  },
};

/**
 * Récupère les données d'un créateur par son ID
 */
export const fetchPerformerData = async (
  performerId: string
): Promise<PerformerData> => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Récupérer les données du créateur
  const performer = performerDetails[performerId];
  
  if (!performer) {
    throw new Error(`Créateur avec l'ID ${performerId} non trouvé`);
  }
  
  return performer;
};

/**
 * Récupère la liste de tous les créateurs
 */
export const fetchAllPerformers = async (): Promise<PerformerData[]> => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Convertir l'objet en tableau
  return Object.values(performerDetails);
};
