
import { useState, useEffect } from "react";

type CreatorStatus = "online" | "offline" | "streaming" | "creating" | "responding" | "away";

interface UseCreatorActivityOptions {
  initialStatus?: CreatorStatus;
  activityMessages?: Record<CreatorStatus, string[]>;
  updateInterval?: number;
  simulateStatusChanges?: boolean;
}

interface UseCreatorActivityReturn {
  status: CreatorStatus;
  activityMessage: string | undefined;
  isActive: boolean;
  lastActive: string | undefined;
}

/**
 * Hook personnalisé pour gérer l'activité d'un créateur
 */
export const useCreatorActivity = (
  creatorId: string | number,
  options: UseCreatorActivityOptions = {}
): UseCreatorActivityReturn => {
  const {
    initialStatus = "offline",
    activityMessages = {
      online: ["En ligne", "Disponible"],
      offline: [],
      streaming: ["En live maintenant", "Diffusion en direct", "Live exclusif"],
      creating: ["Création de contenu", "Préparation nouvelle collection", "Shooting en cours"],
      responding: ["Répond aux messages", "Discussion avec les fans"],
      away: ["Absent momentanément"]
    },
    updateInterval = 30000, // 30 secondes par défaut
    simulateStatusChanges = false
  } = options;

  const [status, setStatus] = useState<CreatorStatus>(initialStatus);
  const [activityMessage, setActivityMessage] = useState<string | undefined>();
  const [lastActive, setLastActive] = useState<string | undefined>();
  
  // Simuler des changements d'activité au fil du temps (pour démonstration)
  useEffect(() => {
    // Dans une application réelle, nous récupérerions ces informations depuis une API
    const fetchCreatorActivity = () => {
      // Simulation d'un appel API pour l'exemple
      console.log(`Fetching activity status for creator ${creatorId}`);
      
      if (simulateStatusChanges) {
        // Simuler des changements aléatoires pour la démo
        const statuses: CreatorStatus[] = ["online", "streaming", "creating", "responding", "away", "offline"];
        const randomStatus = statuses[Math.floor(Math.random() * (statuses.length - 1))]; // Éviter "offline" pour la démo
        setStatus(randomStatus);
        
        // Sélectionner un message d'activité aléatoire pour ce statut
        if (activityMessages[randomStatus]?.length) {
          const messages = activityMessages[randomStatus];
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          setActivityMessage(randomMessage);
        } else {
          setActivityMessage(undefined);
        }
      }
    };
    
    // Récupérer l'activité immédiatement
    fetchCreatorActivity();
    
    // Mettre à jour périodiquement
    const interval = setInterval(fetchCreatorActivity, updateInterval);
    
    // Nettoyer à la destruction du composant
    return () => clearInterval(interval);
  }, [creatorId, updateInterval, simulateStatusChanges, activityMessages]);
  
  // Mise à jour de lastActive (dans une application réelle, cela viendrait d'une API)
  useEffect(() => {
    if (status === "offline") {
      // Fournir un temps relatif depuis la dernière connexion
      const times = ["il y a 5 min", "il y a 30 min", "il y a 2h", "aujourd'hui", "hier"];
      setLastActive(times[Math.floor(Math.random() * times.length)]);
    } else {
      setLastActive(undefined);
    }
  }, [status]);
  
  return {
    status,
    activityMessage,
    isActive: status !== "offline" && status !== "away",
    lastActive
  };
};

export default useCreatorActivity;
