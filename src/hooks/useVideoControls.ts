
import { MutableRefObject, useState } from "react";

interface UseVideoControlsProps {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  duration: number;
  // Removed hlsRef from the interface since it's not available
}

export const useVideoControls = ({ 
  videoRef, 
  duration 
}: UseVideoControlsProps) => {
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play().catch(err => {
        console.error("Error playing video:", err);
      });
    } else {
      video.pause();
    }
  };
  
  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  const handleVolumeChange = (newVolume: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const value = newVolume[0];
    setVolume(value);
    video.volume = value;
    
    if (value === 0) {
      setIsMuted(true);
      video.muted = true;
    } else {
      setIsMuted(false);
      video.muted = false;
    }
  };
  
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    video.muted = newMutedState;
  };
  
  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    // Ensure time is within valid range
    const validTime = Math.max(0, Math.min(time, duration));
    video.currentTime = validTime;
  };
  
  return {
    volume,
    isMuted,
    togglePlay,
    toggleFullScreen,
    handleVolumeChange,
    toggleMute,
    handleSeek
  };
};
