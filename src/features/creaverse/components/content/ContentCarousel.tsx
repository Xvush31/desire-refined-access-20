
import React from "react";
import { ContentItem } from "./ContentCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Lock, Play, Video, Image as ImageIcon, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
  type: "trending" | "premium" | "recent" | "collection";
  collectionName?: string;
  onItemClick: (item: ContentItem) => void;
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({
  title,
  items,
  type,
  collectionName,
  onItemClick
}) => {
  if (items.length === 0) {
    return null;
  }

  // Function to get format icon
  const getFormatIcon = (format?: string) => {
    switch (format) {
      case "video": return <Video size={12} className="mr-1" />;
      case "image": return <ImageIcon size={12} className="mr-1" />;
      case "audio": return <Play size={12} className="mr-1" />;
      case "text": return <Clock size={12} className="mr-1" />;
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

  return (
    <div className="space-y-3 my-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          {type === "trending" && <TrendingUp size={18} className="mr-2 text-brand-red" />}
          {type === "premium" && <Lock size={18} className="mr-2 text-amber-500" />}
          {type === "collection" && <Star size={18} className="mr-2 text-purple-500" />}
          {title}
          {collectionName && (
            <Badge variant="outline" className="ml-2 bg-purple-500/10 text-purple-500 border-purple-500/20">
              {collectionName}
            </Badge>
          )}
        </h3>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item, index) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <Card 
                  className="overflow-hidden relative cursor-pointer h-48 md:h-60"
                  onClick={() => onItemClick(item)}
                >
                  <CardContent className="p-0 h-full">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Content type badge */}
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        item.type === "premium" 
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500" 
                          : item.type === "vip" 
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500"
                      } text-white text-xs px-2 py-0.5 capitalize flex items-center`}
                    >
                      {item.type === "premium" && <Lock size={12} className="mr-1" />}
                      {item.type === "vip" && <Star size={12} className="mr-1" />}
                      {item.type}
                    </Badge>
                    
                    {/* Format badge */}
                    {item.format && (
                      <Badge 
                        className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 capitalize flex items-center"
                      >
                        {getFormatIcon(item.format)}
                        {item.format}
                      </Badge>
                    )}
                    
                    {/* Trending badge */}
                    {item.trending && (
                      <Badge className="absolute top-10 right-2 bg-rose-500 text-white flex items-center">
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
                      <div className={`absolute bottom-10 right-2 ${getValueColor(item.valueScore)} text-white text-xs px-2 py-1 rounded-full flex items-center`}>
                        <Star size={10} className="mr-1" />
                        {item.valueScore}%
                      </div>
                    )}
                    
                    {/* Play icon for videos */}
                    {item.format === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/30 rounded-full p-3">
                          <Play className="text-white" size={24} />
                        </div>
                      </div>
                    )}
                    
                    {/* Content title */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
                      
                      {/* Simple metrics */}
                      {item.metrics && (
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="text-xs text-white/80">
                            {item.metrics.views.toLocaleString()} vues
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default ContentCarousel;
