
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useXTeaseInteractivity } from '@/hooks/useXTeaseInteractivity';
import { toast } from 'sonner';

interface XTeaseVideo {
  id: number;
  title: string;
  thumbnail: string;
  performer: string;
  views: string;
}

interface XTeasePromoRowProps {
  videos: XTeaseVideo[];
}

const XTeasePromoRow: React.FC<XTeasePromoRowProps> = ({ videos }) => {
  return (
    <div className="mb-6 w-full">
      <h3 className="text-lg font-semibold mb-2 text-center animated-gradient">Découvrez XTease</h3>
      <div className="grid grid-cols-3 gap-2">
        {videos.map((video) => (
          <XTeaseThumb key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

const XTeaseThumb: React.FC<{ video: XTeaseVideo }> = ({ video }) => {
  const { isFavorite } = useXTeaseInteractivity({ videoId: video.id });
  
  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info(`Redirection vers XTease: ${video.title}`);
    // La vraie redirection serait ici
    window.location.href = `/xtease/${video.id}`;
  };
  
  return (
    <Link 
      key={video.id} 
      to={`/xtease/${video.id}`}
      onClick={handleVideoClick}
      className="relative overflow-hidden rounded-lg group"
    >
      <div className="relative aspect-[9/16]">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play size={36} className="text-white opacity-80" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <p className="text-white text-xs truncate">{video.title}</p>
        </div>
        {isFavorite && (
          <div className="absolute top-1 right-1 bg-red-500/80 w-2 h-2 rounded-full"></div>
        )}
      </div>
    </Link>
  );
};

export default XTeasePromoRow;
