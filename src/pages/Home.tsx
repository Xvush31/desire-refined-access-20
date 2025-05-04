import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="hero py-12 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bienvenue sur XVush</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez un contenu exclusif des meilleurs créateurs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
                <Link to="/signup">S'inscrire Gratuitement</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Se Connecter</Link>
              </Button>
              
              {/* Nouvelle section pour le showcase immersif */}
              <Button 
                asChild 
                variant="ghost" 
                size="lg" 
                className="flex items-center gap-2 group"
              >
                <Link to="/immersive">
                  <Sparkles className="h-4 w-4 text-pink-400 group-hover:animate-pulse" />
                  <span>Découvrir l'Expérience Immersive</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        
        
        {/* Add a new section promoting the immersive experience */}
        <section className="py-12 my-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/immersive/1280/720')] bg-cover opacity-20 mix-blend-overlay"></div>
          <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Expérience Immersive Révolutionnée</h2>
              <p className="text-muted-foreground mb-6">
                Notre nouvelle technologie d'IA adaptative transforme votre façon de consommer du contenu en s'adaptant à vos émotions et préférences.
              </p>
              <Button asChild variant="default" className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
                <Link to="/immersive">Explorer Maintenant</Link>
              </Button>
            </div>
            <div className="md:w-1/2 max-w-md">
              <div className="aspect-video rounded-xl overflow-hidden border-2 border-white/20 shadow-xl shadow-pink-500/10">
                <img 
                  src="https://picsum.photos/seed/xvushimmersive/800/450" 
                  alt="Expérience immersive XVush" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        
        
      </main>
    </div>
  );
};

export default Home;
