
import React from 'react';
import XvushLogo from './XvushLogo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 px-4 border-t bg-background/95">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <XvushLogo size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">
            Xvush copyright © {currentYear}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
