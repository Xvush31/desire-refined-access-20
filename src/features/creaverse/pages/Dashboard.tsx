
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Settings, BarChart, CalendarDays, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import EnhancedAnalytics from "../components/dashboard/EnhancedAnalytics";
import ContentScheduler from "../components/dashboard/ContentScheduler";

const Dashboard = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("analytics");
  
  // Simulate performerId from auth
  const performerId = currentUser?.uid ? parseInt(currentUser.uid) : 1;
  const bgClass = theme === 'light' ? 'bg-gray-100' : 'bg-black';
  
  return (
    <div className={`min-h-screen ${bgClass} p-4`}>
      <div className="container mx-auto max-w-7xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/creaverse-app/performer/1" className="mr-4">
              <Button variant="ghost" size="icon">
                <ChevronLeft size={24} />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord Créateur</h1>
              <p className="text-muted-foreground">Gérez et optimisez votre présence CreaVerse</p>
            </div>
          </div>
          
          <Button variant="outline" size="icon">
            <Settings size={20} />
          </Button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className={theme === 'light' ? 'bg-white' : 'bg-zinc-900'}>
              <CardHeader>
                <CardTitle className="text-xl">Aperçu du Jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Vues</p>
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-2xl font-bold">1,245</h3>
                      <span className="text-green-500 text-sm">+12.5%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Revenus</p>
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-2xl font-bold">287€</h3>
                      <span className="text-green-500 text-sm">+8.3%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Nouveaux abonnés</p>
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-2xl font-bold">24</h3>
                      <span className="text-green-500 text-sm">+15.2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={theme === 'light' ? 'bg-white' : 'bg-zinc-900'}>
              <CardHeader>
                <CardTitle className="text-lg">Messages directs</CardTitle>
                <CardDescription>14 nouveaux messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full flex items-center justify-between">
                  <span className="flex items-center">
                    <MessageSquare size={16} className="mr-2" />
                    Boîte de réception
                  </span>
                  <span className="bg-brand-red text-white text-xs py-0.5 px-2 rounded-full">14</span>
                </Button>
                
                <Button variant="ghost" className="w-full flex items-center justify-between">
                  <span className="flex items-center">
                    <Users size={16} className="mr-2" />
                    Fans VIP
                  </span>
                  <span className="bg-muted text-muted-foreground text-xs py-0.5 px-2 rounded-full">3</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card className={theme === 'light' ? 'bg-white' : 'bg-zinc-900'}>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users size={16} className="mr-2" />
                  Envoyer une notification
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <CalendarDays size={16} className="mr-2" />
                  Programmer un live
                </Button>
                
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                  Publier du contenu
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-9">
            <Tabs 
              defaultValue="analytics" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="mb-6">
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-3">
                  <TabsTrigger value="analytics" className="flex items-center">
                    <BarChart size={16} className="mr-2" />
                    Statistiques Avancées
                  </TabsTrigger>
                  <TabsTrigger value="scheduler" className="flex items-center">
                    <CalendarDays size={16} className="mr-2" />
                    Planification
                  </TabsTrigger>
                  <TabsTrigger value="audience" className="flex items-center">
                    <Users size={16} className="mr-2" />
                    Audience
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className={theme === 'light' ? 'bg-white' : 'bg-zinc-900'} style={{ borderRadius: '0.75rem' }}>
                <div className="p-6">
                  <TabsContent value="analytics">
                    <EnhancedAnalytics performerId={performerId} />
                  </TabsContent>
                  
                  <TabsContent value="scheduler">
                    <ContentScheduler performerId={performerId} />
                  </TabsContent>
                  
                  <TabsContent value="audience">
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold mb-4">Analyse d'Audience</h2>
                      <p className="text-muted-foreground">
                        L'analyse approfondie d'audience est en cours d'implémentation. Revenez bientôt pour découvrir des insights détaillés sur vos fans et leurs comportements.
                      </p>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
