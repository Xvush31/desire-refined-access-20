
import React, { useState } from "react";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  performer: string;
  isPremium?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnail,
  duration,
  views,
  performer,
  isPremium = false,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className="video-card group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden aspect-golden-inverse sm:aspect-golden">
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovering ? 'scale-105' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs sm:text-sm font-medium">
          {duration}
        </div>
        {isPremium && (
          <div className="absolute top-2 left-2 badge badge-premium rounded-full text-xs sm:text-sm font-medium">
            Premium
          </div>
        )}
      </div>
      <div className="video-card-content mt-2 bg-background z-10">
        <h3 className="text-xs sm:text-sm font-medium line-clamp-2 group-hover:text-red-500 transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-1 sm:mt-golden-sm">
          <span className="text-xs text-muted-foreground">{performer}</span>
          <span className="text-xs text-muted-foreground">{views} vues</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
