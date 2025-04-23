
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make sure React is initialized before anything else
window.React = React;

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Create root outside of render to ensure proper initialization
const root = createRoot(rootElement);

// Wrap in a small timeout to ensure all initialization is complete
setTimeout(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}, 0);
