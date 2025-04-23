
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("Application initialization starting");

// Simple function to initialize React
function initReact() {
  try {
    console.log("Finding root element");
    const container = document.getElementById('root');
    
    if (!container) {
      console.error('Root element not found in DOM');
      return;
    }
    
    console.log("Creating React root");
    const root = createRoot(container);
    
    console.log("Rendering React application");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React application successfully rendered");
  } catch (error) {
    console.error("Error initializing React:", error);
  }
}

// Wait for DOM to be ready before initializing React
if (document.readyState === 'loading') {
  console.log("Document still loading, waiting for DOMContentLoaded");
  document.addEventListener('DOMContentLoaded', initReact);
} else {
  console.log("Document already loaded, initializing React immediately");
  initReact();
}
