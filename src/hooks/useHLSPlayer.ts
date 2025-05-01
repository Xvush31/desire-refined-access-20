
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
    if (!videoRef.current) return;
    
    const savedTime = localStorage.getItem(`video-position-${src}`);
    if (savedTime) {
      const time = parseFloat(savedTime);
      if (!isNaN(time) && time > 0 && time < videoRef.current.duration - 10) {
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
    const video = videoRef.current;
    if (!video) return;

    const initHls = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferLength: dataSavingMode ? 15 : 30,
          maxMaxBufferLength: dataSavingMode ? 30 : 60,
          maxBufferSize: dataSavingMode ? 30 * 1000 * 1000 : 60 * 1000 * 1000,
          startLevel: dataSavingMode ? 0 : -1, // Force lowest quality in data saving mode
          debug: false,
          // Preloading settings
          preloadSegments: dataSavingMode ? 0 : 2
        });
        
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);
        
        // Set current level based on connection quality
        if (dataSavingMode) {
          hls.nextLevel = 0; // Force lowest quality in data saving mode
        } else if (connectionQuality === 'low') {
          hls.nextLevel = 1;
        } else if (connectionQuality === 'medium') {
          hls.nextLevel = 3;
        }
        
        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          console.log("Manifest parsed, found quality levels:", data.levels);
          setQualityLevels(data.levels);
          setLoaded(true);
          if (autoPlay) {
            video.muted = startMuted;
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

        hls.on(Hls.Events.BUFFER_CREATED, () => setBuffering(true));
        hls.on(Hls.Events.BUFFER_APPENDED, () => setBuffering(false));

      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          setLoaded(true);
          if (autoPlay) video.play().catch(console.error);
        });
      }
    };

    initHls();
    
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, autoPlay, startMuted, dataSavingMode, connectionQuality]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setDuration(video.duration);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onEnded = () => {
      setIsPlaying(false);
      if (onVideoComplete) onVideoComplete();
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setBuffering(true);
    const onCanPlay = () => setBuffering(false);

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
  }, [onVideoComplete]);

  const toggleDataSavingMode = () => {
    if (hlsRef.current) {
      const newDataSavingMode = !dataSavingMode;
      hlsRef.current.config.startLevel = newDataSavingMode ? 0 : -1;
      
      if (newDataSavingMode) {
        hlsRef.current.nextLevel = 0; // Force lowest quality
      } else if (connectionQuality === 'low') {
        hlsRef.current.nextLevel = 1;
      } else if (connectionQuality === 'medium') {
        hlsRef.current.nextLevel = 3;
      } else {
        hlsRef.current.nextLevel = -1; // Auto
      }
      
      return newDataSavingMode;
    }
    return dataSavingMode;
  };

  return {
    videoRef,
    hlsRef,
    isPlaying,
    currentTime,
    duration,
    buffering,
    loaded,
    qualityLevels,
    currentQuality,
    setCurrentQuality,
    connectionQuality,
    toggleDataSavingMode
  };
};
