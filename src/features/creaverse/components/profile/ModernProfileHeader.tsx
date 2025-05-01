
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import CreatorBadge from '../creator/CreatorBadge';
import ProfileAvatar from './ProfileAvatar';
import StatusIndicator from './StatusIndicator';
import ProfileMetrics from './ProfileMetrics';
import TierProgressBar from './TierProgressBar';
import UpcomingEventCard from './UpcomingEventCard';
import RevenueChart from './RevenueChart';

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
  return (
    <div className={cn("bg-card rounded-2xl p-6 border", className)}>
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Profile Picture Section with Status */}
        <div className="flex flex-col">
          <ProfileAvatar 
            avatar={avatar}
            name={name}
            upcomingEvent={upcomingEvent}
            onEventSubscribe={onEventSubscribe}
          />
          <StatusIndicator status={status} scheduledTime={scheduledTime} />
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
                <ProfileMetrics metrics={metrics} />
                
                {/* Tier Progress Bar */}
                {metrics.nextTierProgress !== undefined && tier !== 'diamond' && (
                  <TierProgressBar tier={tier} nextTierProgress={metrics.nextTierProgress} />
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
                <UpcomingEventCard event={upcomingEvent} onEventSubscribe={onEventSubscribe} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernProfileHeader;
