
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Edit, Settings, UserCircle } from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const userData = {
    name: 'Jean Dupont',
    username: 'jean_dupont',
    email: 'jean.dupont@exemple.com',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    joinDate: 'Janvier 2023',
    bio: 'Passionné de contenu créatif et d\'expériences immersives.',
    website: 'www.jeandupont.fr',
    location: 'Paris, France',
    subscriptions: [],
    favorites: [],
    history: [],
  };

  // Mock subscription data
  const subscriptions = [
    { id: 1, name: 'Sophie Dream', avatar: 'https://picsum.photos/seed/creator1/200/200', tier: 'Premium' },
    { id: 2, name: 'Max Immersion', avatar: 'https://picsum.photos/seed/creator2/200/200', tier: 'VIP' },
    { id: 3, name: 'Léa Créative', avatar: 'https://picsum.photos/seed/creator3/200/200', tier: 'Standard' },
  ];

  // Mock favorite content
  const favorites = [
    { id: 1, title: 'Voyage Immersif', creator: 'Sophie Dream', thumbnail: 'https://picsum.photos/seed/video1/300/150' },
    { id: 2, title: 'Expérience Sonore', creator: 'Max Immersion', thumbnail: 'https://picsum.photos/seed/video2/300/150' },
    { id: 3, title: 'Méditation Guidée', creator: 'Léa Créative', thumbnail: 'https://picsum.photos/seed/video3/300/150' },
  ];

  // Mock watch history
  const history = [
    { id: 1, title: 'Tutorial Immersif', creator: 'Max Immersion', thumbnail: 'https://picsum.photos/seed/video4/300/150', watched: '80%' },
    { id: 2, title: 'Secrets de Paris', creator: 'Sophie Dream', thumbnail: 'https://picsum.photos/seed/video5/300/150', watched: '100%' },
    { id: 3, title: 'Création 3D', creator: 'Léa Créative', thumbnail: 'https://picsum.photos/seed/video6/300/150', watched: '45%' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback><UserCircle className="w-full h-full" /></AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
                <p className="text-muted-foreground mb-4">@{userData.username}</p>
                <p className="mb-6">{userData.bio}</p>
                <div className="w-full flex gap-2">
                  <Button className="flex-1">
                    <Edit className="mr-2 h-4 w-4" /> Éditer
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" /> Paramètres
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Membre depuis</p>
                    <p className="font-medium">{userData.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Abonnements</p>
                    <p className="font-medium">{subscriptions.length}</p>
                  </div>
                </div>
              </div>
              
              {userData.location || userData.website ? (
                <div className="mt-6 pt-6 border-t">
                  {userData.location && (
                    <div className="mb-2">
                      <p className="text-muted-foreground text-sm">Localisation</p>
                      <p>{userData.location}</p>
                    </div>
                  )}
                  {userData.website && (
                    <div>
                      <p className="text-muted-foreground text-sm">Site web</p>
                      <a href={`https://${userData.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {userData.website}
                      </a>
                    </div>
                  )}
                </div>
              ) : null}
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="subscriptions" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
                <TabsTrigger value="favorites">Favoris</TabsTrigger>
                <TabsTrigger value="history">Historique</TabsTrigger>
              </TabsList>
              
              <TabsContent value="subscriptions">
                {subscriptions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {subscriptions.map(sub => (
                      <Card key={sub.id} className="p-4 flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={sub.avatar} alt={sub.name} />
                          <AvatarFallback>{sub.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <p className="font-medium">{sub.name}</p>
                          <p className="text-sm text-muted-foreground">Abonnement {sub.tier}</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/performer/${sub.id}`}>
                            Voir
                          </Link>
                        </Button>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Vous n'avez pas encore d'abonnements.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/creators">Découvrir des créateurs</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="favorites">
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map(fav => (
                      <Card key={fav.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <img src={fav.thumbnail} alt={fav.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium">{fav.title}</h3>
                          <p className="text-sm text-muted-foreground">{fav.creator}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Vous n'avez pas encore de favoris.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/">Explorer du contenu</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history">
                {history.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {history.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                            <div className="bg-primary h-full" style={{ width: item.watched }}></div>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.creator}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Vous n'avez pas encore d'historique.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/">Découvrir du contenu</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
