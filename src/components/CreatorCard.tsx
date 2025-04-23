
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => (
  <div className="bg-card-gradient rounded-2xl p-5 shadow hover:scale-105 transition-transform duration-200 relative min-w-[270px] flex flex-col items-center">
    <div className="relative mb-3">
      <Avatar className="h-16 w-16">
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
    <div className="flex flex-col gap-2 w-full mt-1">
      <Button
        asChild
        variant="secondary"
        className="w-full font-semibold"
      >
        <Link to={`/performer/${creator.id}`}>
          Voir le profil
        </Link>
      </Button>
      <Button
        asChild
        variant="default"
        className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold"
      >
        <Link to={`/subscription?creator=${creator.id}`}>
          <Plus className="mr-2" size={18} />
          Abonnez-vous
        </Link>
      </Button>
    </div>
  </div>
);

export default CreatorCard;
