
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Don't expose React globally as this can cause issues
// Instead, make sure React is properly imported where needed

console.log("React version:", React.version);
console.log("ReactDOM version:", ReactDOM.version);

// Initialize React only after DOM is fully loaded
function initializeReact() {
  console.log("Initializing React application...");
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Failed to find the root element');
    return;
  }
  
  try {
    console.log("Creating React root...");
    const root = ReactDOM.createRoot(rootElement);
    
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
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeReact);
} else {
  // DOM already loaded, initialize immediately
  initializeReact();
}
