
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from 'framer-motion';

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
  return (
    <div className="mb-6 w-full">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold inline-block animated-gradient">Vidéos tendances</h3>
      </div>
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {videos.map((video) => (
            <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <Link 
                  to={`/video/${video.id}`}
                  className="relative overflow-hidden rounded-lg block"
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
                </Link>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default TrendingPromoRow;
