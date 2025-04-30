
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ContentItem } from "./ContentCard";
import { TypeBadge, FormatBadge, TrendingBadge, DurationBadge, ValueIndicator, CollectionTags } from "./CardBadges";
import ContentMetrics from "./ContentMetrics";

interface FlowCardLayoutProps {
  item: ContentItem;
  showMetrics?: boolean;
  onClick?: () => void;
  isActive?: boolean; // New prop to control active state for animations
}

const FlowCardLayout: React.FC<FlowCardLayoutProps> = ({
  item,
  showMetrics = false,
  onClick,
  isActive = false
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`group ${isActive ? 'ring-2 ring-primary ring-offset-2' : ''}`}
    >
      <Card 
        className="overflow-hidden relative cursor-pointer flex flex-col md:flex-row"
        onClick={onClick}
      >
        {/* Thumbnail - takes full width on mobile, 40% on desktop */}
        <div className="relative w-full md:w-2/5 h-48 md:h-auto">
          <motion.img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            animate={isActive ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Animated overlay for active items */}
          {isActive && item.format === "video" && (
            <motion.div 
              className="absolute inset-0 bg-black/30 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Play className="text-white/90" size={40} />
            </motion.div>
          )}
          
          {/* Badges */}
          {item.trending && <TrendingBadge trending={item.trending} trendingRank={item.trendingRank} />}
          {item.format && <FormatBadge format={item.format} />}
          <TypeBadge type={item.type} />
          {item.duration && <DurationBadge duration={item.duration} />}
          {item.valueScore && <ValueIndicator valueScore={item.valueScore} />}
        </div>
        
        {/* Content */}
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          
          {/* Collections tags if they exist */}
          {item.collections && item.collections.length > 0 && (
            <CollectionTags collections={item.collections} />
          )}
          
          {/* Metrics if enabled */}
          {showMetrics && item.metrics && (
            <ContentMetrics 
              metrics={item.metrics}
              revenue={item.revenue}
              variant="inline"
            />
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
};

export default FlowCardLayout;
