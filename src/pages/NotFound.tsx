
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          Oops! La page que vous cherchez semble avoir disparu.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-pink-600 hover:bg-pink-700">
            <Link to="/">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Vous cherchez peut-être...
          </p>
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            <Button variant="link" asChild>
              <Link to="/creator">Profil Créateur</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/subscribers">Abonnés</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/calendar">Calendrier</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
