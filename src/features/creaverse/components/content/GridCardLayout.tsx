
import React from "react";
import { cn } from "@/lib/utils";
import { ContentItem } from "./ContentCard";
import { Badge } from "@/components/ui/badge";
import { TypeBadge, FormatBadge, TrendingBadge, DurationBadge, ValueIndicator } from "./CardBadges";
import ContentMetrics from "./ContentMetrics";
import { getLayoutClasses } from "./cardUtils";

interface GridCardLayoutProps {
  item: ContentItem;
  showMetrics?: boolean;
  layout?: "grid" | "masonry" | "featured";
  isFeatured?: boolean;
  onClick?: () => void;
  className?: string; // Ajout de className
}

const GridCardLayout: React.FC<GridCardLayoutProps> = ({
  item,
  showMetrics = false,
  layout = "grid",
  isFeatured = false,
  onClick,
  className = "" // Initialisation de className
}) => {
  // Determine size class based on layout and featured status
  const sizeClass = isFeatured || layout === "featured" 
    ? "aspect-video w-full" 
    : layout === "masonry" 
      ? "aspect-[3/4]" 
      : "aspect-square";

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg bg-muted/20 cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-md",
        sizeClass,
        className // Utilisation de className
      )}
      onClick={onClick}
    >
      {/* Background image */}
      <img 
        src={item.thumbnail} 
        alt={item.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
      
      {/* Content badges */}
      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
        {item.type !== "standard" && <TypeBadge type={item.type} />}
        {item.format && <FormatBadge format={item.format} />}
        
        {item.collections && item.collections.length > 0 && (
          <Badge variant="outline" className="text-xs bg-black/50 backdrop-blur-sm text-white border-white/10">
            {item.collections[0]}
          </Badge>
        )}
      </div>
      
      {/* Trending badge */}
      {item.trending && (
        <div className="absolute top-2 right-2">
          <TrendingBadge rank={item.trendingRank} />
        </div>
      )}
      
      {/* Duration for video content */}
      {item.format === "video" && item.duration && (
        <div className="absolute bottom-2 right-2">
          <DurationBadge duration={item.duration} />
        </div>
      )}
      
      {/* Value indicator */}
      {item.valueScore && (
        <div className="absolute bottom-2 right-2">
          <ValueIndicator value={item.valueScore} />
        </div>
      )}
      
      {/* Content title and metrics */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        {item.title && (
          <h3 className="text-white text-sm font-medium mb-1 line-clamp-2">
            {item.title}
          </h3>
        )}
        
        {showMetrics && item.metrics && (
          <ContentMetrics metrics={item.metrics} />
        )}
      </div>
    </div>
  );
};

export default GridCardLayout;
