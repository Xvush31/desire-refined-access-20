
/**
 * Service de géo-segmentation dynamique (Regulatory Firewall)
 * Adapte automatiquement le contenu et les fonctionnalités aux réglementations locales
 */

// Types pour les différentes réglementations
export interface RegionRegulations {
  minAge: number;
  requiresExplicitConsent: boolean;
  forbiddenCategories: string[];
  dataRetentionDays: number;
  cookieNoticeRequired: boolean;
  requiresContentLabeling: boolean;
  allowsExplicitContent: boolean;
}

// Base de données de réglementations par région
const regulationsByRegion: Record<string, RegionRegulations> = {
  'EU': {
    minAge: 18,
    requiresExplicitConsent: true,
    forbiddenCategories: ['extremeExplicit', 'violence'],
    dataRetentionDays: 30,
    cookieNoticeRequired: true,
    requiresContentLabeling: true,
    allowsExplicitContent: true
  },
  'US': {
    minAge: 18,
    requiresExplicitConsent: true,
    forbiddenCategories: ['illegal'],
    dataRetentionDays: 90,
    cookieNoticeRequired: true,
    requiresContentLabeling: true,
    allowsExplicitContent: true
  },
  'UK': {
    minAge: 18,
    requiresExplicitConsent: true,
    forbiddenCategories: ['extremeExplicit'],
    dataRetentionDays: 30,
    cookieNoticeRequired: true,
    requiresContentLabeling: true,
    allowsExplicitContent: false
  },
  'DEFAULT': {
    minAge: 21,
    requiresExplicitConsent: true,
    forbiddenCategories: ['extremeExplicit', 'violence'],
    dataRetentionDays: 15,
    cookieNoticeRequired: true,
    requiresContentLabeling: true,
    allowsExplicitContent: false
  }
};

// Service de géo-segmentation
export const regulatoryFirewall = {
  // Région actuelle de l'utilisateur (détectée automatiquement)
  currentRegion: 'DEFAULT',
  
  // Initialise le service de géo-segmentation
  init: async (): Promise<void> => {
    try {
      // Dans une vraie implémentation, nous ferions une requête API
      // pour déterminer la région de l'utilisateur en fonction de son IP
      // Pour l'exemple, utilisons une API de géolocalisation
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      // Obtient le code de pays
      const countryCode = data.country_code;
      
      // Mappe les codes de pays aux régions réglementaires
      if (countryCode && typeof countryCode === 'string') {
        if (['FR', 'DE', 'IT', 'ES', 'PT'].includes(countryCode)) {
          regulatoryFirewall.currentRegion = 'EU';
        } else if (['US'].includes(countryCode)) {
          regulatoryFirewall.currentRegion = 'US';
        } else if (['GB'].includes(countryCode)) {
          regulatoryFirewall.currentRegion = 'UK';
        } else {
          regulatoryFirewall.currentRegion = 'DEFAULT';
        }
      }
    } catch (error) {
      console.error("Erreur lors de la détection de région:", error);
      // En cas d'erreur, utiliser les paramètres par défaut
      regulatoryFirewall.currentRegion = 'DEFAULT';
    }
  },
  
  // Obtenir les réglementations pour la région actuelle
  getRegulations: (): RegionRegulations => {
    return regulationsByRegion[regulatoryFirewall.currentRegion] || regulationsByRegion['DEFAULT'];
  },
  
  // Vérifie si une catégorie de contenu est autorisée dans la région actuelle
  isContentAllowed: (category: string): boolean => {
    const regulations = regulatoryFirewall.getRegulations();
    return !regulations.forbiddenCategories.includes(category);
  },
  
  // Vérifie si le contenu explicite est autorisé
  isExplicitContentAllowed: (): boolean => {
    return regulatoryFirewall.getRegulations().allowsExplicitContent;
  },
  
  // Obtient l'âge minimum requis pour la région
  getMinimumAge: (): number => {
    return regulatoryFirewall.getRegulations().minAge;
  },
  
  // Vérifie si un consentement explicite est nécessaire
  requiresExplicitConsent: (): boolean => {
    return regulatoryFirewall.getRegulations().requiresExplicitConsent;
  },
  
  // Vérifie si l'avis de cookies est requis
  requiresCookieNotice: (): boolean => {
    return regulatoryFirewall.getRegulations().cookieNoticeRequired;
  },
  
  // Filtrer un tableau de contenu selon les réglementations locales
  filterContent: (content: any[]): any[] => {
    const regulations = regulatoryFirewall.getRegulations();
    
    return content.filter(item => {
      // Vérifie si la catégorie du contenu est autorisée
      if (item.category && regulations.forbiddenCategories.includes(item.category)) {
        return false;
      }
      
      // Vérifie si le contenu explicite est autorisé
      if (item.isExplicit && !regulations.allowsExplicitContent) {
        return false;
      }
      
      return true;
    });
  }
};

export default regulatoryFirewall;
