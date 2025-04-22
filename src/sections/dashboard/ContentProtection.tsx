
import React, { useEffect, useState } from 'react';
import { Shield, ShieldCheck, Lock } from "lucide-react";
import { toast } from "sonner";

const ContentProtection: React.FC = () => {
  const [watermarkVisible, setWatermarkVisible] = useState(false);
  
  // Génération d'un identifiant unique pour le filigrane
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  };

  useEffect(() => {
    // Détection des captures d'écran (événement non standard, mais ajouté pour la simulation)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Simuler une détection de capture d'écran
        setTimeout(() => {
          if (document.visibilityState === 'hidden') {
            showWatermark();
            toast.error("Capture d'écran détectée", {
              description: "Votre contenu est protégé contre la copie non autorisée"
            });
          }
        }, 300);
      }
    };

    // Événement de pression de touches pour la détection des raccourcis de capture d'écran
    const handleKeyDown = (e: KeyboardEvent) => {
      // Détection de Print Screen ou autres raccourcis de capture d'écran
      if (
        (e.key === 'PrintScreen') || 
        (e.ctrlKey && e.key === 'c') ||
        (e.metaKey && e.key === 'c') ||
        (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) ||
        (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'I'))
      ) {
        showWatermark();
        toast.error("Action de copie détectée", {
          description: "Votre contenu est protégé contre la copie non autorisée"
        });
        e.preventDefault();
      }
    };

    // Fonction pour ajouter un filigrane invisible sur toutes les images
    const addInvisibleWatermark = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.getAttribute('data-watermarked')) {
          img.setAttribute('data-watermarked', 'true');
          img.setAttribute('data-watermark-id', generateUniqueId());
          img.style.position = 'relative';
        }
      });
    };

    // Fonction pour rendre le filigrane visible
    const showWatermark = () => {
      setWatermarkVisible(true);
      
      // Rendre le filigrane visible pendant 3 secondes
      setTimeout(() => {
        setWatermarkVisible(false);
      }, 3000);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    
    // Ajouter des filigranes invisibles périodiquement
    const interval = setInterval(addInvisibleWatermark, 5000);
    
    // Message initial
    toast.success("Protection de contenu active", {
      description: "Votre tableau de bord est protégé contre la copie non autorisée"
    });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Indicateur de protection */}
      <div className="fixed bottom-4 right-4 bg-black/70 rounded-full p-2 flex items-center space-x-2 text-xs z-50 micro-animation-pop">
        <ShieldCheck className="h-4 w-4 text-brand-red" />
        <span className="text-white">Protection Active</span>
      </div>
      
      {/* Filigrane visible lors d'une détection */}
      {watermarkVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center animate-fade-in">
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-12">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center opacity-20">
                <div className="transform -rotate-30 text-brand-red flex flex-col items-center">
                  <Lock className="h-8 w-8" />
                  <span className="text-lg font-bold">CONTENU PROTÉGÉ</span>
                  <span className="text-xs">ID: {generateUniqueId()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentProtection;
