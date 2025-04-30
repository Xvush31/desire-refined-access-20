
import React, { useState, useRef, useEffect } from "react";
import { ContentItem } from "./ContentCard";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star, Users, Video, Image as ImageIcon, Play, Clock, Lock } from "lucide-react";

interface ContentFlowProps {
  items: ContentItem[];
  onItemClick: (item: ContentItem) => void;
}

const ContentFlow: React.FC<ContentFlowProps> = ({ items, onItemClick }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Effect to monitor scroll position and determine active item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveItem(index);
            }
          }
        });
      },
      { threshold: 0.7 } // 70% of item needs to be visible
    );
    
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [items]);
  
  const getFormatIcon = (format?: string) => {
    switch (format) {
      case "video": return <Video size={16} className="mr-2" />;
      case "image": return <ImageIcon size={16} className="mr-2" />;
      case "audio": return <Play size={16} className="mr-2" />;
      case "text": return <Clock size={16} className="mr-2" />;
      default: return null;
    }
  };

  // Value indicator color based on score
  const getValueColor = (score?: number) => {
    if (!score) return "bg-gray-400";
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    if (score >= 20) return "bg-orange-500";
    return "bg-red-500";
  };
  
  if (!items.length) return null;
  
  return (
    <div className="space-y-8 py-4">
      <h3 className="text-xl font-semibold mb-6">Flux de contenu</h3>
      
      {items.map((item, index) => (
        <motion.div 
          key={item.id}
          ref={(el) => itemRefs.current[index] = el}
          initial={{ opacity: 0.7, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: false, amount: 0.3 }}
          className={`relative w-full cursor-pointer ${index === activeItem ? 'scale-100' : 'scale-95'} transition-transform duration-500`}
          onClick={() => onItemClick(item)}
        >
          <div className="rounded-xl overflow-hidden bg-card border shadow-md hover:shadow-lg transition-shadow">
            {/* Content preview section */}
            <div className="relative aspect-video w-full overflow-hidden">
              {/* Full-size background image */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {/* Animated preview overlay (simulated) */}
              {activeItem === index && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center">
                  {item.format === "video" && (
                    <div className="animate-pulse">
                      <Play className="text-white" size={48} />
                    </div>
                  )}
                </div>
              )}
              
              {/* Badges and indicators */}
              <Badge 
                className={`absolute top-2 right-2 ${
                  item.type === "premium" 
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500" 
                    : item.type === "vip" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500"
                } text-white px-2 py-1 text-xs capitalize flex items-center`}
              >
                {item.type === "premium" && <Lock size={12} className="mr-1" />}
                {item.type === "vip" && <Star size={12} className="mr-1" />}
                {item.type}
              </Badge>
              
              {item.trending && (
                <Badge className="absolute top-2 left-2 bg-rose-500 text-white flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  {item.trendingRank ? `#${item.trendingRank}` : "Tendance"}
                </Badge>
              )}
              
              {/* Duration for videos */}
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white">
                  {item.duration}
                </div>
              )}
              
              {/* Value indicator */}
              {item.valueScore && (
                <div className={`absolute bottom-2 left-2 ${getValueColor(item.valueScore)} text-white text-xs px-3 py-1 rounded-full flex items-center`}>
                  <Star size={12} className="mr-1" />
                  Valeur: {item.valueScore}%
                </div>
              )}
            </div>
            
            {/* Content info section */}
            <div className="p-4">
              <div className="flex items-center gap-2">
                {item.format && getFormatIcon(item.format)}
                <h3 className="text-lg font-medium">{item.title}</h3>
              </div>
              
              {/* Collections tags if they exist */}
              {item.collections && item.collections.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.collections.map((collection) => (
                    <Badge key={collection} variant="outline" className="text-xs">
                      {collection}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Metrics */}
              {item.metrics && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users size={14} className="mr-1" />
                    {item.metrics.views.toLocaleString()} vues
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star size={14} className="mr-1" />
                    {item.metrics.likes.toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp size={14} className="mr-1" />
                    {item.metrics.engagement}%
                  </div>
                  {item.metrics.completionRate && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Play size={14} className="mr-1" />
                      {item.metrics.completionRate}% complété
                    </div>
                  )}
                  {item.metrics.watchTime && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={14} className="mr-1" />
                      {item.metrics.watchTime}
                    </div>
                  )}
                </div>
              )}
              
              {/* Publish date if it exists */}
              {item.publishDate && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Publié le {item.publishDate}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContentFlow;
