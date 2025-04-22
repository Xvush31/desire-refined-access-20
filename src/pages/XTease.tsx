
import React, { useState } from "react";
import Header from "@/components/Header";
import XTeaseVideoList from "@/components/XTeaseVideoList";

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

const XTease: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const [showSecurityIncident, setShowSecurityIncident] = useState(false);

  const handleVideoComplete = () => {
    console.log("Vidéo terminée:", xteaseVideos[currentVideoIndex].title);
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
      />
    </div>
  );
};

export default XTease;
