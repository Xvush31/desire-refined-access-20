
import { useState, useEffect, useRef } from 'react';

interface UseOptimizedLazyLoadingProps {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export const useOptimizedLazyLoading = ({
  threshold = 0.1,
  rootMargin = '200px',
  enabled = true
}: UseOptimizedLazyLoadingProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          
          // If we only want to trigger once
          observer.disconnect();
        } else {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, enabled]);

  return { ref, isVisible, hasBeenVisible };
};
