
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make sure React is fully loaded before we try to use it
// Wait until the document is fully loaded before mounting React
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

function initializeApp() {
  try {
    const container = document.getElementById('root');
    
    if (!container) {
      console.error('Root element not found in DOM');
      return;
    }
    
    // Create a root
    const root = createRoot(container);
    
    // Render the app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('React application mounted successfully');
  } catch (error) {
    console.error('Error mounting React application:', error);
  }
}
