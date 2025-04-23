
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false); // Initialize with a default value
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!isInitialized) {
        setIsInitialized(true);
      }
    };
    
    // Check immediately on mount
    checkMobile();
    
    // Then set up listener for resize events
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, [isInitialized]);

  return isMobile;
}
