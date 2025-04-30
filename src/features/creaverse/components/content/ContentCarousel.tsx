
import React from "react";
import { ContentItem } from "./ContentCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Lock, Play } from "lucide-react";
import { motion } from "framer-motion";

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
  type: "trending" | "premium" | "recent";
  onItemClick: (item: ContentItem) => void;
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({
  title,
  items,
  type,
  onItemClick
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 my-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          {type === "trending" && <TrendingUp size={18} className="mr-2 text-brand-red" />}
          {type === "premium" && <Lock size={18} className="mr-2 text-amber-500" />}
          {title}
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
                      {item.type}
                    </Badge>
                    
                    {/* Play icon for videos */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/30 rounded-full p-3">
                        <Play className="text-white" size={24} />
                      </div>
                    </div>
                    
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
