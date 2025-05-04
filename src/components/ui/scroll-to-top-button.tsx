
import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopButtonProps {
  threshold?: number;
  className?: string;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 300,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-20 right-4 z-50 p-3 rounded-full bg-primary bg-opacity-80 backdrop-blur-sm text-primary-foreground shadow-lg hover:bg-opacity-100 transition-all", 
            className
          )}
          aria-label="Retour en haut"
        >
          <ChevronUp size={18} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
