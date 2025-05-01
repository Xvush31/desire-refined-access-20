
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from 'framer-motion';

interface Performer {
  id: number;
  name: string;
  avatar: string;
  category: string;
  followers: number;
}

interface PerformerPromoRowProps {
  performers: Performer[];
}

const PerformerPromoRow: React.FC<PerformerPromoRowProps> = ({ performers }) => {
  return (
    <div className="mb-6 w-full">
      <h3 className="text-lg font-semibold mb-3 text-center animated-gradient">Créateurs populaires</h3>
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {performers.map((performer) => (
            <CarouselItem key={performer.id} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  to={`/creaverse-app/performer/${performer.id}`}
                  className="relative rounded-lg group bg-card border border-border p-3 flex flex-col items-center block h-full"
                >
                  <Avatar className="w-16 h-16 mb-2 border-2 border-pink-500">
                    <AvatarImage src={performer.avatar} alt={performer.name} />
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                      {performer.name ? performer.name.substring(0, 2).toUpperCase() : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-medium text-sm truncate w-full">{performer.name}</p>
                    <p className="text-xs text-muted-foreground">{performer.followers.toLocaleString()} fans</p>
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

export default PerformerPromoRow;
