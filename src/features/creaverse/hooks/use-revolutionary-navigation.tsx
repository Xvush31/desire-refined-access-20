
import { useState, useEffect } from 'react';

interface RevolutionaryNavigationState {
  isImmersiveMode: boolean;
  activeLayout: 'grid' | 'masonry' | 'featured' | 'flow';
  zoomLevel: number;
}

export const useRevolutionaryNavigation = () => {
  // Only use this hook within the CreaVerse area
  const [state, setState] = useState<RevolutionaryNavigationState>({
    isImmersiveMode: false,
    activeLayout: 'grid',
    zoomLevel: 1
  });

  const toggleImmersiveMode = () => {
    setState(prev => ({ ...prev, isImmersiveMode: !prev.isImmersiveMode }));
  };

  const setLayout = (layout: 'grid' | 'masonry' | 'featured' | 'flow') => {
    setState(prev => ({ ...prev, activeLayout: layout }));
  };

  const setZoomLevel = (level: number) => {
    setState(prev => ({ ...prev, zoomLevel: level }));
  };

  return {
    ...state,
    toggleImmersiveMode,
    setLayout,
    setZoomLevel
  };
};
