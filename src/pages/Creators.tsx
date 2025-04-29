
import React, { useState, useEffect, useCallback } from "react";
import CreatorCard, { CreatorData } from "@/components/CreatorCard";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

// Extended creators list for infinite scrolling
const initialCreators: CreatorData[] = [
  {
    id: 1,
    name: "Lola Mystik",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Performeuse & Danse",
    followers: 23800,
    revenue: "12 930",
    trending: true,
    description: "Artiste passionnée et créative, Lola partage ses chorégraphies exclusives et moments privés avec ses abonnés."
  },
  {
    id: 2,
    name: "Lucas Zen",
    avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Modèle masculin",
    followers: 15000,
    revenue: "8 400",
    trending: false,
    description: "Lucas propose des séances exclusives axées sur la confiance en soi, l'humour et la détente."
  },
  {
    id: 3,
    name: "Clara Sparkle",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Cosplay & Live",
    followers: 31240,
    revenue: "17 230",
    trending: true,
    description: "Clara magnifie les univers de la pop culture avec des lives immersifs et des costumes spectaculaires."
  },
  {
    id: 4,
    name: "Yann Solo",
    avatar: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Humoriste",
    followers: 5480,
    revenue: "3 120",
    trending: false,
    description: "Gags, sketches et vidéos à la demande. Yann anime ses abonnés grâce à sa créativité."
  },
  {
    id: 5,
    name: "Sophia Dreams",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Mode & Lifestyle",
    followers: 18700,
    revenue: "9 850",
    trending: true,
    description: "Sophia vous invite dans son quotidien glamour entre séances photos exclusives et moments de complicité."
  },
  {
    id: 6,
    name: "Marc Steel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Fitness",
    followers: 14300,
    revenue: "7 680",
    trending: false,
    description: "Coach sportif partageant ses séances d'entraînement personnalisées et conseils nutrition."
  },
  {
    id: 7,
    name: "Elisa Night",
    avatar: "https://images.unsplash.com/photo-1578489758854-f134a358f08b?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Musique & Danse",
    followers: 27500,
    revenue: "15 230",
    trending: true,
    description: "Chanteuse et danseuse électrisante qui partage performances live et moments backstage avec ses fans."
  },
  {
    id: 8,
    name: "Thomas Wild",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Aventurier",
    followers: 12100,
    revenue: "6 840",
    trending: false,
    description: "Explorateur intrépide proposant des vidéos exclusives dans des lieux insolites à couper le souffle."
  },
];

const Creators: React.FC = () => {
  const { theme } = useTheme();
  const [creators, setCreators] = useState<CreatorData[]>(initialCreators.slice(0, 4));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const loadMoreCreators = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API fetch with setTimeout
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = 4 * (nextPage - 1);
      const endIndex = startIndex + 4;
      
      // Cycle through creators if we reach the end of our initial list
      const newCreators = initialCreators.slice(startIndex % initialCreators.length, 
        Math.min(endIndex % initialCreators.length || initialCreators.length, initialCreators.length));
      
      if (endIndex % initialCreators.length < startIndex % initialCreators.length) {
        // We've cycled back to the beginning, so we need to offset
        const offsetCreators = initialCreators.slice(0, endIndex % initialCreators.length);
        setCreators(prev => [...prev, ...newCreators, ...offsetCreators]);
      } else {
        setCreators(prev => [...prev, ...newCreators]);
      }
      
      setPage(nextPage);
      setLoading(false);
    }, 800);
  }, [page, loading, hasMore]);
  
  // Handle scroll event for infinite scrolling
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // When user scrolls to bottom (with a buffer of 200px)
    if (scrollHeight - scrollTop - clientHeight < 200 && !loading && hasMore) {
      loadMoreCreators();
    }
  }, [loadMoreCreators, loading, hasMore]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-6">
        <section className="container mx-auto max-w-6xl px-4 text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 animated-gradient">Découvrez nos créateurs</h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Une communauté de créateurs passionnés, authentiques et talentueux. 
            Parcourez, découvrez et abonnez-vous à leurs contenus exclusifs.
          </p>
        </section>
        
        <ScrollArea 
          className="container mx-auto max-w-4xl h-[calc(100vh-200px)]" 
          onScrollCapture={handleScroll}
        >
          <div className="flex flex-col items-center gap-6 pb-8">
            {creators.map((creator, index) => (
              <div key={`${creator.id}-${index}`} className="w-full max-w-md">
                <CreatorCard creator={creator} />
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-center py-4">
                <Loader className="animate-spin w-6 h-6 text-brand-accent" />
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Creators;
