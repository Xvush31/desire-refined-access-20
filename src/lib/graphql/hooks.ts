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

// Simplified helper function for video quality optimization
const optimizeVideoQuality = async (videos, connectionSpeed = 5000000) => {
  try {
    const wasmExports = await getWasmExports();
    if (!wasmExports) return videos;
    
    return videos.map(video => ({
      ...video,
      optimizedQuality: wasmExports.optimizeStreamingQuality(
        connectionSpeed, 
        video.resolution || '1080p'
      )
    }));
  } catch (error) {
    console.error("Error optimizing video quality:", error);
    return videos;
  }
};

// Custom hooks with simplified implementation
export const useTrendingVideos = () => {
  const { data, loading, error } = useQuery(GET_TRENDING_VIDEOS);
  const [optimizedVideos, setOptimizedVideos] = useState([]);
  
  useEffect(() => {
    if (!data?.trendingVideos) return;
    
    let isMounted = true;
    optimizeVideoQuality(data.trendingVideos)
      .then(optimized => {
        if (isMounted) setOptimizedVideos(optimized);
      })
      .catch(err => console.error("Failed to optimize videos:", err));
      
    return () => { isMounted = false; };
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
  
  useEffect(() => {
    if (data?.recentVideos?.length) {
      let isMounted = true;
      optimizeVideoQuality(data.recentVideos)
        .then(optimized => {
          if (isMounted) setOptimizedVideos(optimized);
        })
        .catch(err => console.error("Failed to optimize videos:", err));
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
