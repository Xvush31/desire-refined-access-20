
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Check, Lock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<number | null>(null);
  const [qualityLevels, setQualityLevels] = useState<Array<{height: number, bitrate: number}>>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const [isWatermarkVisible, setIsWatermarkVisible] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Setup HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Function to initialize HLS
    const initHls = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          maxBufferSize: 60 * 1000 * 1000,
          startLevel: -1, // Auto level selection
          debug: false
        });
        
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          console.log("Manifest parsed, found quality levels:", data.levels);
          setQualityLevels(data.levels);
          setLoaded(true);
          if (autoPlay) {
            video.play().catch(() => {
              console.log("Autoplay prevented by browser");
            });
          }
        });
        
        hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
          setCurrentQuality(data.level);
        });
        
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log("Network error, trying to recover...");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log("Media error, trying to recover...");
                hls.recoverMediaError();
                break;
              default:
                console.error("Unrecoverable HLS error:", data);
                break;
            }
          }
        });

        // Buffering events
        hls.on(Hls.Events.BUFFER_CREATED, () => {
          setBuffering(true);
        });
        
        hls.on(Hls.Events.BUFFER_APPENDED, () => {
          setBuffering(false);
        });

      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback for Safari and iOS devices which have native HLS support
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          setLoaded(true);
          if (autoPlay) video.play().catch(console.error);
        });
      } else {
        console.error("HLS is not supported in this browser and no fallback is available");
      }
    };

    initHls();
    
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, autoPlay]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Show subscription prompt when video is 80% complete and is preview mode
      if (isPreview && video.currentTime > video.duration * 0.8 && !showSubscriptionPrompt) {
        setShowSubscriptionPrompt(true);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      if (onVideoComplete) onVideoComplete();
    };

    const onPlay = () => {
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onWaiting = () => {
      setBuffering(true);
    };

    const onCanPlay = () => {
      setBuffering(false);
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [isPreview, onVideoComplete, showSubscriptionPrompt]);

  // Handle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => {
        console.error("Error attempting to play:", err);
      });
    }
  };

  // Handle fullscreen
  const toggleFullScreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    video.muted = newMutedState;
  };

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressRef.current;
    const video = videoRef.current;
    if (!progressBar || !video) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentClicked = clickPosition / rect.width;
    const newTime = duration * percentClicked;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format time (seconds) to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Set quality level
  const setQuality = (level: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
      setCurrentQuality(level);
    }
  };

  // Get current quality label
  const getCurrentQualityLabel = () => {
    if (currentQuality === -1) return "Auto";
    if (qualityLevels.length > currentQuality) {
      const level = qualityLevels[currentQuality];
      return `${level.height}p`;
    }
    return "Auto";
  };

  // Security features: Capture detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect print screen or screenshot shortcuts
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key === "c") ||
        (e.metaKey && (e.key === "c" || e.key === "s"))
      ) {
        showWatermark();
        toast({
          title: "Protection de contenu",
          description: "La copie d'écran n'est pas autorisée pour ce contenu.",
        });
        e.preventDefault();
      }
    };

    const showWatermark = () => {
      setIsWatermarkVisible(true);
      setTimeout(() => {
        setIsWatermarkVisible(false);
      }, 3000);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle idle state for controls visibility
  useEffect(() => {
    const handleMouseMove = () => {
      setIsControlsVisible(true);
      setIsIdle(false);
      
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
      
      idleTimerRef.current = window.setTimeout(() => {
        if (isPlaying) {
          setIsIdle(true);
          setIsControlsVisible(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseMove);
      container.addEventListener("mouseleave", () => {
        setIsControlsVisible(false);
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseMove);
        container.removeEventListener("mouseleave", () => {
          setIsControlsVisible(false);
        });
      }
      
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      className="video-container relative bg-black rounded-2xl overflow-hidden w-full aspect-video"
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
      
      {/* Watermark overlay (visible on capture attempt) */}
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
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${isControlsVisible ? "opacity-100" : "opacity-0"}`}
      >
        {/* Progress bar */}
        <div 
          ref={progressRef}
          className="w-full h-1 bg-gray-700 mb-4 cursor-pointer rounded-full overflow-hidden" 
          onClick={handleSeek}
        >
          <div 
            className="h-full animated-gradient-bg"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause button */}
            <button 
              className="text-white hover:text-brand-red p-1"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            {/* Volume control */}
            <div className="hidden md:flex items-center space-x-2">
              <button 
                className="text-white hover:text-brand-red p-1"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            {/* Time display */}
            <div className="text-white text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Quality selector */}
            <div className="relative group">
              <button className="text-white hover:text-brand-red text-xs p-1">
                {getCurrentQualityLabel()}
              </button>
              <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-black/90 rounded-md p-2 z-10">
                <div className="text-white text-xs space-y-2 min-w-[80px]">
                  <button 
                    className={`block w-full text-left px-2 py-1 hover:bg-white/10 rounded ${currentQuality === -1 ? 'text-brand-red font-bold' : ''}`}
                    onClick={() => setQuality(-1)}
                  >Auto</button>
                  {qualityLevels.map((level, index) => (
                    <button 
                      key={index}
                      className={`block w-full text-left px-2 py-1 hover:bg-white/10 rounded ${currentQuality === index ? 'text-brand-red font-bold' : ''}`}
                      onClick={() => setQuality(index)}
                    >
                      {level.height}p
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Fullscreen toggle */}
            <button 
              className="text-white p-1 cursor-pointer"
              onClick={toggleFullScreen}
              aria-label="Plein écran"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Subscription prompt overlay - shown near end of preview videos */}
      {showSubscriptionPrompt && isPreview && (
        <div className="absolute bottom-16 left-4 right-4 p-4 bg-black/80 border border-brand-red rounded-lg animate-fade-in">
          <h3 className="font-bold text-lg mb-2 animated-gradient">Découvrez la suite en VIP !</h3>
          <p className="text-sm text-white mb-3">Abonnez-vous maintenant pour voir la vidéo complète et accéder à tout notre contenu exclusif.</p>
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
