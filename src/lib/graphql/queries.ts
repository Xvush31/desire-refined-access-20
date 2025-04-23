
import { gql } from '@apollo/client';

// Fragments pour réduire la duplication et faciliter les mises à jour
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

// Requête pour les vidéos en tendance
export const GET_TRENDING_VIDEOS = gql`
  query GetTrendingVideos {
    trendingVideos {
      ...VideoFields
    }
  }
  ${VIDEO_FRAGMENT}
`;

// Requête pour les vidéos récemment ajoutées
export const GET_RECENT_VIDEOS = gql`
  query GetRecentVideos {
    recentVideos {
      ...VideoFields
    }
  }
  ${VIDEO_FRAGMENT}
`;

// Requête pour les catégories
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

// Requête pour les créateurs populaires
export const GET_POPULAR_PERFORMERS = gql`
  query GetPopularPerformers {
    popularPerformers {
      ...PerformerFields
    }
  }
  ${PERFORMER_FRAGMENT}
`;

// Requête pour les formules d'abonnement
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
