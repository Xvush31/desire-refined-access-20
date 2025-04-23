
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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentClicked = clickPosition / rect.width;
    const newTime = duration * percentClicked;
    
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
