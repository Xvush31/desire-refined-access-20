
import React, { useRef, useState, useEffect } from 'react';
import { useImmersiveMode } from '@/hooks/useImmersiveMode';
import { motion, AnimatePresence } from 'framer-motion';
import { UpgradeNeuroIcon, CloseIcon } from '@/icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import CreatorPostContent from './CreatorPostContent';
import CreatorPostActions from './CreatorPostActions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Type for creator post
export type CreatorFeedPost = {
  id: string;
  creatorName: string;
  creatorUsername: string;
  creatorImage: string;
  image: string;
  video?: string;
  audioTrack?: string;
  caption: string;
  timestamp: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  hasEngaged?: {
    liked?: boolean;
    commented?: boolean;
    saved?: boolean;
    shared?: boolean;
  };
  tags?: string[];
  location?: string;
  isPremium?: boolean;
  interactionScore?: number;
};

// Mock data
const samplePosts: CreatorFeedPost[] = [
  {
    id: '1',
    creatorName: 'Sophia Laurent',
    creatorUsername: 'sophialaurent',
    creatorImage: '/creators/creator-1.jpg',
    image: 'https://images.unsplash.com/photo-1618379519568-c7932ca89d61?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Dernière collection été - édition limitée 🌞 #nouveauté #mode',
    timestamp: '2h',
    metrics: {
      likes: 3240,
      comments: 89,
      shares: 42,
      saves: 156
    },
    hasEngaged: {
      liked: true
    },
    tags: ['mode', 'été', 'collection'],
    location: 'Paris, France',
    interactionScore: 92
  },
  {
    id: '2',
    creatorName: 'Juliette Dubois',
    creatorUsername: 'juliettemodel',
    creatorImage: '/creators/creator-2.jpg',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Shooting backstage pour @magazinedeluxe 📸 Édition spéciale printemps',
    timestamp: '5h',
    metrics: {
      likes: 5621,
      comments: 134,
      shares: 78,
      saves: 432
    },
    tags: ['shooting', 'magazine', 'mode'],
    location: 'Studio Mode, Lyon',
    isPremium: true,
    interactionScore: 86
  },
  {
    id: '3',
    creatorName: 'Emma Lefebvre',
    creatorUsername: 'emma_styles',
    creatorImage: '/creators/creator-3.jpg',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    video: '/videos/sample-fashion.mp4',
    caption: 'Nouvelle routine matinale 🌿 Comment je prépare ma journée en 15 minutes',
    timestamp: '1j',
    metrics: {
      likes: 8943,
      comments: 312,
      shares: 165,
      saves: 780
    },
    hasEngaged: {
      liked: true,
      saved: true
    },
    tags: ['routine', 'lifestyle', 'wellness'],
    interactionScore: 94
  }
];

interface ImmersivePublicationsProps {
  creatorId?: string;
  posts?: CreatorFeedPost[];
  className?: string;
}

const ImmersivePublications: React.FC<ImmersivePublicationsProps> = ({
  creatorId,
  posts = samplePosts,
  className
}) => {
  const { isImmersive, toggleImmersiveMode } = useImmersiveMode();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNeuroEffect, setShowNeuroEffect] = useState(false);
  const [showNeuroTooltip, setShowNeuroTooltip] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Helper for showing temporary engagement effects
  const flashEngagement = () => {
    setShowNeuroEffect(true);
    setTimeout(() => setShowNeuroEffect(false), 2000);
  };
  
  // Navigation functions
  const nextPost = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const prevPost = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  
  // Optional: For desktop, detect arrow key presses
  useEffect(() => {
    if (!isImmersive) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevPost();
      } else if (event.key === 'ArrowRight') {
        nextPost();
      } else if (event.key === 'Escape') {
        toggleImmersiveMode();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isImmersive, toggleImmersiveMode]);
  
  // Show tooltip on first visit
  useEffect(() => {
    if (isImmersive) {
      // Check if user has seen tooltip before
      const hasSeenTooltip = localStorage.getItem('hasSeenNeuroTooltip');
      if (!hasSeenTooltip) {
        setShowNeuroTooltip(true);
        localStorage.setItem('hasSeenNeuroTooltip', 'true');
        
        // Hide tooltip after 5 seconds
        const timer = setTimeout(() => {
          setShowNeuroTooltip(false);
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isImmersive]);
  
  // Track view time for engagement
  useEffect(() => {
    if (!isImmersive) return;
    
    let timestamp = Date.now();
    
    return () => {
      const viewDuration = (Date.now() - timestamp) / 1000;
      console.log(`Viewed post ${currentIndex} for ${viewDuration.toFixed(1)}s`);
      
      // Here you could track analytics about view duration
    };
  }, [currentIndex, isImmersive]);
  
  // Simulate user interaction with content elements
  const interactWithContent = (
    element: HTMLElement | null, 
    contentType: 'image' | 'video' | 'text', 
    interactionLevel: 'light' | 'medium' | 'deep'
  ) => {
    if (!element) return;
    
    // Apply subtle animations based on interaction level
    const animationIntensity = 
      interactionLevel === 'light' ? 1 :
      interactionLevel === 'medium' ? 2 : 3;
    
    // Visual feedback
    flashEngagement();
    
    // Log interaction for analytics
    console.log(`User interacted with ${contentType}, level: ${interactionLevel}`);
  };
  
  const renderPostContent = (post: CreatorFeedPost) => (
    <div 
      className="relative mb-4 w-full"
      ref={imageRef}
      onClick={() => {
        interactWithContent(imageRef.current, 'image', 'medium');
        console.log("Content clicked");
      }}
    >
      <motion.div
        className={`overflow-hidden rounded-xl shadow-lg ${showNeuroEffect ? 'pulse-glow' : ''} w-full`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        key={post.id}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ willChange: 'transform, opacity', perspective: '1000px' }}
      >
        <AspectRatio ratio={9/16} className="bg-muted w-full">
          <img 
            src={post.image} 
            alt={`Publication de ${post.creatorName}`}
            className="w-full h-full object-cover"
          />
          
          {/* Premium indicator */}
          {post.isPremium && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-black text-xs font-bold px-2 py-0.5 rounded-full">
              PREMIUM
            </div>
          )}
          
          {/* Content overlays could go here */}
          {showNeuroEffect && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-pink-600/30 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AspectRatio>
      </motion.div>
      
      <CreatorPostContent 
        post={post} 
        isImmersive={true} 
      />
    </div>
  );
  
  // If not in immersive mode, show the enter button
  if (!isImmersive) {
    return (
      <div className={cn("flex flex-col items-center justify-center my-4", className)}>
        <Button
          onClick={toggleImmersiveMode}
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <UpgradeNeuroIcon className="w-5 h-5" />
          Mode Immersif
        </Button>
      </div>
    );
  }
  
  // Navigation controls for desktop
  const DesktopNavigationControls = () => (
    <>
      <button 
        onClick={prevPost}
        disabled={currentIndex === 0}
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/70'}`}
      >
        <span className="sr-only">Précédent</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button 
        onClick={nextPost}
        disabled={currentIndex === posts.length - 1}
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white ${currentIndex === posts.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/70'}`}
      >
        <span className="sr-only">Suivant</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </>
  );
  
  // Close button
  const CloseButton = () => (
    <button
      onClick={toggleImmersiveMode}
      className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white"
      aria-label="Quitter le mode immersif"
    >
      <CloseIcon className="w-5 h-5" />
    </button>
  );
  
  // Neural tooltip
  const NeuroTooltip = () => (
    <AnimatePresence>
      {showNeuroTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-20 right-6 max-w-60 bg-gradient-to-br from-purple-900/90 to-purple-800/90 p-3 rounded-xl text-white text-sm shadow-xl border border-purple-600/50"
        >
          <div className="flex items-start gap-2">
            <UpgradeNeuroIcon className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Mode Immersif activé</p>
              <p className="text-xs text-purple-200 mt-1">
                Naviguez entre les publications avec les flèches ou par balayage
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowNeuroTooltip(false)}
            className="absolute top-1 right-1 text-white/70 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="absolute right-4 -bottom-2 w-4 h-4 bg-purple-800 transform rotate-45" />
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  return (
    <div className="absolute inset-0 z-50 bg-black overflow-hidden">
      <CloseButton />
      <NeuroTooltip />
      
      <div className="h-full flex flex-col items-center justify-center p-4">
        {isMobile ? (
          <ScrollArea className="h-[calc(100vh-80px)] w-full max-w-md mx-auto">
            <div className="space-y-8 pb-8 pt-2 w-full">
              {posts.map((post, index) => (
                <div key={post.id} className="w-full mx-auto">
                  {renderPostContent(post)}
                  
                  {/* Post indicator */}
                  <div className="flex justify-center gap-1 mt-2 mb-8">
                    {posts.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 ${index === i ? 'w-6 bg-white' : 'w-3 bg-white/30'} rounded-full`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <>
            {/* Desktop version with navigation arrows */}
            <div className="w-full max-w-md mx-auto">
              {renderPostContent(posts[currentIndex])}
            </div>
            
            {/* Navigation dots */}
            <div className="flex space-x-1 mt-2">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${currentIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/30'}`}
                  aria-label={`Voir la publication ${index + 1}`}
                />
              ))}
            </div>
            
            <DesktopNavigationControls />
          </>
        )}
      </div>
      
      {/* Interactions panel */}
      <div className="absolute bottom-0 inset-x-0 px-4 py-3">
        <CreatorPostActions 
          post={posts[currentIndex]} 
          onNeuroAction={() => {
            flashEngagement();
            console.log("Neural-powered action triggered");
          }}
        />
      </div>
    </div>
  );
};

export default ImmersivePublications;
