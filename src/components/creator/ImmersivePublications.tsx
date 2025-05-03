
import React, { useRef, useState, useEffect } from 'react';
import { useImmersiveMode } from '@/hooks/useImmersiveMode';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Volume2, VolumeX, Vibrate, X } from 'lucide-react';
import { toast } from 'sonner';
import { CreatorFeedPost } from './CreatorFeedItem';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useTheme } from '@/hooks/use-theme';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import HLSVideoPlayer from '@/components/HLSVideoPlayer';

// Données statiques pour les vidéos XTease à utiliser dans l'interface immersive
const immersiveXTeaseVideos = [
  {
    id: 101,
    title: "Moment intime en soirée",
    performer: "PartyGirl",
    views: "421K vues",
    thumbnail: "https://picsum.photos/seed/xtease1/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-1/playlist.m3u8",
    isPremium: false,
  },
  {
    id: 102,
    title: "Séance photo personnelle",
    performer: "PhotoArtist",
    views: "732K vues",
    thumbnail: "https://picsum.photos/seed/xtease2/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-2/playlist.m3u8",
    isPremium: true,
  },
  {
    id: 103,
    title: "Rencontre dans un hôtel 5 étoiles",
    performer: "LuxuryCouple",
    views: "628K vues",
    thumbnail: "https://picsum.photos/seed/xtease3/1080/1920",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-3/playlist.m3u8",
    isPremium: true,
  },
];

interface ImmersivePublicationsProps {
  posts: CreatorFeedPost[];
  onExitImmersive: () => void;
  activePromo?: {
    type: 'xtease' | 'creator' | 'trending' | null;
    data: any;
  };
  onClosePromo?: () => void;
}

const ImmersivePublications: React.FC<ImmersivePublicationsProps> = ({ 
  posts, 
  onExitImmersive,
  activePromo = { type: null, data: null },
  onClosePromo = () => {}
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationsEnabled, setVibrationsEnabled] = useState(true);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
  const [showNeuroEffect, setShowNeuroEffect] = useState(false);
  const [ambientMood, setAmbientMood] = useState<'calm' | 'energetic' | 'mysterious'>('calm');
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isVideoContent, setIsVideoContent] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  
  // Référence pour les éléments interactifs
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  
  // Mélanger les publications et les vidéos XTease
  const [mixedContent, setMixedContent] = useState<Array<CreatorFeedPost | typeof immersiveXTeaseVideos[0]>>([]);
  
  // Préparer le contenu mélangé au chargement
  useEffect(() => {
    const mixed = [...posts];
    
    // Insérer une vidéo XTease toutes les 2-3 publications
    let insertIndex = Math.floor(Math.random() * 2) + 2; // Commence entre la 2e et 3e publication
    
    while (insertIndex < mixed.length) {
      // Sélectionner une vidéo XTease aléatoire
      const randomXTeaseIndex = Math.floor(Math.random() * immersiveXTeaseVideos.length);
      const xteaseVideo = immersiveXTeaseVideos[randomXTeaseIndex];
      
      // Insérer la vidéo XTease
      mixed.splice(insertIndex, 0, xteaseVideo);
      
      // Prochain point d'insertion: 2-3 publications plus loin
      insertIndex += Math.floor(Math.random() * 2) + 3;
    }
    
    setMixedContent(mixed);
  }, [posts]);
  
  const {
    isImmersive,
    toggleImmersive,
    interactWithContent
  } = useImmersiveMode({
    enableSound: soundEnabled,
    enableVibration: vibrationsEnabled,
    enableLightEffects: true
  });

  // Vérifier si l'élément actuel est une vidéo ou une publication
  useEffect(() => {
    if (currentIndex < mixedContent.length) {
      const currentItem = mixedContent[currentIndex];
      setIsVideoContent('streamUrl' in currentItem);
    }
  }, [currentIndex, mixedContent]);
  
  // Change post every 12 seconds in desktop mode only - si ce n'est pas une vidéo
  useEffect(() => {
    if (!isMobile && !activePromo?.type && !isVideoContent) {
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
      }, 12000);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isMobile, activePromo, isVideoContent]);
  
  // Gérer l'affichage/masquage automatique des contrôles
  useEffect(() => {
    // Montrer les contrôles au début
    setControlsVisible(true);
    
    // Configurer le timer pour masquer les contrôles après 1.5 secondes
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    
    controlsTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 1500);
    
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [currentIndex]);
  
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
  
  // Neuro-Aesthetic Loop effects - change mood every 45 seconds
  useEffect(() => {
    const moodTimer = setInterval(() => {
      const moods: Array<'calm' | 'energetic' | 'mysterious'> = ['calm', 'energetic', 'mysterious'];
      const currentMoodIndex = moods.indexOf(ambientMood);
      const nextMoodIndex = (currentMoodIndex + 1) % moods.length;
      setAmbientMood(moods[nextMoodIndex]);
      
      // Trigger a brief neuro effect when mood changes
      setShowNeuroEffect(true);
      setTimeout(() => setShowNeuroEffect(false), 3000);
      
    }, 45000);
    
    return () => clearInterval(moodTimer);
  }, [ambientMood]);
  
  // Parallax effect on scroll
  useEffect(() => {
    if (!containerRef.current || isMobile) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (imageRef.current) {
        // Apply subtle parallax effect
        imageRef.current.style.transform = `translateY(${scrollPosition * 0.05}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  const goToNextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % mixedContent.length);
  };
  
  const goToPrevPost = () => {
    setCurrentIndex((prev) => (prev - 1 + mixedContent.length) % mixedContent.length);
  };
  
  // Fonction pour afficher les contrôles temporairement lors d'une interaction
  const handleUserInteraction = () => {
    // Afficher les contrôles
    setControlsVisible(true);
    
    // Réinitialiser le timer pour les masquer après 1.5 secondes
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    
    controlsTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 1500);
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    toast.info(soundEnabled ? "Son désactivé" : "Son activé");
    handleUserInteraction();
  };
  
  const toggleVideoMute = () => {
    setVideoMuted(prev => !prev);
    toast.info(videoMuted ? "Son de la vidéo activé" : "Son de la vidéo désactivé");
    handleUserInteraction();
  };
  
  const toggleVibrations = () => {
    setVibrationsEnabled(prev => !prev);
    toast.info(vibrationsEnabled ? "Vibrations désactivées" : "Vibrations activées");
    handleUserInteraction();
    
    // Test vibration when enabling
    if (!vibrationsEnabled && navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.info(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`);
    handleUserInteraction();
    
    // Apply light effect when changing theme
    if (imageRef.current) {
      interactWithContent(imageRef.current, 'text', 'low');
    }
  };

  if (!mixedContent.length) return null;

  // Get ambient style based on current mood
  const getAmbientStyle = () => {
    switch(ambientMood) {
      case 'calm':
        return {
          background: 'linear-gradient(135deg, rgba(20,30,48,0.95) 0%, rgba(36,59,85,0.90) 100%)',
          transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: theme === 'dark' 
            ? '0 0 50px 5px rgba(100, 149, 237, 0.15)' 
            : '0 0 50px 5px rgba(100, 149, 237, 0.05)'
        };
      case 'energetic':
        return {
          background: 'linear-gradient(135deg, rgba(40,10,20,0.95) 0%, rgba(90,30,40,0.90) 100%)',
          transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: theme === 'dark' 
            ? '0 0 50px 5px rgba(255, 105, 180, 0.15)' 
            : '0 0 50px 5px rgba(255, 105, 180, 0.05)'
        };
      case 'mysterious':
        return {
          background: 'linear-gradient(135deg, rgba(30,20,40,0.95) 0%, rgba(50,30,70,0.90) 100%)',
          transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: theme === 'dark' 
            ? '0 0 50px 5px rgba(147, 112, 219, 0.15)' 
            : '0 0 50px 5px rgba(147, 112, 219, 0.05)'
        };
      default:
        return {};
    }
  };

  // Vérifier si l'élément actuel est une publication standard ou une vidéo XTease
  const currentContent = mixedContent[currentIndex];
  const isXTeaseVideo = 'streamUrl' in currentContent;
  
  const renderPostContent = (content: typeof mixedContent[0]) => {
    // Si c'est une vidéo XTease
    if ('streamUrl' in content) {
      return (
        <div 
          className="relative mb-4 w-full"
          ref={imageRef}
          onClick={handleUserInteraction}
        >
          <motion.div
            className={`overflow-hidden rounded-xl shadow-lg ${showNeuroEffect ? 'pulse-glow' : ''} w-full`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={`xtease-${content.id}`}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <AspectRatio ratio={9/16} className="bg-muted w-full">
              <HLSVideoPlayer
                src={content.streamUrl}
                poster={content.thumbnail}
                title={content.title}
                videoId={content.id}
                isPreview={false}
                autoPlay
                muted={videoMuted}
                onVideoComplete={goToNextPost}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </motion.div>
          
          {/* Overlay pour texte XTease */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <div className="flex-grow">
                <h3 className="font-bold text-white">{content.title}</h3>
                <p className="text-white/70 text-sm">{content.performer} • {content.views}</p>
              </div>
              {content.isPremium && (
                <div className="badge badge-premium px-3 py-1 text-sm font-medium ml-2">
                  Premium
                </div>
              )}
            </div>
          </motion.div>
        </div>
      );
    }
    
    // Publication standard
    return (
      <div 
        className="relative mb-4 w-full"
        ref={imageRef}
        onClick={() => {
          handleUserInteraction();
          setIsDescriptionVisible(!isDescriptionVisible);
        }}
      >
        <motion.div
          className={`overflow-hidden rounded-xl shadow-lg ${showNeuroEffect ? 'pulse-glow' : ''} w-full`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={content.id}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ willChange: 'transform, opacity', perspective: '1000px' }}
        >
          <AspectRatio ratio={9/16} className="bg-muted w-full">
            <img 
              src={content.image} 
              alt={`Publication de ${content.creatorName}`}
              className="object-cover w-full h-full depth-layer"
            />
          </AspectRatio>
        </motion.div>
        
        {/* Creator info overlay */}
        <AnimatePresence>
          {isDescriptionVisible && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={content.creatorAvatar} 
                    alt={content.creatorName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">{content.creatorName}</h3>
                  <p className="text-white/70 text-sm">{content.timestamp}</p>
                </div>
              </div>
              <p className="text-white mb-2">{content.caption}</p>
              <p className="text-white/90 text-sm">❤️ {content.likes.toLocaleString()} j'aime</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Render promo popup content
  const renderPromoContent = () => {
    if (!activePromo || !activePromo.type) return null;

    const { type, data } = activePromo;

    switch (type) {
      case 'xtease':
        return (
          <Card className="bg-background/80 backdrop-blur-md border-primary/20 p-4 max-w-md w-full rounded-xl">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 rounded-full" 
              onClick={onClosePromo}
            >
              <X size={18} />
            </Button>
            <div className="aspect-[9/16] relative mb-4 rounded-lg overflow-hidden">
              <img 
                src={data.thumbnail}
                alt={data.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
            <p className="text-muted-foreground mb-4">Par {data.performer} • {data.views}</p>
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90"
            >
              <Link to="/xtease">Voir sur XTease</Link>
            </Button>
          </Card>
        );

      case 'creator':
        return (
          <Card className="bg-background/80 backdrop-blur-md border-primary/20 p-4 max-w-md w-full rounded-xl">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 rounded-full" 
              onClick={onClosePromo}
            >
              <X size={18} />
            </Button>
            <div className="flex flex-col items-center pt-4 pb-2">
              <Avatar className="w-24 h-24 border-2 border-primary mb-4">
                <AvatarImage src={data.avatar} alt={data.name} />
                <AvatarFallback className="bg-muted">
                  {data.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{data.name}</h3>
              <p className="text-muted-foreground mb-1">{data.category}</p>
              <p className="text-sm mb-4">{data.followers.toLocaleString()} fans</p>
            </div>
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90"
            >
              <Link to="/creators">Voir le profil</Link>
            </Button>
          </Card>
        );

      case 'trending':
        return (
          <Card className="bg-background/80 backdrop-blur-md border-primary/20 p-4 max-w-md w-full rounded-xl">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 rounded-full" 
              onClick={onClosePromo}
            >
              <X size={18} />
            </Button>
            <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
              <img 
                src={data.thumbnail}
                alt={data.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                {data.duration}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
            <p className="text-muted-foreground mb-4">Par {data.performer} • {data.views}</p>
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90"
            >
              <Link to="/trending">Voir la vidéo</Link>
            </Button>
          </Card>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={getAmbientStyle()}
        ref={containerRef}
        onClick={handleUserInteraction}
      >
        <AnimatePresence>
          {controlsVisible && (
            <motion.div 
              className="absolute top-4 right-4 flex space-x-2 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isXTeaseVideo ? (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={`rounded-full ${theme === 'dark' ? 'bg-background/50' : 'bg-background/80'} backdrop-blur-sm`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVideoMute();
                  }}
                >
                  {videoMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={`rounded-full ${theme === 'dark' ? 'bg-background/50' : 'bg-background/80'} backdrop-blur-sm`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSound();
                  }}
                >
                  {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${theme === 'dark' ? 'bg-background/50' : 'bg-background/80'} backdrop-blur-sm`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVibrations();
                }}
              >
                <Vibrate size={18} />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${theme === 'dark' ? 'bg-background/50' : 'bg-background/80'} backdrop-blur-sm`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              
              <Button 
                variant="outline" 
                className={`rounded-full ${theme === 'dark' ? 'bg-background/50' : 'bg-background/80'} backdrop-blur-sm`}
                onClick={(e) => {
                  e.stopPropagation();
                  onExitImmersive();
                }}
              >
                Quitter
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popup promo content */}
        <AnimatePresence>
          {activePromo?.type && (
            <motion.div 
              className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onClosePromo()}
            >
              <motion.div 
                className="p-4 max-w-sm w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {renderPromoContent()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="h-full flex flex-col items-center justify-center p-4">
          {isMobile ? (
            <ScrollArea className="h-[calc(100vh-80px)] w-full max-w-md mx-auto">
              <div className="space-y-8 pb-8 pt-2 w-full">
                {mixedContent.map((content, index) => (
                  <div key={'streamUrl' in content ? `video-${content.id}` : content.id} className="w-full mx-auto">
                    {renderPostContent(content)}
                    
                    {/* Post indicator */}
                    <div className="flex space-x-1 justify-center mt-2">
                      <div className="h-1.5 w-16 bg-primary rounded-full"></div>
                      <div className="text-xs text-muted-foreground">
                        {index + 1}/{mixedContent.length}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <>
              {/* Desktop version with navigation arrows */}
              <div className="w-full max-w-md mx-auto">
                {renderPostContent(currentContent)}
              </div>
              
              {/* Navigation dots */}
              <div className="flex space-x-1 mt-2">
                {mixedContent.slice(0, Math.min(5, mixedContent.length)).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2 rounded-full ${i === currentIndex ? "bg-primary w-8" : "bg-muted w-2"}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: i === currentIndex ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
                {mixedContent.length > 5 && (
                  <motion.div className="h-2 w-2 rounded-full bg-muted opacity-50" />
                )}
              </div>
              
              <AnimatePresence>
                {controlsVisible && (
                  <>
                    {/* Left/Right navigation */}
                    <motion.button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/30 rounded-full p-2 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevPost();
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </motion.button>
                    
                    <motion.button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/30 rounded-full p-2 backdrop-blur-sm"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNextPost();
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </motion.button>
                  </>
                )}
              </AnimatePresence>
            </>
          )}
          
          {/* Welcome message */}
          <AnimatePresence>
            {currentIndex === 0 && !activePromo?.type && (
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
