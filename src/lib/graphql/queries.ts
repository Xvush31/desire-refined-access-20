
import { gql } from '@apollo/client';

// Fragments to reduce duplication and make updates easier
export const VIDEO_FRAGMENT = gql`
  fragment VideoFields on Video {
    id
    title
    thumbnail
    duration
    views
    performer
    isPremium
  }
`;

export const PERFORMER_FRAGMENT = gql`
  fragment PerformerFields on Performer {
    id
    name
    videos
    subscribers
    image
  }
`;

// Query for trending videos
export const GET_TRENDING_VIDEOS = gql`
  query GetTrendingVideos {
    trendingVideos {
      ...VideoFields
    }
  }
  ${VIDEO_FRAGMENT}
`;

// Query for recently added videos
export const GET_RECENT_VIDEOS = gql`
  query GetRecentVideos {
    recentVideos {
      ...VideoFields
    }
  }
  ${VIDEO_FRAGMENT}
`;

// Query for categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      image
      videoCount
    }
  }
`;

// Query for popular creators
export const GET_POPULAR_PERFORMERS = gql`
  query GetPopularPerformers {
    popularPerformers {
      ...PerformerFields
    }
  }
  ${PERFORMER_FRAGMENT}
`;

// Query for subscription tiers
export const GET_SUBSCRIPTION_TIERS = gql`
  query GetSubscriptionTiers {
    subscriptionTiers {
      id
      name
      price
      features
      color
      isPopular
    }
  }
`;
