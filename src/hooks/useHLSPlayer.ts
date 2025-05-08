
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface UseHLSPlayerProps {
  src: string;
  autoPlay?: boolean;
  onVideoComplete?: () => void;
  startMuted?: boolean;
  dataSavingMode?: boolean;
}

// Define a type for NetworkInformation which doesn't exist in standard lib.dom.d.ts
interface NetworkInformation extends EventTarget {
  downlink: number;
  effectiveType: string;
  rtt: number;
  saveData: boolean;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

// Extend Navigator to include connection property
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

export const useHLSPlayer = ({ 
  src, 
  autoPlay = false, 
  onVideoComplete,
  startMuted = false,
  dataSavingMode = false
}: UseHLSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [qualityLevels, setQualityLevels] = useState<Array<{height: number, bitrate: number}>>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const [connectionQuality, setConnectionQuality] = useState<'low'|'medium'|'high'>('high');
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  // Detect network quality
  useEffect(() => {
    const nav = navigator as NavigatorWithConnection;
    if (!nav.connection) return;
    
    const connection = nav.connection;
    
    const updateConnectionQuality = () => {
      if (connection.downlink) {
        if (connection.downlink < 1) {
          setConnectionQuality('low');
        } else if (connection.downlink < 5) {
          setConnectionQuality('medium');
        } else {
          setConnectionQuality('high');
        }
      }
    };
    
    updateConnectionQuality();
    connection.addEventListener('change', updateConnectionQuality);
    
    return () => {
      connection.removeEventListener('change', updateConnectionQuality);
    };
  }, []);

  // Load saved position from localStorage
  useEffect(() => {
    if (!videoRef.current || !src) return;
    
    const savedTime = localStorage.getItem(`video-position-${src}`);
    if (savedTime) {
      const time = parseFloat(savedTime);
      if (!isNaN(time) && time > 0 && videoRef.current.duration && time < videoRef.current.duration - 10) {
        videoRef.current.currentTime = time;
      }
    }
  }, [src, loaded]);
  
  // Save position to localStorage
  useEffect(() => {
    if (currentTime > 0 && src) {
      localStorage.setItem(`video-position-${src}`, currentTime.toString());
    }
    
    return () => {
      if (currentTime > 0 && src) {
        localStorage.setItem(`video-position-${src}`, currentTime.toString());
      }
    };
  }, [currentTime, src]);

  useEffect(() => {
    // First check if src is valid
    if (!src) {
      console.error("Invalid HLS source URL provided");
      setError("Invalid source URL");
      return;
    }
    
    const video = videoRef.current;
    if (!video) return;

    const initHls = () => {
      if (Hls.isSupported()) {
        // Clean up any existing HLS instance
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
        
        const hls = new Hls({
          maxBufferLength: dataSavingMode ? 30 : 60,
          maxMaxBufferLength: dataSavingMode ? 60 : 120
        });
        hlsRef.current = hls;
        
        // Handle HLS errors
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error(`HLS error: ${data.type}`, data);
          
          if (data.fatal) {
            switch(data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.info("Network error for video, trying to recover...");
                if (retryCount < maxRetries) {
                  setRetryCount(prev => prev + 1);
                  hls.startLoad();
                } else {
                  setError(`HLS error: ${data.details}`);
                }
                break;
                
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.info("Media error, trying to recover...");
                hls.recoverMediaError();
                break;
                
              default:
                setError(`HLS error: ${data.details}`);
                break;
            }
          }
        });
        
        // Attach HLS to video element
        hls.loadSource(src);
        hls.attachMedia(video);
        
        // Set quality levels when loaded
        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          setLoaded(true);
          
          if (data.levels && data.levels.length > 0) {
            const formattedLevels = data.levels.map((level: any) => ({
              height: level.height,
              bitrate: level.bitrate
            }));
            setQualityLevels(formattedLevels);
            
            // Set initial quality based on connection
            if (connectionQuality === 'low') {
              const lowestQuality = formattedLevels.length - 1;
              hls.currentLevel = lowestQuality;
              setCurrentQuality(lowestQuality);
            } else {
              hls.currentLevel = -1; // Auto
            }
          }
          
          // Auto-play if enabled
          if (autoPlay && !dataSavingMode) {
            video.muted = startMuted;
            video.play().catch(e => console.error("Failed to auto-play:", e));
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = src;
        
        video.addEventListener('loadedmetadata', () => {
          setLoaded(true);
          
          if (autoPlay && !dataSavingMode) {
            video.muted = startMuted;
            video.play().catch(e => console.error("Failed to auto-play:", e));
          }
        });
        
        video.addEventListener('error', (e) => {
          console.error("Video playback error:", e);
          setError(`Playback error: ${video.error?.message || 'Unknown error'}`);
        });
      } else {
        setError("HLS is not supported in this browser");
      }
    };
    
    // Initialize HLS
    initHls();
    
    // Setup event listeners
    if (video) {
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
        
        // Check for video completion
        if (video.currentTime > 0 && video.duration > 0 && 
            Math.abs(video.currentTime - video.duration) < 1) {
          if (onVideoComplete) {
            onVideoComplete();
          }
        }
      };
      
      const handleDurationChange = () => {
        if (video.duration && !isNaN(video.duration)) {
          setDuration(video.duration);
        }
      };
      
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleWaiting = () => setBuffering(true);
      const handlePlaying = () => setBuffering(false);
      
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('durationchange', handleDurationChange);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('playing', handlePlaying);
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('durationchange', handleDurationChange);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('playing', handlePlaying);
        
        // Clean up HLS
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }
  }, [src, autoPlay, startMuted, onVideoComplete, dataSavingMode, connectionQuality, retryCount, maxRetries]);
  
  const play = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Failed to play:", e));
    }
  };
  
  const pause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        play();
      } else {
        pause();
      }
    }
  };
  
  const seek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };
  
  const changeQuality = (levelIndex: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex;
      setCurrentQuality(levelIndex);
    }
  };
  
  const retry = () => {
    setError(null);
    setRetryCount(0);
    
    if (hlsRef.current) {
      hlsRef.current.startLoad();
    } else if (videoRef.current) {
      videoRef.current.load();
      if (autoPlay) {
        play();
      }
    }
  };
  
  return {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    buffering,
    qualityLevels,
    currentQuality,
    error,
    play,
    pause,
    togglePlay,
    seek,
    changeQuality,
    retry
  };
};
