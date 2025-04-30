
import { useState, useEffect, useCallback } from "react";
import { GestureType } from "@/components/navigation/CustomGestures";
import { useIsMobile } from "./use-mobile";

interface NavigationSettings {
  enableRadialMenu: boolean;
  enableSemanticZoom: boolean;
  enableImmersiveMode: boolean;
  enableCustomGestures: boolean;
  enableIntelligentFilters: boolean;
}

interface GestureAction {
  type: GestureType;
  handler: () => void;
  description: string;
}

export function useRevolutionaryNavigation() {
  const isMobile = useIsMobile();
  
  const [isRadialOpen, setIsRadialOpen] = useState(false);
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [settings, setSettings] = useState<NavigationSettings>({
    enableRadialMenu: true,
    enableSemanticZoom: true,
    enableImmersiveMode: true,
    enableCustomGestures: true,
    enableIntelligentFilters: true
  });
  
  // Customized gesture actions
  const [gestureActions, setGestureActions] = useState<GestureAction[]>([
    {
      type: "swipe-up",
      handler: () => setIsImmersiveMode(true),
      description: "Mode immersif activé"
    },
    {
      type: "swipe-down",
      handler: () => setIsImmersiveMode(false),
      description: "Mode immersif désactivé"
    },
    {
      type: "double-tap",
      handler: () => setZoomLevel(1),
      description: "Zoom réinitialisé"
    },
    {
      type: "long-press",
      handler: () => setIsRadialOpen(true),
      description: "Menu radial ouvert"
    },
    {
      type: "pinch",
      handler: () => setZoomLevel(zoomLevel > 0.8 ? 0.6 : 1),
      description: zoomLevel > 0.8 ? "Zoom arrière" : "Zoom avant"
    }
  ]);
  
  // Load settings from localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('revolutionaryNavigationSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (err) {
      console.error("Failed to load navigation settings:", err);
    }
  }, []);
  
  // Save settings to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('revolutionaryNavigationSettings', JSON.stringify(settings));
    } catch (err) {
      console.error("Failed to save navigation settings:", err);
    }
  }, [settings]);
  
  // Update gesture actions when zoom level changes
  useEffect(() => {
    setGestureActions(prev => 
      prev.map(action => 
        action.type === "pinch" 
          ? { 
              ...action, 
              handler: () => setZoomLevel(zoomLevel > 0.8 ? 0.6 : 1),
              description: zoomLevel > 0.8 ? "Zoom arrière" : "Zoom avant" 
            }
          : action
      )
    );
  }, [zoomLevel]);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+R to toggle radial menu
      if (e.altKey && e.key === 'r') {
        setIsRadialOpen(prev => !prev);
      }
      
      // Alt+I to toggle immersive mode
      if (e.altKey && e.key === 'i') {
        setIsImmersiveMode(prev => !prev);
      }
      
      // Alt+Z to toggle zoom level
      if (e.altKey && e.key === 'z') {
        setZoomLevel(prev => prev > 0.8 ? 0.6 : 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Update a specific setting
  const updateSetting = useCallback((key: keyof NavigationSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);
  
  // Custom gesture handler update
  const updateGestureAction = useCallback((type: GestureType, newAction: Partial<Omit<GestureAction, 'type'>>) => {
    setGestureActions(prev => 
      prev.map(action => 
        action.type === type 
          ? { ...action, ...newAction } 
          : action
      )
    );
  }, []);
  
  return {
    isRadialOpen,
    setIsRadialOpen,
    isImmersiveMode,
    setIsImmersiveMode,
    zoomLevel,
    setZoomLevel,
    settings,
    updateSetting,
    gestureActions,
    updateGestureAction,
    isMobile
  };
}
