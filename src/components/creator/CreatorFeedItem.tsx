
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import TipDialog from '@/components/messaging/TipDialog';
import SendMessageDialog from '@/components/SendMessageDialog';
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface CreatorFeedPost {
  id: string;
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
  image: string;
  caption: string;
  likes: number;
  timestamp: string;
  isPremium?: boolean;
}

interface CreatorFeedItemProps {
  post: CreatorFeedPost;
}

const CreatorFeedItem: React.FC<CreatorFeedItemProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isTipDialogOpen, setIsTipDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const { theme } = useTheme();

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
      toast.success("Publication aimée!");
    }
    setIsLiked(!isLiked);
  };

  const handleTip = () => {
    setIsTipDialogOpen(true);
  };

  const handleMessage = () => {
    setIsMessageDialogOpen(true);
  };

  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-800';

  return (
    <div className={`${bgClass} rounded-lg overflow-hidden shadow-sm mb-4 border ${borderClass} w-full max-w-lg mx-auto`}>
      {/* Creator Header */}
      <div className="p-3 flex items-center justify-between">
        <Link to={`/performers/${post.creatorId}`} className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-pink-500">
            <AvatarImage src={post.creatorAvatar} alt={post.creatorName} />
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
              {post.creatorName ? post.creatorName.substring(0, 2).toUpperCase() : ""}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{post.creatorName}</span>
        </Link>
        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
      </div>

      {/* Post Image with standard size */}
      <div className="relative w-full">
        <AspectRatio ratio={9/16} className="max-w-full w-full">
          <img 
            src={post.image} 
            alt={`Publication de ${post.creatorName}`} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {post.isPremium && (
            <div className="absolute top-2 right-2">
              <span className="animated-gradient-bg text-white text-xs px-2 py-1 rounded-full">
                Premium
              </span>
            </div>
          )}
        </AspectRatio>
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1"
              aria-label="Aimer cette publication"
            >
              <Heart 
                size={24} 
                className={isLiked ? "fill-red-500 text-red-500" : ""}
              />
            </button>
            <button 
              onClick={handleMessage}
              className="flex items-center gap-1"
              aria-label="Envoyer un message"
            >
              <MessageCircle size={24} />
            </button>
            <button 
              onClick={handleTip}
              className="flex items-center gap-1"
              aria-label="Envoyer un pourboire"
            >
              <DollarSign size={24} />
            </button>
          </div>
          <div className="text-sm font-medium">
            {likesCount.toLocaleString()} j'aime
          </div>
        </div>
        
        {/* Caption */}
        <div className="text-sm mb-1">
          <Link to={`/performers/${post.creatorId}`} className="font-semibold mr-2">
            {post.creatorName}
          </Link>
          {post.caption}
        </div>
      </div>

      {/* Dialogs */}
      <TipDialog 
        isOpen={isTipDialogOpen} 
        onClose={() => setIsTipDialogOpen(false)} 
        performerName={post.creatorName} 
      />
      
      <SendMessageDialog
        performerName={post.creatorName}
        performerId={post.creatorId}
        isOpen={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
      />
    </div>
  );
};

export default CreatorFeedItem;
