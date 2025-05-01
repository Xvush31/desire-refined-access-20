
// Define gesture types that can be used throughout the application
export type GestureType = "swipe-up" | "swipe-down" | "swipe-left" | "swipe-right" | "pinch" | "double-tap" | "long-press";

// Define handler types
export interface GestureHandlers {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onPinch?: (scale: number) => void;
  onDoubleTap?: (position: Position) => void;
  onLongPress?: (position: Position) => void;
}

// Define common position interface
export interface Position {
  x: number;
  y: number;
}

// Extended content metrics type for integration with enhanced UI
export interface ContentMetrics {
  views: number;
  likes: number;
  engagement: number;
  completionRate?: number;
  watchTime?: string;
  comments?: number;
  rating?: number;
  growth?: number;
}
