
import { useState, useRef } from "react";
import type { MutableRefObject } from "react";
import type Hls from "hls.js";

interface UseVideoControlsProps {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  hlsRef: MutableRefObject<Hls | null>;
  duration: number;
}

export const useVideoControls = ({ videoRef, hlsRef, duration }: UseVideoControlsProps) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(err => {
        console.error("Error attempting to play:", err);
      });
    } else {
      video.pause();
    }
  };

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

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    video.muted = newMutedState;
  };

  // Update handleSeek to accept either a mouse event or a direct time value
  const handleSeek = (
    eventOrTime: React.MouseEvent<HTMLDivElement> | number
  ) => {
    const video = videoRef.current;
    if (!video) return;

    let newTime: number;
    
    if (typeof eventOrTime === 'number') {
      // If we received a direct time value
      newTime = eventOrTime;
    } else {
      // If we received a mouse event
      const progressBar = eventOrTime.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = eventOrTime.clientX - rect.left;
      const percentClicked = clickPosition / rect.width;
      newTime = duration * percentClicked;
    }
    
    // Ensure time is within valid range
    newTime = Math.max(0, Math.min(newTime, duration));
    video.currentTime = newTime;
  };

  const setQuality = (level: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    }
  };

  return {
    containerRef,
    volume,
    isMuted,
    isFullScreen,
    togglePlay,
    toggleFullScreen,
    handleVolumeChange,
    toggleMute,
    handleSeek,
    setQuality
  };
};
