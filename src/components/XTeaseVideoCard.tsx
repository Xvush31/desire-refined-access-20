
import React, { useMemo } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubscriptionPromoBanner from "@/components/SubscriptionPromoBanner";
import AIContentSuggestions from "@/components/AIContentSuggestions";
import { Link } from "react-router-dom";
import HLSVideoPlayer from "@/components/HLSVideoPlayer";
import { useXTeaseInteractivity } from "@/hooks/useXTeaseInteractivity";

interface VideoData {
  id: number;
  title: string;
  performer: string;
  views: string;
  thumbnail: string;
  streamUrl: string;
  isPremium?: boolean;
  isPreview?: boolean;
  creatorProfileUrl?: string;
}

interface XTeaseVideoCardProps {
  video?: VideoData;
  index: number;
  currentVideoIndex: number;
  isPlayerActive: boolean;
  showSecurityIncident: boolean;
  dataSavingMode?: boolean;
  onPlay: () => void;
  onVideoProgress?: (progress: number) => void;
  onVideoComplete: () => void;
  aiSuggestions: Array<any>;
}

const XTeaseVideoCard: React.FC<XTeaseVideoCardProps> = ({
  video,
  index,
  currentVideoIndex,
  isPlayerActive,
  showSecurityIncident,
  dataSavingMode,
  onPlay,
  onVideoProgress,
  onVideoComplete,
  aiSuggestions,
}) => {
  // Make sure video exists before using it
  if (!video) {
    console.error("Video data is undefined in XTeaseVideoCard");
    return (
      <div className="relative w-full h-full max-w-md mx-auto flex flex-col items-center justify-center">
        <p className="text-white bg-black/40 p-4 rounded-lg">Vidéo non disponible</p>
      </div>
    );
  }

  // Check if streamUrl is defined - IMPROVED CHECK
  if (!video.streamUrl) {
    console.error(`Video with ID ${video.id} has no streamUrl`);
    return (
      <div className="relative w-full h-full max-w-md mx-auto flex flex-col items-center justify-center">
        <p className="text-white bg-black/40 p-4 rounded-lg">Lien de streaming non disponible</p>
        <Button 
          onClick={onVideoComplete} 
          className="mt-4 bg-red-500 hover:bg-red-600"
        >
          Passer à la suivante
        </Button>
      </div>
    );
  }

  console.log("XTeaseVideoCard rendering video:", video.id);
  console.log("Stream URL:", video.streamUrl);

  const { isFavorite } = useXTeaseInteractivity({ videoId: video.id });
  
  // Calculate if the video should be preloaded
  const shouldPreload = useMemo(() => {
    // Preload the current video and next video only if not in data saving mode
    return !dataSavingMode && 
           (index === currentVideoIndex || 
            index === currentVideoIndex + 1);
  }, [currentVideoIndex, index, dataSavingMode]);
  
  return (
    <div className="relative w-full h-full max-w-md mx-auto flex flex-col">
      {video.isPremium && !isPlayerActive && (
        <SubscriptionPromoBanner tier="premium" />
      )}

      <div className="relative flex-grow w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full bg-black rounded-xl overflow-hidden">
          {isPlayerActive && currentVideoIndex === index && video.streamUrl ? (
            <HLSVideoPlayer
              src={video.streamUrl}
              poster={video.thumbnail}
              title={video.title}
              videoId={video.id}
              onVideoComplete={onVideoComplete}
              isPreview={video.isPreview}
            />
          ) : (
            <div className="relative w-full aspect-[9/16]">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover"
                loading={shouldPreload ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={onPlay}
                  className="bg-black/30 hover:bg-black/50 text-white p-4 rounded-full transition-colors w-16 h-16 flex items-center justify-center"
                >
                  <Play size={32} className="text-white" />
                </Button>
              </div>
              {video.isPremium && (
                <div className="absolute top-3 right-3 badge badge-premium px-3 py-1 text-sm font-medium">
                  Premium
                </div>
              )}
              {isFavorite && (
                <div className="absolute top-3 left-3 bg-red-500/80 px-2 py-1 rounded text-xs text-white font-medium">
                  Favori
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-4 px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg">
        <h3 className="text-lg font-bold text-white drop-shadow-lg break-words">{video.title}</h3>
        <div className="flex justify-between items-center mt-2 flex-wrap gap-x-2">
          {video.creatorProfileUrl ? (
            <a 
              href={video.creatorProfileUrl} 
              className="text-sm font-medium text-white/90 drop-shadow-lg truncate hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {video.performer}
            </a>
          ) : (
            <p className="text-sm font-medium text-white/90 drop-shadow-lg truncate">
              {video.performer}
            </p>
          )}
          <p className="text-sm font-medium text-white/90 drop-shadow-lg truncate">
            {video.views}
          </p>
        </div>
      </div>

      {currentVideoIndex === index && isPlayerActive && (
        <AIContentSuggestions suggestions={aiSuggestions} />
      )}

      {video.isPreview && (
        <div className="mt-4">
          <Link
            to="/subscription"
            className="w-full badge badge-premium text-white font-medium py-3 rounded-lg flex items-center justify-center"
          >
            Voir les vidéos complètes
          </Link>
        </div>
      )}
    </div>
  );
};

export default XTeaseVideoCard;
