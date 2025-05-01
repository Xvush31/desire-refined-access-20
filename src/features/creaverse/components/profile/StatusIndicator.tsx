
import React from 'react';
import { cn } from '@/lib/utils';
import { CalendarClock, Activity, CircleDot, CirclePause } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type CreatorStatus = 'online' | 'creating' | 'scheduled' | 'offline';

interface StatusIndicatorProps {
  status: CreatorStatus;
  scheduledTime?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, scheduledTime }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: 'bg-green-500',
          icon: <CircleDot size={14} className="text-green-500" />,
          label: 'Online',
          description: 'Available now'
        };
      case 'creating':
        return {
          color: 'bg-amber-500',
          icon: <Activity size={14} className="text-amber-500" />,
          label: 'Creating',
          description: 'New content in preparation'
        };
      case 'scheduled':
        return {
          color: 'bg-blue-500',
          icon: <CalendarClock size={14} className="text-blue-500" />,
          label: 'Scheduled',
          description: scheduledTime ? `Next live at ${scheduledTime}` : 'Upcoming event'
        };
      case 'offline':
      default:
        return {
          color: 'bg-gray-400',
          icon: <CirclePause size={14} className="text-gray-400" />,
          label: 'Offline',
          description: 'Will be back soon'
        };
    }
  };
  
  const { color, icon, label, description } = getStatusConfig();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 group mt-2">
            <span className={cn(
              "relative flex h-2.5 w-2.5 rounded-full",
              status === 'online' && "animate-pulse"
            )}>
              <span className={cn("absolute inline-flex h-full w-full rounded-full", color)} />
            </span>
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {label}
            </span>
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-xs">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StatusIndicator;
