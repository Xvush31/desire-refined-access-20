
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make sure React is globally available before anything else
window.React = React;

// Wait for DOMContentLoaded to ensure the DOM is fully available
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded, initializing React...");
  
  // Get the root element
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Failed to find the root element');
    return;
  }
  
  // Create root and render the app
  try {
    console.log("Creating React root...");
    const root = createRoot(rootElement);
    
    console.log("Rendering React app...");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app rendered successfully");
  } catch (error) {
    console.error("Error initializing React application:", error);
  }
});

