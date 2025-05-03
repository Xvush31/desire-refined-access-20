
import { PerformerData } from "../../types/performer";
import { mockPerformers } from "../mocks/mockPerformers";

// Fonction pour récupérer les données d'un performeur
export const fetchPerformerData = (performerId: string): Promise<PerformerData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const performer = mockPerformers[performerId];
      if (performer) {
        resolve(performer);
      } else {
        reject(new Error("Performer not found"));
      }
    }, 800); // Simule un délai réseau
  });
};

// Fonction pour récupérer tous les performeurs
export const fetchAllPerformers = (): Promise<PerformerData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.values(mockPerformers));
    }, 1000); // Simule un délai réseau
  });
};
