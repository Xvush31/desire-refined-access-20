
import React, { useRef, useEffect, useState } from "react";
import XTeaseVideoCard from "./XTeaseVideoCard";
import XTeaseSecurityIncidentBanner from "./XTeaseSecurityIncidentBanner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "lucide-react";
import { useXTeaseNavigation } from "@/hooks/useXTeaseNavigation";
import { XTeaseSettings } from "@/pages/XTease";

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
  settings: XTeaseSettings;
  toggleDataSavingMode: () => void;
  toggleAutoPlay: () => boolean;
  updateWatchProgress: (videoId: number, progress: number) => void;
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
  settings,
  toggleDataSavingMode,
  toggleAutoPlay,
  updateWatchProgress
}) => {
  const [displayedVideos, setDisplayedVideos] = useState(videos.slice(0, 3));
  const [hasMore, setHasMore] = useState(true);

  const {
    containerRef,
    registerVideoRef,
    scrollToVideo,
    handleTouchStart,
    handleTouchEnd,
    autoPlayEnabled,
    toggleAutoPlay: toggleAutoPlayNavigation
  } = useXTeaseNavigation({
    currentIndex: currentVideoIndex,
    totalVideos: displayedVideos.length,
    onChangeIndex: setCurrentVideoIndex,
    onActivatePlayer: () => setIsPlayerActive(true)
  });

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
    // Sync autoplay settings
    if (autoPlayEnabled !== settings.autoPlayEnabled) {
      toggleAutoPlayNavigation();
    }
  }, [settings.autoPlayEnabled, autoPlayEnabled, toggleAutoPlayNavigation]);

  useEffect(() => {
    // Scroll to the current video when index changes
    scrollToVideo(currentVideoIndex);
  }, [currentVideoIndex, scrollToVideo]);

  return (
    <div
      ref={containerRef}
      id="scrollableDiv"
      className="h-[calc(100vh-80px)] overflow-y-auto snap-y snap-mandatory"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
            ref={(ref) => registerVideoRef(index, ref)}
            data-index={index}
            className="min-h-full w-full snap-start snap-always flex items-center justify-center p-2 sm:p-4"
            style={{ minHeight: 'calc(100vh - 80px)' }}
          >
            <XTeaseVideoCard
              video={video}
              index={index}
              currentVideoIndex={currentVideoIndex}
              isPlayerActive={isPlayerActive}
              showSecurityIncident={showSecurityIncident}
              dataSavingMode={settings.dataSavingMode}
              onPlay={() => {
                setIsPlayerActive(true);
                if (Math.random() < 0.3 && !showSecurityIncident) {
                  setTimeout(() => {
                    setShowSecurityIncident(true);
                    setTimeout(() => setShowSecurityIncident(false), 5000);
                  }, 3000);
                }
              }}
              onVideoProgress={(progress) => updateWatchProgress(video.id, progress)}
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
