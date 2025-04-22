
import { useState, useEffect } from 'react';
import { toast } from "sonner";

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
      delay: 2000
    },
    {
      id: 'elite-thanks',
      type: 'notification',
      content: "👑 Merci de votre fidélité ! Un nouveau contenu exclusif vous attend...",
      targetSegment: 'elite',
      delay: 1000
    }
  ];

  const triggerSequence = (sequence: SequenceAction) => {
    if (sequence.delay) {
      setTimeout(() => {
        toast.success(`Nouvelle interaction : ${sequence.type}`, {
          description: sequence.content,
        });
      }, sequence.delay);
    }
    setActiveSequences(prev => [...prev, sequence]);
  };

  useEffect(() => {
    sequences.forEach(sequence => {
      if (!sequence.triggerCondition) {
        triggerSequence(sequence);
      }
    });
  }, []);

  return {
    activeSequences,
    triggerSequence,
  };
};
