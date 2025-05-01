
// Define gesture types that can be used throughout the application
export type GestureType = "swipe-up" | "swipe-down" | "swipe-left" | "swipe-right" | "pinch" | "double-tap" | "long-press";

// Define handler types
export interface GestureHandlers {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onPinch?: (scale: number) => void;
  onDoubleTap?: (position: {x: number, y: number}) => void;
  onLongPress?: (position: {x: number, y: number}) => void;
}

// Define common position interface
export interface Position {
  x: number;
  y: number;
}
