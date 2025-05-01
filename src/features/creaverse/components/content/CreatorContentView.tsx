
import React, { useState } from 'react';
import { ContentItem } from './ContentCard';
import EnhancedContentGrid from './EnhancedContentGrid';
import ModernContentGrid from './ModernContentGrid';
import { useRevolutionaryNavigation } from '@/features/creaverse/hooks/use-revolutionary-navigation';
import ImmersiveView from '../navigation/ImmersiveView';

interface CreatorContentViewProps {
  items: ContentItem[];
  showMetrics?: boolean;
  onItemClick?: (item: ContentItem) => void;
  layout?: 'grid' | 'masonry' | 'featured' | 'vertical' | 'collections';
}

const CreatorContentView: React.FC<CreatorContentViewProps> = ({
  items,
  showMetrics = false,
  onItemClick = () => {},
  layout = 'grid'
}) => {
  const { isImmersiveMode } = useRevolutionaryNavigation();
  const [immersiveViewOpen, setImmersiveViewOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  
  // Formats filter handler
  const handleFilterByFormat = (format: "all" | "video" | "image" | "audio" | "text") => {
    console.log(`Filtering by format: ${format}`);
    // Implementation would filter the content items based on format
  };

  // Handle opening immersive view when an item is clicked
  const handleItemClicked = (item: ContentItem) => {
    const index = items.findIndex(i => i.id === item.id);
    if (index >= 0) {
      setSelectedItemIndex(index);
      setImmersiveViewOpen(true);
    }
    onItemClick(item);
  };
  
  // Convert ContentItems to format needed by ImmersiveView
  const immersiveItems = items.map(item => ({
    id: item.id,
    title: item.title,
    imageUrl: item.thumbnail,
    videoUrl: item.format === 'video' ? `https://example.com/videos/${item.id}.mp4` : undefined,
    format: item.format || 'image',
    metrics: item.metrics,
  }));

  // For modern layouts like vertical or collections, use ModernContentGrid
  if (layout === 'vertical' || layout === 'collections' || layout === 'featured') {
    return (
      <div className={`${isImmersiveMode ? 'p-0' : 'p-4'} transition-all duration-300`}>
        <ModernContentGrid 
          items={items}
          layout={layout}
          isCreator={showMetrics}
          onItemClick={handleItemClicked}
        />
        
        <ImmersiveView 
          isOpen={immersiveViewOpen}
          onClose={() => setImmersiveViewOpen(false)}
          content={immersiveItems}
          initialIndex={selectedItemIndex}
        />
      </div>
    );
  }
  
  // For grid and masonry layouts, use EnhancedContentGrid
  return (
    <div className={`${isImmersiveMode ? 'p-0' : 'p-4'} transition-all duration-300`}>
      <EnhancedContentGrid
        items={items}
        onItemClick={handleItemClicked}
        showMetrics={showMetrics}
        filterByFormat={handleFilterByFormat}
      />
      
      <ImmersiveView 
        isOpen={immersiveViewOpen}
        onClose={() => setImmersiveViewOpen(false)}
        content={immersiveItems}
        initialIndex={selectedItemIndex}
      />
    </div>
  );
};

export default CreatorContentView;
