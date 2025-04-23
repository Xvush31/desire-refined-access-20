
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!isInitialized) {
        setIsInitialized(true);
      }
      // Ajouter un log pour le débogage
      console.log("Screen width:", window.innerWidth, "isMobile:", mobile);
    };
    
    // Vérifier immédiatement au montage
    checkMobile();
    
    // Ajouter un écouteur d'événements pour les changements de taille
    window.addEventListener("resize", checkMobile);
    
    // Nettoyage
    return () => window.removeEventListener("resize", checkMobile);
  }, [isInitialized]);

  return isMobile;
}
