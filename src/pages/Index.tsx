import React, { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "@/contexts/LocaleContext";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "lucide-react";
import CreatorFeedItem, { CreatorFeedPost } from "@/components/creator/CreatorFeedItem";
import { useImmersiveMode } from "@/hooks/useImmersiveMode";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ImmersivePublications from "@/components/creator/ImmersivePublications";

// Données mockées pour le feed des créateurs
const generateMockFeed = (): CreatorFeedPost[] => {
  const creators = [
    {
      id: 1,
      name: "Lola Mystik",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Lucas Zen",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=facearea&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Clara Sparkle",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=256&h=256&q=80",
    },
    {
      id: 4,
      name: "Yann Solo",
      avatar: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=256&h=256&q=80",
    },
    {
      id: 5,
      name: "Sophia Dreams",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=256&h=256&q=80",
    },
  ];

  const captions = [
    "Contenu exclusif pour mes abonnés 💋",
    "Nouveau shooting aujourd'hui, qu'en pensez-vous ? ✨",
    "Moment de détente avant mon prochain live ce soir 🌙",
    "Merci pour votre soutien incroyable ! 💖",
    "Session spéciale ce weekend, ne manquez pas ça 🔥",
    "Petit aperçu de mon nouveau contenu premium 🎬",
  ];

  return Array.from({ length: 30 }, (_, i) => {
    const creatorIndex = i % creators.length;
    const creator = creators[creatorIndex];
    const isPremium = i % 3 === 0;
    const daysAgo = i % 7;
    const hoursAgo = i % 24;
    
    let timestamp = daysAgo > 0 
      ? `il y a ${daysAgo} jour${daysAgo > 1 ? 's' : ''}` 
      : `il y a ${hoursAgo} heure${hoursAgo > 1 ? 's' : ''}`;
    
    return {
      id: `post-${i}`,
      creatorId: creator.id,
      creatorName: creator.name,
      creatorAvatar: creator.avatar,
      image: `https://picsum.photos/seed/post${i}/600/1067`, // Format 9:16 approximatif
      caption: captions[i % captions.length],
      likes: Math.floor(Math.random() * 10000) + 100,
      timestamp: timestamp,
      isPremium: isPremium
    };
  });
};

// Données mockées pour les vidéos XTease
const xteaseVideos = [
  {
    id: 1,
    title: "Moment intime en soirée",
    performer: "PartyGirl",
    views: "421K vues",
    thumbnail: "https://picsum.photos/seed/xtease1/600/1067",
  },
  {
    id: 2,
    title: "Séance photo qui devient personnelle",
    performer: "PhotoArtist",
    views: "732K vues",
    thumbnail: "https://picsum.photos/seed/xtease2/600/1067",
  },
  {
    id: 3,
    title: "Rencontre dans un hôtel 5 étoiles",
    performer: "LuxuryCouple",
    views: "628K vues",
    thumbnail: "https://picsum.photos/seed/xtease3/600/1067",
  },
];

// Données mockées pour les créateurs populaires
const popularCreators = [
  {
    id: 3,
    name: "Emma Stellar",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Modèle & Fitness",
    followers: 52400
  },
  {
    id: 4,
    name: "Alex Wave",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Artiste & Lifestyle",
    followers: 38700
  },
  {
    id: 5,
    name: "Julie Night",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Danseuse & Coach",
    followers: 45100
  }
];

// Données mockées pour les vidéos tendances
const trendingVideos = [
  {
    id: 1,
    title: "Couple amateur dans une chambre d'hôtel de luxe",
    thumbnail: "https://picsum.photos/seed/video1/640/360",
    duration: "12:34",
    views: "1.2M",
    performer: "JulieSky"
  },
  {
    id: 2,
    title: "Séance de massage qui dérape en expérience sensuelle",
    thumbnail: "https://picsum.photos/seed/video2/640/360",
    duration: "18:22",
    views: "843K",
    performer: "MassagePro"
  },
  {
    id: 3,
    title: "Rendez-vous secret dans un bureau après les heures de travail",
    thumbnail: "https://picsum.photos/seed/video3/640/360",
    duration: "22:15",
    views: "1.5M",
    performer: "OfficeLover"
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const { currentUser, loading } = useAuth();
  
  // Update the mock feed to use string IDs instead of numeric IDs
  const [posts, setPosts] = useState<CreatorFeedPost[]>(generateMockFeed().slice(0, 6).map(post => ({
    ...post,
    id: String(post.id) // Convert ID to string to match expected type
  })));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showImmersive, setShowImmersive] = useState(true); // Changed to true by default
  const [activePromo, setActivePromo] = useState<{
    type: 'xtease' | 'creator' | 'trending' | null,
    data: any
  }>({ type: null, data: null });
  
  // Convert post IDs to strings in the mock data
  const allPosts = generateMockFeed().map(post => ({
    ...post,
    id: String(post.id) // Convert ID to string to match expected type
  }));
  
  const { isFirstVisit } = useImmersiveMode();
  
  // Changed to always show immersive mode when landing on homepage
  useEffect(() => {
    setShowImmersive(true);
  }, []);
  
  useEffect(() => {
    console.log("Index component mounted, auth loading:", loading);
  }, [loading]);
  
  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simuler un délai de chargement
    setTimeout(() => {
      const nextPage = page + 1;
      const start = page * 6;
      const end = start + 6;
      const newPosts = allPosts.slice(start, end);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
      }
      
      setIsLoading(false);
    }, 800);
  }, [page, isLoading, hasMore, allPosts]);
  
  // Handle scroll event for infinite loading
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // Lorsque l'utilisateur défile près du bas (avec une marge de 200px)
    if (scrollHeight - scrollTop - clientHeight < 200 && !isLoading && hasMore) {
      loadMorePosts();
    }
  }, [loadMorePosts, isLoading, hasMore]);

  // Function to handle promotion clicks without exiting immersive mode
  const handlePromoClick = (type: 'xtease' | 'creator' | 'trending', data: any) => {
    setActivePromo({ type, data });
  };

  // Function to close the promo popup
  const closePromo = () => {
    setActivePromo({ type: null, data: null });
  };

  // Function to insert promotional blocks that use our new handlePromoClick
  const renderFeedWithPromos = () => {
    const result = [];
    
    for (let i = 0; i < posts.length; i++) {
      // Add the post
      result.push(
        <CreatorFeedItem key={posts[i].id} post={posts[i]} />
      );
      
      // After each group of 3 posts, insert a different promo block
      if ((i + 1) % 3 === 0 && i < posts.length - 1) {
        const promoType = Math.floor((i / 3) % 3); // Alternating between 0, 1, 2
        
        if (promoType === 0) {
          result.push(
            <div key={`xtease-promo-${i}`} className="mb-6 w-full">
              <h3 className="text-lg font-semibold mb-2 text-center animated-gradient">Découvrez XTease</h3>
              <div className="grid grid-cols-3 gap-2">
                {xteaseVideos.map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => handlePromoClick('xtease', video)}
                    className="relative overflow-hidden rounded-lg group cursor-pointer"
                  >
                    <div className="relative aspect-[9/16]">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-white text-xs truncate">{video.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (promoType === 1) {
          result.push(
            <div key={`performer-promo-${i}`} className="mb-6 w-full">
              <h3 className="text-lg font-semibold mb-2 text-center animated-gradient">Créateurs populaires</h3>
              <div className="grid grid-cols-3 gap-2">
                {popularCreators.map((performer) => (
                  <div 
                    key={performer.id}
                    onClick={() => handlePromoClick('creator', performer)}
                    className="relative rounded-lg group bg-card border border-border p-3 flex flex-col items-center cursor-pointer"
                  >
                    <div className="w-16 h-16 mb-2 border-2 border-pink-500 rounded-full overflow-hidden">
                      <img 
                        src={performer.avatar} 
                        alt={performer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm truncate w-full">{performer.name}</p>
                      <p className="text-xs text-muted-foreground">{performer.followers.toLocaleString()} fans</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          result.push(
            <div key={`trending-promo-${i}`} className="mb-6 w-full">
              <h3 className="text-lg font-semibold mb-2 text-center animated-gradient">Vidéos tendances</h3>
              <div className="grid grid-cols-3 gap-2">
                {trendingVideos.map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => handlePromoClick('trending', video)}
                    className="relative overflow-hidden rounded-lg group cursor-pointer"
                  >
                    <div className="relative aspect-video">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-white text-xs truncate">{video.title}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-300">{video.performer}</span>
                          <span className="text-xs text-gray-300">{video.views}</span>
                        </div>
                      </div>
                      <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
      }
    }
    
    return result;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Immersive mode */}
      {showImmersive && (
        <ImmersivePublications 
          posts={allPosts.slice(0, 10)} 
          onExitImmersive={() => setShowImmersive(false)}
          activePromo={activePromo}
          onClosePromo={closePromo}
        />
      )}
      
      {!showImmersive && (
        <>
          <Header />

          {/* Immersive Mode Toggle Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="container mx-auto px-4 py-2 text-center"
          >
            <Button
              variant="outline"
              onClick={() => setShowImmersive(true)}
              className="bg-primary text-primary-foreground hover:opacity-90"
            >
              Mode Immersif
            </Button>
          </motion.div>

          {/* Section feed immersif en première position */}
          <div className="container max-w-md mx-auto px-4 pb-4">
            <ScrollArea 
              className="h-[calc(100vh-180px)]" 
              onScrollCapture={handleScroll}
            >
              <div className="pb-6">
                {renderFeedWithPromos()}
                
                {isLoading && (
                  <div className="flex justify-center py-4">
                    <Loader className="animate-spin w-6 h-6 text-brand-accent" />
                  </div>
                )}
                
                {!hasMore && !isLoading && posts.length > 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    Vous avez atteint la fin du feed
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
