
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useCreatorContentNavigation = () => {
  const [activeFilter, setActiveFilter] = useState('trending');
  const [zoomLevel, setZoomLevel] = useState(50);
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);
  const [isRadialMenuOpen, setIsRadialMenuOpen] = useState(false);
  const [radialMenuPosition, setRadialMenuPosition] = useState({ x: 0, y: 0 });
  const [immersiveViewIndex, setImmersiveViewIndex] = useState(0);
  const [immersiveContent, setImmersiveContent] = useState<any[]>([]);
  
  // Handle filter changes
  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter(filterId);
    toast.success(`Filtre "${filterId}" appliqué`);
  }, []);
  
  // Handle zoom level changes
  const handleZoomChange = useCallback((level: number) => {
    setZoomLevel(level);
  }, []);
  
  // Open radial menu at position
  const openRadialMenu = useCallback((x: number, y: number) => {
    setRadialMenuPosition({ x, y });
    setIsRadialMenuOpen(true);
  }, []);
  
  // Close radial menu
  const closeRadialMenu = useCallback(() => {
    setIsRadialMenuOpen(false);
  }, []);
  
  // Enter immersive mode with content
  const enterImmersiveMode = useCallback((content: any[], initialIndex: number = 0) => {
    setImmersiveContent(content);
    setImmersiveViewIndex(initialIndex);
    setIsImmersiveMode(true);
  }, []);
  
  // Exit immersive mode
  const exitImmersiveMode = useCallback(() => {
    setIsImmersiveMode(false);
  }, []);
  
  // Handle long press on content
  const handleLongPress = useCallback((position: { x: number; y: number }) => {
    openRadialMenu(position.x, position.y);
  }, [openRadialMenu]);
  
  return {
    activeFilter,
    zoomLevel,
    isImmersiveMode,
    isRadialMenuOpen,
    radialMenuPosition,
    immersiveViewIndex,
    immersiveContent,
    handleFilterChange,
    handleZoomChange,
    openRadialMenu,
    closeRadialMenu,
    enterImmersiveMode,
    exitImmersiveMode,
    handleLongPress
  };
};
