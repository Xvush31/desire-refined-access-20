
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ContentItem } from "./ContentCard";
import { TypeBadge, FormatBadge, TrendingBadge, DurationBadge, ValueIndicator } from "./CardBadges";
import ContentMetrics from "./ContentMetrics";
import { getLayoutClasses } from "./cardUtils";

interface GridCardLayoutProps {
  item: ContentItem;
  showMetrics?: boolean;
  layout: "grid" | "masonry" | "featured";
  isFeatured?: boolean;
  onClick?: () => void;
}

const GridCardLayout: React.FC<GridCardLayoutProps> = ({
  item,
  showMetrics = false,
  layout,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card 
        className={`overflow-hidden relative cursor-pointer ${getLayoutClasses(layout)}`}
        onClick={onClick}
      >
        {/* Thumbnail */}
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges and indicators */}
        <TypeBadge type={item.type} />
        {item.format && <FormatBadge format={item.format} />}
        {item.trending && <TrendingBadge trending={item.trending} trendingRank={item.trendingRank} />}
        {item.duration && <DurationBadge duration={item.duration} />}
        {item.valueScore && <ValueIndicator valueScore={item.valueScore} />}
        
        {/* Content title and overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
          
          {/* Metrics if enabled */}
          {showMetrics && item.metrics && (
            <ContentMetrics 
              metrics={item.metrics}
              revenue={item.revenue}
              variant="overlay"
            />
          )}
          
          {/* Collections tags if they exist and layout is featured */}
          {item.collections && item.collections.length > 0 && layout === "featured" && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.collections.map((collection) => (
                <div key={collection} className="text-xs bg-black/40 text-white px-2 py-1 rounded">
                  {collection}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default GridCardLayout;
