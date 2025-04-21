
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Play } from "lucide-react";

// Données statiques pour les vidéos XTease
const xteaseVideos = [
  {
    id: 1,
    title: "Moment intime en soirée",
    performer: "PartyGirl",
    views: "421K vues",
    thumbnail: "https://picsum.photos/seed/xtease1/1080/1920",
  },
  {
    id: 2,
    title: "Séance photo qui devient personnelle",
    performer: "PhotoArtist",
    views: "732K vues",
    thumbnail: "https://picsum.photos/seed/xtease2/1080/1920",
  },
  {
    id: 3,
    title: "Rencontre dans un hôtel 5 étoiles",
    performer: "LuxuryCouple",
    views: "628K vues",
    thumbnail: "https://picsum.photos/seed/xtease3/1080/1920",
  },
];

const XTease: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
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
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentVideoIndex]);

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
            className="h-full w-full snap-start snap-always flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-md mx-auto">
              <div className="relative h-full w-full overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="h-full w-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-black/30 hover:bg-black/50 text-white p-4 rounded-full transition-colors">
                    <Play size={40} className="text-white" fill="white" />
                  </button>
                </div>
                
                {/* Video info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white">{video.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-200">{video.performer}</p>
                    <p className="text-sm text-gray-200">{video.views}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XTease;
