
import React, { useState, useEffect } from 'react';
import ContentNavigationWrapper from './ContentNavigationWrapper';
import ContentGrid from './ContentGrid';
import { useRevolutionaryNavigation } from '@/features/creaverse/hooks/use-revolutionary-navigation';
import { ContentItem } from './ContentCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Extend ContentItem to include missing properties
interface ExtendedContentItem extends ContentItem {
  createdAt?: Date | string;
  type?: 'standard' | 'premium' | 'vip';
}

interface EnhancedContentGridProps {
  items: ContentItem[];
  onItemClick: (item: ContentItem) => void;
  showMetrics?: boolean;
  filterByFormat?: (format: "all" | "video" | "image" | "audio" | "text") => void;
}

const EnhancedContentGrid: React.FC<EnhancedContentGridProps> = ({
  items,
  onItemClick,
  showMetrics = false,
  filterByFormat
}) => {
  const { activeLayout, setLayout } = useRevolutionaryNavigation();
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>(items);
  const isMobile = useIsMobile();
  
  // Handle content filter changes from navigation
  const handleContentFilterChange = (filterId: string) => {
    // Apply different sorting/filtering based on the selected filter
    let filtered = [...items] as ExtendedContentItem[];
    
    switch(filterId) {
      case 'trending':
        filtered = items
          .filter(item => item.metrics && item.metrics.views > 1000)
          .sort((a, b) => ((b.metrics?.views || 0) - (a.metrics?.views || 0)));
        break;
      case 'recent':
        filtered = (items as ExtendedContentItem[]).sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : Date.now();
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : Date.now();
          return dateB - dateA;
        });
        break;
      case 'popular':
        filtered = items
          .sort((a, b) => ((b.metrics?.likes || 0) - (a.metrics?.likes || 0)));
        break;
      case 'mostWatched':
        filtered = items
          .sort((a, b) => ((b.metrics?.views || 0) - (a.metrics?.views || 0)));
        break;
      case 'mostCommented':
        filtered = items
          .sort((a, b) => ((b.metrics?.comments || 0) - (a.metrics?.comments || 0)));
        break;
      case 'highestRated':
        filtered = items
          .sort((a, b) => ((b.metrics?.rating || 0) - (a.metrics?.rating || 0)));
        break;
      case 'fastestGrowing':
        filtered = items
          .filter(item => item.metrics && (item.metrics as any).growthRate > 0)
          .sort((a, b) => (((b.metrics as any)?.growthRate || 0) - ((a.metrics as any)?.growthRate || 0)));
        break;
      case 'forYou':
        // This would typically use a recommendation algorithm
        // For now, we'll just return a random subset
        filtered = [...items].sort(() => Math.random() - 0.5);
        break;
      case 'premium':
        filtered = (items as ExtendedContentItem[]).filter(item => item.type === 'premium');
        break;
      case 'vip':
        filtered = (items as ExtendedContentItem[]).filter(item => item.type === 'vip');
        break;
      case 'grid':
        setLayout('grid');
        break;
      case 'list':
        setLayout('masonry');
        break;
      default:
        // Default to all content
        break;
    }
    
    setFilteredItems(filtered as ContentItem[]);
  };
  
  // Update filtered items when base items change
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);
  
  return (
    <ContentNavigationWrapper
      content={filteredItems}
      onContentFilterChange={handleContentFilterChange}
      className="w-full min-h-[50vh]"
    >
      <ContentGrid
        items={filteredItems}
        layout={activeLayout}
        showMetrics={showMetrics}
        onItemClick={onItemClick}
        onLayoutChange={setLayout}
        filterByFormat={filterByFormat}
      />
    </ContentNavigationWrapper>
  );
};

export default EnhancedContentGrid;
