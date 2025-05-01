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
import XTeasePromoRow from "@/components/creator/XTeasePromoRow";
import PerformerPromoRow from "@/components/creator/PerformerPromoRow";
import TrendingPromoRow from "@/components/creator/TrendingPromoRow";

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
  {
    id: 4,
    title: "Dîner romantique qui s'intensifie",
    performer: "DinnerDate",
    views: "517K vues",
    thumbnail: "https://picsum.photos/seed/xtease4/600/1067",
  },
  {
    id: 5,
    title: "Escapade sensuelle au bord de la mer",
    performer: "BeachLover",
    views: "892K vues",
    thumbnail: "https://picsum.photos/seed/xtease5/600/1067",
  },
  {
    id: 6,
    title: "Surprise après une longue journée",
    performer: "AfterWork",
    views: "378K vues",
    thumbnail: "https://picsum.photos/seed/xtease6/600/1067",
  },
  {
    id: 7,
    title: "Aventure spontanée dans un ascenseur",
    performer: "SpontaneousLife",
    views: "745K vues",
    thumbnail: "https://picsum.photos/seed/xtease7/600/1067",
  }
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
  },
  {
    id: 6,
    name: "Max Power",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Fitness & Wellness",
    followers: 41300
  },
  {
    id: 7,
    name: "Sophia Dreams",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Mode & Beauté",
    followers: 63200
  },
  {
    id: 8,
    name: "Thomas Night",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Lifestyle & Voyage",
    followers: 32800
  },
  {
    id: 9,
    name: "Laura Moon",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Art & Photographie",
    followers: 27500
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
  },
  {
    id: 4,
    title: "Aventure improvisée dans un taxi pendant la nuit",
    thumbnail: "https://picsum.photos/seed/video4/640/360",
    duration: "15:47",
    views: "921K",
    performer: "NightRider"
  },
  {
    id: 5,
    title: "Rencontre passionnée à l'hôtel après une soirée",
    thumbnail: "https://picsum.photos/seed/video5/640/360",
    duration: "24:18",
    views: "1.7M",
    performer: "PartyCouple"
  },
  {
    id: 6,
    title: "Session d'entraînement qui prend une tournure inattendue",
    thumbnail: "https://picsum.photos/seed/video6/640/360",
    duration: "19:56",
    views: "756K",
    performer: "FitCoach"
  },
  {
    id: 7,
    title: "Séance photo érotique dans un loft artistique",
    thumbnail: "https://picsum.photos/seed/video7/640/360",
    duration: "27:32",
    views: "1.1M",
    performer: "ArtisticSoul"
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const { currentUser, loading } = useAuth();
  
  const [posts, setPosts] = useState<CreatorFeedPost[]>(generateMockFeed().slice(0, 6));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const allPosts = generateMockFeed();
  
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
  
  // Gérer l'événement de défilement pour le chargement infini
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // Lorsque l'utilisateur défile près du bas (avec une marge de 200px)
    if (scrollHeight - scrollTop - clientHeight < 200 && !isLoading && hasMore) {
      loadMorePosts();
    }
  }, [loadMorePosts, isLoading, hasMore]);

  // Fonction pour insérer les différents blocs promotionnels
  const renderFeedWithPromos = () => {
    const result = [];
    
    for (let i = 0; i < posts.length; i++) {
      // Ajouter le post
      result.push(
        <CreatorFeedItem key={`post-${i}`} post={posts[i]} />
      );
      
      // Après chaque groupe de 3 posts, insérer un bloc promo différent
      if ((i + 1) % 3 === 0 && i < posts.length - 1) {
        const promoType = Math.floor((i / 3) % 3); // Alternance entre 0, 1, 2
        
        if (promoType === 0) {
          result.push(
            <XTeasePromoRow key={`xtease-promo-${i}`} videos={xteaseVideos} />
          );
        } else if (promoType === 1) {
          result.push(
            <PerformerPromoRow key={`performer-promo-${i}`} performers={popularCreators} />
          );
        } else {
          result.push(
            <TrendingPromoRow key={`trending-promo-${i}`} videos={trendingVideos} />
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
      <Header />

      {/* Section feed immersif en première position */}
      <div className="container max-w-md mx-auto px-4 pb-4">
        <ScrollArea 
          className="h-[calc(100vh-130px)]" 
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
      <footer className="py-golden-lg border-t border-muted">
        <div className="container px-golden-sm mx-auto">
          <div className={`${isMobile ? 'flex flex-col gap-4' : 'golden-grid'} items-center`}>
            <div>
              <p className="text-muted-foreground text-sm">
                {t("footer.copyright")}
              </p>
            </div>
            <div className="flex justify-end gap-golden-md flex-wrap">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.about")}</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.terms")}</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.privacy")}</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.contact")}</Link>
              {currentUser && (
                <Link to="/creaverse-app/performer/1" className="text-sm text-brand-accent font-medium transition-colors">CreaVerse</Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
