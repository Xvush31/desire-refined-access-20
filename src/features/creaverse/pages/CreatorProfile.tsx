import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchPerformerProfile } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Verified } from 'lucide-react';
import CreatorBadge from '@/features/creaverse/components/ui/CreatorBadge';
import ProfileNav from '@/features/creaverse/components/ui/ProfileNav';
import EnhancedContentGrid from '@/features/creaverse/components/content/EnhancedContentGrid';
import { ContentItem } from '@/features/creaverse/components/content/ContentCard';

interface CreatorProfileProps {
  // Define any props if needed
}

const CreatorProfile = () => {
  const router = useRouter();
  const { username } = router.query;

  const { data: performer, isLoading, isError } = useQuery(
    ['performerProfile', username],
    () => fetchPerformerProfile(username as string),
    {
      enabled: !!username, // Ensure username is available before fetching
    }
  );

  const handleBack = () => {
    router.back();
  };

  const handleContentClick = (item: ContentItem) => {
    // Handle content click action
    console.log('Content clicked:', item);
  };

  if (isLoading) {
    return (
      <div className="container py-10">
        <ProfileNav username="Loading..." onBack={handleBack} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle><Skeleton className="h-5 w-40" /></CardTitle>
              <CardDescription><Skeleton className="h-4 w-32" /></CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isError || !performer) {
    return (
      <div className="container py-10">
        <ProfileNav username="Error" onBack={handleBack} />
        <div>Error loading profile</div>
      </div>
    );
  }

  const creatorMetrics = {
    followers: performer?.stats.followers || 0,
    following: performer?.stats.following || 0,
    revenue: performer?.stats.revenue || 0,
    growthRate: performer?.stats.growthRate || 0,
    nextTierProgress: performer?.stats.nextTierProgress || 0,
    retentionRate: performer?.stats.retentionRate || 0,
    superfans: performer?.stats.superfans || 0,
    watchMinutes: performer?.stats.watchMinutes || 0, // Changed from string to number
  };

  const status = performer?.stats?.isOnline ? 'online' : 'offline';

  return (
    <div className="container py-10">
      <ProfileNav username={performer.username} onBack={handleBack} />
      
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={performer.profileImageUrl} alt={performer.username} />
          <AvatarFallback>{performer.username?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">
              {performer.displayName}
            </h1>
            <Verified className="w-5 h-5 text-blue-500" />
            <CreatorBadge tier={performer.tier} />
          </div>
          <p className="text-muted-foreground">@{performer.username}</p>
          <p className="text-sm mt-1">{performer.bio}</p>
        </div>
      </div>
      
      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Followers</CardTitle>
            <CardDescription>Total followers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creatorMetrics.followers}</div>
            <Progress value={creatorMetrics.nextTierProgress} />
            <p className="text-xs text-muted-foreground mt-1">
              {creatorMetrics.nextTierProgress}% to next tier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Following</CardTitle>
            <CardDescription>People they follow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creatorMetrics.following}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Total earned revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${creatorMetrics.revenue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Watch Time</CardTitle>
            <CardDescription>Total watch time (minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creatorMetrics.watchMinutes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <EnhancedContentGrid
        items={performer.content}
        onItemClick={handleContentClick}
        showMetrics={true}
      />
    </div>
  );
};

export default CreatorProfile;
