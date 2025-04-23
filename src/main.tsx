
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("Initialisation de l'application...");

// Fonction pour initialiser React
function initializeReact() {
  console.log("DOM chargé, initialisation de React");
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Élément root non trouvé dans le DOM');
    return;
  }
  
  try {
    console.log("Création de la racine React");
    const root = createRoot(rootElement);
    
    console.log("Rendu de l'application React");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Application React rendue avec succès");
  } catch (error) {
    console.error("Erreur lors de l'initialisation de React:", error);
  }
}

// Vérifier si le DOM est déjà chargé et initialiser React
if (document.readyState === 'loading') {
  console.log("Document en cours de chargement, attente de DOMContentLoaded");
  document.addEventListener('DOMContentLoaded', initializeReact);
} else {
  console.log("Document déjà chargé, initialisation immédiate");
  initializeReact();
}
