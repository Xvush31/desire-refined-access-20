
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export interface CreatorData {
  id: number;
  name: string;
  avatar: string;
  category: string;
  followers: number;
  revenue: string;
  trending: boolean;
  description: string;
}

interface CreatorCardProps {
  creator: CreatorData;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-card-gradient rounded-2xl p-5 shadow hover:shadow-lg transition-all duration-200 relative min-w-[270px] flex flex-col justify-between creator-card">
      <Link 
        to={`/performers/${creator.id}`}
        className="block mb-2 text-center"
        data-testid="creator-profile-link"
      >
        <div className="relative mb-3">
          <Avatar className="h-16 w-16 mx-auto">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {creator.trending && (
            <Badge variant="secondary" className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand-red text-white flex items-center gap-1 z-10 shadow">
              <Sparkles className="w-3 h-3" />
              En vogue
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-1">{creator.name}</h3>
        <div className="text-xs text-muted-foreground mb-2">{creator.category}</div>
        <p className="text-sm text-foreground/90 text-center mb-4 line-clamp-3">{creator.description}</p>
      </Link>
      
      <div className="flex flex-col gap-2 w-full mt-auto">
        <Link 
          to={`/subscription?creator=${creator.id}`}
          className="w-full"
          data-testid="creator-subscribe-link"
        >
          <Button
            variant="default"
            className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold"
            type="button"
          >
            <Plus className="mr-2" size={18} />
            Abonnez-vous
          </Button>
        </Link>
      </div>
      
      {/* Ajout de logs pour déboguer le problème desktop */}
      {console.log("CreatorCard rendered, isMobile:", isMobile)}
    </div>
  );
};

export default CreatorCard;
