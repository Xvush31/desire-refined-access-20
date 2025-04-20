
/**
 * Service de Navigation Fantôme (Ghost Mode)
 * Permet une navigation sans traces sur l'appareil de l'utilisateur
 */

// Stockage temporaire en mémoire (sera perdu à la fermeture du navigateur)
const tempStorage = new Map<string, any>();

// API pour gérer le stockage temporaire
export const ghostMode = {
  // Vérifie si le mode fantôme est activé
  isEnabled: (): boolean => {
    return localStorage.getItem('ghost-mode-enabled') === 'true';
  },
  
  // Active le mode fantôme
  enable: (): void => {
    localStorage.setItem('ghost-mode-enabled', 'true');
    
    // Sauvegarde les données importantes dans le stockage temporaire
    ghostMode.backup();
    
    // Nettoie les traces existantes
    ghostMode.clearTraces();
  },
  
  // Désactive le mode fantôme
  disable: (): void => {
    localStorage.setItem('ghost-mode-enabled', 'false');
    
    // Restaure les données importantes depuis le stockage temporaire
    ghostMode.restore();
  },
  
  // Sauvegarde des données importantes
  backup: (): void => {
    // Données à conserver (comme l'authentification)
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      tempStorage.set('auth-token', authToken);
    }
    
    // Autres données importantes à sauvegarder
    const ageVerified = localStorage.getItem('age-verified');
    if (ageVerified) {
      tempStorage.set('age-verified', ageVerified);
    }
  },
  
  // Restaure les données importantes
  restore: (): void => {
    // Restaure chaque élément du stockage temporaire
    tempStorage.forEach((value, key) => {
      localStorage.setItem(key, value);
    });
  },
  
  // Nettoie toutes les traces
  clearTraces: (): void => {
    // Supprime l'historique de navigation local
    ghostMode.clearHistory();
    
    // Supprime les cookies non essentiels
    ghostMode.clearCookies();
    
    // Supprime le localStorage sauf les éléments essentiels
    ghostMode.clearStorage();
  },
  
  // Permet de stocker des données même en mode fantôme
  set: (key: string, value: any): void => {
    if (ghostMode.isEnabled()) {
      tempStorage.set(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  
  // Récupère des données même en mode fantôme
  get: (key: string): any => {
    if (ghostMode.isEnabled()) {
      return tempStorage.get(key);
    } else {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  },
  
  // Efface l'historique de navigation
  clearHistory: (): void => {
    // L'API History ne permet pas d'effacer l'historique
    // Cette fonction sert principalement à documenter l'intention
    console.log("L'historique de navigation serait effacé ici");
    
    // En pratique, on pourrait utiliser window.history.replaceState
    // pour modifier l'historique récent
  },
  
  // Supprime les cookies non essentiels
  clearCookies: (): void => {
    const essentialCookies = ['supabase-auth'];
    
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.trim().split('=');
      if (!essentialCookies.includes(name)) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  },
  
  // Supprime le localStorage sauf les éléments essentiels
  clearStorage: (): void => {
    const essentialItems = ['ghost-mode-enabled'];
    
    // Sauvegarde les éléments essentiels
    const savedItems = new Map<string, string>();
    essentialItems.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) savedItems.set(key, value);
    });
    
    // Efface tout le localStorage
    localStorage.clear();
    
    // Restaure les éléments essentiels
    savedItems.forEach((value, key) => {
      localStorage.setItem(key, value);
    });
  }
};

export default ghostMode;
