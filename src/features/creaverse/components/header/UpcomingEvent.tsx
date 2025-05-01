
import React from 'react';
import { Button } from "@/components/ui/button";

interface UpcomingEventProps {
  title: string;
  time: string;
  type: 'live' | 'premiere' | 'post';
  countdown: string;
  onSubscribe: () => void;
}

const UpcomingEvent = ({ 
  title, 
  time, 
  type = 'live', 
  countdown, 
  onSubscribe 
}: UpcomingEventProps) => {
  return (
    <div className="creaverse-glass-card p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {type === 'live' && (
          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full creaverse-animate-pulse-subtle mr-1"></span>
            LIVE
          </span>
        )}
        <span className="text-sm font-medium truncate flex-1">{title}</span>
      </div>
      
      <div className="flex justify-between items-end">
        <div className="text-xs text-muted-foreground">
          <div>{time}</div>
          <div className="font-semibold mt-1 text-foreground">{countdown}</div>
        </div>
        
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={onSubscribe}
          className="text-xs px-3 py-1 h-auto"
        >
          S'abonner
        </Button>
      </div>
    </div>
  );
};

export default UpcomingEvent;
