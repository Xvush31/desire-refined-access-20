
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import XTeaseVideoList from "@/components/XTeaseVideoList";
import { toast } from "@/hooks/use-toast";

// Données statiques pour les vidéos XTease
const xteaseVideos = [
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

  const handleVideoComplete = () => {
    console.log("Vidéo terminée:", xteaseVideos[currentVideoIndex].title);
    
    // Add to watch history
    const updatedHistory = [...settings.watchHistory];
    const videoId = xteaseVideos[currentVideoIndex].id;
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
    if (settings.autoPlayEnabled && currentVideoIndex < xteaseVideos.length - 1) {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <XTeaseVideoList
        videos={xteaseVideos}
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
      />
    </div>
  );
};

export default XTease;
