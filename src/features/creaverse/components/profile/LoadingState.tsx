
import React from 'react';
import { useTheme } from '@/hooks/use-theme';

const LoadingState: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'light' ? 'bg-gray-50' : 'bg-black/90'}`}>
      <div className="w-16 h-16 border-4 border-t-brand-red rounded-full animate-spin"></div>
      <h2 className="text-xl font-medium mt-4">Chargement du profil...</h2>
      <p className="text-muted-foreground mt-2">Merci de patienter</p>
    </div>
  );
};

export default LoadingState;
