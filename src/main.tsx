
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialisation de console debugging
console.log("React version:", React.version);
// Remove the ReactDOM.version reference as it's not available in the type definition

// Initialiser React uniquement après que le DOM est complètement chargé
function initializeReact() {
  console.log("Initialisation de l'application React...");
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Élément root non trouvé');
    return;
  }
  
  try {
    console.log("Création de la racine React...");
    const root = ReactDOM.createRoot(rootElement);
    
    console.log("Rendu de l'application React...");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Application React rendue avec succès");
  } catch (error) {
    console.error("Erreur lors de l'initialisation de l'application React:", error);
  }
}

// Vérifier si le DOM est déjà chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeReact);
} else {
  // DOM déjà chargé, initialisation immédiate
  initializeReact();
}
