import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import ProfileAvatar from '../components/creator/ProfileAvatar';
import { ChevronLeft, Save, Shield, Bell, Eye, EyeOff, Trash2, Upload, Globe, Lock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreatorSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock creator data
  const [creatorData, setCreatorData] = useState({
    name: 'Lola Mystik',
    username: 'lola_mystik',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&q=80',
    bio: 'Artiste passionnée et créative, je partage mes chorégraphies exclusives et moments privés avec mes abonnés. Rejoignez mon univers !',
    email: 'lola@example.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    website: 'www.lolamystik.com',
    notifications: {
      newSubscriber: true,
      newComment: true,
      newMessage: true,
      promotions: false,
      tips: true
    },
    privacy: {
      profileVisibility: 'public',
      activityStatus: true,
      showRevenue: false,
      allowTagging: true,
      allowSharing: true
    }
  });
  
  const handleInputChange = (field: string, value: string) => {
    setCreatorData({
      ...creatorData,
      [field]: value
    });
  };
  
  const handleNotificationChange = (field: string, value: boolean) => {
    setCreatorData({
      ...creatorData,
      notifications: {
        ...creatorData.notifications,
        [field]: value
      }
    });
  };
  
  const handlePrivacyChange = (field: string, value: any) => {
    setCreatorData({
      ...creatorData,
      privacy: {
        ...creatorData.privacy,
        [field]: value
      }
    });
  };
  
  const handleSaveChanges = () => {
    toast.success('Paramètres sauvegardés avec succès');
  };
  
  const handleDeleteAccount = () => {
    toast.error('Cette fonctionnalité est désactivée en mode démo');
  };
  
  const handleAvatarChange = () => {
    toast.info('Fonctionnalité de changement d\'avatar en développement');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={18} />
        </Button>
        <h1 className="text-2xl font-bold">Paramètres du profil</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <ProfileAvatar
                src={creatorData.avatar}
                alt={creatorData.name}
                size="xl"
                hasStory={false}
              />
              <Button 
                size="sm" 
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                onClick={handleAvatarChange}
              >
                <Upload size={14} />
              </Button>
            </div>
            <h2 className="font-medium">{creatorData.name}</h2>
            <p className="text-sm text-muted-foreground">@{creatorData.username}</p>
          </div>
          
          <Tabs 
            defaultValue="profile" 
            orientation="vertical" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
              <TabsTrigger value="profile" className="justify-start">
                Profil
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="justify-start">
                Confidentialité
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start">
                Sécurité
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div>
          <TabsContent value="profile" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations personnelles et publiques
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input 
                      id="name" 
                      value={creatorData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <Input 
                      id="username" 
                      value={creatorData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea 
                    id="bio" 
                    rows={4}
                    value={creatorData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={creatorData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      value={creatorData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation</Label>
                    <Input 
                      id="location" 
                      value={creatorData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Site web</Label>
                    <Input 
                      id="website" 
                      value={creatorData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveChanges}>
                    <Save size={16} className="mr-2" />
                    Sauvegarder les modifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notifications</CardTitle>
                <CardDescription>
                  Configurez comment et quand vous souhaitez être notifié
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Nouveaux abonnés</h3>
                    <p className="text-sm text-muted-foreground">Soyez notifié lorsque quelqu'un s'abonne à votre profil</p>
                  </div>
                  <Switch 
                    checked={creatorData.notifications.newSubscriber}
                    onCheckedChange={(checked) => handleNotificationChange('newSubscriber', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Nouveaux commentaires</h3>
                    <p className="text-sm text-muted-foreground">Soyez notifié lorsque quelqu'un commente votre contenu</p>
                  </div>
                  <Switch 
                    checked={creatorData.notifications.newComment}
                    onCheckedChange={(checked) => handleNotificationChange('newComment', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Nouveaux messages</h3>
                    <p className="text-sm text-muted-foreground">Soyez notifié lorsque vous recevez un message privé</p>
                  </div>
                  <Switch 
                    checked={creatorData.notifications.newMessage}
                    onCheckedChange={(checked) => handleNotificationChange('newMessage', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Promotions et offres</h3>
                    <p className="text-sm text-muted-foreground">Recevez des notifications sur les offres spéciales</p>
                  </div>
                  <Switch 
                    checked={creatorData.notifications.promotions}
                    onCheckedChange={(checked) => handleNotificationChange('promotions', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Conseils et astuces</h3>
                    <p className="text-sm text-muted-foreground">Recevez des conseils pour améliorer votre profil</p>
                  </div>
                  <Switch 
                    checked={creatorData.notifications.tips}
                    onCheckedChange={(checked) => handleNotificationChange('tips', checked)}
                  />
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveChanges}>
                    <Save size={16} className="mr-2" />
                    Sauvegarder les préférences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de confidentialité</CardTitle>
                <CardDescription>
                  Gérez qui peut voir votre profil et votre contenu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Visibilité du profil</Label>
                  <Select 
                    value={creatorData.privacy.profileVisibility}
                    onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                  >
                    <SelectTrigger id="profileVisibility" className="w-full">
                      <SelectValue placeholder="Sélectionnez la visibilité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center">
                          <Globe size={16} className="mr-2" />
                          Public - Visible par tous
                        </div>
                      </SelectItem>
                      <SelectItem value="followers">
                        <div className="flex items-center">
                          <Users size={16} className="mr-2" />
                          Abonnés - Visible par les abonnés uniquement
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center">
                          <Lock size={16} className="mr-2" />
                          Privé - Visible sur invitation uniquement
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Statut d'activité</h3>
                    <p className="text-sm text-muted-foreground">Montrer quand vous êtes en ligne</p>
                  </div>
                  <Switch 
                    checked={creatorData.privacy.activityStatus}
                    onCheckedChange={(checked) => handlePrivacyChange('activityStatus', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Afficher les revenus</h3>
                    <p className="text-sm text-muted-foreground">Permettre aux autres de voir vos statistiques de revenus</p>
                  </div>
                  <Switch 
                    checked={creatorData.privacy.showRevenue}
                    onCheckedChange={(checked) => handlePrivacyChange('showRevenue', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Autoriser le tagging</h3>
                    <p className="text-sm text-muted-foreground">Permettre aux autres de vous identifier dans leur contenu</p>
                  </div>
                  <Switch 
                    checked={creatorData.privacy.allowTagging}
                    onCheckedChange={(checked) => handlePrivacyChange('allowTagging', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Autoriser le partage</h3>
                    <p className="text-sm text-muted-foreground">Permettre aux autres de partager votre contenu</p>
                  </div>
                  <Switch 
                    checked={creatorData.privacy.allowSharing}
                    onCheckedChange={(checked) => handlePrivacyChange('allowSharing', checked)}
                  />
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveChanges}>
                    <Save size={16} className="mr-2" />
                    Sauvegarder les paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>
                  Gérez la sécurité de votre compte et vos options de connexion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Changer le mot de passe</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button className="mt-2">
                    <Shield size={16} className="mr-2" />
                    Mettre à jour le mot de passe
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Authentification à deux facteurs</h3>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </p>
                  <Button variant="outline">
                    <Shield size={16} className="mr-2" />
                    Configurer l'authentification à deux facteurs
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Sessions actives</h3>
                  <p className="text-sm text-muted-foreground">
                    Gérez les appareils connectés à votre compte
                  </p>
                  <Button variant="outline">
                    <Eye size={16} className="mr-2" />
                    Voir les sessions actives
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium text-destructive">Zone de danger</h3>
                  <p className="text-sm text-muted-foreground">
                    Ces actions sont irréversibles, procédez avec prudence
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="border-destructive text-destructive">
                      <EyeOff size={16} className="mr-2" />
                      Masquer temporairement le profil
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 size={16} className="mr-2" />
                      Supprimer le compte
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default CreatorSettings;
