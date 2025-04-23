
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('Application mounted successfully');
  } else {
    console.error('Root element not found');
  }
});
