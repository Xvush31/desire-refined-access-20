import React, { useState, useEffect } from "react";
import { DatabaseIcon, Lock, Play, Volume2, VolumeX, Download, Save, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useHLSPlayer } from "@/hooks/useHLSPlayer";
import { useVideoControls } from "@/hooks/useVideoControls";
import { VideoControls } from "@/components/video/VideoControls";
import { useXTeaseInteractivity, VideoReaction } from "@/hooks/useXTeaseInteractivity";

interface HLSVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  videoId?: number;
  autoPlay?: boolean;
  onVideoComplete?: () => void;
  isPreview?: boolean;
}

const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({
  src,
  poster,
  title,
  videoId = 0,
  autoPlay = false,
  onVideoComplete,
  isPreview = false
}) => {
  const [dataSavingMode, setDataSavingMode] = useState(() => {
    return localStorage.getItem('xtease-data-saving') === 'true';
  });
  
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
    connectionQuality,
    toggleDataSavingMode
  } = useHLSPlayer({ 
    src, 
    autoPlay,
    onVideoComplete,
    startMuted: true,
    dataSavingMode
  });

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
  
  const {
    reactions,
    isFavorite,
    addReaction,
    toggleFavorite
  } = useXTeaseInteractivity({ videoId });

  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isWatermarkVisible, setIsWatermarkVisible] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [lastTapTime, setLastTapTime] = useState(0);

  useEffect(() => {
    const idleTimer = setTimeout(() => {
      if (isPlaying) {
        setIsIdle(true);
        setIsControlsVisible(false);
      }
    }, 3000);

    return () => clearTimeout(idleTimer);
  }, [isPlaying]);

  useEffect(() => {
    if (isPreview && currentTime > duration * 0.8 && !showSubscriptionPrompt) {
      setShowSubscriptionPrompt(true);
    }
  }, [currentTime, duration, isPreview, showSubscriptionPrompt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key === "c") ||
        (e.metaKey && (e.key === "c" || e.key === "s"))
      ) {
        setIsWatermarkVisible(true);
        setTimeout(() => setIsWatermarkVisible(false), 3000);
        
        toast.warning("Protection de contenu", {
          description: "La copie d'écran n'est pas autorisée pour ce contenu.",
        });
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  const handleTap = (e: React.MouseEvent) => {
    const now = Date.now();
    const isDoubleTap = now - lastTapTime < 300; // 300ms between taps
    
    if (isDoubleTap) {
      // Handle double tap - add heart reaction
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        addReaction('❤️', x, y);
      }
    } else {
      // Single tap - show/hide controls
      setIsControlsVisible(!isControlsVisible);
    }
    
    setLastTapTime(now);
  };
  
  const toggleDataSaving = () => {
    const newMode = toggleDataSavingMode();
    setDataSavingMode(newMode);
    localStorage.setItem('xtease-data-saving', newMode.toString());
    toast.success(`Mode économie de données ${newMode ? 'activé' : 'désactivé'}`);
  };
  
  const availableReactions = ['❤️', '🔥', '👏', '😍', '😮', '😂'];

  return (
    <div 
      ref={containerRef}
      className="video-container relative bg-black rounded-2xl overflow-hidden w-full aspect-[9/16]"
      onMouseMove={() => {
        setIsControlsVisible(true);
        setIsIdle(false);
      }}
      onMouseLeave={() => setIsControlsVisible(false)}
      onClick={handleTap}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        playsInline
        muted
      />
      
      {/* Floating reactions */}
      {reactions.map(reaction => (
        <div 
          key={reaction.id}
          className="absolute pointer-events-none animate-float-up opacity-80"
          style={{
            left: `${reaction.x}%`,
            bottom: `${reaction.y}%`,
            fontSize: '2rem'
          }}
        >
          {reaction.emoji}
        </div>
      ))}
      
      {(buffering || !loaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      
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

      {!isPlaying && !buffering && loaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          onClick={(e) => {
            e.stopPropagation(); // Prevent double-tap from firing
            togglePlay();
          }}
        >
          <button 
            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white animate-fade-in"
            aria-label="Play"
          >
            <Play size={36} fill="white" />
          </button>
        </div>
      )}

      {title && isControlsVisible && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
          <h2 className="text-white text-lg font-medium drop-shadow-lg">{title}</h2>
        </div>
      )}
      
      {/* Quick actions */}
      <div className="absolute right-4 top-16 flex flex-col gap-4 z-50">
        <button 
          className={`p-2 rounded-full transition-colors ${isFavorite ? "bg-red-600 text-white" : "bg-black/40 text-white hover:bg-red-600"}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={26} fill={isFavorite ? "white" : "none"} />
        </button>
        
        <button 
          className={`p-2 rounded-full ${dataSavingMode ? "bg-purple-600 text-white" : "bg-black/40 text-white"}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleDataSaving();
          }}
          aria-label="Mode économie de données"
        >
          <DatabaseIcon size={26} />
        </button>
      </div>

      <button 
        className="absolute top-4 right-4 z-50 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
      
      {/* Reaction picker */}
      {showReactionPicker && (
        <div 
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-black/70 rounded-full py-2 px-3 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            {availableReactions.map(emoji => (
              <button
                key={emoji}
                className="text-2xl hover:scale-125 transition-transform p-1"
                onClick={() => {
                  addReaction(emoji, 50, 50);
                  setShowReactionPicker(false);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

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
        onShowReactions={() => setShowReactionPicker(!showReactionPicker)}
      />

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
              onClick={(e) => {
                e.stopPropagation();
                setShowSubscriptionPrompt(false);
              }}
            >
              Plus tard
            </button>
          </div>
        </div>
      )}
      
      {/* Connection quality indicator */}
      {connectionQuality === 'low' && (
        <div className="absolute top-4 left-4 bg-black/50 rounded-md px-2 py-1 text-xs text-white">
          Connexion lente
        </div>
      )}
    </div>
  );
};

export default HLSVideoPlayer;
