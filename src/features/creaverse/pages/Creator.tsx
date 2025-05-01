
import React, { useState } from 'react';
import ContentGrid, { Content, ContentCollection } from '@/components/ui/ContentGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionPanel from '../components/subscription/SubscriptionPanel';
import { toast } from 'sonner';
import { useRevolutionaryNavigation } from '@/hooks/use-revolutionary-navigation';
import CreatorHeader from '../components/creator/CreatorHeader';
import CreatorDNA from '../components/creator/CreatorDNA';
import CreatorJourney from '../components/creator/CreatorJourney';
import FeedbackLoop from '../components/creator/FeedbackLoop';
import ValueVault from '../components/creator/ValueVault';

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

// Données de test pour les compétences
const creatorSkills = [
  "Photographie professionnelle", 
  "Danse moderne", 
  "Chorégraphies originales", 
  "Modélisme", 
  "Direction artistique",
  "Vidéographie"
];

const creatorStyle = [
  "Élégant", 
  "Artistique", 
  "Contemporain", 
  "Sensuel", 
  "Créatif", 
  "Expressif",
  "Coloré"
];

const creatorAchievements = [
  "Top 1% Creaverse", 
  "100k+ abonnés en 3 mois", 
  "Collaboration avec Prada", 
  "Vidéo à 1M vues",
  "Award Creator XVush 2023"
];

const journeyMilestones = [
  { 
    id: '1', 
    date: 'Jan 2022', 
    title: 'Début sur Creaverse', 
    description: 'Premier jour sur la plateforme avec seulement 100 abonnés venant de mes autres réseaux sociaux.',
    metricBefore: 0,
    metricAfter: 100,
    metricLabel: 'Abonnés'
  },
  { 
    id: '2', 
    date: 'Mars 2022', 
    title: 'Première publication virale', 
    description: 'Ma chorégraphie sur "Running Up That Hill" a été partagée par plusieurs influenceurs.',
    metricBefore: 2500,
    metricAfter: 15000,
    metricLabel: 'Vues'
  },
  { 
    id: '3', 
    date: 'Juin 2022', 
    title: 'Niveau Argent atteint', 
    description: 'Franchissement du palier de 10 000 abonnés et qualification pour le programme de monétisation Silver.',
    metricBefore: 9800,
    metricAfter: 12000,
    metricLabel: 'Abonnés'
  },
  { 
    id: '4', 
    date: 'Sept 2022', 
    title: 'Collaboration avec XVush', 
    description: 'Sélection comme ambassadrice pour la nouvelle campagne de danse de la plateforme.',
    metricBefore: 5000,
    metricAfter: 18500,
    metricLabel: 'Revenus ($)'
  },
  { 
    id: '5', 
    date: 'Déc 2022', 
    title: 'Niveau Or atteint', 
    description: 'Franchissement du palier des 20 000 abonnés et qualification pour le programme Gold avec 80% de partage de revenus.',
    metricBefore: 19500,
    metricAfter: 23800,
    metricLabel: 'Abonnés'
  }
];

const feedbackMessages = [
  {
    id: '1',
    username: 'dance_lover',
    message: "Ton dernier tutoriel de danse était incroyable ! J'ai tout de suite réussi les mouvements grâce à tes explications.",
    timestamp: 'il y a 2 heures',
    type: 'comment'
  },
  {
    id: '2',
    username: 'photo_gal',
    message: "Les couleurs dans ta dernière séance photo sont à tomber. Quel appareil utilises-tu ?",
    timestamp: 'il y a 5 heures',
    type: 'comment'
  },
  {
    id: '3',
    username: 'mike_j',
    message: "Est-ce que tu pourrais faire un tutoriel sur les techniques de pose en photographie ?",
    timestamp: 'hier',
    type: 'request'
  },
  {
    id: '4',
    username: 'dance_academy',
    message: "Nous adorerions te voir collaborer avec notre école pour un workshop en ligne !",
    timestamp: 'il y a 2 jours',
    type: 'request'
  },
  {
    id: '5',
    username: 'fashionista',
    message: "Tu es tellement inspirante ! J'adore chacune de tes publications.",
    timestamp: 'il y a 3 jours',
    type: 'appreciation'
  },
  {
    id: '6',
    username: 'creative_soul',
    message: "Ta créativité me donne envie de me dépasser chaque jour. Merci pour ton travail !",
    timestamp: 'il y a 5 jours',
    type: 'appreciation'
  }
];

const premiumContent = [
  { id: '1', title: 'Tutoriel Danse Contemporaine Vol. 1', type: 'premium', category: 'danse', views: 18500 },
  { id: '2', title: 'Séance Photo Behind The Scenes', type: 'premium', category: 'photo', views: 12700 },
  { id: '3', title: 'Routine d\'Échauffement Pro', type: 'standard', category: 'fitness', views: 9400 },
  { id: '4', title: 'Masterclass Expression Corporelle', type: 'vip', category: 'danse', views: 7600 },
  { id: '5', title: 'Pack Lightroom Signature', type: 'premium', category: 'photo', views: 15300 },
  { id: '6', title: 'Interview Exclusive Avec Chorégraphe', type: 'vip', category: 'interviews', views: 6200 },
  { id: '7', title: 'Tutoriel Effets Spéciaux Photo', type: 'premium', category: 'photo', views: 11800 },
  { id: '8', title: 'Cours Privé Danse Fusion', type: 'vip', category: 'danse', views: 8900 }
];

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
        name={creatorData.name}
        username={creatorData.username}
        avatar={creatorData.avatar}
        bio={creatorData.bio}
        tier={creatorData.tier}
        metrics={creatorData.metrics}
        upcomingEvent={eventData}
        onSubscribeToEvent={handleSubscribeToEvent}
        onFollow={handleFollow}
        isFollowing={isFollowing}
        isOnline={creatorData.isOnline}
      />
      
      <div className="mt-8">
        <Tabs defaultValue="gallery" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="gallery">Galerie</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
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
            
            <TabsContent value="profile" className="mt-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <CreatorDNA 
                    creatorName={creatorData.name}
                    creatorSkills={creatorSkills}
                    creatorStyle={creatorStyle}
                    creatorAchievements={creatorAchievements}
                  />
                  
                  <ValueVault premiumContent={premiumContent} />
                </div>
                
                <div className="space-y-6">
                  <CreatorJourney milestones={journeyMilestones} />
                  
                  <FeedbackLoop 
                    feedbackMessages={feedbackMessages}
                    isCreator={false}
                  />
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
