
import React from "react";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  performer: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnail,
  duration,
  views,
  performer,
}) => {
  return (
    <div className="video-card group">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium">
          {duration}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-brand-orange transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{performer}</span>
          <span className="text-xs text-muted-foreground">{views} vues</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
