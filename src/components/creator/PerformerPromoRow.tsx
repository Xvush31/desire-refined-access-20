
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <h3 className="text-lg font-semibold mb-2 text-center animated-gradient">Créateurs populaires</h3>
      <div className="grid grid-cols-3 gap-2">
        {performers.map((performer) => (
          <Link 
            key={performer.id} 
            to={`/creaverse-app/performer/${performer.id}`}
            className="relative rounded-lg group bg-card border border-border p-3 flex flex-col items-center"
          >
            <Avatar className="w-16 h-16 mb-2 border-2 border-pink-500">
              <AvatarImage src={performer.avatar} alt={performer.name} />
              <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                {performer.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium text-sm truncate w-full">{performer.name}</p>
              <p className="text-xs text-muted-foreground">{performer.followers.toLocaleString()} fans</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PerformerPromoRow;
