
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileSectionProps {
  avatar: string;
  isOnline?: boolean;
  name?: string;
}

const ProfileSection = ({ avatar, isOnline = false, name = '' }: ProfileSectionProps) => {
  // Safely generate initials even if name is empty
  const initials = name
    ? name.split(' ').map(part => part[0] || '').join('')
    : '';
    
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="creaverse-story-ring">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatar} alt={name || "Profile"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
        
        {isOnline && (
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
        )}
      </div>
      
      <div className="mt-1 text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
        {isOnline ? 'En ligne' : 'Créant'}
      </div>
    </div>
  );
};

export default ProfileSection;
