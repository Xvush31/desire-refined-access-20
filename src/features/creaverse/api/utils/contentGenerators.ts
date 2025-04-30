
import { ContentItem } from "../../components/content/ContentCard";
import { mockPerformers } from "../mocks/mockPerformers";

// Helper function to generate random thumbnail
export const getRandomThumbnail = (performerId: string, index: number, format: string): string => {
  return `https://picsum.photos/seed/${performerId}-${index}-${format}/800/450`;
};

// Helper function to generate format-specific properties for content items
export const getFormatProperties = (
  format: string, 
  includeMetrics: boolean = true
): Partial<ContentItem> => {
  switch (format) {
    case "video":
      return {
        duration: `${Math.floor(Math.random() * 15) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        metrics: includeMetrics ? {
          views: Math.floor(Math.random() * 100000) + 1000,
          likes: Math.floor(Math.random() * 10000) + 100,
          engagement: Number((Math.random() * 10 + 2).toFixed(1)),
          completionRate: Math.floor(Math.random() * 40) + 60,
          watchTime: `${Math.floor(Math.random() * 9) + 1}m ${Math.floor(Math.random() * 50) + 10}s`
        } : undefined
      };
    case "image":
      return {
        metrics: includeMetrics ? {
          views: Math.floor(Math.random() * 80000) + 1000,
          likes: Math.floor(Math.random() * 8000) + 100,
          engagement: Number((Math.random() * 15 + 5).toFixed(1))
        } : undefined
      };
    case "audio":
      return {
        duration: `${Math.floor(Math.random() * 5) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        metrics: includeMetrics ? {
          views: Math.floor(Math.random() * 50000) + 500,
          likes: Math.floor(Math.random() * 5000) + 50,
          engagement: Number((Math.random() * 8 + 1).toFixed(1))
        } : undefined
      };
    case "text":
      return {
        metrics: includeMetrics ? {
          views: Math.floor(Math.random() * 30000) + 200,
          likes: Math.floor(Math.random() * 3000) + 20,
          engagement: Number((Math.random() * 5 + 1).toFixed(1))
        } : undefined
      };
    default:
      return {};
  }
};

// Helper function to generate trending content properties
export const getTrendingContentProperties = (
  i: number, 
  format: string
): Partial<ContentItem> => {
  return format === "video" 
    ? {
        duration: `${Math.floor(Math.random() * 15) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        metrics: {
          views: Math.floor(Math.random() * 1000000) + 100000, // Higher views for trending
          likes: Math.floor(Math.random() * 100000) + 10000,
          engagement: Number((Math.random() * 20 + 10).toFixed(1)), // Higher engagement
          completionRate: Math.floor(Math.random() * 20) + 80 // Higher completion rate
        }
      }
    : {
        metrics: {
          views: Math.floor(Math.random() * 800000) + 50000,
          likes: Math.floor(Math.random() * 80000) + 5000,
          engagement: Number((Math.random() * 25 + 10).toFixed(1))
        }
      };
};
