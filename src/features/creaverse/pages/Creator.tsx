
import React, { useState } from 'react';
import CreatorHeader from '../components/creator/CreatorHeader';
import ContentGrid, { Content, ContentCollection } from '@/components/ui/ContentGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionPanel from '../components/subscription/SubscriptionPanel';
import { toast } from 'sonner';
import { useRevolutionaryNavigation } from '@/hooks/use-revolutionary-navigation';

// Données de test pour le créateur
const creatorData = {
  name: 'Lola Mystik',
  username: 'lola_mystik',
  avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&q=80',
  bio: 'Artiste passionnée et créative, je partage mes chorégraphies exclusives et moments privés avec mes abonnés. Rejoignez mon univers !',
  tier: 'gold' as const,
  metrics: {
    followers: 23800,
    following: 156,
    revenue: 12930,
    growthRate: 15.4,
    nextTierProgress: 75,
    retentionRate: 92,
    superfans: 1250,
    watchMinutes: '250K'
  },
  isOnline: true
};

// Données de test pour les contenus
const mockContents: Content[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/pic1/800/800',
    title: 'Summer Vibes Collection',
    type: 'premium',
    format: 'video',
    duration: 245, // 4:05
    metrics: { views: 15600, likes: 1250, comments: 98 },
    collection: 'Summer'
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/pic2/800/800',
    title: 'Behind the Scenes',
    type: 'vip',
    format: 'image',
    metrics: { views: 8700, likes: 950, comments: 42, growth: 18 },
    collection: 'Backstage'
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/seed/pic3/800/800',
    title: 'Dance Rehearsal',
    type: 'standard',
    format: 'video',
    duration: 183, // 3:03
    metrics: { views: 12400, likes: 1050, comments: 63 },
    collection: 'Dance'
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/seed/pic4/800/800',
    title: 'Photoshoot Highlights',
    type: 'standard',
    format: 'image',
    metrics: { views: 7800, likes: 640, comments: 37 },
    collection: 'Photoshoot'
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/seed/pic5/800/800',
    title: 'Special VIP Content',
    type: 'vip',
    format: 'video',
    duration: 318, // 5:18
    metrics: { views: 3200, likes: 280, comments: 23, growth: 24 },
    collection: 'Exclusive'
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/seed/pic6/800/800',
    title: 'Fan Appreciation',
    type: 'premium',
    format: 'video',
    duration: 127, // 2:07
    metrics: { views: 9400, likes: 820, comments: 45 },
    collection: 'Fans'
  }
];

// Collections pour l'affichage organisé
const mockCollections: ContentCollection[] = [
  {
    name: 'Summer Collection',
    contents: mockContents.filter(c => c.collection === 'Summer')
  },
  {
    name: 'Backstage Access',
    contents: mockContents.filter(c => c.collection === 'Backstage')
  },
  {
    name: 'Dance Performances',
    contents: mockContents.filter(c => c.collection === 'Dance')
  },
  {
    name: 'Photoshoot Sessions',
    contents: mockContents.filter(c => c.collection === 'Photoshoot')
  },
  {
    name: 'VIP Exclusives',
    contents: mockContents.filter(c => c.collection === 'Exclusive')
  }
];

const eventData = {
  title: "Session photo spéciale abonnés",
  time: "Demain, 20:00",
  type: 'live' as const,
  countdown: "23h 45m"
};

const Creator = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [layout, setLayout] = useState<'grid' | 'masonry' | 'featured' | 'vertical' | 'collections'>('grid');
  const [isFollowing, setIsFollowing] = useState(false);
  
  const { setIsImmersiveMode } = useRevolutionaryNavigation();

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Vous ne suivez plus ce créateur' : 'Vous suivez maintenant ce créateur');
  };

  const handleSubscribeToEvent = () => {
    toast.success('Rappel défini pour l\'événement');
  };

  const handleContentClick = (content: Content) => {
    if (content.type === 'premium' || content.type === 'vip') {
      toast.info(`Contenu ${content.type} - Abonnement requis`);
    } else {
      toast.info(`Ouverture: ${content.title}`);
      // Ici on pourrait naviguer vers la page de détail du contenu
    }
  };

  const handleSubscribe = (tier: string) => {
    toast.info(`Redirection vers la page d'abonnement ${tier}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CreatorHeader 
        {...creatorData} 
        upcomingEvent={eventData}
        onSubscribeToEvent={handleSubscribeToEvent}
        onFollow={handleFollow}
        isFollowing={isFollowing}
      />
      
      <div className="mt-8">
        <Tabs defaultValue="gallery" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="gallery">Galerie</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="subscribe">S'abonner</TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <div className="flex justify-end mb-2">
              {activeTab === 'gallery' && (
                <div className="flex gap-2">
                  <button 
                    className={`px-3 py-1 rounded text-sm ${layout === 'grid' ? 'bg-muted' : ''}`}
                    onClick={() => setLayout('grid')}
                  >
                    Grille
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm ${layout === 'masonry' ? 'bg-muted' : ''}`}
                    onClick={() => setLayout('masonry')}
                  >
                    Mosaïque
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm ${layout === 'featured' ? 'bg-muted' : ''}`}
                    onClick={() => setLayout('featured')}
                  >
                    À la une
                  </button>
                </div>
              )}
            </div>
            
            <TabsContent value="gallery" className="mt-2">
              <ContentGrid 
                contents={mockContents} 
                layout={layout}
                onContentClick={handleContentClick}
              />
            </TabsContent>
            
            <TabsContent value="collections" className="mt-2">
              <ContentGrid 
                contents={mockContents} 
                layout="collections"
                collections={mockCollections}
                onContentClick={handleContentClick}
              />
            </TabsContent>
            
            <TabsContent value="about" className="mt-2">
              <div className="bg-card p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">À propos de {creatorData.name}</h2>
                <p className="mb-4">
                  {creatorData.bio}
                </p>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis euismod, 
                  aliquam nunc id, tincidunt nisi. Vestibulum ante ipsum primis in faucibus orci 
                  luctus et ultrices posuere cubilia Curae; Donec vel ante vel nisi faucibus 
                  facilisis ac nec odio.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Spécialités</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Danse contemporaine</li>
                      <li>Photographie artistique</li>
                      <li>Chorégraphies exclusives</li>
                      <li>Performance live</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Langues</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Français (natif)</li>
                      <li>Anglais (courant)</li>
                      <li>Espagnol (notions)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="subscribe" className="mt-2">
              <SubscriptionPanel onSubscribe={handleSubscribe} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Creator;
