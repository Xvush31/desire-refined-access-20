
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import { Heart, Share, MessageCircle, Sparkles, Play } from 'lucide-react';
import CreatorFeedItem from './CreatorFeedItem';

// Define the types needed
interface CreatorFeedPost {
  id: string; // Changed from number to string to match CreatorFeedItem's type
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
  image: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
}

interface XTeaseVideo {
  id: number;
  title: string;
  performer: string;
  views: string;
  thumbnail: string;
  streamUrl: string;
  isPremium: boolean;
}

interface ImmersivePublicationsProps {
  // Adding the props interface to match what's being passed from Index.tsx
  posts?: CreatorFeedPost[];
  onExitImmersive?: () => void;
  activePromo?: {
    type: 'xtease' | 'creator' | 'trending' | null;
    data: any;
  };
  onClosePromo?: () => void;
}

const ImmersivePublications: React.FC<ImmersivePublicationsProps> = (props) => {
  const { theme } = useTheme();
  const [publications, setPublications] = useState<CreatorFeedPost[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // If posts are provided via props, use them, otherwise fetch mock data
    if (props.posts && props.posts.length > 0) {
      setPublications(props.posts);
      return;
    }

    // Simulate fetching creator feed posts
    const mockPosts: CreatorFeedPost[] = [
      {
        id: "1", // Changed to string
        creatorId: 1,
        creatorName: "Sophie Dream",
        creatorAvatar: "https://picsum.photos/seed/creator1/100/100",
        image: "https://picsum.photos/seed/post1/800/600",
        caption: "Découvrez ma nouvelle création immersive. Une expérience sensorielle unique!",
        timestamp: "Il y a 2 heures",
        likes: 1245,
        comments: 89,
        shares: 34,
        bookmarks: 67,
      },
      {
        id: "2", // Changed to string
        creatorId: 2,
        creatorName: "Max Immersion",
        creatorAvatar: "https://picsum.photos/seed/creator2/100/100",
        image: "https://picsum.photos/seed/post2/800/600",
        caption: "Comment transformer vos émotions en expériences sensorielles? Découvrez ma méthode dans ce nouveau contenu exclusif.",
        timestamp: "Il y a 4 heures",
        likes: 2378,
        comments: 156,
        shares: 87,
        bookmarks: 112,
      },
      {
        id: "3", // Changed to string
        creatorId: 3,
        creatorName: "Léa Créative",
        creatorAvatar: "https://picsum.photos/seed/creator3/100/100",
        image: "https://picsum.photos/seed/post3/800/600",
        caption: "Plongez dans mon univers immersif avec cette nouvelle série de contenus adaptés à vos émotions.",
        timestamp: "Il y a 8 heures",
        likes: 1892,
        comments: 124,
        shares: 76,
        bookmarks: 94,
      },
    ];

    // XTease videos data
    const xTeaseVideos: XTeaseVideo[] = [
      {
        id: 101,
        title: "Voyage Sensoriel",
        performer: "Emma Immersion",
        views: "45.2K",
        thumbnail: "https://picsum.photos/seed/xtease1/800/450",
        streamUrl: "https://example.com/stream1",
        isPremium: true,
      },
      {
        id: 102,
        title: "Rêve Lucide",
        performer: "Thomas Créateur",
        views: "32.1K",
        thumbnail: "https://picsum.photos/seed/xtease2/800/450",
        streamUrl: "https://example.com/stream2",
        isPremium: false,
      }
    ];

    // Transform XTease videos to CreatorFeedPost format
    const immersiveXTeaseVideos: CreatorFeedPost[] = xTeaseVideos.map((video): CreatorFeedPost => ({
      id: `video-${video.id}`, // Changed to string with prefix
      creatorId: video.id,
      creatorName: video.performer,
      creatorAvatar: `https://picsum.photos/seed/performer${video.id}/100/100`,
      image: video.thumbnail,
      caption: video.title,
      timestamp: `${Math.floor(Math.random() * 12) + 1} heures ago`,
      likes: Math.floor(Math.random() * 5000) + 500,
      comments: Math.floor(Math.random() * 200) + 10,
      shares: Math.floor(Math.random() * 100) + 5,
      bookmarks: Math.floor(Math.random() * 300) + 20
    }));

    // Combine both arrays
    setPublications([...mockPosts, ...immersiveXTeaseVideos]);
  }, [props.posts]);

  // Auto rotate through publications
  useEffect(() => {
    if (publications.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % publications.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [publications]);

  if (publications.length === 0) {
    return <div className="text-center p-8">Chargement des publications...</div>;
  }

  // Add handlers for props if provided
  const handleExitImmersive = () => {
    if (props.onExitImmersive) {
      props.onExitImmersive();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Publications Immersives</h3>
        <Badge variant="outline" className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-pink-400" />
          <span>Adaptatif</span>
        </Badge>
      </div>
      
      <motion.div 
        key={publications[activeIndex].id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <CreatorFeedItem post={publications[activeIndex]} />
      </motion.div>
      
      <div className="flex justify-center mt-4">
        {publications.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 mx-1 rounded-full ${
              idx === activeIndex ? "bg-primary w-6" : "bg-muted"
            } transition-all`}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>
      
      {/* Add exit button if onExitImmersive prop exists */}
      {props.onExitImmersive && (
        <div className="text-center mt-4">
          <Button 
            variant="ghost" 
            className="text-sm"
            onClick={handleExitImmersive}
          >
            Quitter le mode immersif
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImmersivePublications;
