import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import RadialNavigation from "./RadialNavigation";
import IntelligentFilters from "./IntelligentFilters";
import SemanticZoom from "./SemanticZoom";
import ImmersiveMode from "./ImmersiveMode";
import CustomGestures, { GestureType } from "./CustomGestures";
import { 
  Layout, 
  Layers, 
  Search, 
  Filter, 
  Heart, 
  Settings, 
  Home, 
  User, 
  Video, 
  Grid, 
  Maximize
} from "lucide-react";
import { toast } from "sonner";

interface RevolutionaryNavigationProps {
  children: React.ReactNode;
}

const RevolutionaryNavigation: React.FC<RevolutionaryNavigationProps> = ({ children }) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isDark = theme === "dark";
  
  // Navigation state
  const [isRadialOpen, setIsRadialOpen] = useState(false);
  const [radialPosition, setRadialPosition] = useState({ x: 0, y: 0 });
  const [isImmersive, setIsImmersive] = useState(false);
  const [currentLayout, setCurrentLayout] = useState<"grid" | "masonry" | "featured" | "flow">("grid");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Open radial menu at specific position
  const openRadialMenu = (x: number, y: number) => {
    setRadialPosition({ x, y });
    setIsRadialOpen(true);
  };
  
  // Radial menu items
  const radialItems = [
    {
      id: "home",
      label: "Accueil",
      icon: <Home size={isMobile ? 20 : 24} />,
      onClick: () => {
        toast.info("Navigation vers l'accueil");
      }
    },
    {
      id: "search",
      label: "Recherche",
      icon: <Search size={isMobile ? 20 : 24} />,
      onClick: () => {
        toast.info("Recherche activée");
      }
    },
    {
      id: "profile",
      label: "Profil",
      icon: <User size={isMobile ? 20 : 24} />,
      onClick: () => {
        toast.info("Navigation vers le profil");
      }
    },
    {
      id: "favorites",
      label: "Favoris",
      icon: <Heart size={isMobile ? 20 : 24} />,
      onClick: () => {
        toast.info("Navigation vers les favoris");
      },
      color: "text-rose-500"
    },
    {
      id: "videos",
      label: "Vidéos",
      icon: <Video size={isMobile ? 20 : 24} />,
      onClick: () => {
        toast.info("Navigation vers les vidéos");
      }
    },
    {
      id: "grid",
      label: "Grid",
      icon: <Grid size={isMobile ? 20 : 24} />,
      onClick: () => {
        setCurrentLayout("grid");
        toast.info("Affichage en grille");
      }
    },
    {
      id: "settings",
      label: "Paramètres",
      icon: <Settings size={isMobile ? 20 : 24} />,
      onClick: () => {
        toast.info("Navigation vers les paramètres");
      }
    },
    {
      id: "immersive",
      label: "Immersif",
      icon: <Maximize size={isMobile ? 20 : 24} />,
      onClick: () => {
        setIsImmersive(!isImmersive);
        toast.info(isImmersive ? "Mode normal" : "Mode immersif activé");
      }
    }
  ];
  
  // Filter categories
  const filterCategories = [
    {
      id: "type",
      name: "Type",
      options: [
        { id: "video", label: "Vidéos" },
        { id: "image", label: "Images" },
        { id: "audio", label: "Audio" },
        { id: "text", label: "Textes" }
      ]
    },
    {
      id: "access",
      name: "Accès",
      options: [
        { id: "free", label: "Gratuit" },
        { id: "premium", label: "Premium" }
      ]
    },
    {
      id: "duration",
      name: "Durée",
      options: [
        { id: "short", label: "Court (<5min)" },
        { id: "medium", label: "Moyen (5-15min)" },
        { id: "long", label: "Long (>15min)" }
      ]
    },
    {
      id: "rating",
      name: "Notation",
      options: [
        { id: "5-stars", label: "5 étoiles" },
        { id: "4-stars", label: "4+ étoiles" },
        { id: "3-stars", label: "3+ étoiles" }
      ]
    }
  ];
  
  // Handle custom gesture actions
  const gestureActions = [
    {
      type: "swipe-up" as GestureType,
      handler: () => {
        setIsImmersive(true);
      },
      description: "Mode immersif activé"
    },
    {
      type: "swipe-down" as GestureType,
      handler: () => {
        setIsImmersive(false);
      },
      description: "Mode immersif désactivé"
    },
    {
      type: "double-tap" as GestureType,
      handler: () => {
        // Reset zoom level on double tap
        setZoomLevel(1);
      },
      description: "Zoom réinitialisé"
    },
    {
      type: "long-press" as GestureType,
      handler: () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          openRadialMenu(
            rect.width / 2,
            rect.height / 2
          );
        }
      },
      description: "Menu radial ouvert"
    },
    {
      type: "pinch" as GestureType,
      handler: () => {
        // Toggle zoom level on pinch
        setZoomLevel(zoomLevel > 0.8 ? 0.6 : 1);
      },
      description: zoomLevel > 0.8 ? "Zoom arrière" : "Zoom avant"
    }
  ];

  // Handle container click to open radial menu
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.altKey || e.ctrlKey) {
      // Only open on modifier key + click
      openRadialMenu(e.clientX, e.clientY);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
    
    // Count total selected filters
    const totalSelected = Object.values(filters).reduce(
      (sum, filterValues) => sum + filterValues.length, 0
    );
    
    if (totalSelected > 0) {
      toast.info(`${totalSelected} filtres appliqués`);
    }
  };
  
  // Handle zoom level change
  const handleZoomChange = (zoom: number) => {
    setZoomLevel(zoom);
  };

  return (
    <div 
      ref={containerRef} 
      className="revolutionary-navigation relative w-full h-full"
      onClick={handleContainerClick}
    >
      <CustomGestures actions={gestureActions}>
        <ImmersiveMode 
          isImmersive={isImmersive} 
          onToggleImmersive={() => setIsImmersive(!isImmersive)}
        >
          <SemanticZoom 
            minZoom={0.6} 
            maxZoom={1.0}
            onZoomChange={handleZoomChange}
            className="w-full h-full"
          >
            <div className={`transition-all duration-300 ${isImmersive ? "p-0" : "p-4"}`}>
              {/* Filters bar */}
              {!isImmersive && (
                <div className={`sticky top-0 z-30 mb-4 ${
                  isDark ? "bg-background" : "bg-background/80 backdrop-blur-md"
                }`}>
                  <IntelligentFilters 
                    categories={filterCategories}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              )}
              
              {/* Layout controls */}
              {!isImmersive && (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      className={`p-2 rounded-md ${
                        currentLayout === "grid" 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setCurrentLayout("grid")}
                    >
                      <Grid size={18} />
                    </button>
                    <button 
                      className={`p-2 rounded-md ${
                        currentLayout === "masonry" 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setCurrentLayout("masonry")}
                    >
                      <Layout size={18} />
                    </button>
                    <button 
                      className={`p-2 rounded-md ${
                        currentLayout === "featured" 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setCurrentLayout("featured")}
                    >
                      <Layers size={18} />
                    </button>
                    <button 
                      className={`p-2 rounded-md ${
                        currentLayout === "flow" 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setCurrentLayout("flow")}
                    >
                      <Filter size={18} />
                    </button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {zoomLevel < 1 && (
                      <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Main content */}
              <div className={`${isImmersive ? "immersive-content" : ""}`}>
                {children}
              </div>
            </div>
          </SemanticZoom>
        </ImmersiveMode>
      </CustomGestures>
      
      {/* Radial navigation menu */}
      <RadialNavigation 
        items={radialItems}
        isOpen={isRadialOpen}
        onClose={() => setIsRadialOpen(false)}
        position={radialPosition}
      />
      
      {/* Radial menu trigger button */}
      {!isImmersive && (
        <motion.button
          className={`fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
            isDark ? "bg-zinc-800 text-white" : "bg-white text-black"
          } border border-muted`}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
              openRadialMenu(
                rect.right - 60, 
                rect.bottom - 100
              );
            }
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
            <path d="M12 8v8"></path>
            <path d="M8 12h8"></path>
          </svg>
        </motion.button>
      )}
      
      {/* Instructions tooltip */}
      <AnimatePresence>
        {!isMobile && !isRadialOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 mb-20 px-4 py-2 rounded-lg z-40 text-sm ${
              isDark ? "bg-zinc-800 text-white" : "bg-white text-black"
            } shadow-lg border border-muted`}
          >
            <p>Ctrl+Click ou Alt+Click pour ouvrir le menu radial</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RevolutionaryNavigation;
