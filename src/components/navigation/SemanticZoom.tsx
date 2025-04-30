
import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface SemanticZoomProps {
  children: React.ReactNode;
  minZoom: number;
  maxZoom: number;
  className?: string;
  onZoomChange?: (zoom: number) => void;
}

const SemanticZoom: React.FC<SemanticZoomProps> = ({
  children,
  minZoom = 0.6,
  maxZoom = 1.0,
  className = "",
  onZoomChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Zoom level between 0 and 1 (will be mapped to minZoom-maxZoom)
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // For smooth transitions
  const zoomSpring = useSpring(zoomLevel, {
    stiffness: 300,
    damping: 30
  });
  
  // Map 0-1 range to minZoom-maxZoom
  const scale = useTransform(
    zoomSpring,
    [0, 1],
    [minZoom, maxZoom]
  );
  
  // Pan values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Gesture state
  const [isDragging, setIsDragging] = useState(false);
  const [startDistance, setStartDistance] = useState<number | null>(null);
  const [startZoom, setStartZoom] = useState(1);

  // Handle zoom with scroll wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    const delta = e.deltaY * -0.01;
    const newZoom = Math.min(Math.max(zoomLevel + delta, 0), 1);
    setZoomLevel(newZoom);
    
    if (onZoomChange) {
      onZoomChange(newZoom);
    }
  };
  
  // Touch handlers for mobile pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = getDistanceBetweenTouches(e);
      setStartDistance(dist);
      setStartZoom(zoomLevel);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && startDistance !== null) {
      const currentDistance = getDistanceBetweenTouches(e);
      const distanceRatio = currentDistance / startDistance;
      
      // Adjust sensitivity
      const newZoom = Math.min(
        Math.max(startZoom + (distanceRatio - 1) * 0.5, 0), 
        1
      );
      
      setZoomLevel(newZoom);
      
      if (onZoomChange) {
        onZoomChange(newZoom);
      }
    } else if (e.touches.length === 1 && zoomLevel < 1) {
      // Only allow panning when zoomed out
      if (!isDragging) {
        setIsDragging(true);
        return;
      }
      
      const touch = e.touches[0];
      const movementX = touch.clientX - (e.currentTarget as any).lastTouchX || 0;
      const movementY = touch.clientY - (e.currentTarget as any).lastTouchY || 0;
      
      (e.currentTarget as any).lastTouchX = touch.clientX;
      (e.currentTarget as any).lastTouchY = touch.clientY;
      
      x.set(x.get() + movementX);
      y.set(y.get() + movementY);
    }
  };
  
  const handleTouchEnd = () => {
    setStartDistance(null);
    setIsDragging(false);
    delete (containerRef.current as any)?.lastTouchX;
    delete (containerRef.current as any)?.lastTouchY;
  };
  
  // Helper to calculate distance between touches
  const getDistanceBetweenTouches = (e: React.TouchEvent) => {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    return Math.hypot(
      touch1.clientX - touch2.clientX,
      touch1.clientY - touch2.clientY
    );
  };
  
  // Update parent when zoom changes
  useEffect(() => {
    if (onZoomChange) {
      onZoomChange(zoomLevel);
    }
  }, [zoomLevel, onZoomChange]);

  // Reset pan position when fully zoomed in
  useEffect(() => {
    if (zoomLevel === 1) {
      x.set(0);
      y.set(0);
    }
  }, [zoomLevel, x, y]);

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onWheel={handleWheel}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      style={{ touchAction: "none" }}
    >
      <motion.div
        style={{
          scale,
          x,
          y,
          transformOrigin: "center"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
      
      {/* Zoom indicator (only show when not at 100%) */}
      {zoomLevel < 1 && (
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Math.round((minZoom + (maxZoom - minZoom) * zoomLevel) * 100)}%
        </motion.div>
      )}
    </div>
  );
};

export default SemanticZoom;
