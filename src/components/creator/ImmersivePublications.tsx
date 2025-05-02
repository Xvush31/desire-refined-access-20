
import React, { useRef, useState, useEffect } from 'react';
import { useImmersiveMode } from '@/hooks/useImmersiveMode';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Volume2, VolumeX, Vibrate } from 'lucide-react';
import { toast } from 'sonner';
import { CreatorFeedPost } from './CreatorFeedItem';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useTheme } from '@/hooks/use-theme';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImmersivePublicationsProps {
  posts: CreatorFeedPost[];
  onExitImmersive: () => void;
}

const ImmersivePublications: React.FC<ImmersivePublicationsProps> = ({ posts, onExitImmersive }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationsEnabled, setVibrationsEnabled] = useState(true);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  
  const {
    isImmersive,
    toggleImmersive,
    interactWithContent
  } = useImmersiveMode({
    enableSound: soundEnabled,
    enableVibration: vibrationsEnabled,
    enableLightEffects: true
  });

  // Change post every 8 seconds in desktop mode only
  useEffect(() => {
    if (!isImmersive || isMobile) return;
    
    const timer = setTimeout(() => {
      goToNextPost();
      
      // Apply effects when changing posts
      if (imageRef.current) {
        interactWithContent(
          imageRef.current, 
          'image', 
          currentIndex % 3 === 0 ? 'high' : 'medium'
        );
      }
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isImmersive, isMobile]);
  
  // Apply initial effects
  useEffect(() => {
    if (isImmersive && imageRef.current) {
      // Short delay to ensure element is rendered
      const timer = setTimeout(() => {
        interactWithContent(imageRef.current, 'image', 'medium');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isImmersive]);
  
  const goToNextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };
  
  const goToPrevPost = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    toast.info(soundEnabled ? "Son désactivé" : "Son activé");
  };
  
  const toggleVibrations = () => {
    setVibrationsEnabled(prev => !prev);
    toast.info(vibrationsEnabled ? "Vibrations désactivées" : "Vibrations activées");
    
    // Test vibration when enabling
    if (!vibrationsEnabled && navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.info(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`);
    
    // Apply light effect when changing theme
    if (imageRef.current) {
      interactWithContent(imageRef.current, 'text', 'low');
    }
  };

  if (!posts.length) return null;
  
  const renderPostContent = (post: CreatorFeedPost) => (
    <div 
      className="relative mb-4"
      ref={imageRef}
      onClick={() => {
        interactWithContent(imageRef.current, 'image', 'medium');
        setIsDescriptionVisible(!isDescriptionVisible);
      }}
    >
      <motion.div
        className="overflow-hidden rounded-xl shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        key={post.id}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <AspectRatio ratio={9/16} className="bg-muted">
          <img 
            src={post.image} 
            alt={`Publication de ${post.creatorName}`}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </motion.div>
      
      {/* Creator info overlay */}
      <AnimatePresence>
        {isDescriptionVisible && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img 
                  src={post.creatorAvatar} 
                  alt={post.creatorName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-white">{post.creatorName}</h3>
                <p className="text-white/70 text-sm">{post.timestamp}</p>
              </div>
            </div>
            <p className="text-white mb-2">{post.caption}</p>
            <p className="text-white/90 text-sm">❤️ {post.likes.toLocaleString()} j'aime</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={toggleSound}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={toggleVibrations}
          >
            <Vibrate size={18} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={onExitImmersive}
          >
            Quitter
          </Button>
        </div>
        
        <div className="h-full flex flex-col items-center justify-center p-4">
          {isMobile ? (
            <ScrollArea className="h-[calc(100vh-80px)] w-full max-w-md">
              <div className="space-y-8 pb-8 pt-2">
                {posts.map((post, index) => (
                  <div key={post.id} className="w-full max-w-md mx-auto">
                    {renderPostContent(post)}
                    
                    {/* Post indicator */}
                    <div className="flex space-x-1 justify-center mt-2">
                      <div className="h-1.5 w-16 bg-primary rounded-full"></div>
                      <div className="text-xs text-muted-foreground">
                        {index + 1}/{posts.length}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <>
              {/* Desktop version with navigation arrows */}
              {renderPostContent(posts[currentIndex])}
              
              {/* Navigation dots */}
              <div className="flex space-x-1 mt-2">
                {posts.slice(0, Math.min(5, posts.length)).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2 rounded-full ${i === currentIndex ? "bg-primary w-8" : "bg-muted w-2"}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: i === currentIndex ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
                {posts.length > 5 && (
                  <motion.div className="h-2 w-2 rounded-full bg-muted opacity-50" />
                )}
              </div>
              
              {/* Left/Right navigation */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/30 rounded-full p-2 backdrop-blur-sm"
                onClick={goToPrevPost}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/30 rounded-full p-2 backdrop-blur-sm"
                onClick={goToNextPost}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </>
          )}
          
          {/* First time welcome message */}
          <AnimatePresence>
            {currentIndex === 0 && (
              <motion.div
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="text-foreground text-center">
                  Bienvenue dans l'expérience immersive XVush!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImmersivePublications;
