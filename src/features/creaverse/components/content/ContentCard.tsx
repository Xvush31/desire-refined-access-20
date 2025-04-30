
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Star, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  type: "standard" | "premium" | "vip";
  metrics?: {
    views: number;
    likes: number;
    engagement: number;
  };
  revenue?: number;
}

interface ContentCardProps {
  item: ContentItem;
  showMetrics?: boolean;
  layout?: "grid" | "masonry" | "featured";
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

  const getLayoutClasses = () => {
    switch (layout) {
      case "masonry": return "h-auto";
      case "featured": return "h-72 md:h-96";
      case "grid":
      default: return "h-48 md:h-60";
    }
  };

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
        </div>
      </Card>
    </motion.div>
  );
};

export default ContentCard;
