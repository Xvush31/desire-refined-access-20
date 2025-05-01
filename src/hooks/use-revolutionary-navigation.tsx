
import { useState, useEffect, useCallback } from "react";
import { GestureType } from "@/components/navigation/CustomGestures";
import { useIsMobile } from "./use-mobile";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  
  const [isRadialOpen, setIsRadialOpen] = useState(false);
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentLayout, setCurrentLayout] = useState<"grid" | "masonry" | "featured" | "flow">("grid");
  const [settings, setSettings] = useState<NavigationSettings>({
    enableRadialMenu: true,
    enableSemanticZoom: true,
    enableImmersiveMode: true,
    enableCustomGestures: true,
    enableIntelligentFilters: true
  });
  
  // Vérifier si nous sommes sur une page de galerie photo ou vidéo
  const isGalleryPage = useCallback(() => {
    const path = location.pathname;
    return path.includes('/photos') || path.includes('/videos') || 
           path.includes('gallery') || path.includes('collections');
  }, [location]);

  // Auto-active le mode immersif seulement pour les pages de galerie
  useEffect(() => {
    // Seulement activer automatiquement le mode immersif sur les pages de galerie
    if (isGalleryPage()) {
      setIsImmersiveMode(true);
    } else {
      setIsImmersiveMode(false);
    }
  }, [isGalleryPage, location]);
  
  // Customized gesture actions - don't show toasts on mobile for better UX
  const [gestureActions, setGestureActions] = useState<GestureAction[]>([
    {
      type: "swipe-up",
      handler: () => {
        // Seulement activer le mode immersif si nous sommes sur une page de galerie
        if (isGalleryPage()) {
          setIsImmersiveMode(true);
          if (!isMobile) {
            toast.info("Mode immersif activé", {
              style: { 
                background: "rgba(0, 0, 0, 0.85)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }
            });
          }
        }
      },
      description: "Mode immersif activé"
    },
    {
      type: "swipe-down",
      handler: () => {
        setIsImmersiveMode(false);
        if (!isMobile) {
          toast.info("Mode immersif désactivé", {
            style: { 
              background: "rgba(0, 0, 0, 0.85)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }
          });
        }
      },
      description: "Mode immersif désactivé"
    },
    {
      type: "double-tap",
      handler: () => {
        setZoomLevel(1);
        if (!isMobile) {
          toast.info("Zoom réinitialisé", {
            style: { 
              background: "rgba(0, 0, 0, 0.85)",
              color: "#ffffff", 
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }
          });
        }
      },
      description: "Zoom réinitialisé"
    },
    {
      type: "long-press",
      handler: () => {
        // Seulement ouvrir le menu radial si nous sommes sur une page de galerie
        if (isGalleryPage()) {
          setIsRadialOpen(true);
          if (!isMobile) {
            toast.info("Menu radial ouvert", {
              style: { 
                background: "rgba(0, 0, 0, 0.85)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }
            });
          }
        }
      },
      description: "Menu radial ouvert"
    },
    {
      type: "pinch",
      handler: () => {
        // Seulement changer le zoom si nous sommes sur une page de galerie
        if (isGalleryPage()) {
          setZoomLevel(zoomLevel > 0.8 ? 0.6 : 1);
          if (!isMobile) {
            toast.info(zoomLevel > 0.8 ? "Zoom arrière" : "Zoom avant", {
              style: { 
                background: "rgba(0, 0, 0, 0.85)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }
            });
          }
        }
      },
      description: zoomLevel > 0.8 ? "Zoom arrière" : "Zoom avant"
    }
  ]);
  
  // Update gesture actions when zoom level changes
  useEffect(() => {
    setGestureActions(prev => 
      prev.map(action => 
        action.type === "pinch" 
          ? { 
              ...action, 
              handler: () => {
                // Seulement changer le zoom si nous sommes sur une page de galerie
                if (isGalleryPage()) {
                  setZoomLevel(zoomLevel > 0.8 ? 0.6 : 1);
                  if (!isMobile) {
                    toast.info(zoomLevel > 0.8 ? "Zoom arrière" : "Zoom avant", {
                      style: { 
                        background: "rgba(0, 0, 0, 0.85)", 
                        color: "#ffffff",
                        border: "1px solid rgba(255, 255, 255, 0.2)"
                      }
                    });
                  }
                }
              },
              description: zoomLevel > 0.8 ? "Zoom arrière" : "Zoom avant" 
            }
          : action
      )
    );
  }, [zoomLevel, isMobile, isGalleryPage]);
  
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
  
  // Handle keyboard shortcuts - only for desktop
  useEffect(() => {
    if (isMobile) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+R to toggle radial menu
      if (e.altKey && e.key === 'r') {
        setIsRadialOpen(prev => !prev);
        toast.info(isRadialOpen ? "Menu radial fermé" : "Menu radial ouvert", {
          style: { 
            background: "rgba(0, 0, 0, 0.85)", 
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }
        });
      }
      
      // Alt+I to toggle immersive mode
      if (e.altKey && e.key === 'i') {
        // Seulement activer automatiquement le mode immersif sur les pages de galerie
        if (isGalleryPage()) {
          setIsImmersiveMode(prev => !prev);
          toast.info(isImmersiveMode ? "Mode normal" : "Mode immersif activé", {
            style: { 
              background: "rgba(0, 0, 0, 0.85)", 
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }
          });
        }
      }
      
      // Alt+Z to toggle zoom level
      if (e.altKey && e.key === 'z') {
        // Seulement changer le zoom si nous sommes sur une page de galerie
        if (isGalleryPage()) {
          setZoomLevel(prev => prev > 0.8 ? 0.6 : 1);
          toast.info(zoomLevel > 0.8 ? "Zoom arrière" : "Zoom avant", {
            style: { 
              background: "rgba(0, 0, 0, 0.85)", 
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }
          });
        }
      }
      
      // Alt+G to cycle through layouts
      if (e.altKey && e.key === 'g') {
        const layouts: Array<"grid" | "masonry" | "featured" | "flow"> = ["grid", "masonry", "featured", "flow"];
        const currentIndex = layouts.indexOf(currentLayout);
        const nextLayout = layouts[(currentIndex + 1) % layouts.length];
        setCurrentLayout(nextLayout);
        toast.info(`Affichage en ${nextLayout}`, {
          style: { 
            background: "rgba(0, 0, 0, 0.85)", 
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRadialOpen, isImmersiveMode, zoomLevel, currentLayout, isMobile, isGalleryPage]);
  
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
    currentLayout,
    setCurrentLayout,
    settings,
    updateSetting,
    gestureActions,
    updateGestureAction,
    isMobile,
    isGalleryPage
  };
}
