
import React from "react";
import FlowCardLayout from "./FlowCardLayout";
import GridCardLayout from "./GridCardLayout";

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
  isFeatured?: boolean;
  onClick?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  showMetrics = false,
  layout = "grid",
  isFeatured = false,
  onClick
}) => {
  // Determine which layout component to use
  if (layout === "flow") {
    return (
      <FlowCardLayout 
        item={item} 
        showMetrics={showMetrics} 
        onClick={onClick}
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
    />
  );
};

export default ContentCard;
