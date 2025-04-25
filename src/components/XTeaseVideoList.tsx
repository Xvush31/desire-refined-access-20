import React, { useRef, useEffect, useState } from "react";
import XTeaseVideoCard from "./XTeaseVideoCard";
import XTeaseSecurityIncidentBanner from "./XTeaseSecurityIncidentBanner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "lucide-react";

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
  const [displayedVideos, setDisplayedVideos] = useState(videos.slice(0, 3));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    const currentLength = displayedVideos.length;
    const moreVideos = videos.slice(currentLength, currentLength + 2);
    
    if (displayedVideos.length >= videos.length) {
      setHasMore(false);
      return;
    }
    
    setTimeout(() => {
      setDisplayedVideos([...displayedVideos, ...moreVideos]);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const containerHeight = containerRef.current.clientHeight;
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / containerHeight);
      if (
        index !== currentVideoIndex &&
        index >= 0 &&
        index < displayedVideos.length
      ) {
        setCurrentVideoIndex(index);
        setIsPlayerActive(false);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentVideoIndex, setCurrentVideoIndex, displayedVideos.length, setIsPlayerActive]);

  return (
    <div
      ref={containerRef}
      id="scrollableDiv"
      className="h-[calc(100vh-80px)] overflow-y-auto snap-y snap-mandatory"
    >
      <InfiniteScroll
        dataLength={displayedVideos.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center py-4">
            <Loader className="animate-spin w-6 h-6 text-pink-500" />
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        {displayedVideos.map((video, index) => (
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
      </InfiniteScroll>

      <XTeaseSecurityIncidentBanner show={showSecurityIncident} />
    </div>
  );
};

export default XTeaseVideoList;
