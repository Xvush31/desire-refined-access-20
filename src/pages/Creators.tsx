
import React from "react";
import CreatorCard, { CreatorData } from "@/components/CreatorCard";

const creators: CreatorData[] = [
  {
    id: 1,
    name: "Lola Mystik",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Performeuse & Danse",
    followers: 23800,
    revenue: "12 930",
    trending: true,
    description: "Artiste passionnée et créative, Lola partage ses chorégraphies exclusives et moments privés avec ses abonnés."
  },
  {
    id: 2,
    name: "Lucas Zen",
    avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Modèle masculin",
    followers: 15000,
    revenue: "8 400",
    trending: false,
    description: "Lucas propose des séances exclusives axées sur la confiance en soi, l’humour et la détente."
  },
  {
    id: 3,
    name: "Clara Sparkle",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Cosplay & Live",
    followers: 31240,
    revenue: "17 230",
    trending: true,
    description: "Clara magnifie les univers de la pop culture avec des lives immersifs et des costumes spectaculaires."
  },
  {
    id: 4,
    name: "Yann Solo",
    avatar: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=256&h=256&q=80",
    category: "Humoriste",
    followers: 5480,
    revenue: "3 120",
    trending: false,
    description: "Gags, sketches et vidéos à la demande. Yann anime ses abonnés grâce à sa créativité."
  },
];

const Creators: React.FC = () => {
  return (
    <main className="py-12 min-h-screen bg-background">
      <section className="container mx-auto max-w-6xl px-4 text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 animated-gradient">Découvrez nos créateurs</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">Une communauté de créateurs passionnés, authentiques et talentueux. Parcourez, découvrez et abonnez-vous à leurs contenus exclusifs.</p>
      </section>

      <section className="container mx-auto max-w-6xl px-4 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>
    </main>
  );
};
export default Creators;
