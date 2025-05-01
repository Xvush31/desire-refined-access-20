
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [showControls, setShowControls] = useState(true);
  const [mouseMovement, setMouseMovement] = useState({ x: 0, y: 0 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isImmersive) {
      document.body.classList.add("overflow-hidden");
      
      // Show controls on initial immersive mode entry
      setShowControls(true);
      
      // Hide controls after 3 seconds of inactivity
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      setControlsTimer(timer);
      
      // Clean up the timer when exiting immersive mode
      return () => {
        document.body.classList.remove("overflow-hidden");
        if (controlsTimer) clearTimeout(controlsTimer);
      };
    }
  }, [isImmersive]);
  
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
  
  if (!isImmersive) {
    return <>{children}</>;
  }
  
  return (
    <div className="immersive-mode">
      <div className="immersive-container">
        {children}
        
        <AnimatePresence>
          {showControls && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={onToggleImmersive}
                className="fixed top-4 right-4 z-50 rounded-full bg-black/80 hover:bg-black/90 text-white border border-white/20 p-2 shadow-xl"
                aria-label="Quitter le mode immersif"
              >
                <X size={24} />
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 text-white py-2 px-4 rounded-full border border-white/20 shadow-xl"
              >
                Déplacez la souris pour afficher les contrôles
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImmersiveMode;
