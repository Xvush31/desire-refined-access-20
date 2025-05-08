
import React, { useEffect, useRef, useState } from 'react';
import { Shield, Eye, EyeOff, Lock } from 'lucide-react';
import { toast } from 'sonner';
import contentProtection, { ContentProtectionOptions } from '@/services/contentProtection';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface TripleShieldProps {
  contentId: string | number;
  creatorId: string | number;
  children: React.ReactNode;
  options?: Partial<ContentProtectionOptions>;
  showControls?: boolean;
}

/**
 * Composant Triple Shield™ pour la protection du contenu
 * Enveloppe le contenu avec trois niveaux de protection:
 * 1. Filigranes dynamiques invisibles
 * 2. Détection de captures d'écran
 * 3. Contrôle d'accès avancé
 */
const TripleShield: React.FC<TripleShieldProps> = ({
  contentId,
  creatorId,
  children,
  options,
  showControls = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  const [protectionVisible, setProtectionVisible] = useState<boolean>(false);
  const [protectionActive, setProtectionActive] = useState<boolean>(true);
  
  // Initialiser la protection au montage du composant
  useEffect(() => {
    if (!containerRef.current) return;
    
    contentProtection.initialize(
      contentId.toString(),
      creatorId.toString(),
      currentUser?.uid
    );
    
    if (options) {
      // Réinitialiser avec les options personnalisées
      contentProtection.destroy();
      contentProtection.initialize(
        contentId.toString(),
        creatorId.toString(),
        currentUser?.uid
      );
    }
    
    // Appliquer le filigrane au conteneur
    if (protectionActive) {
      contentProtection.applyWatermark(containerRef.current);
    }
    
    return () => {
      contentProtection.destroy();
    };
  }, [contentId, creatorId, currentUser, options, protectionActive]);
  
  // Fonction pour basculer la visibilité de la protection
  const toggleVisibility = () => {
    setProtectionVisible(!protectionVisible);
    
    if (!protectionVisible) {
      toast.info('Protection visible', {
        description: 'Le filigrane est maintenant visible pour démonstration'
      });
    }
  };
  
  // Fonction pour activer/désactiver la protection
  const toggleProtection = () => {
    setProtectionActive(!protectionActive);
    
    if (protectionActive) {
      contentProtection.destroy();
      toast.warning('Protection désactivée', {
        description: 'Le contenu n\'est plus protégé contre les copies'
      });
    } else {
      if (containerRef.current) {
        contentProtection.initialize(
          contentId.toString(),
          creatorId.toString(),
          currentUser?.uid
        );
        contentProtection.applyWatermark(containerRef.current);
        
        toast.success('Protection activée', {
          description: 'Le contenu est maintenant protégé par Triple Shield™'
        });
      }
    }
  };
  
  return (
    <div className="triple-shield-container relative">
      <div
        ref={containerRef}
        className={`triple-shield-content ${protectionVisible ? 'protection-demo' : ''}`}
      >
        {children}
      </div>
      
      {/* Badge de protection */}
      <div className="absolute bottom-2 right-2 bg-black/70 rounded-full p-1.5 flex items-center space-x-1 text-xs z-50">
        <Shield className="h-3 w-3 text-brand-red" />
        <span className="text-white text-xs">Triple Shield™</span>
      </div>
      
      {/* Contrôles de protection (si activés) */}
      {showControls && (
        <div className="absolute top-2 right-2 flex space-x-2 z-50">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/40 hover:bg-black/60 text-white"
            onClick={toggleVisibility}
            title={protectionVisible ? "Masquer la protection" : "Afficher la protection"}
          >
            {protectionVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${protectionActive ? 'bg-green-500/40 hover:bg-green-500/60' : 'bg-red-500/40 hover:bg-red-500/60'} text-white`}
            onClick={toggleProtection}
            title={protectionActive ? "Désactiver la protection" : "Activer la protection"}
          >
            <Lock size={16} />
          </Button>
        </div>
      )}
      
      {/* Styles CSS spécifiques au composant - Fixed removing the jsx property */}
      <style>
        {`
          .protection-demo {
            position: relative;
          }
          .protection-demo::after {
            content: 'XDose Protected | ${currentUser?.uid?.substring(0,6) || '------'} | ${new Date().toISOString().split('T')[0]}';
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
            opacity: 0.7;
            transform: rotate(-30deg);
            pointer-events: none;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
            z-index: 10;
          }
        `}
      </style>
    </div>
  );
};

export default TripleShield;
