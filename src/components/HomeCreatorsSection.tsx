
import React from "react";
import ContentSection from "@/components/ContentSection";
import CreatorCard, { CreatorData } from "@/components/CreatorCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const creators: CreatorData[] = [
  {
    id: 1,
    name: "Lola Mystik",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Performeuse & Danse",
    trending: true,
    followers: 23800,
    revenue: "12 930",
    description: "Artiste passionnée et créative, Lola partage ses chorégraphies exclusives et moments privés avec ses abonnés."
  },
  {
    id: 2,
    name: "Lucas Zen",
    avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Modèle masculin",
    trending: false,
    followers: 15000,
    revenue: "8 400",
    description: "Lucas propose des séances exclusives axées sur la confiance en soi, l'humour et la détente."
  },
];

const HomeCreatorsSection = () => (
  <ContentSection 
    title="Nos meilleurs créateurs" 
    viewAllLink="/creators"
    className="bg-muted/20"
  >
    <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {creators.map((creator) => (
        <div key={creator.id} className="w-full max-w-md">
          <CreatorCard key={creator.id} creator={creator} />
        </div>
      ))}
      <div className="flex items-center justify-center">
        <Button 
          variant="secondary" 
          className="w-full h-full min-h-[400px] flex flex-col items-center justify-center"
          asChild
        >
          <Link to="/creators" className="text-center">
            <span className="text-lg font-semibold mb-2">Voir tous les créateurs</span>
            <ArrowRight size={32} />
          </Link>
        </Button>
      </div>
    </div>
  </ContentSection>
);

export default HomeCreatorsSection;
