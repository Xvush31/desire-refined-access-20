
import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import CreatorFeedItem, { CreatorFeedPost } from "@/components/creator/CreatorFeedItem";
import XTeasePromoRow from "@/components/creator/XTeasePromoRow";

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

  return Array.from({ length: 15 }, (_, i) => {
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
    thumbnail: "https://picsum.photos/seed/xtease1/600/1067", // Format 9:16 approximatif
  },
  {
    id: 2,
    title: "Séance photo qui devient personnelle",
    performer: "PhotoArtist",
    views: "732K vues",
    thumbnail: "https://picsum.photos/seed/xtease2/600/1067", // Format 9:16 approximatif
  },
  {
    id: 3,
    title: "Rencontre dans un hôtel 5 étoiles",
    performer: "LuxuryCouple",
    views: "628K vues",
    thumbnail: "https://picsum.photos/seed/xtease3/600/1067", // Format 9:16 approximatif
  },
];

const initialFeed = generateMockFeed().slice(0, 5);

const Creators: React.FC = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<CreatorFeedPost[]>(initialFeed);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const allPosts = generateMockFeed();
  
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simuler un délai de chargement
    setTimeout(() => {
      const nextPage = page + 1;
      const start = page * 5;
      const end = start + 5;
      const newPosts = allPosts.slice(start, end);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
      }
      
      setLoading(false);
    }, 800);
  }, [page, loading, hasMore, allPosts]);
  
  // Gérer l'événement de défilement pour le chargement infini
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // Lorsque l'utilisateur défile près du bas (avec une marge de 200px)
    if (scrollHeight - scrollTop - clientHeight < 200 && !loading && hasMore) {
      loadMorePosts();
    }
  }, [loadMorePosts, loading, hasMore]);

  // Fonction pour insérer les promotions XTease après chaque groupe de 5 posts
  const renderFeedWithPromos = () => {
    const result = [];
    let postGroups = [];
    
    // Regrouper les posts par 5
    for (let i = 0; i < posts.length; i += 5) {
      postGroups.push(posts.slice(i, i + 5));
    }
    
    // Ajouter chaque groupe de 5 posts suivi d'une promo XTease
    postGroups.forEach((group, index) => {
      // Ajouter les posts du groupe
      group.forEach((post) => {
        result.push(
          <CreatorFeedItem key={post.id} post={post} />
        );
      });
      
      // Ajouter une promo XTease après chaque groupe
      if (group.length > 0) {
        result.push(
          <XTeasePromoRow key={`xtease-promo-${index}`} videos={xteaseVideos} />
        );
      }
    });
    
    return result;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-4">
        <div className="container max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4 text-center animated-gradient">Feed des créateurs</h1>
          
          <ScrollArea 
            className="h-[calc(100vh-130px)]" 
            onScrollCapture={handleScroll}
          >
            <div className="pb-6">
              {renderFeedWithPromos()}
              
              {loading && (
                <div className="flex justify-center py-4">
                  <Loader className="animate-spin w-6 h-6 text-brand-accent" />
                </div>
              )}
              
              {!hasMore && !loading && posts.length > 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Vous avez atteint la fin du feed
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
};

export default Creators;
