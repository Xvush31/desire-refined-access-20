import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export type GestureType = "swipe-up" | "swipe-down" | "swipe-left" | "swipe-right" | "double-tap" | "long-press" | "pinch";

interface GestureAction {
  type: GestureType;
  handler: (e?: any) => void;  // Updated to accept optional parameter
  description: string;
}

interface CustomGesturesProps {
  children: React.ReactNode;
  actions: GestureAction[];
  enableFeedback?: boolean;
}

const CustomGestures: React.FC<CustomGesturesProps> = ({
  children,
  actions,
  enableFeedback = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [feedback, setFeedback] = useState<{ text: string; position: { x: number; y: number } } | null>(null);
  
  // Gesture tracking state
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTapRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialTouchesRef = useRef<React.Touch[] | null>(null);
  
  const findAction = (type: GestureType): GestureAction | undefined => {
    return actions.find(action => action.type === type);
  };
  
  const showFeedback = (text: string, x: number, y: number) => {
    if (!enableFeedback) return;
    
    setFeedback({ text, position: { x, y } });
    setTimeout(() => setFeedback(null), 1000);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    
    // Store initial touches for pinch detection
    if (e.touches.length === 2) {
      initialTouchesRef.current = [e.touches[0], e.touches[1]];
    }
    
    // Check for double tap
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300) {
      // Double tap detected
      const doubleTapAction = findAction("double-tap");
      if (doubleTapAction) {
        doubleTapAction.handler();
        showFeedback(doubleTapAction.description, touch.clientX, touch.clientY);
        e.preventDefault(); // Prevent zoom and other browser actions
      }
    }
    
    lastTapRef.current = now;
    
    // Set up long press detection - CHANGED TO 1.5 SECONDS
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    
    longPressTimerRef.current = setTimeout(() => {
      const longPressAction = findAction("long-press");
      if (longPressAction) {
        longPressAction.handler();
        showFeedback(longPressAction.description, touch.clientX, touch.clientY);
      }
    }, 1500); // Changed from 800ms to 1500ms (1.5 seconds) for long press
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    // Clear long press timer on move
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    
    if (!touchStartRef.current) return;
    
    // Handle pinch gesture
    if (e.touches.length === 2 && initialTouchesRef.current) {
      const initialDistance = getDistance(
        initialTouchesRef.current[0].clientX,
        initialTouchesRef.current[0].clientY,
        initialTouchesRef.current[1].clientX,
        initialTouchesRef.current[1].clientY
      );
      
      const currentDistance = getDistance(
        e.touches[0].clientX,
        e.touches[0].clientY,
        e.touches[1].clientX,
        e.touches[1].clientY
      );
      
      const pinchAction = findAction("pinch");
      if (pinchAction && Math.abs(currentDistance - initialDistance) > 50) {
        pinchAction.handler();
        showFeedback(
          pinchAction.description, 
          (e.touches[0].clientX + e.touches[1].clientX) / 2,
          (e.touches[0].clientY + e.touches[1].clientY) / 2
        );
        initialTouchesRef.current = null; // Reset to prevent repeated triggers
      }
    }
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    
    if (!touchStartRef.current) return;
    
    const { x: startX, y: startY, time: startTime } = touchStartRef.current;
    const endTime = Date.now();
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    
    // Calculate deltas
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const deltaTime = endTime - startTime;
    
    // Reset touch start reference
    touchStartRef.current = null;
    
    // Ignore if the touch duration is too short or too long
    if (deltaTime < 30 || deltaTime > 1000) return;
    
    // Calculate the distance and determine if it's a swipe
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Minimum distance to be considered a swipe
    if (distance < 50) return;
    
    // Determine the direction of the swipe
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    let type: GestureType;
    
    if (absX > absY) {
      // Horizontal swipe
      type = deltaX > 0 ? "swipe-right" : "swipe-left";
    } else {
      // Vertical swipe
      type = deltaY > 0 ? "swipe-down" : "swipe-up";
    }
    
    const action = findAction(type);
    if (action) {
      action.handler();
      showFeedback(action.description, endX, endY);
    }
  };
  
  // Helper function to calculate distance between two points
  const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };
  
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      
      {feedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute bg-black/80 text-white px-3 py-2 rounded-lg text-sm pointer-events-none backdrop-blur-sm z-50 border border-white/20 shadow-lg"
          style={{
            left: feedback.position.x,
            top: feedback.position.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {feedback.text}
        </motion.div>
      )}
    </div>
  );
};

export default CustomGestures;
