
import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { XDOSE_DOMAIN } from "@/utils/creaverseLinks";
import { Link } from "react-router-dom";
import { getCreatorProfileUrl } from "@/utils/creaverseLinks";

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
  const [isHovered, setIsHovered] = useState(false);
  
  // Log pour débogage en dehors du JSX
  useEffect(() => {
    console.log("CreatorCard rendered, isMobile:", isMobile, "creator:", creator.name);
  }, [isMobile, creator.name]);
  
  return (
    <Card 
      className={`bg-card-gradient rounded-2xl p-5 shadow transition-all duration-300 relative min-w-[270px] flex flex-col justify-between creator-card ${!isMobile ? 'desktop-hover-effect' : ''}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      data-is-mobile={isMobile ? "true" : "false"}
    >
      <Link 
        to={getCreatorProfileUrl(creator.id)}
        className="block mb-2 text-center creator-card-content"
        data-testid="creator-profile-link"
      >
        <div className="relative mb-3">
          <Avatar className={`${isMobile ? 'h-20 w-20' : 'h-16 w-16'} mx-auto ${!isMobile && isHovered ? 'ring-2 ring-brand-red' : ''}`}>
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
        <h3 className={`text-lg font-semibold mb-1 ${!isMobile && isHovered ? 'text-brand-red' : ''}`}>
          {creator.name}
        </h3>
        <div className="text-xs text-muted-foreground mb-2">{creator.category}</div>
        <p className="text-sm text-foreground/90 text-center mb-4 line-clamp-3">{creator.description}</p>
      </Link>
      
      <div className="flex flex-col gap-2 w-full mt-auto">
        <Link 
          to={`/performer/${creator.id}`}
          className="w-full"
          data-testid="creator-subscribe-link"
        >
          <Button
            variant="default"
            className={`w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold ${isMobile ? 'py-3 text-base' : ''} ${!isMobile && isHovered ? 'scale-105' : ''}`}
            type="button"
          >
            <Plus className="mr-2" size={18} />
            S'abonner
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default CreatorCard;
