import React from "react";
import { ContentItem } from "./ContentCard";
import ContentCard from "./ContentCard";
import { motion } from "framer-motion";

interface ContentLayoutProps {
  items: ContentItem[];
  layout: "grid" | "masonry" | "featured" | "flow";
  onItemClick: (item: ContentItem) => void;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ items, layout, onItemClick }) => {
  // Configuration based on layout type
  const getLayoutClass = () => {
    switch (layout) {
      case "masonry":
        return "columns-1 sm:columns-2 md:columns-3 gap-4";
      case "featured":
        return "space-y-4";
      case "flow":
        return "hidden"; // Flow layout is handled separately
      default: // grid
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
    }
  };

  // If no items, show empty state
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <p className="text-muted-foreground">Aucun contenu à afficher</p>
      </div>
    );
  }

  // If flow layout is selected, this component doesn't render
  // as it's handled by ContentFlow component
  if (layout === "flow") {
    return null;
  }

  // For featured layout, show the first item larger
  if (layout === "featured" && items.length > 0) {
    const [featuredItem, ...restItems] = items;
    
    return (
      <div className="space-y-4">
        {/* Featured item */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <ContentCard 
            item={featuredItem} 
            isFeatured={true}
            onClick={() => onItemClick(featuredItem)}
          />
        </motion.div>
        
        {/* Rest of the items in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ContentCard 
                item={item}
                onClick={() => onItemClick(item)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // For grid and masonry layouts
  return (
    <div className={getLayoutClass()}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className={layout === "masonry" ? "mb-4 break-inside-avoid" : ""}
        >
          <ContentCard 
            item={item}
            onClick={() => onItemClick(item)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ContentLayout;
