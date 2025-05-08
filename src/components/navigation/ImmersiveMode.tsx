
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ImmersiveModeProps {
  children: React.ReactNode;
  isImmersive: boolean;
  onToggleImmersive: () => void;
}

const ImmersiveMode: React.FC<ImmersiveModeProps> = ({
  children,
  isImmersive,
  onToggleImmersive,
}) => {
  const [showControls, setShowControls] = useState(false);
  const [mouseMovement, setMouseMovement] = useState({ x: 0, y: 0 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isTouching, setIsTouching] = useState(false);
  const isMobile = useIsMobile();
  
  // Clean up timers when exiting immersive mode
  useEffect(() => {
    return () => {
      if (controlsTimer) clearTimeout(controlsTimer);
      if (longPressTimer) clearTimeout(longPressTimer);
    };
  }, [isImmersive, controlsTimer, longPressTimer]);
  
  useEffect(() => {
    // Only add mouse move listener in immersive mode
    if (!isImmersive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const currentPosition = { x: e.clientX, y: e.clientY };
      const movement = {
        x: Math.abs(currentPosition.x - lastMousePosition.x),
        y: Math.abs(currentPosition.y - lastMousePosition.y)
      };
      
      setLastMousePosition(currentPosition);
      setMouseMovement(movement);
      
      // If significant mouse movement, show controls
      if (movement.x > 5 || movement.y > 5) {
        setShowControls(true);
        
        // Reset the timer
        if (controlsTimer) clearTimeout(controlsTimer);
        
        const newTimer = setTimeout(() => {
          setShowControls(false);
        }, 3000);
        
        setControlsTimer(newTimer);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isImmersive, lastMousePosition, controlsTimer]);
  
  // Handle touch events for mobile
  const handleTouchStart = () => {
    setIsTouching(true);
    
    // Clear any existing timer
    if (longPressTimer) clearTimeout(longPressTimer);
    
    // Set a new timer for 1.5 seconds
    const timer = setTimeout(() => {
      setShowControls(true);
      
      // Auto-hide controls after 3 seconds
      const hideTimer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      setControlsTimer(hideTimer);
    }, 1500);
    
    setLongPressTimer(timer);
  };
  
  const handleTouchEnd = () => {
    setIsTouching(false);
    
    // Clear the long press timer
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };
  
  const handleTouchMove = () => {
    // If user is dragging/scrolling, cancel the long press action
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };
  
  if (!isImmersive) {
    return <>{children}</>;
  }
  
  return (
    <div 
      className="immersive-mode fixed inset-0 z-40 w-full h-full bg-[#1A2335] overflow-hidden"
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
    >
      <div className="immersive-container w-full h-full overflow-hidden">
        {children}
        
        <AnimatePresence>
          {showControls && (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              onClick={onToggleImmersive}
              className="fixed top-4 right-4 z-50 rounded-full bg-black/80 hover:bg-black/90 text-white border border-white/20 p-2 shadow-xl"
              aria-label="Quitter le mode immersif"
            >
              <X size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImmersiveMode;
