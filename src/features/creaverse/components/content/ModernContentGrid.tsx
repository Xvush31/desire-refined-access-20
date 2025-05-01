
import React, { useState } from 'react';
import { ContentItem } from './ContentCard';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import EnhancedContentCard from './EnhancedContentCard';

interface ContentCollection {
  name: string;
  contents: ContentItem[];
}

interface ModernContentGridProps {
  items: ContentItem[];
  layout?: 'grid' | 'masonry' | 'featured' | 'vertical' | 'collections';
  className?: string;
  isCreator?: boolean;
  collections?: ContentCollection[];
  onItemClick?: (item: ContentItem) => void;
}

const ModernContentGrid: React.FC<ModernContentGridProps> = ({ 
  items, 
  layout = 'grid', 
  className,
  isCreator = false,
  collections = [],
  onItemClick
}) => {
  const [expandedCollections, setExpandedCollections] = useState<Record<string, boolean>>({});
  
  // Determine trending content (if views > 10k or growth > 15%)
  const trendingContents = items.filter(item => 
    (item.metrics?.views && item.metrics.views > 10000) || 
    (item.trending === true) ||
    (item.metrics?.growth && item.metrics.growth > 15)
  ).sort((a, b) => {
    const aScore = (a.metrics?.views || 0) + ((a.metrics?.growth || 0) * 100);
    const bScore = (b.metrics?.views || 0) + ((b.metrics?.growth || 0) * 100);
    return bScore - aScore;
  });
  
  const handleItemClick = (item: ContentItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };
  
  const toggleCollection = (name: string) => {
    setExpandedCollections(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  // Layout: Vertical Flow (similar to TikTok/Instagram Reels)
  if (layout === 'vertical') {
    return (
      <div className={cn("flex flex-col space-y-4", className)}>
        {trendingContents.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Layers size={18} className="mr-2 text-red-500" />
              Trending Content
            </h2>
            <div className="w-full overflow-hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {trendingContents.slice(0, 5).map((item) => (
                    <CarouselItem key={item.id} className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <EnhancedContentCard 
                        key={item.id}
                        item={item}
                        isCreator={isCreator}
                        size="md"
                        onClick={() => handleItemClick(item)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1 sm:-left-4" />
                <CarouselNext className="right-1 sm:-right-4" />
              </Carousel>
            </div>
          </div>
        )}
        
        {items.map((item) => (
          <EnhancedContentCard 
            key={item.id}
            item={item}
            isCreator={isCreator}
            size="xl"
            className="w-full max-w-2xl mx-auto"
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    );
  }
  
  // Layout: Collections
  if (layout === 'collections') {
    // If no explicit collections, generate collections from tags/collections field
    const renderedCollections = collections.length > 0 ? collections : 
      // Group content by collection if specified
      Object.entries(
        items.reduce<Record<string, ContentItem[]>>((acc, item) => {
          const collection = item.collections && item.collections.length > 0 ? item.collections[0] : 'Uncategorized';
          if (!acc[collection]) acc[collection] = [];
          acc[collection].push(item);
          return acc;
        }, {})
      ).map(([name, contents]) => ({ name, contents }));

    return (
      <div className={cn("space-y-8", className)}>
        {/* Trending section at top if we have trending content */}
        {trendingContents.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Layers size={18} className="mr-2 text-red-500" />
              Trending Content
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {trendingContents.slice(0, 3).map((item) => (
                <EnhancedContentCard 
                  key={item.id}
                  item={item}
                  isCreator={isCreator}
                  size="lg"
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          </div>
        )}
        
        {renderedCollections.map((collection) => (
          <div key={collection.name} className="space-y-3">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleCollection(collection.name)}
            >
              <h3 className="text-lg font-medium">{collection.name}</h3>
              <button className="p-1 hover:bg-muted rounded-full">
                {expandedCollections[collection.name] ? 
                  <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
            
            {(!expandedCollections[collection.name] || expandedCollections[collection.name] === true) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {collection.contents.map((item) => (
                  <EnhancedContentCard 
                    key={item.id}
                    item={item}
                    isCreator={isCreator}
                    collectionName={collection.name}
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </div>
            )}
            <Separator className="mt-6" />
          </div>
        ))}
      </div>
    );
  }
  
  if (layout === 'featured') {
    // First item is featured (larger), rest are in a standard grid
    const featured = items[0];
    const rest = items.slice(1);
    
    // Identify trending content for middle section
    const trendingFromRest = rest
      .filter(item => 
        (item.metrics?.views && item.metrics.views > 10000) || 
        (item.trending === true) ||
        (item.metrics?.growth && item.metrics.growth > 15)
      )
      .slice(0, 3);
    
    // Remaining content after extracting featured and trending
    const remaining = rest.filter(item => !trendingFromRest.includes(item));
    
    return (
      <div className={cn("space-y-8", className)}>
        {/* Featured content */}
        {featured && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Featured Content</h2>
            <EnhancedContentCard 
              item={featured}
              size="xl"
              isCreator={isCreator}
              className="w-full"
              onClick={() => handleItemClick(featured)}
            />
          </div>
        )}
        
        {/* Trending content */}
        {trendingFromRest.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <Layers size={20} className="mr-2 text-red-500" />
              Trending Now
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {trendingFromRest.map((item) => (
                <EnhancedContentCard 
                  key={item.id}
                  item={item}
                  isCreator={isCreator}
                  size="lg"
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Recent content */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Recent Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {remaining.map((item) => (
              <EnhancedContentCard 
                key={item.id}
                item={item}
                isCreator={isCreator}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (layout === 'masonry') {
    // Create an irregular grid for visual interest based on metrics
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 auto-rows-max", className)}>
        {items.map((item, index) => {
          // Determine size based on metrics and position
          let size = 'md';
          let className = '';
          
          const hasHighEngagement = 
            (item.metrics?.views && item.metrics.views > 10000) ||
            (item.metrics?.likes && item.metrics.likes > 1000);
          
          const isTrending = item.trending || 
            (item.metrics?.growth && item.metrics.growth > 15);
          
          if (index % 7 === 0 || hasHighEngagement) {
            size = 'lg';
            className = 'col-span-2 row-span-2';
          } else if (index % 5 === 0 || isTrending) {
            size = 'md';
            className = 'col-span-1 row-span-1';
          }
          
          return (
            <EnhancedContentCard 
              key={item.id}
              item={item}
              isCreator={isCreator}
              size={size as 'sm' | 'md' | 'lg' | 'xl'}
              className={className}
              onClick={() => handleItemClick(item)}
            />
          );
        })}
      </div>
    );
  }
  
  // Default grid layout
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4", className)}>
      {items.map((item) => (
        <EnhancedContentCard 
          key={item.id}
          item={item}
          isCreator={isCreator}
          onClick={() => handleItemClick(item)}
        />
      ))}
    </div>
  );
};

export default ModernContentGrid;
