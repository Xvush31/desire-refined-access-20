
import React from "react";
import { Clock, Play, Star, TrendingUp, Users } from "lucide-react";
import { ContentItem } from "./ContentCard";

interface ContentMetricsProps {
  metrics?: ContentItem["metrics"];
  revenue?: number;
  variant?: "overlay" | "inline";
}

const ContentMetrics: React.FC<ContentMetricsProps> = ({ 
  metrics, 
  revenue, 
  variant = "inline" 
}) => {
  if (!metrics) return null;
  
  if (variant === "overlay") {
    return (
      <div className="flex items-center space-x-3 mt-1">
        <div className="flex items-center text-xs text-white/80">
          <Users size={12} className="mr-1" />
          {metrics.views.toLocaleString()}
        </div>
        <div className="flex items-center text-xs text-white/80">
          <Star size={12} className="mr-1" />
          {metrics.likes.toLocaleString()}
        </div>
        <div className="flex items-center text-xs text-white/80">
          <TrendingUp size={12} className="mr-1" />
          {metrics.engagement}%
        </div>
        {revenue !== undefined && (
          <div className="mt-1 text-xs font-bold text-green-400">
            {revenue.toLocaleString()}€ générés
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
      <div className="flex items-center text-sm text-muted-foreground">
        <Users size={14} className="mr-1" />
        {metrics.views.toLocaleString()} vues
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <Star size={14} className="mr-1" />
        {metrics.likes.toLocaleString()}
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <TrendingUp size={14} className="mr-1" />
        {metrics.engagement}%
      </div>
      {metrics.completionRate && (
        <div className="flex items-center text-sm text-muted-foreground">
          <Play size={14} className="mr-1" />
          {metrics.completionRate}% complété
        </div>
      )}
      {metrics.watchTime && (
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock size={14} className="mr-1" />
          {metrics.watchTime}
        </div>
      )}
      {revenue !== undefined && (
        <div className="mt-3 text-sm font-bold text-green-500">
          {revenue.toLocaleString()}€ générés
        </div>
      )}
    </div>
  );
};

export default ContentMetrics;
