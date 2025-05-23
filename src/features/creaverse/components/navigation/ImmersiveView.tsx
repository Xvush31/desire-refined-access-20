
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ImmersiveContentItem {
  id: string;
  title?: string;
  imageUrl: string;
  videoUrl?: string;
  format?: 'video' | 'image' | 'audio' | 'text';
  metrics?: {
    views?: number;
    likes?: number;
    comments?: number;
    revenue?: number;
  };
}

interface ImmersiveViewProps {
  isOpen: boolean;
  onClose: () => void;
  content: ImmersiveContentItem[];
  initialIndex: number;
}

const ImmersiveView: React.FC<ImmersiveViewProps> = ({ 
  isOpen, 
  onClose, 
  content, 
  initialIndex = 0 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Add a small delay before locking scroll to ensure smooth transition
      const scrollTimer = setTimeout(() => {
        document.body.style.overflow = 'hidden';
        setIsScrollLocked(true);
      }, 50);
      
      // Add keyboard navigation
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'i') setIsInfoVisible(prev => !prev);
      };
      
      window.addEventListener('keydown', handleKeydown);
      
      return () => {
        clearTimeout(scrollTimer);
        document.body.style.overflow = 'auto';
        setIsScrollLocked(false);
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [isOpen, currentIndex, onClose]);

  useEffect(() => {
    if (!isOpen && isScrollLocked) {
      // Ensure scroll is restored when closing
      document.body.style.overflow = 'auto';
      setIsScrollLocked(false);
    }
  }, [isOpen, isScrollLocked]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  if (!isOpen || content.length === 0) return null;
  
  const currentContent = content[currentIndex];
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % content.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + content.length) % content.length);
  };

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          style={{ willChange: 'opacity' }}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 rounded-full"
            onClick={() => {
              // Restore scroll before animation completes
              document.body.style.overflow = 'auto';
              setIsScrollLocked(false);
              onClose();
            }}
          >
            <X size={24} />
          </Button>
          
          {/* Content display */}
          <motion.div 
            className="w-full h-full flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ willChange: 'transform, opacity' }}
          >
            {currentContent.format === 'video' && currentContent.videoUrl ? (
              <div className="w-full max-w-4xl aspect-video relative">
                <video 
                  src={currentContent.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                  playsInline
                />
              </div>
            ) : (
              <img 
                src={currentContent.imageUrl} 
                alt={currentContent.title || 'Content'} 
                className="max-h-[85vh] max-w-[85vw] object-contain"
                loading="eager"
              />
            )}
          </motion.div>
          
          {/* Navigation controls */}
          {content.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full h-12 w-12"
                onClick={goToPrevious}
              >
                <ChevronLeft size={36} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full h-12 w-12"
                onClick={goToNext}
              >
                <ChevronRight size={36} />
              </Button>
            </>
          )}
          
          {/* Info panel - use ScrollArea for smooth scrolling when needed */}
          <AnimatePresence>
            {isInfoVisible && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pb-16"
              >
                <ScrollArea className="max-h-32">
                  <h2 className="text-xl font-medium mb-2 text-white">{currentContent.title}</h2>
                  {currentContent.metrics && (
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      {currentContent.metrics.views !== undefined && (
                        <span>{formatNumber(currentContent.metrics.views)} views</span>
                      )}
                      {currentContent.metrics.likes !== undefined && (
                        <span>{formatNumber(currentContent.metrics.likes)} likes</span>
                      )}
                      {currentContent.metrics.comments !== undefined && (
                        <span>{formatNumber(currentContent.metrics.comments)} comments</span>
                      )}
                      {currentContent.metrics.revenue !== undefined && (
                        <span className="text-green-400">${currentContent.metrics.revenue} generated</span>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Page indicator */}
          {content.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
              {content.map((_, index) => (
                <div 
                  key={index}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    index === currentIndex 
                      ? "w-8 bg-white" 
                      : "w-2 bg-white/50"
                  )}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImmersiveView;
