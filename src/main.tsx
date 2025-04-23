
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Get the root element
    const container = document.getElementById('root');
    
    // Ensure the root element exists
    if (!container) {
      console.error('Root element not found in DOM');
      return;
    }
    
    // Create a root with explicit type annotation
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
});
