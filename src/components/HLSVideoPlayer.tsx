
import React, { useState, useEffect } from "react";
import { Lock, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useHLSPlayer } from "@/hooks/useHLSPlayer";
import { useVideoControls } from "@/hooks/useVideoControls";
import { VideoControls } from "@/components/video/VideoControls";

interface HLSVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  onVideoComplete?: () => void;
  isPreview?: boolean;
}

const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({
  src,
  poster,
  title,
  autoPlay = false,
  onVideoComplete,
  isPreview = false
}) => {
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
    setCurrentQuality
  } = useHLSPlayer({ src, autoPlay, onVideoComplete });

  const {
    containerRef,
    volume,
    isMuted,
    togglePlay,
    toggleFullScreen,
    handleVolumeChange,
    toggleMute,
    handleSeek,
    setQuality
  } = useVideoControls({ videoRef, hlsRef, duration });

  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isWatermarkVisible, setIsWatermarkVisible] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);

  // Handle idle state for controls visibility
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      if (isPlaying) {
        setIsIdle(true);
        setIsControlsVisible(false);
      }
    }, 3000);

    return () => clearTimeout(idleTimer);
  }, [isPlaying]);

  // Handle subscription prompt
  useEffect(() => {
    if (isPreview && currentTime > duration * 0.8 && !showSubscriptionPrompt) {
      setShowSubscriptionPrompt(true);
    }
  }, [currentTime, duration, isPreview, showSubscriptionPrompt]);

  // Security features: Capture detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key === "c") ||
        (e.metaKey && (e.key === "c" || e.key === "s"))
      ) {
        setIsWatermarkVisible(true);
        setTimeout(() => setIsWatermarkVisible(false), 3000);
        
        toast({
          title: "Protection de contenu",
          description: "La copie d'écran n'est pas autorisée pour ce contenu.",
        });
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="video-container relative bg-black rounded-2xl overflow-hidden w-full aspect-video"
      onMouseMove={() => {
        setIsControlsVisible(true);
        setIsIdle(false);
      }}
      onMouseLeave={() => setIsControlsVisible(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        poster={poster}
        playsInline
      />
      
      {/* Loading indicator */}
      {(buffering || !loaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Watermark overlay */}
      {isWatermarkVisible && (
        <div className="absolute inset-0 z-50 pointer-events-none grid grid-cols-3 grid-rows-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center opacity-30">
              <div className="transform -rotate-30 text-white flex flex-col items-center">
                <Lock className="h-6 w-6" />
                <span className="text-lg font-bold">CONTENU PROTÉGÉ</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Center play/pause button */}
      {!isPlaying && !buffering && loaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          onClick={togglePlay}
        >
          <button 
            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white animate-fade-in"
            aria-label="Play"
          >
            <Play size={36} fill="white" />
          </button>
        </div>
      )}

      {/* Title overlay */}
      {title && isControlsVisible && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent animate-fade-controls">
          <h2 className="text-white text-lg font-medium">{title}</h2>
        </div>
      )}

      {/* Video controls */}
      <VideoControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        qualityLevels={qualityLevels}
        currentQuality={currentQuality}
        isControlsVisible={isControlsVisible}
        onTogglePlay={togglePlay}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
        onSeek={handleSeek}
        onQualityChange={setQuality}
        onToggleFullscreen={toggleFullScreen}
      />

      {/* Subscription prompt overlay */}
      {showSubscriptionPrompt && isPreview && (
        <div className="absolute bottom-16 left-4 right-4 p-4 bg-black/80 border border-brand-red rounded-lg animate-fade-in">
          <h3 className="font-bold text-lg mb-2 animated-gradient">Découvrez la suite en VIP !</h3>
          <p className="text-sm text-white mb-3">
            Abonnez-vous maintenant pour voir la vidéo complète et accéder à tout notre contenu exclusif.
          </p>
          <div className="flex justify-between space-x-2">
            <button className="animated-gradient-bg rounded-lg px-4 py-2 text-white font-medium flex-1">
              S'abonner
            </button>
            <button 
              className="bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-sm"
              onClick={() => setShowSubscriptionPrompt(false)}
            >
              Plus tard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HLSVideoPlayer;
