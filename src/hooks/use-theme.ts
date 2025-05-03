
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialiser le thème à partir du document au montage du composant
    const rootEl = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Déterminer le thème initial
    let currentTheme: 'light' | 'dark';
    if (storedTheme === 'dark' || (storedTheme === null && systemPrefersDark)) {
      currentTheme = 'dark';
    } else {
      currentTheme = 'light';
    }
    
    // Mettre à jour l'attribut HTML si nécessaire
    if (rootEl.getAttribute('data-theme') !== currentTheme) {
      rootEl.setAttribute('data-theme', currentTheme);
    }
    
    // Mettre à jour l'état local
    setTheme(currentTheme);

    // Observer les changements d'attribut sur l'élément racine
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = rootEl.getAttribute('data-theme') as 'light' | 'dark' || 'light';
          setTheme(newTheme);
          localStorage.setItem('theme', newTheme);
        }
      });
    });

    observer.observe(rootEl, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Fonction pour changer de thème
  const setThemeValue = (newTheme: 'light' | 'dark') => {
    const rootEl = document.documentElement;
    rootEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, setTheme: setThemeValue };
}
