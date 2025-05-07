
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Share2, Play, Pause } from "lucide-react";
import HLSVideoPlayer from "@/components/HLSVideoPlayer";
import { useXTeaseInteractivity } from "@/hooks/useXTeaseInteractivity";
import { useOptimizedLazyLoading } from "@/hooks/useOptimizedLazyLoading";

export interface CreatorFeedPost {
  id: string;
  image: string;
  caption: string;
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
  likes: number;
  timestamp: string;
  isPremium?: boolean;
  videoUrl?: string; // URL de la vidéo
  format?: string; // Format de la vidéo (16:9, 9:16, etc.)
  isVideo?: boolean; // Indique si c'est une vidéo
}

const CreatorFeedItem: React.FC<{ post: CreatorFeedPost }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = post && post.id ? parseInt(post.id.replace('video-', '')) || 0 : 0;
  const { isFavorite } = useXTeaseInteractivity({ videoId });
  
  // Use optimized lazy loading to detect when the component is in view
  const { ref, isVisible, hasBeenVisible } = useOptimizedLazyLoading({
    threshold: 0.7, // Element must be 70% visible to trigger
    rootMargin: '100px' // Start loading a bit before it enters the viewport
  });

  // Debug logs to track post data
  useEffect(() => {
    if (post) {
      console.log(`CreatorFeedItem rendering post ${post.id}:`, {
        hasVideoUrl: !!post.videoUrl,
        isVideo: post.isVideo,
        format: post.format
      });
    } else {
      console.error("CreatorFeedItem received undefined post");
    }
  }, [post]);

  // Safety check for post properties
  const isVideoPost = !!(
    post && 
    post.isVideo === true && 
    typeof post.videoUrl === 'string' && 
    post.videoUrl.trim() !== ''
  );

  // Auto-play when the component becomes visible for video posts
  useEffect(() => {
    if (isVideoPost && isVisible && !isPlaying) {
      console.log(`Video ${post.id} is now visible in feed, auto-playing`);
      setIsPlaying(true);
    } else if (!isVisible && isPlaying) {
      console.log(`Video ${post.id} is no longer visible in feed, pausing`);
      setIsPlaying(false);
    }
  }, [isVisible, isVideoPost, isPlaying, post?.id]);

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

  const handlePlayVideo = () => {
    console.log(`Manual play requested for video ${post?.id}`);
    setIsPlaying(true);
  };

  const handleVideoComplete = () => {
    console.log(`Video ${post?.id} playback completed`);
    setIsPlaying(false);
  };

  const shouldShowVideo = isVideoPost && isPlaying;
  
  // Add additional debug for shouldShowVideo
  useEffect(() => {
    console.log(`Should show video for ${post?.id}: ${shouldShowVideo}, isPlaying: ${isPlaying}`);
  }, [shouldShowVideo, isPlaying, post?.id]);

  // Safety check for the entire post
  if (!post) {
    console.error("CreatorFeedItem received undefined post");
    return null;
  }

  return (
    <div ref={ref} className="mb-6 bg-card border border-border rounded-lg overflow-hidden">
      {/* En-tête du post */}
      <div className="flex items-center p-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
          <img 
            src={post.creatorAvatar} 
            alt={post.creatorName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3 flex-grow">
          <h3 className="font-semibold text-sm">{post.creatorName}</h3>
          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
        </div>
      </div>
      
      {/* Contenu du post (image ou vidéo) */}
      <div className="relative">
        {shouldShowVideo ? (
          <div className="aspect-[9/16] w-full">
            <HLSVideoPlayer
              src={post.videoUrl || ''}
              poster={post.image}
              videoId={videoId}
              title={post.caption}
              onVideoComplete={handleVideoComplete}
              autoPlay={true}
              muted={true}
              className="feed-video-player" // Ajouté pour aider au debug CSS
            />
          </div>
        ) : (
          <div className="relative aspect-[9/16] w-full bg-black">
            <img 
              src={post.image} 
              alt={post.caption}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {isVideoPost && (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handlePlayVideo}
              >
                <div className="bg-black/30 p-5 rounded-full">
                  <Play size={32} className="text-white" />
                </div>
              </div>
            )}
            {post.isPremium && (
              <div className="absolute top-3 right-3 badge badge-premium px-3 py-1 text-sm font-medium">
                Premium
              </div>
            )}
            {isFavorite && (
              <div className="absolute top-3 left-3 bg-red-500/80 px-2 py-1 rounded text-xs text-white font-medium">
                Favori
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Actions du post */}
      <div className="flex items-center p-3">
        <motion.button 
          whileTap={{ scale: 1.5 }}
          className={`p-2 rounded-full ${liked ? 'text-red-500' : 'text-gray-400'}`}
          onClick={handleLikeToggle}
        >
          <Heart className={`${liked ? 'fill-current' : ''}`} size={22} />
        </motion.button>
        <button className="p-2 rounded-full text-gray-400">
          <MessageCircle size={22} />
        </button>
        <button className="p-2 rounded-full text-gray-400">
          <Send size={22} />
        </button>
        <div className="flex-grow"></div>
        <button className="p-2 rounded-full text-gray-400">
          <Share2 size={22} />
        </button>
      </div>
      
      {/* Compteur de likes */}
      <div className="px-4 py-1">
        <p className="text-sm font-medium">{post.likes + (liked ? 1 : 0)} j'aime</p>
      </div>
      
      {/* Caption */}
      <div className="px-4 pb-3">
        <p className="text-sm">
          <span className="font-semibold">{post.creatorName}</span> {post.caption}
        </p>
      </div>
    </div>
  );
};

export default CreatorFeedItem;
