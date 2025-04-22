
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Play, Check } from "lucide-react";
import HLSVideoPlayer from "@/components/HLSVideoPlayer";
import SubscriptionPromoBanner from "@/components/SubscriptionPromoBanner";
import AIContentSuggestions from "@/components/AIContentSuggestions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Données statiques pour les vidéos XTease
const xteaseVideos = [
  {
    id: 1,
    title: "Moment intime en soirée",
    performer: "PartyGirl",
    views: "421K vues",
    thumbnail: "https://picsum.photos/seed/xtease1/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-1/playlist.m3u8", // URL fictive HLS
    isPremium: false,
    isPreview: true,
  },
  {
    id: 2,
    title: "Séance photo qui devient personnelle",
    performer: "PhotoArtist",
    views: "732K vues",
    thumbnail: "https://picsum.photos/seed/xtease2/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-2/playlist.m3u8", // URL fictive HLS
    isPremium: true,
    isPreview: false,
  },
  {
    id: 3,
    title: "Rencontre dans un hôtel 5 étoiles",
    performer: "LuxuryCouple",
    views: "628K vues",
    thumbnail: "https://picsum.photos/seed/xtease3/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-3/playlist.m3u8", // URL fictive HLS
    isPremium: true,
    isPreview: false,
  },
];

// Données statiques pour les suggestions de l'IA
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Gestion du défilement
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerHeight = containerRef.current.clientHeight;
      const scrollTop = containerRef.current.scrollTop;
      
      // Détermine l'index de la vidéo basé sur le scroll
      const index = Math.round(scrollTop / containerHeight);
      if (index !== currentVideoIndex && index >= 0 && index < xteaseVideos.length) {
        setCurrentVideoIndex(index);
        setIsPlayerActive(false); // Reset l'état de lecture quand on change de vidéo
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentVideoIndex]);

  const handleVideoComplete = () => {
    // Logique à exécuter quand une vidéo se termine
    console.log("Vidéo terminée:", xteaseVideos[currentVideoIndex].title);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div 
        ref={containerRef}
        className="h-[calc(100vh-80px)] overflow-y-auto snap-y snap-mandatory"
      >
        {xteaseVideos.map((video, index) => (
          <div 
            key={video.id}
            className="h-full w-full snap-start snap-always flex items-center justify-center p-4"
          >
            <div className="relative w-full h-full max-w-md mx-auto flex flex-col">
              {/* Bannière promotion abonnement */}
              {video.isPremium && !isPlayerActive && (
                <SubscriptionPromoBanner tier="premium" />
              )}
              
              <div className="relative flex-grow w-full flex items-center justify-center bg-black rounded-xl overflow-hidden">
                {isPlayerActive && currentVideoIndex === index ? (
                  <HLSVideoPlayer 
                    src={video.streamUrl}
                    poster={video.thumbnail} 
                    title={video.title}
                    onVideoComplete={handleVideoComplete}
                    isPreview={video.isPreview}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        onClick={() => {
                          setIsPlayerActive(true);
                          // Simulate security incident detection on 30% of play actions
                          if (Math.random() < 0.3 && !showSecurityIncident) {
                            setTimeout(() => {
                              setShowSecurityIncident(true);
                              setTimeout(() => {
                                setShowSecurityIncident(false);
                              }, 5000);
                            }, 3000);
                          }
                        }}
                        className="bg-black/30 hover:bg-black/50 text-white p-4 rounded-full transition-colors w-16 h-16 flex items-center justify-center"
                      >
                        <Play size={32} className="text-white" />
                      </Button>
                    </div>
                    
                    {/* Si c'est une vidéo premium */}
                    {video.isPremium && (
                      <div className="absolute top-3 right-3 bg-brand-gradient rounded-full px-3 py-1 text-sm font-medium text-white animated-gradient-bg">
                        Premium
                      </div>
                    )}
                    
                    {/* Video info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white">{video.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-gray-200">{video.performer}</p>
                        <p className="text-sm text-gray-200">{video.views}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Suggestions de l'IA */}
              {currentVideoIndex === index && isPlayerActive && (
                <AIContentSuggestions suggestions={aiSuggestions} />
              )}
              
              {/* Message d'incident de sécurité */}
              {showSecurityIncident && (
                <div className="fixed inset-x-0 top-4 mx-auto w-11/12 max-w-md z-50 animate-fade-in">
                  <div className="bg-red-500/90 text-white px-4 py-3 rounded-lg shadow-lg">
                    <div className="flex items-center">
                      <div className="rounded-full bg-white p-1 mr-3">
                        <Check className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Tentative de capture détectée</p>
                        <p className="text-sm">Notre système a détecté une capture d'écran. Le contenu est protégé.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Si la vidéo est terminée mais que l'utilisateur n'est pas abonné */}
              {video.isPreview && (
                <div className="mt-4">
                  <Link to="/subscription" className="w-full animated-gradient-bg text-white font-medium py-3 rounded-lg flex items-center justify-center">
                    Voir les vidéos complètes
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XTease;
