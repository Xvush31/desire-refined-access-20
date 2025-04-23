
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Wait for DOM to be fully loaded before initializing React
document.addEventListener('DOMContentLoaded', () => {
  // Get the root element
  const container = document.getElementById('root');

  // Ensure the root element exists
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
});
