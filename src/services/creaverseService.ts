import axios from "axios";
import { CreatorFeedPost } from "@/components/creator/CreatorFeedItem";
import { CREAVERSE_DOMAIN } from "@/utils/creaverseLinks";
import { getXteaseVideos } from "./supabaseVideoService";
import { supabaseVideoToFeedPost } from "./supabaseVideoService";

const CREAVERSE_API = `${CREAVERSE_DOMAIN}/api`;

/**
 * Fetches free videos and teasers from the CreaVerse platform
 * This allows synchronization between CreaVerse content and the XVush feed
 */
export const fetchCreaverseVideos = async () => {
  try {
    // Récupère les vidéos Xtease (format 9:16) depuis Supabase
    const { data: videos, error } = await getXteaseVideos();
    
    if (error) {
      console.error("Error fetching CreaVerse videos from Supabase:", error);
      return [];
    }

    if (!videos || videos.length === 0) {
      console.log("No CreaVerse videos found in Supabase");
      return [];
    }

    // Convertit les vidéos Supabase au format CreatorFeedPost
    const formattedVideos = videos.map(video => supabaseVideoToFeedPost(video));
    
    console.log(`Fetched ${formattedVideos.length} CreaVerse videos from Supabase`);
    return formattedVideos;
  } catch (error) {
    console.error("Failed to fetch CreaVerse videos:", error);
    return [];
  }
};

/**
 * Mock implementation for development/testing before the API is ready
 * This generates fake data similar to what the real API would return
 */
export const mockCreaverseVideos = () => {
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
