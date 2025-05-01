
import React from "react";
import FlowCardLayout from "./FlowCardLayout";
import GridCardLayout from "./GridCardLayout";

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  type: "standard" | "premium" | "vip";
  format?: "video" | "image" | "audio" | "text";
  duration?: number | string;
  publishDate?: string;
  metrics?: {
    views: number;
    likes: number;
    engagement: number;
    completionRate?: number;
    watchTime?: string;
    comments?: number;
    rating?: number;
    growth?: number;
  };
  revenue?: number;
  trending?: boolean;
  trendingRank?: number;
  collections?: string[];
  valueScore?: number; // Value indicator (1-100)
  createdAt?: Date | string;
}

interface ContentCardProps {
  item: ContentItem;
  showMetrics?: boolean;
  layout?: "grid" | "masonry" | "featured" | "flow";
  isFeatured?: boolean;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  showMetrics = false,
  layout = "grid",
  isFeatured = false,
  onClick,
  isActive = false,
  className = ""
}) => {
  // Determine which layout component to use
  if (layout === "flow") {
    return (
      <FlowCardLayout 
        item={item} 
        showMetrics={showMetrics} 
        onClick={onClick}
        isActive={isActive}
        className={className}
      />
    );
  }

  // For grid, masonry, and featured layouts
  return (
    <GridCardLayout 
      item={item}
      showMetrics={showMetrics}
      layout={layout}
      isFeatured={isFeatured}
      onClick={onClick}
      className={className}
    />
  );
};

export default ContentCard;
