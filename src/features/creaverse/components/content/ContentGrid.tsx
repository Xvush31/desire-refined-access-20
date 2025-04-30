
import React, { useState } from "react";
import { ContentItem } from "./ContentCard";
import { Button } from "@/components/ui/button";
import ContentLayout from "./ContentLayout";
import ContentFormatFilter from "./ContentFormatFilter";
import { Grid2X2, LayoutGrid, List, Rows } from "lucide-react";

interface ContentGridProps {
  items: ContentItem[];
  layout: "grid" | "masonry" | "featured" | "flow";
  onLayoutChange: (layout: "grid" | "masonry" | "featured" | "flow") => void;
  showMetrics?: boolean;
  onItemClick: (contentItem: ContentItem) => void;
  filterByFormat?: (format: "all" | "video" | "image" | "audio" | "text") => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  items = [],
  layout,
  onLayoutChange,
  showMetrics = false,
  onItemClick,
  filterByFormat,
}) => {
  const [activeFormat, setActiveFormat] = useState<"all" | "video" | "image" | "audio" | "text">("all");
  
  // Handle format filter change
  const handleFormatChange = (format: "all" | "video" | "image" | "audio" | "text") => {
    setActiveFormat(format);
    if (filterByFormat) {
      filterByFormat(format);
    }
  };

  // Group content by format
  const groupedContent: Record<string, ContentItem[]> = {
    video: items.filter(item => item.format === "video"),
    image: items.filter(item => item.format === "image"),
    audio: items.filter(item => item.format === "audio"),
    text: items.filter(item => item.format === "text"),
  };

  // Calculate metrics
  const metrics = {
    total: items.length,
    premium: items.filter(item => item.type === "premium").length,
    trending: items.filter(item => item.trending).length,
    formats: {
      video: groupedContent.video.length,
      image: groupedContent.image.length,
      audio: groupedContent.audio.length,
      text: groupedContent.text.length,
    }
  };

  // Determine content to display based on active format
  const displayItems = activeFormat === "all" 
    ? items
    : items.filter(item => item.format === activeFormat);

  return (
    <div className="space-y-4">
      {/* Format filter tabs */}
      <ContentFormatFilter 
        activeFormat={activeFormat} 
        onFormatChange={handleFormatChange} 
        metrics={metrics.formats}
      />

      {/* Layout selector and statistics */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Statistics */}
        {showMetrics && (
          <div className="text-sm text-muted-foreground">
            <span>{metrics.total} éléments</span>
            {metrics.premium > 0 && (
              <span className="ml-2">• {metrics.premium} premium</span>
            )}
            {metrics.trending > 0 && (
              <span className="ml-2">• {metrics.trending} en tendance</span>
            )}
          </div>
        )}
        
        {/* Layout selector */}
        <div className="flex items-center space-x-1 ml-auto sticky bottom-20 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md border border-muted z-20">
          <Button
            variant={layout === "grid" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onLayoutChange("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "masonry" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onLayoutChange("masonry")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "featured" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onLayoutChange("featured")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "flow" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onLayoutChange("flow")}
          >
            <Rows className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content layout */}
      <ContentLayout
        items={displayItems}
        layout={layout}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default ContentGrid;
