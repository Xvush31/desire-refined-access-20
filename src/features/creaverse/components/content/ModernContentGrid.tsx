
import React from 'react';
import { cn } from '@/lib/utils';
import EnhancedContentCard from './EnhancedContentCard';
import { ContentItem } from './ContentCard';
import { motion } from 'framer-motion';

interface ModernContentGridProps {
  items: ContentItem[];
  layout: 'vertical' | 'collections' | 'featured';
  isCreator?: boolean;
  onItemClick?: (item: ContentItem) => void;
  className?: string;
}

const ModernContentGrid: React.FC<ModernContentGridProps> = ({
  items,
  layout,
  isCreator = false,
  onItemClick,
  className
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-muted/20 rounded-xl">
        <p className="text-muted-foreground">Aucun contenu disponible</p>
      </div>
    );
  }

  // Featured layout - highlight the first item
  if (layout === 'featured') {
    const [featuredItem, ...restItems] = items;

    return (
      <div className={cn("space-y-6", className)}>
        {/* Featured item */}
        {featuredItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full aspect-video overflow-hidden rounded-xl relative cursor-pointer"
            onClick={() => onItemClick?.(featuredItem)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <img
              src={featuredItem.thumbnail}
              alt={featuredItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
              <h2 className="font-bold text-2xl mb-2">{featuredItem.title}</h2>
              <div className="flex items-center gap-2">
                {featuredItem.type !== 'standard' && (
                  <span className={`px-2 py-1 rounded text-xs ${featuredItem.type === 'premium' ? 'bg-amber-500' : 'bg-purple-600'}`}>
                    {featuredItem.type === 'premium' ? 'Premium' : 'VIP'}
                  </span>
                )}
                {featuredItem.format && (
                  <span className="px-2 py-1 rounded text-xs bg-black/50 backdrop-blur-sm">
                    {featuredItem.format}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Remaining items in a grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {restItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * (idx % 4) }}
            >
              <EnhancedContentCard 
                item={item}
                isCreator={isCreator}
                onClick={() => onItemClick?.(item)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Vertical layout
  if (layout === 'vertical') {
    return (
      <div className={cn("space-y-4", className)}>
        {items.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex gap-4 p-3 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
            onClick={() => onItemClick?.(item)}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg flex-shrink-0">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <div>
                <h3 className="font-medium line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {item.type !== 'standard' && (
                    <span className={`px-1.5 py-0.5 rounded text-xs ${item.type === 'premium' ? 'bg-amber-500/90' : 'bg-purple-600/90'} text-white`}>
                      {item.type === 'premium' ? 'Premium' : 'VIP'}
                    </span>
                  )}
                  {item.format && (
                    <span className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                      {item.format}
                    </span>
                  )}
                </div>
              </div>
              
              {item.metrics && (
                <div className="flex items-center text-xs text-muted-foreground mt-2 gap-3">
                  {item.metrics.views && (
                    <span>{(item.metrics.views / 1000).toFixed(1)}k vues</span>
                  )}
                  {item.metrics.likes && (
                    <span>{(item.metrics.likes / 1000).toFixed(1)}k likes</span>
                  )}
                  {isCreator && item.revenue && (
                    <span className="font-medium text-foreground">${item.revenue}</span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Collections layout
  return (
    <div className={cn("space-y-8", className)}>
      {/* Group by collections */}
      {items.reduce((collections, item) => {
        const collectionName = item.collections?.[0] || 'Non classé';
        if (!collections[collectionName]) {
          collections[collectionName] = [];
        }
        collections[collectionName].push(item);
        return collections;
      }, {} as Record<string, ContentItem[]>)
      .entries()
      .map(([collectionName, collectionItems], collectionIdx) => (
        <motion.div 
          key={collectionName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: collectionIdx * 0.1 }}
          className="space-y-3"
        >
          <h2 className="text-xl font-bold">{collectionName}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {collectionItems.slice(0, 5).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * idx }}
              >
                <EnhancedContentCard 
                  item={item} 
                  isCreator={isCreator}
                  size="md"
                  collectionName={collectionName}
                  onClick={() => onItemClick?.(item)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ModernContentGrid;
