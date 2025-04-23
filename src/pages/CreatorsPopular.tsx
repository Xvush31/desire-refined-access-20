
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import CreatorCard, { CreatorData } from "@/components/CreatorCard";
import { Star } from "lucide-react";

const popularCreators: CreatorData[] = [
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
  {
    id: 3,
    name: "Sophie Dream",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Modèle & Actrice",
    trending: true,
    followers: 31200,
    revenue: "17 840",
    description: "Sophie vous invite dans son univers onirique où elle partage ses rêves les plus intimes."
  },
  {
    id: 4,
    name: "Marc Elite",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Modèle fitness",
    trending: true,
    followers: 28400,
    revenue: "14 560",
    description: "Passionné de fitness et de bien-être, Marc partage son quotidien sportif et ses moments de détente."
  },
  {
    id: 5,
    name: "Nina Secret",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Artiste & Danseuse",
    trending: false,
    followers: 19700,
    revenue: "9 850",
    description: "Nina vous révèle ses secrets les mieux gardés à travers des performances artistiques uniques."
  },
  {
    id: 6,
    name: "Tom Intense",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Acteur & Modèle",
    trending: true,
    followers: 26800,
    revenue: "13 400",
    description: "Tom vous propose des scènes intenses et passionnées qui ne vous laisseront pas indifférent."
  }
];

const CreatorsPopular: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Créateurs Populaires">
          <div className="flex items-center gap-2 text-brand-accent mb-8">
            <Star className="h-5 w-5" />
            <p className="text-lg font-medium">Les plus suivis et appréciés de notre plateforme</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {popularCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default CreatorsPopular;
