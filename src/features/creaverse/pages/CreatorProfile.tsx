
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import CreatorDNA from '@/features/creaverse/components/creator/CreatorDNA';
import CreatorJourney from '@/features/creaverse/components/creator/CreatorJourney';
import FeedbackLoop from '@/features/creaverse/components/creator/FeedbackLoop';
import ValueVault from '@/features/creaverse/components/creator/ValueVault';

interface CreatorProfileProps {
  // Define any props if needed
}

// Mock function to replace fetchPerformerProfile since it doesn't exist
const fetchPerformerProfile = async (username: string) => {
  // This is a placeholder. In a real app, you would fetch this from an API
  console.log(`Fetching profile for ${username}`);
  
  // Return mock data with proper type values for ContentItem
  return {
    id: '1',
    username: username || 'performer1',
    displayName: 'Jane Creator',
    profileImageUrl: 'https://i.pravatar.cc/300',
    bio: 'Digital creator and content specialist.',
    tier: 'gold' as 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond',
    stats: {
      followers: 24500,
      following: 143,
      revenue: 12350,
      growthRate: 15,
      nextTierProgress: 75,
      retentionRate: 92,
      superfans: 230,
      watchMinutes: 45600,
      isOnline: true
    },
    content: [
      {
        id: '1',
        title: 'Summer Photoshoot',
        thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'premium' as 'standard' | 'premium' | 'vip',
        format: 'image' as 'video' | 'image' | 'audio' | 'text',
        metrics: {
          views: 12500,
          likes: 1540,
          engagement: 0.85
        }
      },
      {
        id: '2',
        title: 'Behind the Scenes',
        thumbnail: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'vip' as 'standard' | 'premium' | 'vip',
        format: 'video' as 'video' | 'image' | 'audio' | 'text',
        duration: 320,
        metrics: {
          views: 8300,
          likes: 950,
          engagement: 0.92
        }
      },
      {
        id: '3',
        title: 'Fashion Week Highlights',
        thumbnail: 'https://images.unsplash.com/photo-1469460340997-2f854421e72f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'standard' as 'standard' | 'premium' | 'vip',
        format: 'video' as 'video' | 'image' | 'audio' | 'text',
        duration: 540,
        metrics: {
          views: 23100,
          likes: 3400,
          engagement: 0.78
        }
      },
      {
        id: '4',
        title: 'New Collection Preview',
        thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'premium' as 'standard' | 'premium' | 'vip',
        format: 'image' as 'video' | 'image' | 'audio' | 'text',
        metrics: {
          views: 19800,
          likes: 2800,
          engagement: 0.88
        }
      }
    ] as ContentItem[],
    // Additional mock data for new components
    creatorDNA: {
      skills: ['Photographie', 'Vidéo', 'Direction artistique', 'Fashion', 'Montage', 'Social Media'],
      style: ['Minimaliste', 'Coloré', 'Urbain', 'High Fashion', 'Lifestyle'],
      achievements: ['100K Followers', 'Brand Partnership', 'Magazine Feature', 'Awards Nomination']
    },
    journey: [
      {
        id: 'j1',
        date: 'Jan 2023',
        title: 'Premier contenu premium',
        description: 'Lancement de la première série de contenu premium qui a révolutionné ma présence digitale.',
        metricBefore: 5000,
        metricAfter: 12000,
        metricLabel: 'Followers'
      },
      {
        id: 'j2',
        date: 'Mar 2023',
        title: 'Collaboration majeure',
        description: 'Partenariat avec une marque internationale qui a grandement augmenté ma visibilité.',
        metricBefore: 15000,
        metricAfter: 22000,
        metricLabel: 'Portée'
      },
      {
        id: 'j3',
        date: 'Jun 2023',
        title: 'Lancement de ma collection',
        description: 'Création et lancement de ma première collection qui a connu un succès immédiat.',
        metricBefore: 8500,
        metricAfter: 15200,
        metricLabel: 'Ventes'
      }
    ],
    feedback: [
      {
        id: 'f1',
        username: 'martin_23',
        message: 'J\'adore ton contenu, surtout les séries fashion!',
        timestamp: 'Il y a 2 jours',
        type: 'comment' as 'comment' | 'request' | 'appreciation'
      },
      {
        id: 'f2',
        username: 'sophie_style',
        message: 'Pourrais-tu faire un tutoriel sur la composition photo?',
        timestamp: 'Il y a 5 jours',
        type: 'request' as 'comment' | 'request' | 'appreciation'
      },
      {
        id: 'f3',
        username: 'photo_enthousiast',
        message: 'Tes dernières photos m\'ont vraiment inspiré pour mon projet!',
        timestamp: 'Il y a 1 semaine',
        type: 'appreciation' as 'comment' | 'request' | 'appreciation'
      }
    ],
    premiumContent: [
      {
        id: 'p1',
        title: 'Techniques de retouche avancées',
        type: 'premium' as 'premium' | 'standard' | 'vip',
        category: 'tutoriels',
        views: 8700
      },
      {
        id: 'p2',
        title: 'Behind the scenes - Fashion Week',
        type: 'vip' as 'premium' | 'standard' | 'vip',
        category: 'exclusif',
        views: 3200
      },
      {
        id: 'p3',
        title: 'Masterclass composition',
        type: 'premium' as 'premium' | 'standard' | 'vip',
        category: 'tutoriels',
        views: 6500
      },
      {
        id: 'p4',
        title: 'Shooting day in Paris',
        type: 'standard' as 'premium' | 'standard' | 'vip',
        category: 'vlogs',
        views: 12300
      },
      {
        id: 'p5',
        title: 'Collection été - Preview',
        type: 'premium' as 'premium' | 'standard' | 'vip',
        category: 'collections',
        views: 9200
      }
    ]
  };
};

const CreatorProfile: React.FC<CreatorProfileProps> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const username = params.username;

  const { data: performer, isLoading, isError } = useQuery({
    queryKey: ['performerProfile', username],
    queryFn: () => fetchPerformerProfile(username as string),
    enabled: !!username, // Ensure username is available before fetching
  });

  const handleBack = () => {
    navigate(-1); // Go back to previous page
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
    followers: performer.stats.followers || 0,
    following: performer.stats.following || 0,
    revenue: performer.stats.revenue || 0,
    growthRate: performer.stats.growthRate || 0,
    nextTierProgress: performer.stats.nextTierProgress || 0,
    retentionRate: performer.stats.retentionRate || 0,
    superfans: performer.stats.superfans || 0,
    watchMinutes: performer.stats.watchMinutes || 0,
  };

  return (
    <div className="container py-10">
      <ProfileNav username={performer.username} onBack={handleBack} />
      
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={performer.profileImageUrl} alt={performer.username} />
          <AvatarFallback>{performer.username.charAt(0).toUpperCase()}</AvatarFallback>
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

      {/* New Creator Components Integration */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <CreatorDNA
          creatorName={performer.displayName}
          creatorSkills={performer.creatorDNA?.skills || []}
          creatorStyle={performer.creatorDNA?.style || []}
          creatorAchievements={performer.creatorDNA?.achievements || []}
        />
        
        <ValueVault
          premiumContent={performer.premiumContent || []}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <CreatorJourney
          milestones={performer.journey || []}
        />
        
        <FeedbackLoop
          feedbackMessages={performer.feedback || []}
          isCreator={false}
        />
      </div>

      {/* Content Grid */}
      <h2 className="text-2xl font-semibold mb-4">Contenu récent</h2>
      <EnhancedContentGrid
        items={performer.content}
        onItemClick={handleContentClick}
        showMetrics={true}
      />
    </div>
  );
};

export default CreatorProfile;
