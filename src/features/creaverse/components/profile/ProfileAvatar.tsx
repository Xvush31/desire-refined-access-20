
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarClock } from 'lucide-react';

interface ProfileAvatarProps {
  avatar: string;
  name: string;
  upcomingEvent?: {
    title: string;
    time: string;
    type: 'live' | 'post' | 'event';
    countdown: string;
  };
  onEventSubscribe?: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  avatar, 
  name, 
  upcomingEvent, 
  onEventSubscribe 
}) => {
  return (
    <div className="mr-4 flex flex-col items-center">
      <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-border p-0.5">
        <AvatarImage 
          src={avatar} 
          alt={name} 
          className="object-cover rounded-full" 
        />
        <AvatarFallback className="bg-gradient-to-br from-muted/80 to-muted/40 text-foreground">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      {upcomingEvent && (
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs w-full mt-2 flex items-center gap-1"
          onClick={onEventSubscribe}
        >
          <CalendarClock size={12} className="text-primary" />
          Reminder
        </Button>
      )}
    </div>
  );
};

export default ProfileAvatar;
