
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarClock } from 'lucide-react';

interface UpcomingEventCardProps {
  event: {
    title: string;
    time: string;
    type: 'live' | 'post' | 'event';
    countdown: string;
  };
  onEventSubscribe?: () => void;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ event, onEventSubscribe }) => {
  return (
    <div className="bg-muted/30 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <CalendarClock size={16} className="text-primary" />
        <span className="text-xs font-medium">
          {event.type === 'live' ? 'Upcoming Live' : event.type === 'post' ? 'New Post' : 'Event'}
        </span>
      </div>
      
      <h4 className="font-medium text-sm mb-1">{event.title}</h4>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {event.time} <span className="font-medium text-primary">({event.countdown})</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-7 px-2"
          onClick={onEventSubscribe}
        >
          Remind me
        </Button>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
