
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useIsMobile } from './use-mobile';

export type SequenceAction = {
  id: string;
  type: 'message' | 'notification' | 'suggestion';
  content: string;
  targetSegment: 'super-fan' | 'vip' | 'elite';
  triggerCondition?: string;
  delay?: number;
};

export const useEngagementSequences = () => {
  const [activeSequences, setActiveSequences] = useState<SequenceAction[]>([]);
  const isMobile = useIsMobile();

  const sequences: SequenceAction[] = [
    {
      id: 'super-fan-welcome',
      type: 'message',
      content: "🌟 Félicitations pour votre statut de Super-fan ! Découvrez votre contenu exclusif...",
      targetSegment: 'super-fan',
      delay: 0
    },
    {
      id: 'vip-upgrade',
      type: 'suggestion',
      content: "📈 Passez au niveau Elite pour débloquer encore plus d'avantages exclusifs !",
      targetSegment: 'vip',
      triggerCondition: 'high-engagement',
      delay: isMobile ? 4000 : 2000 // Délai plus long sur mobile pour ne pas submerger l'utilisateur
    },
    {
      id: 'elite-thanks',
      type: 'notification',
      content: "👑 Merci de votre fidélité ! Un nouveau contenu exclusif vous attend...",
      targetSegment: 'elite',
      delay: isMobile ? 2000 : 1000
    }
  ];

  const triggerSequence = (sequence: SequenceAction) => {
    if (sequence.delay) {
      setTimeout(() => {
        toast.success(`Nouvelle interaction : ${sequence.type}`, {
          description: sequence.content,
          // Sur mobile, les toasts restent plus longtemps
          duration: isMobile ? 5000 : 3000,
        });
      }, sequence.delay);
    }
    setActiveSequences(prev => [...prev, sequence]);
  };

  useEffect(() => {
    // Attendre un peu plus sur mobile avant de déclencher les séquences
    const initialDelay = isMobile ? 1000 : 0;
    
    const timer = setTimeout(() => {
      sequences.forEach(sequence => {
        if (!sequence.triggerCondition) {
          triggerSequence(sequence);
        }
      });
    }, initialDelay);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  return {
    activeSequences,
    triggerSequence,
  };
};
