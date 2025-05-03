
import React, { useRef } from "react";
import { ContentItem } from "./ContentCard";
import { useXTeaseNavigation } from "@/hooks/useXTeaseNavigation";
import { motion } from "framer-motion";

interface ContentFlowProps {
  items: ContentItem[];
  contentItems?: ContentItem[];
  onItemClick: (item: ContentItem) => void;
}

const ContentFlow: React.FC<ContentFlowProps> = ({ 
  items, 
  contentItems, 
  onItemClick 
}) => {
  // Use items or contentItems prop, whichever is available
  const displayItems = items?.length ? items : contentItems || [];
  
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const {
    containerRef,
    registerVideoRef,
    handleTouchStart,
    handleTouchEnd,
    scrollToVideo,
    autoPlayEnabled,
    toggleAutoPlay
  } = useXTeaseNavigation({
    currentIndex,
    totalVideos: displayItems.length,
    onChangeIndex: setCurrentIndex,
    onActivatePlayer: () => console.log("Player activated")
  });

  if (!displayItems.length) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <p className="text-muted-foreground">Aucun contenu à afficher</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="h-[calc(100vh-240px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {displayItems.map((item, index) => (
        <div
          key={item.id}
          ref={el => registerVideoRef(index, el)}
          className="h-full w-full snap-start snap-always flex items-center justify-center"
          data-index={index}
          onClick={() => onItemClick(item)}
        >
          <motion.div 
            className="w-full max-w-md aspect-[9/16] bg-muted rounded-xl overflow-hidden relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={item.thumbnail || "https://picsum.photos/seed/" + item.id + "/640/1280"} 
              alt={item.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-bold">{item.title}</h3>
              {item.author && <p className="text-white/80 text-sm">{item.author}</p>}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default ContentFlow;
