
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import ProfileSection from './header/ProfileSection';
import HeaderInfo from './header/HeaderInfo';
import CreatorMetrics from './header/CreatorMetrics';
import TierProgressBar from './header/TierProgressBar';
import RevenueSection from './header/RevenueSection';
import { UpcomingEvent } from '../events/UpcomingEvent';

interface CreatorHeaderProps {
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
    watchMinutes?: string | number;
  };
  isCreator?: boolean;
  isOnline?: boolean;
  upcomingEvent?: {
    title: string;
    time: string;
    type: 'live' | 'post' | 'event';
    countdown?: string;
  };
  onSubscribeToEvent?: () => void;
  onFollow?: () => void;
  isFollowing?: boolean;
  className?: string;
}

const CreatorHeader = ({
  name,
  username,
  avatar,
  bio,
  tier,
  metrics,
  isCreator = false,
  isOnline = false,
  upcomingEvent,
  onSubscribeToEvent,
  onFollow,
  isFollowing = false,
  className,
}: CreatorHeaderProps) => {
  return (
    <div className={cn("glass-card rounded-2xl p-6", className)}>
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <ProfileSection avatar={avatar} isOnline={isOnline} />

        <div className="flex-grow space-y-4">
          <HeaderInfo 
            name={name} 
            username={username} 
            bio={bio} 
            tier={tier} 
          />

          <Separator className="my-3" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="space-y-4">
                <CreatorMetrics metrics={metrics} />
                
                {metrics.nextTierProgress !== undefined && tier !== 'diamond' && (
                  <TierProgressBar 
                    tier={tier} 
                    progress={metrics.nextTierProgress} 
                  />
                )}
              </div>
            </div>
            
            <div className="col-span-1">
              <RevenueSection 
                isCreator={isCreator}
                revenue={metrics.revenue}
                growthRate={metrics.growthRate}
                upcomingEvent={upcomingEvent}
                onSubscribe={onSubscribeToEvent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorHeader;
