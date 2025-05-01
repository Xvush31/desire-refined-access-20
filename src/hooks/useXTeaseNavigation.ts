
import { useState, useEffect, useRef } from 'react';

interface UseXTeaseNavigationProps {
  currentIndex: number;
  totalVideos: number;
  onChangeIndex: (index: number) => void;
  onActivatePlayer: () => void;
}

export const useXTeaseNavigation = ({
  currentIndex,
  totalVideos,
  onChangeIndex,
  onActivatePlayer
}: UseXTeaseNavigationProps) => {
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<number, HTMLDivElement | null>>({});
  
  // Setup Intersection Observer for autoplay
  useEffect(() => {
    if (!autoPlayEnabled) return;
    
    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.7 // Video must be 70% visible to trigger
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          if (index !== currentIndex) {
            onChangeIndex(index);
            onActivatePlayer();
          }
        }
      });
    }, options);
    
    // Observe all video elements
    Object.values(videoRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [autoPlayEnabled, currentIndex, totalVideos, onChangeIndex, onActivatePlayer]);
  
  // Touch navigation handling - permettre le scrolling libre
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    // Maintenant le scrolling est libre, nous utilisons seulement la détection d'intersection
    // pour changer la vidéo active, donc nous n'interférons plus avec les événements tactiles
    setTouchStartY(null);
  };
  
  const registerVideoRef = (index: number, ref: HTMLDivElement | null) => {
    videoRefs.current[index] = ref;
  };
  
  const scrollToVideo = (index: number, smooth = true) => {
    const videoEl = videoRefs.current[index];
    if (videoEl && containerRef.current) {
      containerRef.current.scrollTo({
        top: videoEl.offsetTop,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };
  
  const toggleAutoPlay = () => {
    setAutoPlayEnabled(prev => !prev);
    return !autoPlayEnabled;
  };
  
  return {
    containerRef,
    registerVideoRef,
    scrollToVideo,
    handleTouchStart,
    handleTouchEnd,
    autoPlayEnabled,
    toggleAutoPlay
  };
};
