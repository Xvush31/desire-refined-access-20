
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useIsMobile } from '@/hooks/use-mobile';

interface RadialNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
}

interface RadialNavigationProps {
  items: RadialNavItem[];
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
}

const RadialNavigation: React.FC<RadialNavigationProps> = ({
  items,
  isOpen,
  onClose,
  position = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useIsMobile();
  
  // Calculate positions in a circle
  const getItemPosition = (index: number, total: number, radius: number) => {
    // Distribute items in a 3/4 circle (not the bottom quarter)
    const angleStart = Math.PI * 0.75; // Start at top right
    const angleEnd = Math.PI * 2.75; // End at top left
    
    const angle = angleStart + (index / (total - 1)) * (angleEnd - angleStart);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  // Determine appropriate radius based on screen size
  const radius = isMobile ? 120 : 180;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
          style={{ touchAction: "none" }}
        >
          <motion.div 
            className={`absolute inset-0 ${isDark ? "bg-black/70" : "bg-black/40"} backdrop-blur-sm`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="absolute"
            style={{
              left: position.x,
              top: position.y,
              width: 0,
              height: 0
            }}
          >
            {items.map((item, index) => {
              const pos = getItemPosition(index, items.length, radius);
              return (
                <motion.div
                  key={item.id}
                  className={`absolute ${isDark ? "bg-zinc-800" : "bg-white"} rounded-full shadow-lg p-3 cursor-pointer`}
                  style={{ 
                    width: isMobile ? 60 : 80, 
                    height: isMobile ? 60 : 80,
                    marginLeft: -(isMobile ? 30 : 40),
                    marginTop: -(isMobile ? 30 : 40),
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{ 
                    x: pos.x, 
                    y: pos.y, 
                    scale: 1, 
                    opacity: 1,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      delay: index * 0.03 
                    } 
                  }}
                  exit={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0, 
                    opacity: 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      delay: (items.length - index - 1) * 0.02 
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onClick();
                    onClose();
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className={`${item.color || "text-primary"}`}>
                      {item.icon}
                    </div>
                    {!isMobile && (
                      <div className="text-xs mt-1 text-center font-medium">
                        {item.label}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
            
            {/* Center button */}
            <motion.div
              className={`absolute ${isDark ? "bg-zinc-900" : "bg-white"} rounded-full shadow-lg p-4 z-10`}
              style={{ 
                width: isMobile ? 70 : 90, 
                height: isMobile ? 70 : 90,
                marginLeft: -(isMobile ? 35 : 45),
                marginTop: -(isMobile ? 35 : 45),
                border: `2px solid ${isDark ? '#333' : '#eee'}`
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1, 
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25 
                } 
              }}
              exit={{ scale: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div 
                className="w-full h-full flex items-center justify-center"
                animate={{ rotate: isOpen ? 45 : 0 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RadialNavigation;
