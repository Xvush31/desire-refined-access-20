import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Heart, Share2, Info } from "lucide-react";
import { useOptimizedLazyLoading } from "@/hooks/useOptimizedLazyLoading";
import EnhancedSharingMenu from "@/components/sharing/EnhancedSharingMenu";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useHLSPlayer } from "@/hooks/useHLSPlayer";
import { useVideoControls } from "@/hooks/useVideoControls";

interface OptimizedVideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  id: number;
  autoPlay?: boolean;
  onVideoProgress?: (progress: number) => void;
  onVideoComplete?: () => void;
  isPremium?: boolean;
  isPlaying?: boolean;
  onPlayToggle?: () => void;
}

const OptimizedVideoPlayer: React.FC<OptimizedVideoPlayerProps> = ({
  src,
  poster,
  title,
  id,
  autoPlay = false,
  onVideoProgress,
  onVideoComplete,
  isPremium = false,
  isPlaying: externalIsPlaying,
  onPlayToggle
}) => {
  const { ref, isVisible, hasBeenVisible } = useOptimizedLazyLoading({ threshold: 0.7 });
  const [isLiked, setIsLiked] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const {
    videoRef,
    hlsRef,
    isPlaying,
    currentTime,
    duration,
    buffering,
    loaded,
    qualityLevels,
    currentQuality,
  } = useHLSPlayer({
    src,
    autoPlay: autoPlay && isVisible,
    onVideoComplete,
    startMuted: true
  });
  
  const {
    volume,
    isMuted,
    togglePlay,
    toggleFullScreen,
    handleVolumeChange,
    toggleMute,
    handleSeek
  } = useVideoControls({ videoRef, hlsRef, duration });

  // Sync with external play state if provided
  useEffect(() => {
    if (externalIsPlaying !== undefined && isPlaying !== externalIsPlaying) {
      togglePlay();
    }
  }, [externalIsPlaying]);
  
  // Progress update
  useEffect(() => {
    if (onVideoProgress && duration > 0) {
      const progress = (currentTime / duration) * 100;
      onVideoProgress(Math.min(progress, 100));
    }
  }, [currentTime, duration, onVideoProgress]);
  
  // Auto-hide controls after inactivity
  useEffect(() => {
    if (!isControlsVisible) return;
    
    const hideControls = () => setIsControlsVisible(false);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(hideControls, 3000);
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isControlsVisible, isPlaying]);
  
  // Handle user interaction - show controls
  const handleInteraction = () => {
    setIsControlsVisible(true);
  };
  
  const handlePlayClick = () => {
    if (onPlayToggle) {
      onPlayToggle();
    } else {
      togglePlay();
    }
  };
  
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = formatTime(duration);
  
  // Helper to format seconds to mm:ss
  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  return (
    <div 
      ref={ref} 
      className="w-full h-full relative bg-black overflow-hidden"
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Video element */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          poster={poster}
          playsInline
          className="w-full h-full object-cover"
          style={{ display: hasBeenVisible ? 'block' : 'none' }}
        />
        
        {/* Loading indicator or poster before video appears */}
        {!hasBeenVisible && poster && (
          <div className="absolute inset-0 bg-black">
            <img src={poster} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Video overlay controls - fade in/out */}
      <div 
        className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-black/50 via-transparent to-black/70 transition-opacity duration-300 ${
          isControlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top controls */}
        <div className="flex justify-between items-center">
          {isPremium && (
            <span className="badge badge-premium px-3 py-1 text-sm font-medium">
              Premium
            </span>
          )}
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-black/40 hover:bg-black/60 text-white"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart 
                className={`h-5 w-5 ${isLiked ? 'fill-brand-red text-brand-red' : 'text-white'}`} 
              />
            </Button>
            
            <EnhancedSharingMenu 
              videoId={id}
              videoTitle={title}
              discreetMode={true}
            />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-black/40 hover:bg-black/60 text-white"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Center play/pause button */}
        <div className="absolute inset-0 flex items-center justify-center">
          {buffering ? (
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Button 
              variant="ghost"
              size="icon"
              className={`w-16 h-16 rounded-full bg-black/30 hover:bg-black/50 text-white ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
              onClick={handlePlayClick}
            >
              <Play size={36} className="ml-1" />
            </Button>
          )}
        </div>
        
        {/* Bottom controls */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
              onClick={handlePlayClick}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            
            <div className="flex items-center">
              <span className="text-xs text-white mr-2">
                {formattedCurrentTime} / {formattedDuration}
              </span>
              <Button 
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </Button>
            </div>
          </div>
          
          <Progress 
            value={progressPercentage} 
            className="h-1 cursor-pointer" 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = e.clientX - rect.left;
              const percentage = clickPos / rect.width;
              handleSeek(percentage * duration);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OptimizedVideoPlayer;
