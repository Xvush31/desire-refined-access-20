
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import CreatorBadge from './CreatorBadge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarClock, Activity, CircleDot, CirclePause } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import RevenueChart from '../profile/RevenueChart';

type CreatorStatus = 'online' | 'creating' | 'scheduled' | 'offline';

interface ModernProfileHeaderProps {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  metrics: {
    followers: number;
    following?: number;
    revenue?: number;
    growthRate?: number;
    nextTierProgress?: number;
    retentionRate?: number;
    superfans?: number;
    watchMinutes?: number;
  };
  status?: CreatorStatus;
  scheduledTime?: string;
  isCreator?: boolean;
  className?: string;
  upcomingEvent?: {
    title: string;
    time: string;
    type: 'live' | 'post' | 'event';
    countdown: string;
  };
  onEventSubscribe?: () => void;
}

const ModernProfileHeader: React.FC<ModernProfileHeaderProps> = ({
  name,
  username,
  avatar,
  bio,
  tier,
  metrics,
  status = 'offline',
  scheduledTime,
  isCreator = false,
  className,
  upcomingEvent,
  onEventSubscribe
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
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

  // Calculate tier progress
  const getTierProgressColor = () => {
    switch (tier) {
      case 'bronze': return 'from-amber-700 to-amber-500';
      case 'silver': return 'from-gray-400 to-gray-300';
      case 'gold': return 'from-yellow-500 to-amber-300';
      case 'platinum': return 'from-gray-300 to-gray-100';
      case 'diamond': return 'from-blue-400 to-purple-500';
      default: return 'from-gray-400 to-gray-300';
    }
  };

  return (
    <div className={cn("bg-card rounded-2xl p-6 border", className)}>
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Profile Picture Section */}
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
        
        {/* Creator Info Section */}
        <div className="flex-grow space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-xl">{name}</h2>
                <CreatorBadge tier={tier} />
              </div>
              <p className="text-sm text-muted-foreground">@{username}</p>
            </div>
            
            {/* If creator is viewing their own profile */}
            {isCreator && metrics.revenue && (
              <div className="text-right">
                <div className="text-lg font-bold">${metrics.revenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Revenue</div>
              </div>
            )}
          </div>
          
          <p className="text-sm">{bio}</p>
          
          <Separator className="my-3" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="space-y-4">
                {/* Creator Metrics */}
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <div>
                    <span className="font-semibold">{formatNumber(metrics.followers)}</span>
                    <span className="text-muted-foreground text-sm ml-1">followers</span>
                  </div>
                  {metrics.following !== undefined && (
                    <div>
                      <span className="font-semibold">{formatNumber(metrics.following)}</span>
                      <span className="text-muted-foreground text-sm ml-1">following</span>
                    </div>
                  )}
                  {metrics.retentionRate !== undefined && (
                    <div>
                      <span className="font-semibold">{metrics.retentionRate}%</span>
                      <span className="text-muted-foreground text-sm ml-1">retention</span>
                    </div>
                  )}
                  {metrics.superfans !== undefined && (
                    <div>
                      <span className="font-semibold">{formatNumber(metrics.superfans)}</span>
                      <span className="text-muted-foreground text-sm ml-1">super-fans</span>
                    </div>
                  )}
                  {metrics.watchMinutes !== undefined && (
                    <div>
                      <span className="font-semibold">{metrics.watchMinutes}</span>
                      <span className="text-muted-foreground text-sm ml-1">watch minutes</span>
                    </div>
                  )}
                </div>
                
                {/* Tier Progress Bar */}
                {metrics.nextTierProgress !== undefined && tier !== 'diamond' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div>Progress to next tier</div>
                      <div>{metrics.nextTierProgress}%</div>
                    </div>
                    <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${getTierProgressColor()}`}
                        style={{ width: `${metrics.nextTierProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-1">
              {/* Revenue Chart or Upcoming Event */}
              {isCreator && metrics.revenue && metrics.growthRate && (
                <div>
                  <div className="text-sm font-medium mb-2">Revenue Trend</div>
                  <RevenueChart growthRate={metrics.growthRate} />
                </div>
              )}
              
              {/* Upcoming Event for viewers */}
              {!isCreator && upcomingEvent && (
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarClock size={16} className="text-primary" />
                    <span className="text-xs font-medium">
                      {upcomingEvent.type === 'live' ? 'Upcoming Live' : upcomingEvent.type === 'post' ? 'New Post' : 'Event'}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-sm mb-1">{upcomingEvent.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {upcomingEvent.time} <span className="font-medium text-primary">({upcomingEvent.countdown})</span>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernProfileHeader;
