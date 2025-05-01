
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import RadialNavigation from "./RadialNavigation";
import ContentFilters from "./ContentFilters";
import ZoomControls from "./ZoomControls";
import ImmersiveView from "./ImmersiveView";
import CustomGestures, { GestureType } from "./CustomGestures";
import { 
  Home, 
  Search, 
  User, 
  Heart, 
  Calendar,
  Settings, 
  MessageSquare
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
  const [activeFilter, setActiveFilter] = useState('trending');
  const [zoomLevel, setZoomLevel] = useState(50);
  const [isImmersiveViewOpen, setIsImmersiveViewOpen] = useState(false);
  
  // Mock content for immersive view
  const [immersiveContent] = useState([
    {
      id: 1,
      title: "Summer Fashion Collection",
      imageUrl: "https://picsum.photos/id/25/1200/800",
      format: "image",
      metrics: { views: 12500, likes: 835, comments: 124 }
    },
    {
      id: 2,
      title: "Behind the Scenes",
      videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      format: "video",
      metrics: { views: 8700, likes: 612, comments: 78, revenue: 320 }
    },
    {
      id: 3,
      title: "Paris Photoshoot Highlights",
      imageUrl: "https://picsum.photos/id/42/1200/800",
      format: "image",
      metrics: { views: 15800, likes: 1254, comments: 97 }
    }
  ]);
  
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
        window.location.href = "/";
        toast.info("Navigation vers l'accueil");
      }
    },
    {
      id: "profile",
      label: "Profil",
      icon: <User size={isMobile ? 20 : 24} />,
      onClick: () => {
        window.location.href = "/creator";
        toast.info("Navigation vers le profil");
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
      id: "favorites",
      label: "Favoris",
      icon: <Heart size={isMobile ? 20 : 24} />,
      onClick: () => {
        toast.info("Navigation vers les favoris");
      },
      color: "text-rose-500"
    },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageSquare size={isMobile ? 20 : 24} />,
      onClick: () => {
        toast.info("Navigation vers les messages");
      }
    },
    {
      id: "calendar",
      label: "Calendrier",
      icon: <Calendar size={isMobile ? 20 : 24} />,
      onClick: () => {
        window.location.href = "/calendar";
        toast.info("Navigation vers le calendrier");
      }
    },
    {
      id: "settings",
      label: "Paramètres",
      icon: <Settings size={isMobile ? 20 : 24} />,
      onClick: () => {
        toast.info("Navigation vers les paramètres");
      }
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
        setIsImmersiveViewOpen(true);
      },
      description: "Vue immersive ouverte"
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
        setZoomLevel(zoomLevel > 50 ? 25 : 75);
      },
      description: zoomLevel > 50 ? "Zoom arrière" : "Zoom avant"
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
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    toast.info(`Filtre "${filterId}" appliqué`);
  };

  return (
    <div 
      ref={containerRef} 
      className="revolutionary-navigation relative w-full h-full"
      onClick={handleContainerClick}
    >
      <CustomGestures actions={gestureActions}>
        <div className={`transition-all duration-300 ${isImmersive ? "p-0" : "p-4"}`}>
          {/* Content filters */}
          {!isImmersive && (
            <div className={`sticky top-0 z-30 mb-4 ${
              isDark ? "bg-background" : "bg-background/80 backdrop-blur-md"
            }`}>
              <ContentFilters 
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}
          
          {/* Main content */}
          <div className={isImmersive ? "immersive-content" : ""}>
            {children}
          </div>
        </div>
      </CustomGestures>
      
      {/* Zoom controls */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-30">
        <ZoomControls
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
          onEnterImmersiveMode={() => setIsImmersiveViewOpen(true)}
        />
      </div>
      
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
      
      {/* Immersive View */}
      <ImmersiveView 
        isOpen={isImmersiveViewOpen}
        onClose={() => setIsImmersiveViewOpen(false)}
        content={immersiveContent}
        initialIndex={0}
      />
    </div>
  );
};

export default RevolutionaryNavigation;
