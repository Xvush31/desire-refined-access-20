
import React, { useRef, useState, useEffect } from 'react';
import { toast } from "sonner";

export type GestureType = 'swipe-up' | 'swipe-down' | 'swipe-left' | 'swipe-right' | 'long-press' | 'double-tap' | 'pinch';

interface Position {
  x: number;
  y: number;
}

interface GestureAction {
  type: GestureType;
  handler: () => void;
  description: string;
}

interface CustomGesturesProps {
  children: React.ReactNode;
  actions: GestureAction[];
}

const CustomGestures: React.FC<CustomGesturesProps> = ({ children, actions }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<Position | null>(null);
  const touchEndRef = useRef<Position | null>(null);
  const lastTapRef = useRef<number>(0);
  const initialTouchDistanceRef = useRef<number>(0);
  const touchStartTimeRef = useRef<number>(0);
  
  // Find specific action handlers
  const getActionHandler = (type: GestureType): (() => void) | undefined => {
    const action = actions.find(a => a.type === type);
    return action?.handler;
  };

  const showGestureFeedback = (type: GestureType) => {
    const action = actions.find(a => a.type === type);
    if (action) {
      // Show visual feedback via toast
      toast.info(action.description, {
        duration: 2000,
        position: "bottom-center",
        className: "gesture-message"
      });
    }
  };

  // Long press detection
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchStartTimeRef.current = Date.now();
    
    // Start long press timer
    const onLongPress = getActionHandler('long-press');
    if (onLongPress) {
      timerRef.current = setTimeout(() => {
        if (touchStartRef.current) {
          onLongPress();
          showGestureFeedback('long-press');
        }
      }, 700); // 700ms for long press
    }
    
    // Store initial distance for pinch detection
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      initialTouchDistanceRef.current = getDistance(
        touch1.clientX, touch1.clientY,
        touch2.clientX, touch2.clientY
      );
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Cancel long press if moving too much
    if (timerRef.current && touchStartRef.current) {
      const touch = e.touches[0];
      const moveX = Math.abs(touch.clientX - touchStartRef.current.x);
      const moveY = Math.abs(touch.clientY - touchStartRef.current.y);
      
      if (moveX > 10 || moveY > 10) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
    
    // Handle pinch gesture
    const onPinch = getActionHandler('pinch');
    if (e.touches.length === 2 && onPinch && initialTouchDistanceRef.current > 0) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const currentDist = getDistance(
        touch1.clientX, touch1.clientY,
        touch2.clientX, touch2.clientY
      );
      
      // Only trigger if significant scale change
      if (Math.abs(currentDist / initialTouchDistanceRef.current - 1) > 0.1) {
        onPinch();
        showGestureFeedback('pinch');
        initialTouchDistanceRef.current = currentDist; // Reset to prevent repeated triggers
      }
    }
  };

  const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Clear long press timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // If touchstart position exists
    if (touchStartRef.current) {
      // Get last touch position
      touchEndRef.current = touchStartRef.current;
      
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        touchEndRef.current = { x: touch.clientX, y: touch.clientY };
      }
      
      // Handle swipes
      handleSwipe();
      
      // Handle double tap
      const now = Date.now();
      const DOUBLE_TAP_DELAY = 300;
      const touchTime = now - touchStartTimeRef.current;
      
      // Only recognize as tap if touch duration was short
      if (touchTime < 300) {
        if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
          const onDoubleTap = getActionHandler('double-tap');
          if (onDoubleTap && touchEndRef.current) {
            onDoubleTap();
            showGestureFeedback('double-tap');
            // Reset to prevent triple tap being detected as double tap
            lastTapRef.current = 0;
          }
        } else {
          // Update last tap timestamp
          lastTapRef.current = now;
        }
      }
    }
    
    // Reset touch tracking
    initialTouchDistanceRef.current = 0;
  };
  
  const handleSwipe = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    
    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    
    // Minimum distance for swipe detection
    const MIN_DISTANCE = 50;
    
    // Check if horizontal swipe distance is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > MIN_DISTANCE) {
      if (deltaX > 0) {
        const onSwipeRight = getActionHandler('swipe-right');
        if (onSwipeRight) {
          onSwipeRight();
          showGestureFeedback('swipe-right');
        }
      } else {
        const onSwipeLeft = getActionHandler('swipe-left');
        if (onSwipeLeft) {
          onSwipeLeft();
          showGestureFeedback('swipe-left');
        }
      }
    } 
    // Check if vertical swipe distance is greater than horizontal
    else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > MIN_DISTANCE) {
      if (deltaY > 0) {
        const onSwipeDown = getActionHandler('swipe-down');
        if (onSwipeDown) {
          onSwipeDown();
          showGestureFeedback('swipe-down');
        }
      } else {
        const onSwipeUp = getActionHandler('swipe-up');
        if (onSwipeUp) {
          onSwipeUp();
          showGestureFeedback('swipe-up');
        }
      }
    }
    
    // Reset after handling
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={elementRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="touch-manipulation"
    >
      {children}
    </div>
  );
};

export default CustomGestures;
