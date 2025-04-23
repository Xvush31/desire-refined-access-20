
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import CreatorCard, { CreatorData } from "@/components/CreatorCard";
import { Clock } from "lucide-react";

const recentCreators: CreatorData[] = [
  {
    id: 7,
    name: "Julie Nouvelle",
    avatar: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Modèle Débutante",
    trending: false,
    followers: 5800,
    revenue: "3 240",
    description: "Julie vient de rejoindre la plateforme et propose un contenu frais et authentique."
  },
  {
    id: 8,
    name: "Alex First",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Photographe & Modèle",
    trending: true,
    followers: 7200,
    revenue: "4 150",
    description: "Alex partage son regard artistique à travers des séances photo sensuelles et créatives."
  },
  {
    id: 9,
    name: "Emma Discover",
    avatar: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Voyageuse & Modèle",
    trending: false,
    followers: 6400,
    revenue: "3 600",
    description: "Emma vous emmène dans ses voyages autour du monde et partage des moments intimes dans des lieux exotiques."
  },
  {
    id: 10,
    name: "David Start",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Acteur Amateur",
    trending: false,
    followers: 4900,
    revenue: "2 750",
    description: "David débute dans l'univers du contenu adulte avec enthousiasme et naturel."
  },
  {
    id: 11,
    name: "Marie Fresh",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Étudiante & Modèle",
    trending: true,
    followers: 8100,
    revenue: "4 580",
    description: "Marie alterne entre ses études et sa passion pour la création de contenu exclusif."
  },
  {
    id: 12,
    name: "Paul Begin",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Sportif & Modèle",
    trending: false,
    followers: 5600,
    revenue: "3 120",
    description: "Paul se lance dans l'aventure et partage son quotidien sportif avec une touche sensuelle."
  }
];

const CreatorsRecent: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Créateurs Récents">
          <div className="flex items-center gap-2 text-brand-accent mb-8">
            <Clock className="h-5 w-5" />
            <p className="text-lg font-medium">Les nouveaux talents qui ont rejoint notre plateforme</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default CreatorsRecent;
