
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Heart, MessageSquare, Eye, Clock, TrendingUp, Flame, Play } from 'lucide-react';
import { ContentItem } from './ContentCard';
import { formatDuration } from '@/utils/formatTime';
import { Badge } from "@/components/ui/badge";

interface EnhancedContentCardProps {
  item: ContentItem;
  isCreator?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  collectionName?: string;
  onClick?: () => void;
}

const EnhancedContentCard: React.FC<EnhancedContentCardProps> = ({ 
  item, 
  isCreator = false,
  size = 'md',
  className,
  collectionName,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'h-40',
    md: 'h-56',
    lg: 'h-72',
    xl: 'h-96',
  };
  
  const getBadge = () => {
    switch (item.type) {
      case 'premium':
        return <Badge className="bg-gradient-to-r from-amber-500 to-amber-300 text-white border-0">Premium</Badge>;
      case 'vip':
        return <Badge className="bg-gradient-to-r from-purple-600 to-indigo-400 text-white border-0">VIP</Badge>;
      default:
        return null;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  const renderFormatIndicator = () => {
    if (item.format === 'video' && item.duration) {
      return (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md flex items-center">
          <Clock size={12} className="mr-1" />
          {typeof item.duration === 'string' ? item.duration : formatDuration(item.duration)}
        </div>
      );
    }
    return null;
  };
  
  const renderCollectionBadge = () => {
    if (collectionName || (item.collections && item.collections.length > 0)) {
      return (
        <div className="absolute top-2 left-2 z-20 bg-black/40 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
          {collectionName || item.collections?.[0]}
        </div>
      );
    }
    return null;
  };
  
  const renderTrendingIndicator = () => {
    if (item.trending) {
      return (
        <div className="absolute top-2 right-2 z-20 bg-red-500/90 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
          <Flame size={12} className="mr-1" />
          Trending
        </div>
      );
    }
    
    if (item.metrics?.growth && item.metrics.growth > 10) {
      return (
        <div className="absolute top-2 right-2 z-20 bg-green-500/80 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
          <TrendingUp size={12} className="mr-1" />
          +{item.metrics.growth}%
        </div>
      );
    }
    
    return null;
  };

  return (
    <div 
      className={cn(
        "content-card relative overflow-hidden rounded-xl group transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1",
        sizeClasses[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Preview with hover animation */}
      <div className="w-full h-full overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt={item.title || "Content"} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-105"
          )}
        />
        
        {/* Preview overlay for videos - show animated play button on hover */}
        {item.format === 'video' && isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center animate-pulse">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <Play className="w-6 h-6 text-black ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Collection badge */}
      {renderCollectionBadge()}
      
      {/* Trending indicator */}
      {renderTrendingIndicator()}
      
      {/* Content type badge */}
      {item.type !== 'standard' && (
        <div className="absolute top-2 left-2">
          {getBadge()}
        </div>
      )}
      
      {/* Format indicator (duration for videos) */}
      {renderFormatIndicator()}
      
      {/* Revenue indicator (creator only) */}
      {isCreator && item.revenue && (
        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center">
          <span className="font-medium">${item.revenue}</span>
          {item.metrics?.growth && item.metrics.growth > 0 && (
            <span className="ml-1 text-green-400">↑</span>
          )}
        </div>
      )}
      
      {/* Info overlay on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end",
        isHovered ? "opacity-100" : "opacity-0",
        "transition-opacity duration-300"
      )}>
        {item.title && (
          <h3 className="font-medium text-white mb-2">{item.title}</h3>
        )}
        
        {item.metrics && (
          <div className="flex items-center justify-between text-xs text-white/90">
            <div className="flex items-center space-x-3">
              {item.metrics.views !== undefined && (
                <span className="flex items-center">
                  <Eye size={12} className="mr-1" />
                  {formatNumber(item.metrics.views)}
                </span>
              )}
              {item.metrics.likes !== undefined && (
                <span className="flex items-center">
                  <Heart size={12} className="mr-1" />
                  {formatNumber(item.metrics.likes)}
                </span>
              )}
              {item.metrics.comments !== undefined && (
                <span className="flex items-center">
                  <MessageSquare size={12} className="mr-1" />
                  {formatNumber(item.metrics.comments)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedContentCard;
