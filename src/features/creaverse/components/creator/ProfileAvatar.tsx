
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProfileAvatarProps {
  src: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hasStory?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'streaming' | 'away' | 'creating';
  className?: string;
}

const ProfileAvatar = ({ 
  src, 
  alt = "Photo de profil",
  size = 'md', 
  hasStory = false, 
  status,
  className 
}: ProfileAvatarProps) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36'
  };
  
  const renderStatus = () => {
    if (!status) return null;
    
    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      busy: 'bg-amber-500',
      streaming: 'bg-red-500',
      away: 'bg-blue-400',
      creating: 'bg-purple-500'
    };
    
    const statusSizes = {
      sm: 'w-2.5 h-2.5',
      md: 'w-3.5 h-3.5',
      lg: 'w-4 h-4',
      xl: 'w-5 h-5'
    };
    
    return (
      <span 
        className={cn(
          'absolute bottom-1 right-1 rounded-full border-2 border-white dark:border-gray-900',
          statusColors[status],
          statusSizes[size]
        )}
      />
    );
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {hasStory ? (
        <div className="relative">
          <motion.div
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ 
              opacity: [0.6, 1, 0.6],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3
            }}
            className={cn(
              "absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 -z-10",
              size === "xl" ? "scale-105" : "scale-110"
            )}
          />
          <div className="bg-background p-0.5 rounded-full">
            <img 
              src={src} 
              alt={alt}
              className={cn(
                "rounded-full object-cover", 
                sizeMap[size]
              )}
            />
          </div>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt}
          className={cn(
            "rounded-full object-cover border-2 border-white dark:border-gray-800", 
            sizeMap[size]
          )}
        />
      )}
      {renderStatus()}
    </div>
  );
};

export default ProfileAvatar;
