import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold">Accès Refusé</h1>
        <p className="text-muted-foreground">
          Désolé, vous devez être un créateur pour accéder au tableau de bord
          des créateurs.
        </p>
        <Link to="/" className="text-brand-accent hover:underline">
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
