
import { useState, useEffect, useCallback } from "react";

const MOBILE_BREAKPOINT = 768;

// Extended hook with more features for mobile detection and optimization
export function useIsMobile(forceMobile = false) {
  // For forcing mobile mode during development or for testing
  if (forceMobile) {
    return true;
  }
  
  // Helper function to detect mobile device - defined BEFORE it's used
  const detectMobileDevice = useCallback(() => {
    if (typeof window === "undefined") return false;
    
    // Check screen width
    const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
    
    // Check user agent
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    
    // Check touch capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Additional check for iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    
    // Additional check for Android devices
    const isAndroid = /android/i.test(userAgent);
    
    // Check orientation (landscape vs portrait)
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    
    // Combined logic for better detection
    // For tablets, consider screen size and orientation
    if (isMobileUserAgent) {
      // Definitely a mobile device based on user agent
      return true;
    } else if (isTouchDevice) {
      // Touch device, but could be a touch laptop or tablet
      // For tablets, base on screen size and orientation
      if (isIOS || isAndroid) {
        return true;
      }
      
      // For tablets in landscape with large screens, might not want mobile UI
      const isTablet = window.innerWidth > 600 && window.innerWidth <= 1200;
      if (isTablet && !isPortrait) {
        // Tablet in landscape - can use desktop UI
        return false;
      }
      
      return isMobileWidth;
    }
    
    // Fallback to screen width check
    return isMobileWidth;
  }, []);
  
  // Initialize with current window size, but use null for server-side rendering
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    
    // Check both window width and user agent for better detection
    return detectMobileDevice();
  });

  // Debounced resize handler for better performance
  const debouncedResize = useCallback(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        setIsMobile(detectMobileDevice());
      }, 100); // Small delay to avoid excessive updates
    };
  }, [detectMobileDevice]);

  useEffect(() => {
    // Check initial size
    setIsMobile(detectMobileDevice());
    
    // Create the debounced handler
    const handleResize = debouncedResize();
    
    // Handle orientation change specifically for mobile devices
    const handleOrientationChange = () => {
      setTimeout(() => {
        setIsMobile(detectMobileDevice());
      }, 100);
    };
    
    // Add passive listener for better performance
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleOrientationChange, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [debouncedResize, detectMobileDevice]);

  return isMobile;
}
