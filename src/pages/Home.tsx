import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UpgradeNeuroIcon } from "@/icons";
import ImmersivePublications from "@/components/creator/ImmersivePublications";

const Home = () => {
  return (
    <section className="container mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Bienvenue sur XVush</h1>
      <p className="text-lg text-gray-600 mb-8">
        Découvrez et partagez du contenu incroyable.
      </p>
      <div className="space-x-4">
        <Button asChild variant="primary">
          <Link to="/explore">Explorer</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/upload">Partager</Link>
        </Button>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Publications Immersives</h2>
        <p className="text-gray-500 mb-6">
          Découvrez le contenu de vos créateurs favoris en mode immersif.
        </p>
        <ImmersivePublications />
      </div>
    </section>
  );
};

export default Home;
