
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Wait for DOM content to be fully loaded
const rootElement = document.getElementById('root');

if (rootElement) {
  // Use a function that runs after React is defined
  const renderApp = () => {
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('Application mounted successfully');
  };

  // Use setTimeout to ensure React is fully loaded
  setTimeout(renderApp, 0);
} else {
  console.error('Root element not found');
}
