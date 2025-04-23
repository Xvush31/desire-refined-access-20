import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { 
  GET_TRENDING_VIDEOS, 
  GET_RECENT_VIDEOS, 
  GET_CATEGORIES, 
  GET_POPULAR_PERFORMERS,
  GET_SUBSCRIPTION_TIERS
} from './queries';
import { quantumBuffer } from '../quantum-buffer/quantum-buffer';
import { getWasmExports } from '../wasm/critical-ops';

// Helper function to optimize video quality using WebAssembly if available
const optimizeVideoQuality = async (videos, connectionSpeed = 5000000) => {
  try {
    const wasmExports = await getWasmExports();
    if (!wasmExports) return videos;
    
    return videos.map(video => {
      const optimizedQuality = wasmExports.optimizeStreamingQuality(
        connectionSpeed, 
        video.resolution || '1080p'
      );
      return {
        ...video,
        optimizedQuality
      };
    });
  } catch (error) {
    console.error("Error optimizing video quality:", error);
    return videos;
  }
};

// Custom hooks for using GraphQL queries
export const useTrendingVideos = () => {
  const { data, loading, error } = useQuery(GET_TRENDING_VIDEOS);
  const [optimizedVideos, setOptimizedVideos] = useState([]);
  
  // Use WebAssembly to optimize video quality if available
  useEffect(() => {
    let isMounted = true;
    
    const optimize = async () => {
      if (data?.trendingVideos) {
        try {
          console.log("Optimizing trending videos quality");
          const optimized = await optimizeVideoQuality(data.trendingVideos);
          if (isMounted) {
            setOptimizedVideos(optimized);
          }
        } catch (err) {
          console.error("Failed to optimize videos:", err);
        }
      }
    };
    
    optimize();
    return () => { isMounted = false; };
  }, [data?.trendingVideos]);
  
  // Trigger predictive preloading
  useEffect(() => {
    if (data?.trendingVideos?.length) {
      // Trigger quantum buffer preloading for related content
      quantumBuffer.predictAndBuffer({
        context: 'trending',
        currentVideos: data.trendingVideos.map(v => v.id)
      });
    }
  }, [data?.trendingVideos]);
  
  return {
    videos: data?.trendingVideos || [],
    loading,
    error,
    optimizedVideos
  };
};

export const useRecentVideos = () => {
  const { data, loading, error } = useQuery(GET_RECENT_VIDEOS);
  const [optimizedVideos, setOptimizedVideos] = useState([]);
  
  // Use WebAssembly to optimize video quality if available
  useEffect(() => {
    let isMounted = true;
    
    const optimize = async () => {
      if (data?.recentVideos) {
        try {
          console.log("Optimizing recent videos quality");
          const optimized = await optimizeVideoQuality(data.recentVideos);
          if (isMounted) {
            setOptimizedVideos(optimized);
          }
        } catch (err) {
          console.error("Failed to optimize videos:", err);
        }
      }
    };
    
    optimize();
    return () => { isMounted = false; };
  }, [data?.recentVideos]);
  
  // Trigger predictive preloading
  useEffect(() => {
    if (data?.recentVideos?.length) {
      quantumBuffer.predictAndBuffer({
        context: 'recent',
        currentVideos: data.recentVideos.map(v => v.id)
      });
    }
  }, [data?.recentVideos]);
  
  return {
    videos: data?.recentVideos || [],
    loading,
    error,
    optimizedVideos
  };
};

export const useCategories = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  return {
    categories: data?.categories || [],
    loading,
    error
  };
};

export const usePopularPerformers = () => {
  const { data, loading, error } = useQuery(GET_POPULAR_PERFORMERS);
  return {
    performers: data?.popularPerformers || [],
    loading,
    error
  };
};

export const useSubscriptionTiers = () => {
  const { data, loading, error } = useQuery(GET_SUBSCRIPTION_TIERS);
  return {
    tiers: data?.subscriptionTiers || [],
    loading,
    error
  };
};
