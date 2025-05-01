
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

export interface VideoReaction {
  id: string;
  emoji: string;
  timestamp: number;
  x: number;
  y: number;
}

export interface FavoriteFolder {
  id: string;
  name: string;
  videos: number[];
}

interface UseXTeaseInteractivityProps {
  videoId: number;
}

export const useXTeaseInteractivity = ({ videoId }: UseXTeaseInteractivityProps) => {
  const [reactions, setReactions] = useState<VideoReaction[]>([]);
  const [favorites, setFavorites] = useState<FavoriteFolder[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('xtease-favorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
        
        // Check if current video is in any folder
        const isVideoInFavorites = parsedFavorites.some(
          (folder: FavoriteFolder) => folder.videos.includes(videoId)
        );
        setIsFavorite(isVideoInFavorites);
      } catch (e) {
        console.error('Error parsing favorites', e);
      }
    } else {
      // Initialize with default folders if none exist
      const defaultFolders = [
        { id: 'default', name: 'Favoris', videos: [] },
        { id: 'rewatch', name: 'À revoir', videos: [] }
      ];
      localStorage.setItem('xtease-favorites', JSON.stringify(defaultFolders));
      setFavorites(defaultFolders);
    }
  }, [videoId]);
  
  // Add a reaction to the current video
  const addReaction = (emoji: string, x: number, y: number) => {
    const newReaction = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      emoji,
      timestamp: Date.now(),
      x,
      y
    };
    
    setReactions(prev => [...prev, newReaction]);
    
    // Remove reaction after animation completes
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 3000);
  };
  
  // Toggle favorite status
  const toggleFavorite = (folderId: string = 'default') => {
    const updatedFavorites = [...favorites];
    const folderIndex = updatedFavorites.findIndex(f => f.id === folderId);
    
    if (folderIndex !== -1) {
      const folder = updatedFavorites[folderIndex];
      const videoIndex = folder.videos.indexOf(videoId);
      
      if (videoIndex !== -1) {
        // Remove from favorites
        folder.videos.splice(videoIndex, 1);
        setIsFavorite(false);
        toast.success('Retiré des favoris');
      } else {
        // Add to favorites
        folder.videos.push(videoId);
        setIsFavorite(true);
        toast.success(`Ajouté aux ${folder.name}`);
      }
      
      updatedFavorites[folderIndex] = folder;
      setFavorites(updatedFavorites);
      localStorage.setItem('xtease-favorites', JSON.stringify(updatedFavorites));
    }
  };
  
  // Create a new folder
  const createFolder = (name: string) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      videos: []
    };
    
    const updatedFavorites = [...favorites, newFolder];
    setFavorites(updatedFavorites);
    localStorage.setItem('xtease-favorites', JSON.stringify(updatedFavorites));
    
    return newFolder.id;
  };
  
  return {
    reactions,
    favorites,
    isFavorite,
    addReaction,
    toggleFavorite,
    createFolder
  };
};
