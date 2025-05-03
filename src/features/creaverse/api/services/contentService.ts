
import { ContentItem } from "../../components/content/ContentCard";
import { mockPerformers } from "../mocks/mockPerformers";
import { getRandomThumbnail, getFormatProperties, getTrendingContentProperties } from "../utils/contentGenerators";

// Generate mock content items based on formats
export const fetchPerformerContent = (
  performerId: string, 
  format: "all" | "video" | "image" | "audio" | "text" = "all",
  limit: number = 20,
  includeMetrics: boolean = true
): Promise<ContentItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const performer = mockPerformers[performerId];
      if (!performer) {
        resolve([]);
        return;
      }
      
      let contentCount = 0;
      let contentTypes: ("video" | "image" | "audio" | "text")[] = [];
      
      if (format === "all") {
        contentTypes = ["video", "image", "audio", "text"];
        contentCount = performer.content?.total || 20;
      } else {
        contentTypes = [format];
        switch (format) {
          case "video": contentCount = performer.content?.formats?.videos || 10; break;
          case "image": contentCount = performer.content?.formats?.photos || 10; break;
          case "audio": contentCount = performer.content?.formats?.audio || 5; break;
          case "text": contentCount = performer.content?.formats?.text || 5; break;
        }
      }
      
      // Get content count or use limit if smaller
      const count = Math.min(contentCount, limit);
      
      // Generate mock content
      const content: ContentItem[] = Array.from({ length: count }, (_, i) => {
        const formatIndex = i % contentTypes.length;
        const format = contentTypes[formatIndex];
        const isPremium = Math.random() > 0.7;
        const isVip = Math.random() > 0.9;
        const isTrending = Math.random() > 0.8;
        
        // Pick from performer collections if available
        const collections = performer.content?.collections || [];
        const itemCollections = collections.length > 0 && Math.random() > 0.5 
          ? [collections[Math.floor(Math.random() * collections.length)]] 
          : [];
        
        const type = isVip ? "vip" : isPremium ? "premium" : "standard";
        const valueScore = Math.floor(Math.random() * 100);
        
        // Format-specific properties
        const formatProperties = getFormatProperties(format, includeMetrics);
        
        return {
          id: `${performerId}-${format}-${i}`,
          title: `${format === "video" ? "Vidéo" : format === "image" ? "Photo" : format === "audio" ? "Audio" : "Article"} #${i+1} - ${performer.displayName}`,
          thumbnail: getRandomThumbnail(performerId, i, format),
          type,
          format,
          trending: isTrending,
          trendingRank: isTrending ? Math.floor(Math.random() * 10) + 1 : undefined,
          valueScore,
          publishDate: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2025`,
          collections: itemCollections,
          revenue: includeMetrics && Math.random() > 0.7 ? Math.floor(Math.random() * 500) + 50 : undefined,
          ...formatProperties
        };
      });
      
      resolve(content);
    }, 1200);
  });
};

// Function to get trending content across creators
export const fetchTrendingContent = (
  limit: number = 10
): Promise<ContentItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate trending content from various performers
      const content: ContentItem[] = Array.from({ length: limit }, (_, i) => {
        // Pick a random performer
        const performerIds = Object.keys(mockPerformers);
        const performerId = performerIds[Math.floor(Math.random() * performerIds.length)];
        const performer = mockPerformers[performerId];
        
        // Randomize content type and format
        const format = Math.random() > 0.5 ? "video" : "image";
        const isPremium = Math.random() > 0.4;  // More premium content in trending
        
        // Format-specific properties
        const formatProperties = getTrendingContentProperties(i, format);
        
        return {
          id: `trending-${i}`,
          title: `Contenu tendance ${i+1} - ${performer.displayName}`,
          thumbnail: getRandomThumbnail("trending", i, format),
          type: isPremium ? "premium" : "standard",
          format,
          trending: true,
          trendingRank: i + 1,
          valueScore: Math.floor(Math.random() * 20) + 80, // Higher value score for trending
          publishDate: `${Math.floor(Math.random() * 7) + 1}/05/2025`, // Recent dates for trending
          collections: performer.content?.collections && performer.content.collections.length > 0 
            ? [performer.content.collections[Math.floor(Math.random() * performer.content.collections.length)]] 
            : [],
          ...formatProperties
        };
      });
      
      resolve(content);
    }, 1000);
  });
};
