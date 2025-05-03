import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Image as ImageIcon, Lock, Play, Star, TrendingUp, Video } from "lucide-react";
import { ContentItem } from "./ContentCard";
import { getTypeColor, getValueColor } from "./cardUtils";
import { formatDuration } from "@/utils/formatTime";

interface TypeBadgeProps {
  type: ContentItem['type'];
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const getTypeIcon = () => {
    switch (type) {
      case "premium": return <Star size={12} className="mr-1" />;
      case "vip": return <Lock size={12} className="mr-1" />;
      case "standard":
      default: return null;
    }
  };

  return (
    <Badge 
      className={`absolute top-2 right-2 ${getTypeColor(type)} text-white text-xs px-2 py-0.5 capitalize flex items-center`}
    >
      {getTypeIcon()}
      {type}
    </Badge>
  );
};

interface FormatBadgeProps {
  format?: ContentItem['format'];
}

export const FormatBadge: React.FC<FormatBadgeProps> = ({ format }) => {
  if (!format) return null;
  
  const getFormatIcon = () => {
    switch (format) {
      case "video": return <Video size={12} className="mr-1" />;
      case "image": return <ImageIcon size={12} className="mr-1" />;
      case "audio": return <Play size={12} className="mr-1" />;
      case "text": return <Clock size={12} className="mr-1" />;
      default: return null;
    }
  };
  
  return (
    <Badge 
      className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 capitalize flex items-center"
    >
      {getFormatIcon()}
      {format}
    </Badge>
  );
};

interface TrendingBadgeProps {
  trending?: boolean;
  trendingRank?: number;
}

export const TrendingBadge: React.FC<TrendingBadgeProps> = ({ trending, trendingRank }) => {
  if (!trending) return null;
  
  return (
    <Badge className="absolute top-2 left-2 bg-rose-500 text-white flex items-center gap-1">
      <TrendingUp size={12} />
      {trendingRank ? `#${trendingRank}` : "Tendance"}
    </Badge>
  );
};

interface DurationBadgeProps {
  duration?: number | string;
}

export const DurationBadge: React.FC<DurationBadgeProps> = ({ duration }) => {
  if (!duration) return null;
  
  const formattedDuration = typeof duration === 'string' 
    ? duration 
    : formatDuration(duration);
  
  return (
    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white">
      {formattedDuration}
    </div>
  );
};

interface ValueIndicatorProps {
  valueScore?: number;
}

export const ValueIndicator: React.FC<ValueIndicatorProps> = ({ valueScore }) => {
  if (!valueScore) return null;
  
  return (
    <div className={`absolute bottom-10 right-2 ${getValueColor(valueScore)} text-white text-xs px-2 py-1 rounded-full flex items-center`}>
      <Star size={10} className="mr-1" />
      {valueScore}%
    </div>
  );
};

interface CollectionTagsProps {
  collections?: string[];
  variant?: "default" | "featured";
}

export const CollectionTags: React.FC<CollectionTagsProps> = ({ collections, variant = "default" }) => {
  if (!collections || collections.length === 0) return null;
  
  if (variant === "featured") {
    return (
      <div className="mt-2 flex flex-wrap gap-1">
        {collections.map((collection) => (
          <Badge key={collection} variant="outline" className="text-xs bg-black/40 text-white">
            {collection}
          </Badge>
        ))}
      </div>
    );
  }
  
  return (
    <div className="mb-3 flex flex-wrap gap-1">
      {collections.map((collection) => (
        <Badge key={collection} variant="outline" className="text-xs">
          {collection}
        </Badge>
      ))}
    </div>
  );
};
