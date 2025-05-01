
import React from "react";
import { ContentItem } from "./ContentCard";
import ContentMetrics from "./ContentMetrics";
import CardBadges from "./CardBadges";
import { cn } from "@/lib/utils";

interface FlowCardLayoutProps {
  item: ContentItem;
  showMetrics?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

const FlowCardLayout: React.FC<FlowCardLayoutProps> = ({ 
  item, 
  showMetrics = false, 
  onClick,
  isActive = false
}) => {
  // Calculate appropriate class names
  const containerClasses = cn(
    "cursor-pointer flex flex-col items-stretch overflow-hidden rounded-lg border transition-all duration-200",
    isActive ? "shadow-lg ring-1 ring-primary" : "hover:shadow-md hover:border-muted"
  );

  return (
    <div 
      className={containerClasses}
      onClick={onClick}
    >
      <div className="flex items-stretch">
        {/* Left: Thumbnail with badges */}
        <div className="relative aspect-video min-w-[180px] w-1/3">
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="h-full w-full object-cover"
          />
          <CardBadges item={item} />
        </div>
        
        {/* Right: Content information */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-medium mb-1 line-clamp-2">{item.title}</h3>
            
            {/* Format, type, and collection tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {item.format && (
                <span className="bg-secondary text-secondary-foreground text-xs rounded px-2 py-0.5">
                  {item.format}
                </span>
              )}
              
              {item.type !== "standard" && (
                <span className={`text-xs rounded px-2 py-0.5 ${
                  item.type === "premium" ? "bg-amber-500 text-white" : "bg-purple-500 text-white"
                }`}>
                  {item.type}
                </span>
              )}
              
              {item.collections && item.collections.length > 0 && (
                <span className="bg-muted text-muted-foreground text-xs rounded px-2 py-0.5">
                  {item.collections[0]}
                </span>
              )}
            </div>
          </div>
          
          {/* Metrics */}
          {showMetrics && (
            <div className="mt-auto">
              <ContentMetrics 
                metrics={item.metrics} 
                revenue={showMetrics ? item.revenue : undefined}
                variant="inline"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowCardLayout;
