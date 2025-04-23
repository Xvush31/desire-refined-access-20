
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface PerformerData {
  id: number;
  name: string;
  image: string;
  videos: number;
  subscribers: string;
  description?: string;
  tags?: string[];
}

const performers: PerformerData[] = [
  { id: 1, name: "JulieSky", videos: 58, subscribers: "1.2M", image: "https://picsum.photos/seed/perf1/150/150", description: "Passionnée et créative, Julie aime partager des moments intimes et authentiques.", tags: ["Amateur", "Solo", "Danse"] },
  { id: 2, name: "MaxPower", videos: 42, subscribers: "850K", image: "https://picsum.photos/seed/perf2/150/150", description: "Max propose des vidéos énergiques et passionnées avec différentes partenaires.", tags: ["Couple", "Fitness", "POV"] },
  { id: 3, name: "LexiLove", videos: 63, subscribers: "1.5M", image: "https://picsum.photos/seed/perf3/150/150", description: "Lexi est connue pour son charisme et sa douceur dans des scènes sensuelles.", tags: ["Glamour", "Lingerie", "Roleplay"] },
  { id: 4, name: "TomSecret", videos: 37, subscribers: "720K", image: "https://picsum.photos/seed/perf4/150/150", description: "Tom vous invite dans son univers mystérieux et excitant.", tags: ["Mystère", "Romantique", "Costumes"] },
  { id: 5, name: "SophieWild", videos: 45, subscribers: "980K", image: "https://picsum.photos/seed/perf5/150/150", description: "Sophie est une performeuse audacieuse qui repousse ses limites.", tags: ["Aventurière", "Extérieur", "Spontané"] },
  { id: 6, name: "JackIntense", videos: 29, subscribers: "640K", image: "https://picsum.photos/seed/perf6/150/150", description: "Jack propose des expériences intenses et mémorables.", tags: ["Intense", "Passionné", "Sportif"] },
  { id: 7, name: "EmmaSensual", videos: 51, subscribers: "1.1M", image: "https://picsum.photos/seed/perf7/150/150", description: "Emma est l'incarnation de la sensualité et du raffinement.", tags: ["Sensuel", "Élégant", "Intime"] },
  { id: 8, name: "AlexMystery", videos: 33, subscribers: "690K", image: "https://picsum.photos/seed/perf8/150/150", description: "Alex vous emmène dans des scénarios mystérieux et excitants.", tags: ["Mystère", "Scénario", "Suspense"] },
  { id: 9, name: "LilyPure", videos: 47, subscribers: "920K", image: "https://picsum.photos/seed/perf9/150/150", description: "Lily incarne la pureté avec une touche d'audace inattendue.", tags: ["Innocent", "Surprise", "Naturel"] },
  { id: 10, name: "MarcDominant", videos: 38, subscribers: "780K", image: "https://picsum.photos/seed/perf10/150/150", description: "Marc est connu pour son charisme et sa présence imposante.", tags: ["Dominant", "Confiant", "Expérimenté"] },
  { id: 11, name: "ClaireLuxe", videos: 41, subscribers: "830K", image: "https://picsum.photos/seed/perf11/150/150", description: "Claire offre une expérience luxueuse et raffinée à ses abonnés.", tags: ["Luxe", "Glamour", "Sophistiqué"] },
  { id: 12, name: "DavidCharm", videos: 32, subscribers: "670K", image: "https://picsum.photos/seed/perf12/150/150", description: "David séduit par son charme naturel et sa simplicité.", tags: ["Charme", "Naturel", "Séducteur"] }
];

const Performers: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <ContentSection title="Performeurs Populaires">
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Découvrez nos performeurs les plus populaires et leurs contenus exclusifs. Abonnez-vous à leurs profils pour accéder à du contenu premium et personnalisé.
          </p>
          
          <div className={`grid grid-cols-1 ${isMobile ? 'sm:grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-x-4 gap-y-8`}>
            {performers.map((performer) => (
              <div key={performer.id} className="flex flex-col items-center text-center group">
                <Link 
                  to={`/performers/${performer.id}`} 
                  className="block w-full"
                  aria-label={`Voir le profil de ${performer.name}`}
                >
                  <div className="mb-3 relative flex justify-center">
                    <Avatar className={`${isMobile ? 'h-24 w-24' : 'h-28 w-28'} transition-all duration-300 group-hover:scale-105`}>
                      <AvatarImage src={performer.image} alt={performer.name} />
                      <AvatarFallback>{performer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-brand-accent transition-colors">{performer.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{performer.videos} vidéos</p>
                  <p className="text-sm text-brand-accent mb-2">{performer.subscribers} abonnés</p>
                  
                  {performer.description && (
                    <p className={`text-sm text-foreground/90 line-clamp-2 mb-3 mx-auto ${isMobile ? 'max-w-[250px]' : 'max-w-xs'}`}>
                      {performer.description}
                    </p>
                  )}
                  
                  {performer.tags && !isMobile && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {performer.tags.map((tag, index) => (
                        <span key={index} className="bg-secondary/50 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
                
                <Link 
                  to={`/performers/${performer.id}`}
                  className={`w-full flex justify-center mt-2 ${isMobile ? 'px-4' : ''}`}
                >
                  <Button 
                    variant="outline" 
                    size={isMobile ? "default" : "sm"} 
                    className={`w-full ${isMobile ? 'py-3 text-base' : 'max-w-[200px]'}`}
                  >
                    Voir le profil
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default Performers;
