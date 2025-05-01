
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import CreatorCard from "@/components/CreatorCard";

// Données mockées pour les créateurs
const creators = [
  {
    id: 1,
    name: "Sophie Deluxe",
    username: "@sophiedeluxe",
    avatar: "https://picsum.photos/seed/creator1/200",
    coverImage: "https://picsum.photos/seed/creator1bg/800/400",
    subscriberCount: "124K",
    contentCount: 347,
    tier: "platinum" as const,
    isOnline: true,
    category: "Lifestyle",
    followers: 124000,
    revenue: "17.8K",
    trending: true,
    description: "Créatrice de contenu lifestyle et mode. Partage son quotidien entre Paris et Milan."
  },
  {
    id: 2,
    name: "Léa Passion",
    username: "@leapassion",
    avatar: "https://picsum.photos/seed/creator2/200",
    coverImage: "https://picsum.photos/seed/creator2bg/800/400",
    subscriberCount: "94K",
    contentCount: 218,
    tier: "gold" as const,
    isOnline: false,
    category: "Fitness",
    followers: 94000,
    revenue: "12.5K",
    trending: false,
    description: "Coach fitness et nutrition. Spécialiste en remise en forme et bien-être."
  },
  {
    id: 3,
    name: "Marc Intense",
    username: "@marcintense",
    avatar: "https://picsum.photos/seed/creator3/200",
    coverImage: "https://picsum.photos/seed/creator3bg/800/400",
    subscriberCount: "56K",
    contentCount: 192,
    tier: "silver" as const,
    isOnline: true,
    category: "Sport",
    followers: 56000,
    revenue: "8.3K",
    trending: false,
    description: "Athlète professionnel partageant ses entraînements et compétitions internationales."
  },
  {
    id: 4,
    name: "Julie Étoile",
    username: "@julieetoile",
    avatar: "https://picsum.photos/seed/creator4/200",
    coverImage: "https://picsum.photos/seed/creator4bg/800/400",
    subscriberCount: "210K",
    contentCount: 415,
    tier: "diamond" as const,
    isOnline: false,
    category: "Arts",
    followers: 210000,
    revenue: "26.4K",
    trending: true,
    description: "Artiste visuelle et photographe. Exposition de ses œuvres et techniques artistiques."
  },
  {
    id: 5,
    name: "Thomas Créatif",
    username: "@thomascreatif",
    avatar: "https://picsum.photos/seed/creator5/200",
    coverImage: "https://picsum.photos/seed/creator5bg/800/400",
    subscriberCount: "78K",
    contentCount: 246,
    tier: "bronze" as const,
    isOnline: true,
    category: "Tech",
    followers: 78000,
    revenue: "9.1K",
    trending: false,
    description: "Expert en nouvelles technologies. Découvrez les dernières innovations technologiques."
  }
];

const Creators: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Créateurs populaires</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map(creator => (
            <Card key={creator.id} className="overflow-hidden border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-0">
                <CreatorCard creator={creator} />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Creators;
