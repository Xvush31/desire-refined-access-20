
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

interface ImmersiveModeProps {
  children: React.ReactNode;
  isImmersive: boolean;
  onToggleImmersive: () => void;
}

const ImmersiveMode: React.FC<ImmersiveModeProps> = ({
  children,
  isImmersive,
  onToggleImmersive
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [showControls, setShowControls] = useState(true);
  const [mouseIdle, setMouseIdle] = useState(false);
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());
  
  // Hide controls when mouse is idle in immersive mode
  useEffect(() => {
    if (!isImmersive) {
      setShowControls(true);
      return;
    }
    
    const handleMouseMove = () => {
      setLastMouseMove(Date.now());
      setMouseIdle(false);
      setShowControls(true);
    };
    
    const idleTimer = setInterval(() => {
      const now = Date.now();
      if (now - lastMouseMove > 3000) { // 3 seconds of inactivity
        setMouseIdle(true);
        setShowControls(false);
      }
    }, 1000);
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleMouseMove);
      clearInterval(idleTimer);
    };
  }, [isImmersive, lastMouseMove]);
  
  return (
    <div className={`relative h-full w-full transition-all duration-500 ${
      isImmersive ? "immersive-mode" : ""
    }`}>
      {/* Main content */}
      <motion.div
        initial={false}
        animate={{
          scale: isImmersive ? 1.02 : 1,
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
        className={`h-full ${isImmersive ? "immersive-container" : ""}`}
      >
        {children}
      </motion.div>
      
      {/* Immersive toggle button */}
      <AnimatePresence>
        {(showControls || !isImmersive) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute top-4 right-4 p-2 rounded-full z-50 ${
              isDark 
                ? "bg-black/50 text-white hover:bg-black/70" 
                : "bg-white/70 text-black hover:bg-white/90"
            } backdrop-blur-sm transition-all`}
            onClick={onToggleImmersive}
            onMouseEnter={() => setShowControls(true)}
          >
            {isImmersive ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Overlay instruction when entering immersive mode */}
      <AnimatePresence>
        {isImmersive && showControls && mouseIdle === false && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm backdrop-blur-sm"
          >
            Déplacez la souris pour afficher les contrôles
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImmersiveMode;
