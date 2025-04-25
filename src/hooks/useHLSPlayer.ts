import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface UseHLSPlayerProps {
  src: string;
  autoPlay?: boolean;
  onVideoComplete?: () => void;
  startMuted?: boolean;
}

export const useHLSPlayer = ({ 
  src, 
  autoPlay = false, 
  onVideoComplete,
  startMuted = false 
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initHls = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          maxBufferSize: 60 * 1000 * 1000,
          startLevel: -1,
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
  }, [src, autoPlay, startMuted]);

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
    setCurrentQuality
  };
};
