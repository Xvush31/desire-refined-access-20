
import { useState, useEffect, useCallback } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(forceMobile = false) {
  // For forcing mobile mode during development or for testing
  if (forceMobile) {
    return true;
  }
  
  // Initialize with current window size, but use null for server-side rendering
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  // Debounced resize handler for better performance
  const debouncedResize = useCallback(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }, 100); // Small delay to avoid excessive updates
    };
  }, []);

  useEffect(() => {
    // Check initial size
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Create the debounced handler
    const handleResize = debouncedResize();
    
    // Add passive listener for better performance
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debouncedResize]);

  return isMobile;
}
