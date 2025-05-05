
import axios from "axios";
import { CreatorFeedPost } from "@/components/creator/CreatorFeedItem";
import { CREAVERSE_DOMAIN } from "@/utils/creaverseLinks";

const CREAVERSE_API = `${CREAVERSE_DOMAIN}/api`;

/**
 * Fetches free videos and teasers from the CreaVerse platform
 * This allows synchronization between CreaVerse content and the XVush feed
 */
export const fetchCreaverseVideos = async (): Promise<CreatorFeedPost[]> => {
  try {
    const response = await axios.get(`${CREAVERSE_API}/free-videos`);
    
    // Transform data from CreaVerse format to CreatorFeedPost format
    return response.data.map((item: any) => ({
      id: `creaverse-${item.id}`,
      creatorId: parseInt(item.performerId || item.creatorId || "1"),
      creatorName: item.author || item.creatorName || "Créateur CreaVerse",
      creatorAvatar: item.performerImage || item.creatorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=256&h=256&q=80",
      image: item.thumbnail,
      caption: item.title || item.description || "Contenu exclusif",
      likes: item.metrics?.likes || Math.floor(Math.random() * 1000),
      timestamp: item.publishDate || "récemment",
      isPremium: false
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos CreaVerse:", error);
    // Return empty array on error to prevent app from crashing
    return [];
  }
};

/**
 * Mock implementation for development/testing before the API is ready
 * This generates fake data similar to what the real API would return
 */
export const mockCreaverseVideos = (): CreatorFeedPost[] => {
  const creators = [
    {
      id: 3,
      name: "Emma Stellar",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=256&h=256&q=80",
    },
    {
      id: 4,
      name: "Alex Wave",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&w=256&h=256&q=80",
    },
    {
      id: 5,
      name: "Julie Night",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=256&h=256&q=80",
    }
  ];
  
  const captions = [
    "Découvrez mon nouveau contenu gratuit ✨",
    "Un petit aperçu de mon prochain live 🎬",
    "Contenu exclusif pour la communauté 💖",
    "Teaser de mon prochain shooting photo 📸",
  ];
  
  return Array.from({ length: 5 }, (_, i) => {
    const creatorIndex = i % creators.length;
    const creator = creators[creatorIndex];
    
    return {
      id: `mock-creaverse-${i}`,
      creatorId: creator.id,
      creatorName: creator.name,
      creatorAvatar: creator.avatar,
      image: `https://picsum.photos/seed/creaverse${i}/600/1067`,
      caption: captions[i % captions.length],
      likes: Math.floor(Math.random() * 500) + 100,
      timestamp: "il y a 2 jours",
      isPremium: false
    };
  });
};
