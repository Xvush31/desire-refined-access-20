
import { useQuery } from '@apollo/client';
import { 
  GET_TRENDING_VIDEOS, 
  GET_RECENT_VIDEOS, 
  GET_CATEGORIES, 
  GET_POPULAR_PERFORMERS,
  GET_SUBSCRIPTION_TIERS
} from './queries';

// Custom hooks for using GraphQL queries

export const useTrendingVideos = () => {
  const { data, loading, error } = useQuery(GET_TRENDING_VIDEOS);
  return {
    videos: data?.trendingVideos || [],
    loading,
    error
  };
};

export const useRecentVideos = () => {
  const { data, loading, error } = useQuery(GET_RECENT_VIDEOS);
  return {
    videos: data?.recentVideos || [],
    loading,
    error
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
