
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';
import { getCreatorProfileUrl } from '@/utils/creaverseLinks';

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
  const navigate = useNavigate();
  
  const handleCreatorClick = (e: React.MouseEvent, performer: Performer) => {
    e.preventDefault();
    toast.info(`Redirection vers le profil de ${performer.name}`);
    
    // Redirection vers le profil créateur avec le nouveau format d'URL
    const creatorUrl = getCreatorProfileUrl(performer.id);
    window.location.href = creatorUrl;
  };

  return (
    <div className="mb-6 w-full">
      <h3 className="text-lg font-semibold mb-2 text-center animated-gradient">Créateurs populaires</h3>
      <div className="grid grid-cols-3 gap-2">
        {performers.map((performer) => (
          <div 
            key={performer.id}
            onClick={(e) => handleCreatorClick(e, performer)}
            className="relative rounded-lg group bg-card border border-border p-3 flex flex-col items-center cursor-pointer"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformerPromoRow;
