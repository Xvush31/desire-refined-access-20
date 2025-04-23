
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "fr" | "en";

interface LocaleContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

// Expanded translations for the entire site
const translations: Record<Lang, Record<string, string>> = {
  fr: {
    // Dashboard translations
    "dashboard.currency": "Devise d'affichage",
    "dashboard.withdraw": "Demander un retrait",
    "dashboard.withdraw_confirm": "Votre demande de retrait a été prise en compte.",
    "dashboard.revenue": "Revenus",
    "dashboard.select_currency": "Sélectionnez la devise",
    "dashboard.language": "Langue",
    "dashboard.withdraw_description": "Votre demande de retrait sera traitée sous 48h.",
    
    // Header translations
    "header.home": "Accueil",
    "header.trending": "Tendances",
    "header.categories": "Catégories",
    "header.performers": "Créateurs",
    "header.community": "Communauté",
    "header.favorites": "Favoris",
    "header.new": "Nouveau",
    "header.creator_dashboard": "Tableau de Bord Créateurs",
    "header.search": "Rechercher...",
    
    // Common UI translations
    "common.loading": "Chargement...",
    "common.error": "Une erreur est survenue",
    "common.view_all": "Voir tout",
    "common.explore": "Explorer",
    
    // Homepage translations
    "home.trending": "Tendances",
    "home.popular_videos": "Vidéos populaires",
    "home.explore_trends": "Explorer toutes les tendances",
    "home.categories": "Catégories Populaires",
    "home.recent": "Récemment Ajoutées",
    "home.creators": "Créateurs Populaires",
    "home.top_creators": "Nos meilleurs créateurs",
    "home.creators_desc": "Découvrez les créateurs les plus populaires sur notre plateforme et abonnez-vous pour ne rien manquer de leur contenu exclusif.",
    "home.view_creators": "Voir tous les créateurs",
    "home.videos": "vidéos",
    "home.subscribers": "abonnés",
    
    // Footer translations
    "footer.copyright": "© 2025 Visua. Tous droits réservés.",
    "footer.about": "À propos",
    "footer.terms": "Conditions",
    "footer.privacy": "Confidentialité",
    "footer.contact": "Contact",
    
    // Age verification
    "age.verification": "Vérification d'âge",
    "age.confirm": "Confirmer",
    "age.disclaimer": "Ce site contient du contenu pour adultes.",
    
    // Subscription
    "subscription.title": "Abonnements",
    "subscription.confirm": "Abonnement validé !",
    "subscription.thanks": "Merci pour votre paiement. Votre abonnement sera activé après confirmation par NOWPayments.",
    "subscription.support": "N'hésitez pas à contacter le support si vous ne voyez pas l'activation sous 15 minutes.",
    "subscription.back": "Retour à l'accueil"
  },
  en: {
    // Dashboard translations
    "dashboard.currency": "Display currency",
    "dashboard.withdraw": "Request withdrawal",
    "dashboard.withdraw_confirm": "Your withdrawal request has been registered.",
    "dashboard.revenue": "Revenue",
    "dashboard.select_currency": "Select currency",
    "dashboard.language": "Language",
    "dashboard.withdraw_description": "Your withdrawal request will be processed within 48 hours.",
    
    // Header translations
    "header.home": "Home",
    "header.trending": "Trending",
    "header.categories": "Categories",
    "header.performers": "Creators",
    "header.community": "Community",
    "header.favorites": "Favorites",
    "header.new": "New",
    "header.creator_dashboard": "Creator Dashboard",
    "header.search": "Search...",
    
    // Common UI translations
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.view_all": "View all",
    "common.explore": "Explore",
    
    // Homepage translations
    "home.trending": "Trending",
    "home.popular_videos": "Popular videos",
    "home.explore_trends": "Explore all trending",
    "home.categories": "Popular Categories",
    "home.recent": "Recently Added",
    "home.creators": "Popular Creators",
    "home.top_creators": "Our top creators",
    "home.creators_desc": "Discover the most popular creators on our platform and subscribe to stay updated with their exclusive content.",
    "home.view_creators": "View all creators",
    "home.videos": "videos",
    "home.subscribers": "subscribers",
    
    // Footer translations
    "footer.copyright": "© 2025 Visua. All rights reserved.",
    "footer.about": "About",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.contact": "Contact",
    
    // Age verification
    "age.verification": "Age Verification",
    "age.confirm": "Confirm",
    "age.disclaimer": "This site contains adult content.",
    
    // Subscription
    "subscription.title": "Subscriptions",
    "subscription.confirm": "Subscription confirmed!",
    "subscription.thanks": "Thank you for your payment. Your subscription will be activated after confirmation by NOWPayments.",
    "subscription.support": "Please contact support if you don't see the activation within 15 minutes.",
    "subscription.back": "Back to home"
  }
};

const LocaleContext = createContext<LocaleContextProps>({
  lang: "fr",
  setLang: () => {},
  t: (key) => key,
});

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");
  
  // Auto-detect user language on mount
  useEffect(() => {
    const detectBrowserLanguage = () => {
      const browserLang = navigator.language.split('-')[0];
      // Only support French and English for now
      if (browserLang === 'fr' || browserLang === 'en') {
        setLang(browserLang as Lang);
      }
      // Store detected language in local storage for persistence
      localStorage.setItem('preferredLanguage', browserLang === 'fr' || browserLang === 'en' ? browserLang : 'fr');
    };
    
    // Check if user has already set a language preference
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && (storedLang === 'fr' || storedLang === 'en')) {
      setLang(storedLang as Lang);
    } else {
      detectBrowserLanguage();
    }
  }, []);
  
  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', lang);
  }, [lang]);
  
  const t = (key: string) => translations[lang][key] || key;
  
  return (
    <LocaleContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
