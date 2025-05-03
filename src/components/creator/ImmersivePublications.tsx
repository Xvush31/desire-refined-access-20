
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// Simple implementation to replace the CreaVerse components
const ImmersivePublications: React.FC = () => {
  const [isImmersiveActive, setIsImmersiveActive] = useState(false);

  const toggleImmersive = () => {
    setIsImmersiveActive(prev => !prev);
  };

  if (isImmersiveActive) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/70 to-transparent">
            <h3 className="text-white text-lg font-bold">Mode Immersif</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20" 
              onClick={toggleImmersive}
            >
              <X size={24} />
            </Button>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h2 className="text-2xl font-bold mb-4">Contenu Immersif</h2>
              <p className="text-lg mb-6">
                Cette fonctionnalité remplace l'interface CreaVerse précédente.
              </p>
              <Button onClick={toggleImmersive} variant="outline" className="bg-white/10 hover:bg-white/20">
                Quitter le mode immersif
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <span className="text-2xl font-semibold text-muted-foreground">Thumbnail</span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-1">Publication #1</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Découvrez cette publication en mode immersif.
          </p>
          <Button onClick={toggleImmersive}>Mode Immersif</Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <span className="text-2xl font-semibold text-muted-foreground">Thumbnail</span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-1">Publication #2</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Une autre publication immersive disponible.
          </p>
          <Button onClick={toggleImmersive}>Mode Immersif</Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <span className="text-2xl font-semibold text-muted-foreground">Thumbnail</span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-1">Publication #3</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Explorez cette publication unique.
          </p>
          <Button onClick={toggleImmersive}>Mode Immersif</Button>
        </div>
      </div>
    </div>
  );
};

export default ImmersivePublications;
