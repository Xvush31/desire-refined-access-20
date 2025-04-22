
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
      className="video-card group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden aspect-golden-inverse">
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovering ? 'scale-105' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-medium">
          {duration}
        </div>
        {isPremium && (
          <div className="absolute top-2 left-2 animated-gradient-bg px-2 py-0.5 rounded-full text-xs font-medium text-white">
            Premium
          </div>
        )}
      </div>
      <div className="p-golden-sm">
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-red-500 transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-golden-sm">
          <span className="text-xs text-muted-foreground">{performer}</span>
          <span className="text-xs text-muted-foreground">{views} vues</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
