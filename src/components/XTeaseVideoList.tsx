
import React, { useRef, useEffect } from "react";
import XTeaseVideoCard from "./XTeaseVideoCard";
import XTeaseSecurityIncidentBanner from "./XTeaseSecurityIncidentBanner";

interface VideoData {
  id: number;
  title: string;
  performer: string;
  views: string;
  thumbnail: string;
  streamUrl: string;
  isPremium?: boolean;
  isPreview?: boolean;
}

interface XTeaseVideoListProps {
  videos: VideoData[];
  aiSuggestions: Array<any>;
  currentVideoIndex: number;
  setCurrentVideoIndex: (idx: number) => void;
  isPlayerActive: boolean;
  setIsPlayerActive: (b: boolean) => void;
  showSecurityIncident: boolean;
  setShowSecurityIncident: (v: boolean) => void;
  handleVideoComplete: () => void;
}

const XTeaseVideoList: React.FC<XTeaseVideoListProps> = ({
  videos,
  aiSuggestions,
  currentVideoIndex,
  setCurrentVideoIndex,
  isPlayerActive,
  setIsPlayerActive,
  showSecurityIncident,
  setShowSecurityIncident,
  handleVideoComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll behavior for index
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const containerHeight = containerRef.current.clientHeight;
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / containerHeight);
      if (
        index !== currentVideoIndex &&
        index >= 0 &&
        index < videos.length
      ) {
        setCurrentVideoIndex(index);
        setIsPlayerActive(false); // Reset si changement vidéo
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () =>
        container.removeEventListener("scroll", handleScroll);
    }
  }, [currentVideoIndex, setCurrentVideoIndex, videos.length, setIsPlayerActive]);
  
  // Optimize layout: all videos fit properly, no overlap

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-80px)] overflow-y-auto snap-y snap-mandatory"
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="min-h-full w-full snap-start snap-always flex items-center justify-center p-2 sm:p-4"
          style={{ minHeight: 'calc(100vh - 80px)' }}
        >
          <XTeaseVideoCard
            video={video}
            index={index}
            currentVideoIndex={currentVideoIndex}
            isPlayerActive={isPlayerActive}
            showSecurityIncident={showSecurityIncident}
            onPlay={() => {
              setIsPlayerActive(true);
              // Simulate security incident detection on 30% of play actions
              if (Math.random() < 0.3 && !showSecurityIncident) {
                setTimeout(() => {
                  setShowSecurityIncident(true);
                  setTimeout(() => setShowSecurityIncident(false), 5000);
                }, 3000);
              }
            }}
            onVideoComplete={handleVideoComplete}
            aiSuggestions={aiSuggestions}
          />
        </div>
      ))}

      {/* Security Banner should be global, only one instance outside video map */}
      <XTeaseSecurityIncidentBanner show={showSecurityIncident} />
    </div>
  );
};

export default XTeaseVideoList;
