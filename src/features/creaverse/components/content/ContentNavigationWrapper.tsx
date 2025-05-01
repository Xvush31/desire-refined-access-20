
import React, { useState } from 'react';
import GestureHandler from '../navigation/GestureHandler';
import NavigationOverlay from '../navigation/NavigationOverlay';
import ImmersiveView from '../navigation/ImmersiveView';
import { useCreatorContentNavigation } from '../../hooks/useCreatorContentNavigation';

interface ContentNavigationWrapperProps {
  children: React.ReactNode;
  content?: any[]; // Array of content items for immersive view
  onContentFilterChange?: (filterId: string) => void;
  className?: string;
}

const ContentNavigationWrapper: React.FC<ContentNavigationWrapperProps> = ({
  children,
  content = [],
  onContentFilterChange,
  className
}) => {
  const {
    activeFilter,
    zoomLevel,
    isImmersiveMode,
    isRadialMenuOpen,
    radialMenuPosition,
    immersiveContent,
    immersiveViewIndex,
    handleFilterChange,
    handleZoomChange,
    openRadialMenu,
    closeRadialMenu,
    enterImmersiveMode,
    exitImmersiveMode,
    handleLongPress
  } = useCreatorContentNavigation();

  // Handle filter change with optional callback
  const onFilterChange = (filterId: string) => {
    handleFilterChange(filterId);
    if (onContentFilterChange) {
      onContentFilterChange(filterId);
    }
  };

  // Handle entering immersive mode
  const onEnterImmersiveMode = () => {
    if (content && content.length > 0) {
      enterImmersiveMode(content);
    }
  };

  // Handle gestures
  const handleDoubleTap = (position: { x: number; y: number }) => {
    onEnterImmersiveMode();
  };

  const handleSwipeUp = () => {
    // No-op for now, could be used for other navigation features
  };

  const handleSwipeDown = () => {
    // No-op for now, could be used for other navigation features
  };

  return (
    <>
      <GestureHandler
        onLongPress={handleLongPress}
        onDoubleTap={handleDoubleTap}
        onSwipeUp={handleSwipeUp}
        onSwipeDown={handleSwipeDown}
      >
        <div className={className}>
          <NavigationOverlay
            isRadialMenuOpen={isRadialMenuOpen}
            onRadialMenuClose={closeRadialMenu}
            radialMenuPosition={radialMenuPosition}
            activeFilter={activeFilter}
            onFilterChange={onFilterChange}
            zoomLevel={zoomLevel}
            onZoomChange={handleZoomChange}
            onEnterImmersiveMode={onEnterImmersiveMode}
          />
          
          {/* Scale content based on zoom level */}
          <div 
            style={{ 
              transform: `scale(${zoomLevel / 50})`,
              transition: 'transform 0.3s ease-out',
              transformOrigin: 'center top'
            }}
          >
            {children}
          </div>
        </div>
      </GestureHandler>

      {/* Immersive view that appears when activated */}
      <ImmersiveView
        isOpen={isImmersiveMode}
        onClose={exitImmersiveMode}
        content={immersiveContent.length > 0 ? immersiveContent : content}
        initialIndex={immersiveViewIndex}
      />
    </>
  );
};

export default ContentNavigationWrapper;
