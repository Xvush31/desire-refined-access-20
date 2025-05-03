
import { useState, useEffect } from "react";
import { useTheme } from "./use-theme";

interface ImmersiveModeOptions {
  enableSound?: boolean;
  enableVibration?: boolean;
  enableLightEffects?: boolean;
}

export const useImmersiveMode = (options: ImmersiveModeOptions = {}) => {
  const [isImmersive, setIsImmersive] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const { theme } = useTheme();
  
  // Options with defaults
  const {
    enableSound = true,
    enableVibration = true,
    enableLightEffects = true
  } = options;
  
  // Check if this is user's first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('xvush_visited');
    if (!hasVisitedBefore) {
      setIsFirstVisit(true);
      localStorage.setItem('xvush_visited', 'true');
      // Auto-enable immersive mode for first-time visitors
      setIsImmersive(true);
    }
  }, []);
  
  // Configurer le timer initial pour cacher les contrôles
  useEffect(() => {
    if (isImmersive) {
      setControlsVisible(true);
      const timer = setTimeout(() => {
        setControlsVisible(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isImmersive]);
  
  // Function to play sound based on content type
  const playSound = (intensity: 'low' | 'medium' | 'high' = 'medium') => {
    if (!enableSound || !isImmersive) return;
    
    // Create audio context on demand to avoid autoplay restrictions
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create an oscillator with different frequency based on intensity
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Set frequency based on intensity
    switch (intensity) {
      case 'low':
        oscillator.frequency.value = 200;
        break;
      case 'high':
        oscillator.frequency.value = 800;
        break;
      default:
        oscillator.frequency.value = 440;
        break;
    }
    
    // Quick fade in/out to avoid clicks
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  };
  
  // Function to trigger vibration based on content
  const triggerVibration = (pattern: number | number[] = 50) => {
    if (!enableVibration || !isImmersive || !navigator.vibrate) return;
    navigator.vibrate(pattern);
  };
  
  // Function to create light effect based on content and theme
  const applyLightEffect = (element: HTMLElement | null, color: string, duration: number = 500) => {
    if (!enableLightEffects || !isImmersive || !element) return;
    
    // Save original styles
    const originalBoxShadow = element.style.boxShadow;
    const originalTransition = element.style.transition;
    
    // Apply pulsating glow effect
    element.style.transition = `box-shadow ${duration}ms ease-in-out`;
    element.style.boxShadow = `0 0 20px 5px ${color}`;
    
    // Reset after duration
    setTimeout(() => {
      element.style.boxShadow = originalBoxShadow;
      element.style.transition = originalTransition;
    }, duration);
  };
  
  // Function to toggle immersive mode
  const toggleImmersive = () => {
    setIsImmersive(prev => !prev);
    setHasInteracted(true);
    setControlsVisible(true);
    
    // Masquer les contrôles après 1.5 secondes si on active le mode immersif
    if (!isImmersive) {
      setTimeout(() => {
        setControlsVisible(false);
      }, 1500);
    }
  };
  
  // Function to handle content interaction with all effects
  const interactWithContent = (
    element: HTMLElement | null, 
    contentType: 'image' | 'video' | 'text' = 'image',
    intensity: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    if (!isImmersive) return;
    
    // Montrer temporairement les contrôles lors d'une interaction
    setControlsVisible(true);
    setTimeout(() => {
      setControlsVisible(false);
    }, 1500);
    
    // Determine effect parameters based on content type and theme
    let vibrationPattern: number[];
    let effectColor: string;
    
    switch (contentType) {
      case 'video':
        vibrationPattern = [50, 30, 50];
        effectColor = theme === 'dark' ? '#ff5e85' : '#ff3366';
        break;
      case 'text':
        vibrationPattern = [20];
        effectColor = theme === 'dark' ? '#5e9aff' : '#3366ff';
        break;
      default: // image
        vibrationPattern = [40];
        effectColor = theme === 'dark' ? '#ffad5e' : '#ff9933';
        break;
    }
    
    // Adjust effect intensity
    switch (intensity) {
      case 'low':
        vibrationPattern = vibrationPattern.map(v => Math.floor(v * 0.5));
        break;
      case 'high':
        vibrationPattern = vibrationPattern.map(v => Math.floor(v * 1.5));
        break;
    }
    
    // Apply all effects
    playSound(intensity);
    triggerVibration(vibrationPattern);
    applyLightEffect(element, effectColor, 800);
  };
  
  // Fonction pour afficher temporairement les contrôles
  const showControlsTemporarily = () => {
    setControlsVisible(true);
    setTimeout(() => {
      setControlsVisible(false);
    }, 1500);
  };
  
  return {
    isImmersive,
    isFirstVisit,
    hasInteracted,
    controlsVisible,
    toggleImmersive,
    playSound,
    triggerVibration,
    applyLightEffect,
    interactWithContent,
    showControlsTemporarily
  };
};
