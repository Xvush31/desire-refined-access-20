
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, Bell, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileNavProps {
  username: string;
  onBack?: () => void;
  className?: string;
}

const ProfileNav = ({ username, onBack, className }: ProfileNavProps) => {
  return (
    <div className={cn(
      "sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b flex items-center justify-between px-4 py-3",
      className
    )}>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2" 
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-lg font-semibold">@{username}</h1>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ProfileNav;
