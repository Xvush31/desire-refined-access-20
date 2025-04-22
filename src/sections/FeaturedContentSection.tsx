
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedContentSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          <span>Contenu </span>
          <span className="text-brand-red">F</span>
          eatured
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Exemple de carte de contenu */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src="https://picsum.photos/seed/featured1/400/300" 
              alt="Contenu featured" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Titre du contenu</h3>
              <p className="text-sm mb-4">Description courte du contenu.</p>
              <Link 
                to="/details" 
                className="text-brand-red hover:underline"
              >
                Voir plus
              </Link>
            </div>
          </div>
          {/* Répéter pour d'autres cartes si nécessaire */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContentSection;
