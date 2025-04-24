
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  performer: string;
  isPremium?: boolean;
  id?: number;
  navigateTo?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnail,
  duration,
  views,
  performer,
  isPremium = false,
  id,
  navigateTo,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  
  const getVideoId = () => {
    if (id !== undefined) {
      return id;
    }
    
    const seed = thumbnail.split('/seed/')[1]?.split('/')[0];
    switch(seed) {
      case 'paris': return 1;
      case 'night': return 2;
      case 'relax': return 3;
      case 'urban': return 4;
      default: return 1;
    }
  };

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    } else {
      navigate(`/video/${getVideoId()}`);
    }
  };
  
  return (
    <div 
      className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovering ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-sm text-white font-medium">
          {duration}
        </div>
        {isPremium && (
          <div className="absolute top-2 left-2">
            <div className="bg-gradient-to-r from-[#ff8ba7] to-[#ffc6c7] text-white px-3 py-1 rounded-full text-xs font-semibold">
              Premium
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-base font-medium line-clamp-2 mb-2 group-hover:text-[#ff8ba7] transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-rose-300/80">{performer}</span>
          <span className="text-sm text-rose-300/80">{views} vues</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
