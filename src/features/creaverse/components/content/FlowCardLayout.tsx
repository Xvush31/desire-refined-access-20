
import React from "react";
import { cn } from "@/lib/utils";
import { Eye, Heart, MessageSquare, Play } from "lucide-react";
import { ContentItem } from "./ContentCard";
import { formatNumber, formatDuration } from "./cardUtils";

export interface FlowCardLayoutProps {
  item: ContentItem;
  showMetrics?: boolean;
  onClick?: () => void;
  isActive?: boolean;
  className?: string; // Ajout de className
}

const FlowCardLayout: React.FC<FlowCardLayoutProps> = ({
  item,
  showMetrics = false,
  onClick,
  isActive = false,
  className = "" // Initialisation de className
}) => {
  return (
    <div 
      className={cn(
        "flow-card relative flex gap-4 p-3 rounded-lg transition-colors cursor-pointer", 
        isActive ? "bg-muted/60" : "hover:bg-muted/30",
        className // Utilisation de className
      )}
      onClick={onClick}
    >
      {/* Thumbnail container */}
      <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-md overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        {item.format === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        {item.duration && item.format === 'video' && (
          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded">
            {formatDuration(item.duration)}
          </div>
        )}
      </div>
      
      {/* Content info */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            {item.type !== 'standard' && (
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[10px]",
                item.type === 'premium' ? 'bg-amber-400/90 text-amber-900' : 'bg-purple-500/90 text-white'
              )}>
                {item.type.toUpperCase()}
              </span>
            )}
            
            {item.format && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-muted text-muted-foreground">
                {item.format}
              </span>
            )}
            
            {item.trending && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/80 text-white">
                TRENDING
              </span>
            )}
          </div>
        </div>
        
        {showMetrics && item.metrics && (
          <div className="flex items-center text-xs text-muted-foreground gap-3 mt-auto">
            {item.metrics.views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatNumber(item.metrics.views)}
              </span>
            )}
            
            {item.metrics.likes !== undefined && (
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {formatNumber(item.metrics.likes)}
              </span>
            )}
            
            {item.metrics.comments !== undefined && (
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {formatNumber(item.metrics.comments)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowCardLayout;
