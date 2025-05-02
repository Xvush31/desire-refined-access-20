
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { toast } from 'sonner';

interface TrendingVideo {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  performer: string;
}

interface TrendingPromoRowProps {
  videos: TrendingVideo[];
}

const TrendingPromoRow: React.FC<TrendingPromoRowProps> = ({ videos }) => {
  const navigate = useNavigate();

  const handleVideoClick = (e: React.MouseEvent, video: TrendingVideo) => {
    e.preventDefault();
    toast.info(`Redirection vers la vidéo: ${video.title}`);
    // Redirection vers une page vidéo existante
    navigate(`/trending`);
  };

  return (
    <div className="mb-6 w-full">
      <h3 className="text-lg font-semibold mb-2 text-center animated-gradient">Vidéos tendances</h3>
      <div className="grid grid-cols-3 gap-2">
        {videos.map((video) => (
          <div 
            key={video.id}
            onClick={(e) => handleVideoClick(e, video)}
            className="relative overflow-hidden rounded-lg group cursor-pointer"
          >
            <div className="relative aspect-video">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Play size={24} className="text-white opacity-80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-xs truncate">{video.title}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-300">{video.performer}</span>
                  <span className="text-xs text-gray-300">{video.views}</span>
                </div>
              </div>
              <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                {video.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPromoRow;
