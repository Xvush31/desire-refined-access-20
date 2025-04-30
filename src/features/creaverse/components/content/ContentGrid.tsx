
import React, { useState } from "react";
import ContentCard, { ContentItem } from "./ContentCard";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { 
  LayoutGrid, 
  LayoutList, 
  TrendingUp, 
  Image as ImageIcon, 
  Video, 
  Play, 
  Film
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ContentGridProps {
  items: ContentItem[];
  layout: "grid" | "masonry" | "featured" | "flow";
  showMetrics?: boolean;
  onItemClick?: (item: ContentItem) => void;
  onLayoutChange?: (layout: "grid" | "masonry" | "featured" | "flow") => void;
  filterByFormat?: (format: "all" | "video" | "image" | "audio" | "text") => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  items,
  layout,
  showMetrics = false,
  onItemClick,
  onLayoutChange,
  filterByFormat
}) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-50/50' : 'bg-zinc-900/30';
  const [activeFormat, setActiveFormat] = useState<"all" | "video" | "image" | "audio" | "text">("all");

  if (!items || items.length === 0) {
    return (
      <div className={`flex justify-center items-center h-48 text-muted-foreground ${bgClass} rounded-xl p-4`}>
        Aucun contenu disponible
      </div>
    );
  }

  const handleFormatChange = (format: "all" | "video" | "image" | "audio" | "text") => {
    setActiveFormat(format);
    if (filterByFormat) {
      filterByFormat(format);
    }
  };

  const getGridClasses = () => {
    switch (layout) {
      case "masonry":
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-auto";
      case "featured":
        return "grid grid-cols-1 md:grid-cols-2 gap-4";
      case "flow":
        return "flex flex-col space-y-4";
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Contenu en vedette</h3>
            {featuredItem.trending && (
              <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20 flex items-center gap-1">
                <TrendingUp size={12} />
                Tendance
              </Badge>
            )}
          </div>
          
          {onLayoutChange && (
            <div className="flex space-x-1">
              <Button 
                size="sm" 
                variant={layout === "grid" ? "default" : "outline"} 
                className="h-8 w-8 p-0" 
                onClick={() => onLayoutChange("grid")}
              >
                <LayoutGrid size={16} />
              </Button>
              <Button 
                size="sm" 
                variant={layout === "masonry" ? "default" : "outline"} 
                className="h-8 w-8 p-0" 
                onClick={() => onLayoutChange("masonry")}
              >
                <LayoutList size={16} />
              </Button>
              <Button 
                size="sm" 
                variant={layout === "flow" ? "default" : "outline"} 
                className="h-8 w-8 p-0" 
                onClick={() => onLayoutChange("flow")}
              >
                <Film size={16} />
              </Button>
            </div>
          )}
        </div>

        {/* Format filter buttons */}
        {filterByFormat && (
          <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
            <Button 
              size="sm" 
              variant={activeFormat === "all" ? "default" : "outline"} 
              onClick={() => handleFormatChange("all")}
            >
              Tout
            </Button>
            <Button 
              size="sm" 
              variant={activeFormat === "video" ? "default" : "outline"} 
              onClick={() => handleFormatChange("video")}
              className="flex items-center gap-1"
            >
              <Video size={14} />
              Vidéos
            </Button>
            <Button 
              size="sm" 
              variant={activeFormat === "image" ? "default" : "outline"} 
              onClick={() => handleFormatChange("image")}
              className="flex items-center gap-1"
            >
              <ImageIcon size={14} />
              Photos
            </Button>
            <Button 
              size="sm" 
              variant={activeFormat === "audio" ? "default" : "outline"} 
              onClick={() => handleFormatChange("audio")}
              className="flex items-center gap-1"
            >
              <Play size={14} />
              Audio
            </Button>
          </div>
        )}

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

  // For flow layout
  if (layout === "flow") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Flux de contenu</h3>
          
          {onLayoutChange && (
            <div className="flex space-x-1">
              <Button 
                size="sm" 
                variant={layout === "grid" ? "default" : "outline"} 
                className="h-8 w-8 p-0" 
                onClick={() => onLayoutChange("grid")}
              >
                <LayoutGrid size={16} />
              </Button>
              <Button 
                size="sm" 
                variant={layout === "masonry" ? "default" : "outline"} 
                className="h-8 w-8 p-0" 
                onClick={() => onLayoutChange("masonry")}
              >
                <LayoutList size={16} />
              </Button>
              <Button 
                size="sm" 
                variant={layout === "flow" ? "default" : "outline"} 
                className="h-8 w-8 p-0" 
                onClick={() => onLayoutChange("flow")}
              >
                <Film size={16} />
              </Button>
            </div>
          )}
        </div>

        {/* Format filter buttons */}
        {filterByFormat && (
          <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
            <Button 
              size="sm" 
              variant={activeFormat === "all" ? "default" : "outline"} 
              onClick={() => handleFormatChange("all")}
            >
              Tout
            </Button>
            <Button 
              size="sm" 
              variant={activeFormat === "video" ? "default" : "outline"} 
              onClick={() => handleFormatChange("video")}
              className="flex items-center gap-1"
            >
              <Video size={14} />
              Vidéos
            </Button>
            <Button 
              size="sm" 
              variant={activeFormat === "image" ? "default" : "outline"} 
              onClick={() => handleFormatChange("image")}
              className="flex items-center gap-1"
            >
              <ImageIcon size={14} />
              Photos
            </Button>
            <Button 
              size="sm" 
              variant={activeFormat === "audio" ? "default" : "outline"} 
              onClick={() => handleFormatChange("audio")}
              className="flex items-center gap-1"
            >
              <Play size={14} />
              Audio
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContentCard
                item={item}
                layout="flow"
                showMetrics={showMetrics}
                onClick={() => onItemClick?.(item)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Pour les autres layouts
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Galerie de contenu</h3>
        
        {onLayoutChange && (
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant={layout === "grid" ? "default" : "outline"} 
              className="h-8 w-8 p-0" 
              onClick={() => onLayoutChange("grid")}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button 
              size="sm" 
              variant={layout === "masonry" ? "default" : "outline"} 
              className="h-8 w-8 p-0" 
              onClick={() => onLayoutChange("masonry")}
            >
              <LayoutList size={16} />
            </Button>
            <Button 
              size="sm" 
              variant={layout === "flow" ? "default" : "outline"} 
              className="h-8 w-8 p-0" 
              onClick={() => onLayoutChange("flow")}
            >
              <Film size={16} />
            </Button>
          </div>
        )}
      </div>

      {/* Format filter buttons */}
      {filterByFormat && (
        <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
          <Button 
            size="sm" 
            variant={activeFormat === "all" ? "default" : "outline"} 
            onClick={() => handleFormatChange("all")}
          >
            Tout
          </Button>
          <Button 
            size="sm" 
            variant={activeFormat === "video" ? "default" : "outline"} 
            onClick={() => handleFormatChange("video")}
            className="flex items-center gap-1"
          >
            <Video size={14} />
            Vidéos
          </Button>
          <Button 
            size="sm" 
            variant={activeFormat === "image" ? "default" : "outline"} 
            onClick={() => handleFormatChange("image")}
            className="flex items-center gap-1"
          >
            <ImageIcon size={14} />
            Photos
          </Button>
          <Button 
            size="sm" 
            variant={activeFormat === "audio" ? "default" : "outline"} 
            onClick={() => handleFormatChange("audio")}
            className="flex items-center gap-1"
          >
            <Play size={14} />
            Audio
          </Button>
        </div>
      )}

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
    </div>
  );
};

export default ContentGrid;
