
import React from 'react';

interface XvushLogoProps {
  size?: number;
  className?: string;
}

const XvushLogo: React.FC<XvushLogoProps> = ({ size = 24, className = '' }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M3 6L9 12L3 18H5.5L11.5 12L5.5 6H3Z" 
          fill="currentColor" 
        />
        <path 
          d="M12.5 6L18.5 12L12.5 18H15L21 12L15 6H12.5Z" 
          fill="currentColor" 
        />
      </svg>
    </div>
  );
};

export default XvushLogo;
