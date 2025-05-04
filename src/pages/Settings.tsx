
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [ghostMode, setGhostMode] = useState(false);

  const handleSaveSettings = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success('Paramètres enregistrés avec succès');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="account">Compte</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Informations du Compte</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">Nom d'utilisateur</label>
                  <Input id="username" defaultValue="user123" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" type="email" defaultValue="exemple@mail.com" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Changer le mot de passe</label>
                  <Input id="password" type="password" placeholder="Nouveau mot de passe" />
                </div>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Préférences de Notifications</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications Push</p>
                    <p className="text-sm text-muted-foreground">Recevoir des notifications push sur votre appareil</p>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications par Email</p>
                    <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Enregistrer les préférences'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Confidentialité</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compte Privé</p>
                    <p className="text-sm text-muted-foreground">Seuls vos abonnés peuvent voir votre activité</p>
                  </div>
                  <Switch
                    checked={privateAccount}
                    onCheckedChange={setPrivateAccount}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mode Fantôme</p>
                    <p className="text-sm text-muted-foreground">Naviguer en toute discrétion</p>
                  </div>
                  <Switch
                    checked={ghostMode}
                    onCheckedChange={setGhostMode}
                  />
                </div>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Enregistrer les préférences'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authentification à Deux Facteurs</p>
                    <p className="text-sm text-muted-foreground">Sécurisez votre compte avec une vérification supplémentaire</p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                <div>
                  <p className="font-medium mb-2">Sessions Actives</p>
                  <p className="text-sm text-muted-foreground mb-4">Gérez les appareils connectés à votre compte</p>
                  <Button variant="outline">Voir les sessions actives</Button>
                </div>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Enregistrer les paramètres'}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
