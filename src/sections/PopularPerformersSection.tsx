
import React from "react";
import ContentSection from "@/components/ContentSection";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePopularPerformers } from "@/lib/graphql/hooks";
import { Skeleton } from "@/components/ui/skeleton";

// Données de secours en cas d'échec de la requête GraphQL
const fallbackPerformers = [
  { id: 1, name: "JulieSky", videos: 58, subscribers: "1.2M", image: "https://picsum.photos/seed/perf1/150/150" },
  { id: 2, name: "MaxPower", videos: 42, subscribers: "850K", image: "https://picsum.photos/seed/perf2/150/150" },
  { id: 3, name: "LexiLove", videos: 63, subscribers: "1.5M", image: "https://picsum.photos/seed/perf3/150/150" },
  { id: 4, name: "TomSecret", videos: 37, subscribers: "720K", image: "https://picsum.photos/seed/perf4/150/150" }
];

const PopularPerformersSection: React.FC = () => {
  const isMobile = useIsMobile();
  // Utilisation du hook GraphQL pour les créateurs populaires
  const { performers, loading, error } = usePopularPerformers();

  // En cas d'erreur, utiliser les données de secours
  const displayPerformers = error || performers.length === 0 ? fallbackPerformers : performers;

  // Rendu du skeleton pendant le chargement
  if (loading) {
    return (
      <ContentSection title="Créateurs Populaires" viewAllLink="/performers" className="bg-secondary/30">
        <div className={`${isMobile ? 'flex flex-col gap-golden-md' : 'golden-grid'}`}>
          <div className="flex flex-wrap justify-center gap-golden-md">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <Skeleton className="w-32 h-32 mx-auto mb-golden-sm rounded-full" />
                <Skeleton className="h-4 w-20 mx-auto" />
                <Skeleton className="h-3 w-16 mx-auto mt-1" />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-start space-y-golden-md px-golden-md">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </ContentSection>
    );
  }

  return (
    <ContentSection title="Créateurs Populaires" viewAllLink="/performers" className="bg-secondary/30">
      <div className={`${isMobile ? 'flex flex-col gap-golden-md' : 'golden-grid'}`}>
        <div className="flex flex-wrap justify-center gap-golden-md">
          {displayPerformers.map((performer) => (
            <div key={performer.id} className="text-center group">
              <div className="w-32 h-32 mx-auto mb-golden-sm overflow-hidden rounded-full border-2 border-transparent group-hover:border-brand-accent transition-colors">
                <img 
                  src={performer.image} 
                  alt={performer.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium group-hover:text-brand-accent transition-colors">{performer.name}</h3>
              <p className="text-sm text-muted-foreground">{performer.videos} vidéos</p>
              <p className="text-xs text-brand-accent">{performer.subscribers} abonnés</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-start space-y-golden-md px-golden-md">
          <h3 className="text-golden-xl font-medium">Nos meilleurs créateurs</h3>
          <p className="text-muted-foreground">Découvrez les créateurs les plus populaires sur notre plateforme et abonnez-vous pour ne rien manquer de leur contenu exclusif.</p>
          <Button className="animated-gradient-bg text-white">
            Voir tous les créateurs
          </Button>
        </div>
      </div>
    </ContentSection>
  );
};

export default PopularPerformersSection;
