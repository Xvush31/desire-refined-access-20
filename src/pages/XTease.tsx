
import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import XTeaseVideoList from "@/components/XTeaseVideoList";
import { toast } from "@/hooks/use-toast";
import { getXteaseVideos, SupabaseVideo } from "@/services/supabaseVideoService";
import { adaptSupabaseVideoToXTeaseFormat } from "@/adapters/videoAdapter";

// Données statiques pour les vidéos XTease - fallback si Supabase ne retourne rien
const allXTeaseVideos = [
  {
    id: 1,
    title: "Moment intime en soirée",
    performer: "PartyGirl",
    views: "421K vues",
    thumbnail: "https://picsum.photos/seed/xtease1/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-1/playlist.m3u8",
    isPremium: false,
    isPreview: true,
  },
  {
    id: 2,
    title: "Séance photo qui devient personnelle",
    performer: "PhotoArtist",
    views: "732K vues",
    thumbnail: "https://picsum.photos/seed/xtease2/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-2/playlist.m3u8",
    isPremium: true,
    isPreview: false,
  },
  {
    id: 3,
    title: "Rencontre dans un hôtel 5 étoiles",
    performer: "LuxuryCouple",
    views: "628K vues",
    thumbnail: "https://picsum.photos/seed/xtease3/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-3/playlist.m3u8",
    isPremium: true,
    isPreview: false,
  },
  {
    id: 4,
    title: "Vacances sous les tropiques",
    performer: "TravelCouple",
    views: "310K vues",
    thumbnail: "https://picsum.photos/seed/xtease4/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-1/playlist.m3u8",
    isPremium: false,
    isPreview: true,
  },
  {
    id: 5,
    title: "Session privée avec vue panoramique",
    performer: "LuxuryModel",
    views: "528K vues",
    thumbnail: "https://picsum.photos/seed/xtease5/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-2/playlist.m3u8",
    isPremium: true,
    isPreview: false,
  },
  {
    id: 6,
    title: "Week-end romantique à Paris",
    performer: "ParisianCouple",
    views: "487K vues",
    thumbnail: "https://picsum.photos/seed/xtease6/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-3/playlist.m3u8",
    isPremium: false,
    isPreview: true,
  },
  {
    id: 7,
    title: "Dîner aux chandelles qui s'enflamme",
    performer: "RomanticDuo",
    views: "632K vues",
    thumbnail: "https://picsum.photos/seed/xtease7/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-1/playlist.m3u8",
    isPremium: true,
    isPreview: false,
  },
  {
    id: 8,
    title: "Découverte sensuelle en backstage",
    performer: "BackstageModel",
    views: "712K vues",
    thumbnail: "https://picsum.photos/seed/xtease8/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-2/playlist.m3u8",
    isPremium: true,
    isPreview: false,
  },
  {
    id: 9,
    title: "Détente au spa qui dérape",
    performer: "SpaCouple",
    views: "543K vues",
    thumbnail: "https://picsum.photos/seed/xtease9/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-3/playlist.m3u8",
    isPremium: false,
    isPreview: true,
  },
  {
    id: 10,
    title: "Soirée privée entre amis spéciaux",
    performer: "PrivateParty",
    views: "821K vues",
    thumbnail: "https://picsum.photos/seed/xtease10/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-1/playlist.m3u8",
    isPremium: true,
    isPreview: false,
  }
];

// Données statiques pour suggestions IA
const aiSuggestions = [
  {
    id: "v-123",
    title: "Suite du moment intime - Version non censurée",
    thumbnail: "https://picsum.photos/seed/xtease-ai-1/640/360",
    type: "premium" as const,
    match: 95,
  },
  {
    id: "v-456",
    title: "Séance privée avec le même modèle",
    thumbnail: "https://picsum.photos/seed/xtease-ai-2/640/360",
    type: "vip" as const,
    match: 88,
  },
  {
    id: "v-789",
    title: "Vidéo exclusive du même créateur",
    thumbnail: "https://picsum.photos/seed/xtease-ai-3/640/360",
    type: "elite" as const,
    match: 82,
  },
];

export interface XTeaseSettings {
  dataSavingMode: boolean;
  autoPlayEnabled: boolean;
  watchHistory: {
    videoId: number;
    timestamp: number;
    progress: number;
  }[];
}

const defaultSettings: XTeaseSettings = {
  dataSavingMode: false,
  autoPlayEnabled: true,
  watchHistory: []
};

const XTease: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const [showSecurityIncident, setShowSecurityIncident] = useState(false);
  const [settings, setSettings] = useState<XTeaseSettings>(defaultSettings);
  
  // Supabase videos
  const [supabaseVideos, setSupabaseVideos] = useState<any[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('xtease-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({
          ...prevSettings,
          ...parsedSettings
        }));
      } catch (e) {
        console.error('Error parsing settings', e);
      }
    } else {
      localStorage.setItem('xtease-settings', JSON.stringify(defaultSettings));
    }
  }, []);
  
  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('xtease-settings', JSON.stringify(settings));
  }, [settings]);

  // Load videos from Supabase
  useEffect(() => {
    const loadSupabaseVideos = async () => {
      try {
        setLoading(true);
        const { data: videos, error } = await getXteaseVideos();
        
        if (error) {
          console.error("Error loading Xtease videos:", error);
          toast.error("Erreur lors du chargement des vidéos", {
            description: "Impossible de récupérer les vidéos depuis la base de données"
          });
          
          // Fallback to static data if no videos found
          setSupabaseVideos(allXTeaseVideos);
          setDisplayedVideos(allXTeaseVideos.slice(0, 5));
          return;
        }
        
        if (videos && videos.length > 0) {
          console.log("Loaded Xtease videos from Supabase:", videos.length);
          
          // Format videos for the XTeaseVideoCard component
          const formattedVideos = videos
            .filter(video => video !== null) // Filtrer les vidéos null
            .map(video => adaptSupabaseVideoToXTeaseFormat(video))
            .filter(video => video && video.streamUrl); // Vérifier que streamUrl existe
          
          console.log("Formatted videos:", formattedVideos.length);
          
          if (formattedVideos.length > 0) {
            setSupabaseVideos(formattedVideos);
            setDisplayedVideos(formattedVideos.slice(0, 5));
            setHasMore(formattedVideos.length > 5);
          } else {
            // Fallback if no valid videos
            console.log("No valid videos found in Supabase, using fallback data");
            setSupabaseVideos(allXTeaseVideos);
            setDisplayedVideos(allXTeaseVideos.slice(0, 5));
          }
        } else {
          console.log("No videos found in Supabase, using fallback data");
          // Fallback to static data if no videos found
          setSupabaseVideos(allXTeaseVideos);
          setDisplayedVideos(allXTeaseVideos.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to load videos from Supabase:", error);
        // Fallback to static data if error
        setSupabaseVideos(allXTeaseVideos);
        setDisplayedVideos(allXTeaseVideos.slice(0, 5));
      } finally {
        setLoading(false);
      }
    };
    
    loadSupabaseVideos();
  }, []);

  const handleVideoComplete = () => {
    console.log("Vidéo terminée:", displayedVideos[currentVideoIndex].title);
    
    // Add to watch history
    const updatedHistory = [...settings.watchHistory];
    const videoId = displayedVideos[currentVideoIndex].id;
    const existingIndex = updatedHistory.findIndex(h => h.videoId === videoId);
    
    if (existingIndex !== -1) {
      updatedHistory[existingIndex] = {
        videoId,
        timestamp: Date.now(),
        progress: 100
      };
    } else {
      updatedHistory.push({
        videoId,
        timestamp: Date.now(),
        progress: 100
      });
    }
    
    setSettings({
      ...settings,
      watchHistory: updatedHistory
    });
    
    // Auto-advance to next video if available
    if (settings.autoPlayEnabled && currentVideoIndex < displayedVideos.length - 1) {
      setTimeout(() => {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }, 1000);
    }
  };
  
  const toggleDataSavingMode = () => {
    const newMode = !settings.dataSavingMode;
    setSettings({
      ...settings,
      dataSavingMode: newMode
    });
    toast.success(`Mode économie de données ${newMode ? 'activé' : 'désactivé'}`);
  };
  
  const toggleAutoPlay = () => {
    const newMode = !settings.autoPlayEnabled;
    setSettings({
      ...settings,
      autoPlayEnabled: newMode
    });
    toast.success(`Lecture automatique ${newMode ? 'activée' : 'désactivée'}`);
    return newMode;
  };
  
  const updateWatchProgress = (videoId: number, progress: number) => {
    const updatedHistory = [...settings.watchHistory];
    const existingIndex = updatedHistory.findIndex(h => h.videoId === videoId);
    
    if (existingIndex !== -1) {
      updatedHistory[existingIndex] = {
        videoId,
        timestamp: Date.now(),
        progress
      };
    } else {
      updatedHistory.push({
        videoId,
        timestamp: Date.now(),
        progress
      });
    }
    
    setSettings({
      ...settings,
      watchHistory: updatedHistory
    });
  };

  // Fonction pour charger plus de vidéos (infinite scrolling)
  const loadMoreVideos = useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    
    // Simuler un délai de chargement
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * 5;
      const endIndex = startIndex + 5;
      const nextVideos = supabaseVideos.slice(startIndex, endIndex);
      
      if (nextVideos.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedVideos(prev => [...prev, ...nextVideos]);
        setPage(nextPage);
      }
      
      setLoading(false);
    }, 800);
  }, [page, loading, supabaseVideos]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <XTeaseVideoList
        videos={displayedVideos}
        aiSuggestions={aiSuggestions}
        currentVideoIndex={currentVideoIndex}
        setCurrentVideoIndex={setCurrentVideoIndex}
        isPlayerActive={isPlayerActive}
        setIsPlayerActive={setIsPlayerActive}
        showSecurityIncident={showSecurityIncident}
        setShowSecurityIncident={setShowSecurityIncident}
        handleVideoComplete={handleVideoComplete}
        settings={settings}
        toggleDataSavingMode={toggleDataSavingMode}
        toggleAutoPlay={toggleAutoPlay}
        updateWatchProgress={updateWatchProgress}
        loadMoreVideos={loadMoreVideos}
        hasMoreVideos={hasMore}
      />
    </div>
  );
};

export default XTease;
