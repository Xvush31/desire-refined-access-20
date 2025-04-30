
import React from "react";
import ContentCard, { ContentItem } from "./ContentCard";
import { useTheme } from "@/hooks/use-theme";

interface ContentGridProps {
  items: ContentItem[];
  layout: "grid" | "masonry" | "featured";
  showMetrics?: boolean;
  onItemClick?: (item: ContentItem) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  items,
  layout,
  showMetrics = false,
  onItemClick
}) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-50/50' : 'bg-zinc-900/30';

  if (!items || items.length === 0) {
    return (
      <div className={`flex justify-center items-center h-48 text-muted-foreground ${bgClass} rounded-xl p-4`}>
        Aucun contenu disponible
      </div>
    );
  }

  const getGridClasses = () => {
    switch (layout) {
      case "masonry":
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-auto";
      case "featured":
        return "grid grid-cols-1 md:grid-cols-2 gap-4";
      case "grid":
      default:
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4";
    }
  };

  // Pour le layout "featured", on met en avant le premier élément
  if (layout === "featured" && items.length > 0) {
    const featuredItem = items[0];
    const remainingItems = items.slice(1);
    
    return (
      <div className="space-y-4">
        <div className="featured-item w-full aspect-video">
          <ContentCard
            item={featuredItem}
            layout="featured"
            showMetrics={showMetrics}
            onClick={() => onItemClick?.(featuredItem)}
          />
        </div>
        
        <div className={getGridClasses()}>
          {remainingItems.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              layout="grid"
              showMetrics={showMetrics}
              onClick={() => onItemClick?.(item)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Pour les autres layouts
  return (
    <div className={getGridClasses()}>
      {items.map((item) => (
        <ContentCard
          key={item.id}
          item={item}
          layout={layout}
          showMetrics={showMetrics}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </div>
  );
};

export default ContentGrid;
