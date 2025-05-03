
import React from 'react';

interface CreatorProfileAvatarProps {
  imageUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CreatorProfileAvatar: React.FC<CreatorProfileAvatarProps> = ({ 
  imageUrl, 
  name, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg'
  };
  
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center bg-primary text-primary-foreground`}>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-semibold">{initials}</span>
      )}
    </div>
  );
};

export default CreatorProfileAvatar;
