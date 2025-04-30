
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, TrendingUp, Star, Clock, Lock, CircleDollarSign } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface ContentGalleryProps {
  performerId: number;
  isOwner: boolean;
}

const ContentGallery: React.FC<ContentGalleryProps> = ({ performerId, isOwner }) => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("trending");
  
  // Génération des données mockées pour l'exemple
  const generateMockContent = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const id = `content-${i + 1}`;
      const isPremium = i % 3 === 0;
      const isTrending = i % 7 === 0;
      const views = Math.floor(Math.random() * 50000) + 1000;
      const revenue = isPremium ? Math.floor(Math.random() * 400) + 100 : 0;
      
      return {
        id,
        title: isPremium 
          ? ["Sunset Dance", "Private Session", "After Hours", "VIP Experience"][i % 4]
          : ["Beach Day", "Morning Routine", "Workout Session", "Behind the Scenes"][i % 4],
        thumbnail: `https://picsum.photos/seed/${id}/400/500`,
        isPremium,
        isTrending,
        isVideo: i % 2 === 0,
        views,
        satisfaction: Math.floor(Math.random() * 11) + 90,
        duration: i % 2 === 0 ? `${Math.floor(Math.random() * 15) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : null,
        revenue
      };
    });
  };
  
  const allContent = generateMockContent(20);
  
  const trendingContent = allContent.filter(item => item.isTrending);
  const premiumContent = allContent.filter(item => item.isPremium);
  const standardContent = allContent.filter(item => !item.isPremium && !item.isTrending);
  
  const getFilteredContent = () => {
    switch (filter) {
      case "trending":
        return [...trendingContent, ...standardContent, ...premiumContent].slice(0, 12);
      case "recent":
        return [...allContent].sort(() => Math.random() - 0.5).slice(0, 12);
      case "popular":
        return [...allContent].sort((a, b) => b.views - a.views).slice(0, 12);
      case "premium":
        return premiumContent;
      default:
        return allContent.slice(0, 12);
    }
  };

  const content = getFilteredContent();

  return (
    <div className={theme === 'light' ? 'bg-white' : 'bg-zinc-900'}>
      {/* Filtres intelligents */}
      <div className="p-2 border-b border-border">
        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="grid grid-cols-4 h-8">
            <TabsTrigger value="trending" className="text-xs">
              <TrendingUp size={14} className="mr-1" /> Tendance
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-xs">
              <Clock size={14} className="mr-1" /> Récent
            </TabsTrigger>
            <TabsTrigger value="popular" className="text-xs">
              <Star size={14} className="mr-1" /> Populaire
            </TabsTrigger>
            <TabsTrigger value="premium" className="text-xs">
              <CircleDollarSign size={14} className="mr-1" /> Premium
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    
      {/* Mise en avant des contenus tendance */}
      {filter === "trending" && trendingContent.length > 0 && (
        <div className="p-3">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={trendingContent[0].thumbnail} 
              alt={trendingContent[0].title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
              <Badge className="self-start mb-2 bg-brand-red text-white border-0 flex items-center gap-1">
                <TrendingUp size={12} /> TRENDING NOW
              </Badge>
              <h3 className="text-white text-lg font-bold mb-1">{trendingContent[0].title}</h3>
              <div className="flex items-center text-sm text-white/80 gap-2">
                <span>{trendingContent[0].views.toLocaleString()} vues</span>
                <span>•</span>
                <span>{trendingContent[0].satisfaction}% satisfaction</span>
                {isOwner && trendingContent[0].revenue > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center">
                      <CircleDollarSign size={14} className="mr-1 text-green-400" />
                      ${trendingContent[0].revenue} générés
                    </span>
                  </>
                )}
              </div>
            </div>
            {trendingContent[0].duration && (
              <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-0.5 text-xs rounded flex items-center">
                <Play size={12} className="mr-1" />
                {trendingContent[0].duration}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Contenu principal en grille */}
      <div className="grid grid-cols-3 gap-0.5">
        {content.filter(item => item !== trendingContent[0] || filter !== "trending").map((item) => (
          <div 
            key={item.id} 
            className="aspect-square relative overflow-hidden"
          >
            <img 
              src={item.thumbnail} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            
            {item.isPremium && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <Lock size={20} className="text-white mb-1" />
                <Badge className="animated-gradient-bg text-white border-0">Premium</Badge>
              </div>
            )}
            
            {!item.isPremium && item.isVideo && (
              <div className="absolute top-2 right-2">
                <Play size={18} className="text-white drop-shadow-lg" />
              </div>
            )}
            
            {item.isVideo && item.duration && !item.isPremium && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white px-1.5 py-0.5 text-xs rounded">
                {item.duration}
              </div>
            )}
            
            {isOwner && item.revenue > 0 && (
              <div className="absolute bottom-2 left-2 bg-green-500/90 text-white px-1.5 py-0.5 text-xs rounded flex items-center">
                <CircleDollarSign size={12} className="mr-0.5" />
                ${item.revenue}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentGallery;
