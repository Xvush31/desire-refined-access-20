
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import ProfileAvatar from './ProfileAvatar';
import CreatorBadge from './CreatorBadge';
import CreatorPulse from './CreatorPulse';
import RevenueChart from '@/components/ui/RevenueChart';
import ProgressBar from '@/components/ui/ProgressBar';
import UpcomingEvent from '../events/UpcomingEvent';
import { Button } from '@/components/ui/button';

interface HeaderMetrics {
  followers: number;
  following?: number;
  revenue?: number;
  growthRate?: number;
  nextTierProgress?: number;
  retentionRate?: number;
  superfans?: number;
  watchMinutes?: number;
}

interface UpcomingEventData {
  title: string;
  time: string;
  type: 'live' | 'post' | 'event';
  countdown: string;
}

interface CreatorHeaderProps {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  metrics: HeaderMetrics;
  isCreator?: boolean;
  isOnline?: boolean;
  className?: string;
  upcomingEvent?: UpcomingEventData;
  onSubscribeToEvent?: () => void;
  onFollow?: () => void;
  isFollowing?: boolean;
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
  className,
  upcomingEvent,
  onSubscribeToEvent,
  onFollow,
  isFollowing = false
}: CreatorHeaderProps) => {
  return (
    <div className={cn("rounded-2xl p-6 border bg-background/80 backdrop-blur-sm", className)}>
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex flex-col items-center">
          <ProfileAvatar 
            src={avatar} 
            alt={name}
            size="lg"
            hasStory={true}
            status={isOnline ? 'online' : 'offline'}
          />
          
          <div className="mt-3 flex flex-col items-center">
            <CreatorBadge tier={tier} className="mb-2" />
            <CreatorPulse status={isOnline ? 'online' : 'offline'} />
          </div>
        </div>

        <div className="flex-grow space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-muted-foreground">@{username}</p>
            </div>
            
            {!isCreator && (
              <Button 
                className={isFollowing ? "bg-secondary hover:bg-secondary/80" : "bg-brand-red hover:bg-brand-red/90"}
                onClick={onFollow}
              >
                {isFollowing ? "Suivi" : "Suivre"}
              </Button>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">{bio}</p>

          <Separator className="my-3" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-xl font-bold">{metrics.followers.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Abonnés</div>
                  </div>
                  
                  {metrics.following !== undefined && (
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-xl font-bold">{metrics.following.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Abonnements</div>
                    </div>
                  )}
                  
                  {metrics.retentionRate !== undefined && (
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-xl font-bold">{metrics.retentionRate}%</div>
                      <div className="text-xs text-muted-foreground">Fidélisation</div>
                    </div>
                  )}
                  
                  {metrics.superfans !== undefined && (
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-xl font-bold">{metrics.superfans.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Super-fans</div>
                    </div>
                  )}
                </div>
                
                {metrics.nextTierProgress !== undefined && tier !== 'diamond' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progression {tier}</span>
                      <span className="text-brand-red">{metrics.nextTierProgress}%</span>
                    </div>
                    <ProgressBar 
                      value={metrics.nextTierProgress} 
                      max={100} 
                      color="bg-brand-red" 
                    />
                    <p className="text-xs text-muted-foreground">
                      {tier === 'bronze' ? 'Silver' : 
                       tier === 'silver' ? 'Gold' : 
                       tier === 'gold' ? 'Platinum' : 'Diamond'} 
                      disponible dans {100 - metrics.nextTierProgress}% de progression
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-1">
              {isCreator && metrics.revenue !== undefined && (
                <div className="bg-muted/30 p-3 rounded-lg mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Revenu mensuel</span>
                    {metrics.growthRate !== undefined && metrics.growthRate > 0 && (
                      <span className="text-xs text-green-500">+{metrics.growthRate}%</span>
                    )}
                  </div>
                  <div className="text-xl font-bold mb-2">{metrics.revenue.toLocaleString()}€</div>
                  <RevenueChart growthRate={metrics.growthRate} />
                </div>
              )}
              
              {upcomingEvent && (
                <UpcomingEvent 
                  title={upcomingEvent.title}
                  time={upcomingEvent.time}
                  type={upcomingEvent.type}
                  countdown={upcomingEvent.countdown}
                  onSubscribe={onSubscribeToEvent}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorHeader;
