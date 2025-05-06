
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Share2, Play, Pause } from "lucide-react";
import HLSVideoPlayer from "@/components/HLSVideoPlayer";
import { useXTeaseInteractivity } from "@/hooks/useXTeaseInteractivity";

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
  const { isFavorite } = useXTeaseInteractivity({ videoId: parseInt(post.id.replace('video-', '')) });

  const isVideoPost = post.isVideo && post.videoUrl;

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handleVideoComplete = () => {
    setIsPlaying(false);
  };

  const shouldShowVideo = isVideoPost && isPlaying;

  return (
    <div className="mb-6 bg-card border border-border rounded-lg overflow-hidden">
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
              src={post.videoUrl}
              poster={post.image}
              videoId={parseInt(post.id.replace('video-', ''))}
              title={post.caption}
              onVideoComplete={handleVideoComplete}
              autoPlay={true}
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
