
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Star, TrendingUp, Users, Video, Image as ImageIcon, Play, Clock } from "lucide-react";
import { motion } from "framer-motion";

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  type: "standard" | "premium" | "vip";
  format?: "video" | "image" | "audio" | "text";
  duration?: string;
  publishDate?: string;
  metrics?: {
    views: number;
    likes: number;
    engagement: number;
    completionRate?: number;
    watchTime?: string;
  };
  revenue?: number;
  trending?: boolean;
  trendingRank?: number;
  collections?: string[];
  valueScore?: number; // Value indicator (1-100)
}

interface ContentCardProps {
  item: ContentItem;
  showMetrics?: boolean;
  layout?: "grid" | "masonry" | "featured" | "flow";
  onClick?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  showMetrics = false,
  layout = "grid",
  onClick
}) => {
  const getTypeColor = () => {
    switch (item.type) {
      case "premium": return "bg-gradient-to-r from-amber-500 to-yellow-500";
      case "vip": return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "standard":
      default: return "bg-gradient-to-r from-blue-500 to-cyan-500";
    }
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case "premium": return <Star size={12} className="mr-1" />;
      case "vip": return <Lock size={12} className="mr-1" />;
      case "standard":
      default: return null;
    }
  };

  const getFormatIcon = () => {
    switch (item.format) {
      case "video": return <Video size={12} className="mr-1" />;
      case "image": return <ImageIcon size={12} className="mr-1" />;
      case "audio": return <Play size={12} className="mr-1" />;
      case "text": return <Clock size={12} className="mr-1" />;
      default: return null;
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case "masonry": return "h-auto";
      case "featured": return "h-72 md:h-96";
      case "flow": return "w-full flex flex-col md:flex-row";
      case "grid":
      default: return "h-48 md:h-60";
    }
  };

  // Value indicator color based on score
  const getValueColor = () => {
    if (!item.valueScore) return "bg-gray-400";
    if (item.valueScore >= 80) return "bg-emerald-500";
    if (item.valueScore >= 60) return "bg-green-500";
    if (item.valueScore >= 40) return "bg-yellow-500";
    if (item.valueScore >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  if (layout === "flow") {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="group"
      >
        <Card 
          className={`overflow-hidden relative cursor-pointer flex flex-col md:flex-row`}
          onClick={onClick}
        >
          {/* Thumbnail - takes full width on mobile, 40% on desktop */}
          <div className="relative w-full md:w-2/5 h-48 md:h-auto">
            <img 
              src={item.thumbnail} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {item.trending && (
              <Badge className="absolute top-2 left-2 bg-rose-500 text-white flex items-center gap-1">
                <TrendingUp size={12} />
                {item.trendingRank ? `#${item.trendingRank}` : "Tendance"}
              </Badge>
            )}
            
            {item.format && (
              <Badge 
                className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 capitalize flex items-center"
              >
                {getFormatIcon()}
                {item.format}
              </Badge>
            )}

            {/* Content type badge */}
            <Badge 
              className={`absolute top-2 right-2 ${getTypeColor()} text-white text-xs px-2 py-0.5 capitalize flex items-center`}
            >
              {getTypeIcon()}
              {item.type}
            </Badge>
            
            {/* Duration if it exists */}
            {item.duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white">
                {item.duration}
              </div>
            )}
            
            {/* Value indicator */}
            {item.valueScore && (
              <div className={`absolute bottom-10 right-2 ${getValueColor()} text-white text-xs px-2 py-1 rounded-full flex items-center`}>
                <Star size={10} className="mr-1" />
                {item.valueScore}%
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            
            {/* Collections tags if they exist */}
            {item.collections && item.collections.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1">
                {item.collections.map((collection) => (
                  <Badge key={collection} variant="outline" className="text-xs">
                    {collection}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Metrics if enabled */}
            {showMetrics && item.metrics && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
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
            
            {/* Revenue if provided */}
            {showMetrics && item.revenue !== undefined && (
              <div className="mt-3 text-sm font-bold text-green-500">
                {item.revenue.toLocaleString()}€ générés
              </div>
            )}
            
            {/* Publish date if it exists */}
            {item.publishDate && (
              <div className="mt-2 text-sm text-muted-foreground">
                Publié le {item.publishDate}
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card 
        className={`overflow-hidden relative cursor-pointer ${getLayoutClasses()}`}
        onClick={onClick}
      >
        {/* Thumbnail */}
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Content type badge */}
        <Badge 
          className={`absolute top-2 right-2 ${getTypeColor()} text-white text-xs px-2 py-0.5 capitalize flex items-center`}
        >
          {getTypeIcon()}
          {item.type}
        </Badge>
        
        {/* Format badge */}
        {item.format && (
          <Badge 
            className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 capitalize flex items-center"
          >
            {getFormatIcon()}
            {item.format}
          </Badge>
        )}
        
        {/* Trending badge */}
        {item.trending && (
          <div className="absolute top-10 right-2">
            <Badge className="bg-rose-500 text-white flex items-center">
              <TrendingUp size={12} className="mr-1" />
              {item.trendingRank ? `#${item.trendingRank}` : "Tendance"}
            </Badge>
          </div>
        )}
        
        {/* Duration if it exists */}
        {item.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white">
            {item.duration}
          </div>
        )}
        
        {/* Value indicator */}
        {item.valueScore && (
          <div className={`absolute bottom-10 right-2 ${getValueColor()} text-white text-xs px-2 py-1 rounded-full flex items-center`}>
            <Star size={10} className="mr-1" />
            {item.valueScore}%
          </div>
        )}
        
        {/* Content title */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
          
          {/* Metrics if enabled */}
          {showMetrics && item.metrics && (
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center text-xs text-white/80">
                <Users size={12} className="mr-1" />
                {item.metrics.views.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-white/80">
                <Star size={12} className="mr-1" />
                {item.metrics.likes.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-white/80">
                <TrendingUp size={12} className="mr-1" />
                {item.metrics.engagement}%
              </div>
            </div>
          )}
          
          {/* Revenue if provided */}
          {showMetrics && item.revenue !== undefined && (
            <div className="mt-1 text-xs font-bold text-green-400">
              {item.revenue.toLocaleString()}€ générés
            </div>
          )}
          
          {/* Collections tags if they exist and layout is featured */}
          {item.collections && item.collections.length > 0 && layout === "featured" && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.collections.map((collection) => (
                <Badge key={collection} variant="outline" className="text-xs bg-black/40 text-white">
                  {collection}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ContentCard;
