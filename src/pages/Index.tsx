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
import { fetchCreaverseVideos, mockCreaverseVideos } from "@/services/creaverseService";
import { toast } from "sonner";
import { getPromotionalVideos, getXteaseVideos, supabaseVideoToFeedPost, SupabaseVideo } from "@/services/supabaseVideoService";
import { adaptSupabaseVideoToXTeaseFormat } from "@/adapters/videoAdapter";

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

interface ImmersivePublicationsProps {
  posts: CreatorFeedPost[];
  onExitImmersive: () => void;
  activePromo: {
    type: 'xtease' | 'creator' | 'trending' | null;
    data: any;
  };
  onClosePromo: () => void;
}

// Fonction pour améliorer le filtrage et la validation des vidéos Supabase
const processSupabaseVideos = (videos) => {
  if (!Array.isArray(videos) || videos.length === 0) {
    console.log("No videos provided or empty array");
    return [];
  }

  console.log(`Processing ${videos.length} Supabase videos for feed`);

  return videos
    .filter(video => {
      // S'assurer que la vidéo est valide
      const isValid = video && 
                     typeof video === 'object' && 
                     video.id !== undefined &&
                     (video.video_url || video.videoUrl);
      
      if (!isValid) {
        console.warn("Filtered out invalid video:", video);
      }
      
      return isValid;
    })
    .map(video => {
      const feedPost = supabaseVideoToFeedPost(video);
      console.log(`Created feed post from video ${video.id}:`, {
        hasVideoUrl: !!feedPost?.videoUrl,
        isVideo: feedPost?.isVideo
      });
      return feedPost;
    })
    .filter(post => {
      // Filtrer les posts null ou undefined
      if (!post) {
        console.warn("Filtered out null post");
        return false;
      }
      return true;
    });
};

const Index = () => {
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const { currentUser, loading } = useAuth();
  
  const [posts, setPosts] = useState<CreatorFeedPost[]>(generateMockFeed().slice(0, 6));
  const [creaverseVideos, setCreaverseVideos] = useState<CreatorFeedPost[]>([]);
  const [supabaseVideos, setSupabaseVideos] = useState<CreatorFeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showImmersive, setShowImmersive] = useState(true); // Changed to true by default
  const [activePromo, setActivePromo] = useState<{
    type: 'xtease' | 'creator' | 'trending' | null,
    data: any
  }>({ type: null, data: null });
  const allPosts = generateMockFeed();
  
  const { isFirstVisit } = useImmersiveMode();
  
  // Load CreaVerse videos when component mounts
  useEffect(() => {
    const loadCreaverseVideos = async () => {
      try {
        // First try to fetch from the real API
        const videos = await fetchCreaverseVideos();
        
        if (videos.length > 0) {
          setCreaverseVideos(videos);
          console.log("Successfully loaded CreaVerse videos:", videos.length);
        } else {
          // If the API returns no videos, use mock data
          const mockVideos = mockCreaverseVideos();
          setCreaverseVideos(mockVideos);
          console.log("Using mock CreaVerse videos:", mockVideos.length);
        }
      } catch (error) {
        console.error("Failed to load CreaVerse videos:", error);
        // Fallback to mock data
        const mockVideos = mockCreaverseVideos();
        setCreaverseVideos(mockVideos);
        
        toast.error("Impossible de charger les vidéos CreaVerse", {
          description: "Utilisation de données de test en attendant la connexion à l'API"
        });
      }
    };
    
    loadCreaverseVideos();
  }, []);
  
  // Charger les vidéos de Supabase avec une meilleure validation
  useEffect(() => {
    const loadSupabaseVideos = async () => {
      try {
        setIsLoading(true);
        
        // Récupérer les vidéos promotionnelles (standard et teaser)
        const { data: promoVideos, error: promoError } = await getPromotionalVideos();
        
        if (promoError) {
          console.error("Error loading promotional videos from Supabase:", promoError);
          return;
        }
        
        // Récupérer les vidéos au format Xtease (9:16)
        const { data: xteaseVideos, error: xteaseError } = await getXteaseVideos();
        
        if (xteaseError) {
          console.error("Error loading xtease videos from Supabase:", xteaseError);
          return;
        }
        
        console.log("Fetch results:", {
          promoVideosCount: promoVideos?.length || 0,
          xteaseVideosCount: xteaseVideos?.length || 0
        });
        
        // Traiter les vidéos promotionnelles
        const processedPromoVideos = promoVideos ? processSupabaseVideos(promoVideos) : [];
        console.log(`Processed ${processedPromoVideos.length} promo videos`);
        
        // Traiter les vidéos Xtease
        const processedXteaseVideos = xteaseVideos ? processSupabaseVideos(xteaseVideos) : [];
        console.log(`Processed ${processedXteaseVideos.length} xtease videos`);
        
        // Combiner les deux types de vidéos
        const combinedVideos = [...processedPromoVideos, ...processedXteaseVideos];
        
        // Filtrer pour éviter les doublons basés sur l'ID
        const uniqueVideos = Array.from(new Map(
          combinedVideos.map(video => [video.id.toString(), video])
        ).values());
        
        console.log(`Final combined unique videos for feed: ${uniqueVideos.length}`);
        setSupabaseVideos(uniqueVideos);
        
        // Si on a des vidéos Supabase, on les mélange avec les posts mock
        if (uniqueVideos.length > 0) {
          const mixedPosts = [...posts];
          
          // Insérer des vidéos Supabase à intervalles réguliers
          uniqueVideos.slice(0, 6).forEach((video, index) => {
            console.log(`Inserting video ${video.id} into feed at position ${Math.min((index + 1) * 2, mixedPosts.length)}`);
            const insertPos = Math.min((index + 1) * 2, mixedPosts.length);
            mixedPosts.splice(insertPos, 0, video);
          });
          
          setPosts(mixedPosts);
        }
      } catch (error) {
        console.error("Error while loading videos from Supabase:", error);
        toast.error("Impossible de charger les vidéos depuis Supabase");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSupabaseVideos();
  }, []);
  
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
      let newPosts = allPosts.slice(start, end);
      
      // Ajouter quelques vidéos Supabase si disponibles
      if (supabaseVideos.length > 0) {
        const startIdx = Math.min(page * 3, supabaseVideos.length - 1);
        const endIdx = Math.min(startIdx + 3, supabaseVideos.length);
        const videoSlice = supabaseVideos.slice(startIdx, endIdx);
        
        if (videoSlice.length > 0) {
          // Insérer les vidéos à différentes positions
          videoSlice.forEach((video, idx) => {
            const pos = Math.min(idx * 2, newPosts.length);
            newPosts.splice(pos, 0, video);
          });
        }
      }
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
      }
      
      setIsLoading(false);
    }, 800);
  }, [page, isLoading, hasMore, allPosts, supabaseVideos]);
  
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

  // Modified function to insert promotional blocks and CreaVerse videos
  const renderFeedWithPromos = () => {
    // Combine regular posts with CreaVerse videos and Supabase videos
    const combinedPosts = [...posts];
    
    // Insert CreaVerse videos at strategic positions (every 4 posts)
    creaverseVideos.forEach((video, index) => {
      const insertPosition = (index + 1) * 4;
      // Only insert if position is within the combined array's range
      if (insertPosition < combinedPosts.length) {
        combinedPosts.splice(insertPosition, 0, video);
      } else {
        // If beyond range, just add at the end
        combinedPosts.push(video);
      }
    });
    
    const result = [];
    
    for (let i = 0; i < combinedPosts.length; i++) {
      // Add the post with a more unique key
      const post = combinedPosts[i];
      result.push(
        <CreatorFeedItem 
          key={`feed-post-${post.id}-${i}`} 
          post={post} 
        />
      );
      
      // After each group of 3 posts, insert a different promo block
      if ((i + 1) % 3 === 0 && i < combinedPosts.length - 1) {
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
          posts={[
            ...allPosts.slice(0, 4),
            ...supabaseVideos.slice(0, 3),
            ...creaverseVideos.slice(0, 3)
          ]}
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
