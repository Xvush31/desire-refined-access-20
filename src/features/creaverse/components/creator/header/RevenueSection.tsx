import React from 'react';
import { cn } from '@/lib/utils';
import RevenueChart from '@/components/ui/RevenueChart';
import { Button } from '@/components/ui/button';
import { UpcomingEvent } from '../../events/UpcomingEvent';

interface RevenueSectionProps {
  isCreator: boolean;
  revenue?: number;
  growthRate?: number;
  upcomingEvent?: {
    title: string;
    time: string;
    type: 'live' | 'post' | 'event';
    countdown?: string;
  };
  onSubscribe?: () => void;
  className?: string;
}

const RevenueSection = ({ 
  isCreator, 
  revenue, 
  growthRate, 
  upcomingEvent,
  onSubscribe,
  className 
}: RevenueSectionProps) => {
  // If user is a creator, show revenue
  if (isCreator && revenue !== undefined) {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Revenus ce mois</span>
          <span className="text-lg font-semibold">${revenue.toLocaleString()}</span>
        </div>
        
        <RevenueChart growthRate={growthRate} />
      </div>
    );
  }
  
  // Otherwise, show call-to-action or event
  return (
    <div className={cn("space-y-3", className)}>
      {upcomingEvent ? (
        <UpcomingEvent
          title={upcomingEvent.title}
          time={upcomingEvent.time}
          type={upcomingEvent.type}
          countdown={upcomingEvent.countdown}
          onSubscribe={onSubscribe}
        />
      ) : (
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <p className="text-sm mb-2">Accédez à du contenu exclusif</p>
          <Button 
            variant="default" 
            size="sm" 
            className="w-full"
            onClick={onSubscribe}
          >
            S'abonner
          </Button>
        </div>
      )}
    </div>
  );
};

export default RevenueSection;
