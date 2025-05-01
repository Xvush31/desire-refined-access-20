
import React from 'react';
import { ContentItem } from './ContentCard';
import EnhancedContentGrid from './EnhancedContentGrid';
import { useRevolutionaryNavigation } from '@/hooks/use-revolutionary-navigation';

interface CreatorContentViewProps {
  items: ContentItem[];
  showMetrics?: boolean;
  onItemClick?: (item: ContentItem) => void;
}

const CreatorContentView: React.FC<CreatorContentViewProps> = ({
  items,
  showMetrics = false,
  onItemClick = () => {}
}) => {
  const { isImmersiveMode } = useRevolutionaryNavigation();
  
  // Formats filter handler
  const handleFilterByFormat = (format: "all" | "video" | "image" | "audio" | "text") => {
    console.log(`Filtering by format: ${format}`);
    // Implementation would filter the content items based on format
  };
  
  return (
    <div className={`${isImmersiveMode ? 'p-0' : 'p-4'} transition-all duration-300`}>
      <EnhancedContentGrid
        items={items}
        onItemClick={onItemClick}
        showMetrics={showMetrics}
        filterByFormat={handleFilterByFormat}
      />
    </div>
  );
};

export default CreatorContentView;
