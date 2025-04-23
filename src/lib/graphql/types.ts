
// Types GraphQL de base pour notre application

export interface Video {
  id: string | number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  performer: string;
  isPremium?: boolean;
  isPreview?: boolean;
}

export interface Category {
  id: string | number;
  name: string;
  image: string;
  videoCount: number;
}

export interface Performer {
  id: string | number;
  name: string;
  videos: number;
  subscribers: string;
  image: string;
}

export interface Subscription {
  id: string | number;
  name: string;
  price: number;
  features: string[];
  color: string;
  isPopular?: boolean;
}
