
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, TrendingUp, CircleDollarSign, Video, Users, Eye } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { fetchPerformerData } from "../api/performers";
import { PerformerData } from "../types/performer";

// Composants pour le tableau de bord
import CreatorStats from "../components/dashboard/CreatorStats";
import ContentInsights from "../components/dashboard/ContentInsights";
import AudienceAnalytics from "../components/dashboard/AudienceAnalytics";
import MonetizationTools from "../components/dashboard/MonetizationTools";

const CreatorDashboard: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const [performer, setPerformer] = useState<PerformerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stats");
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [showRevenue, setShowRevenue] = useState(true);
  
  React.useEffect(() => {
    const loadPerformerData = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformerData(performerId || "1");
        setPerformer(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Impossible de charger les données du créateur");
      } finally {
        setLoading(false);
      }
    };
    
    loadPerformerData();
  }, [performerId]);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }
  
  if (!performer) {
    return <div className="flex items-center justify-center min-h-screen">Créateur non trouvé</div>;
  }
  
  // Vérifier que l'utilisateur actuel est bien le propriétaire du profil
  const isOwner = currentUser && currentUser.uid === performer.id.toString();
  
  if (!isOwner) {
    return <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Accès non autorisé</h2>
      <p className="mb-4">Vous n'êtes pas autorisé à consulter ce tableau de bord</p>
      <Button asChild>
        <Link to={`/performer/${performerId}`}>Retourner au profil</Link>
      </Button>
    </div>;
  }
  
  const bgClass = theme === 'light' ? 'bg-gray-100' : 'bg-black';
  const secondaryBgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-800';
  
  return (
    <div className={`min-h-screen ${bgClass}`}>
      <header className={`sticky top-0 z-10 ${secondaryBgClass} p-4 border-b ${borderClass} flex items-center justify-between`}>
        <div className="flex items-center">
          <Link to={`/performer/${performerId}`} className="mr-4">
            <ArrowLeft size={24} className="text-primary" />
          </Link>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 border-2 border-brand-red mr-3">
              <AvatarImage src={performer.image} />
              <AvatarFallback>
                {performer.displayName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h1 className="text-lg font-bold">{performer.displayName}</h1>
                <Badge variant="outline" className="ml-2 animated-gradient-bg text-white">
                  Tier {performer.tier.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Tableau de bord Créateur</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Settings size={22} />
        </Button>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {/* Sommaire des revenus */}
        <div className={`${secondaryBgClass} p-4 rounded-lg shadow-sm mb-6`}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Revenus du mois</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center" 
              onClick={() => setShowRevenue(!showRevenue)}
            >
              {showRevenue ? <Eye size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
              {showRevenue ? "Masquer" : "Afficher"}
            </Button>
          </div>
          
          {showRevenue && (
            <>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${performer.stats.monthlyRevenue}</span>
                <span className={`ml-2 text-sm ${performer.stats.monthlyRevenueChange >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  <TrendingUp size={14} className="mr-1" />
                  {performer.stats.monthlyRevenueChange > 0 && '+'}
                  {performer.stats.monthlyRevenueChange}%
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-muted/20 p-3 rounded-lg">
                  <CircleDollarSign size={18} className="mb-1 text-brand-red" />
                  <p className="text-xs text-muted-foreground">Abonnements</p>
                  <p className="font-semibold">${Math.round(performer.stats.monthlyRevenue * 0.65)}</p>
                </div>
                <div className="bg-muted/20 p-3 rounded-lg">
                  <Video size={18} className="mb-1 text-brand-red" />
                  <p className="text-xs text-muted-foreground">Contenus Premium</p>
                  <p className="font-semibold">${Math.round(performer.stats.monthlyRevenue * 0.25)}</p>
                </div>
                <div className="bg-muted/20 p-3 rounded-lg">
                  <Users size={18} className="mb-1 text-brand-red" />
                  <p className="text-xs text-muted-foreground">Pourboires</p>
                  <p className="font-semibold">${Math.round(performer.stats.monthlyRevenue * 0.10)}</p>
                </div>
              </div>
            </>
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`${secondaryBgClass} w-full grid grid-cols-4 mb-6`}>
            <TabsTrigger value="stats">
              <TrendingUp size={16} className="mr-1" />
              <span>Statistiques</span>
            </TabsTrigger>
            <TabsTrigger value="content">
              <Video size={16} className="mr-1" />
              <span>Contenu</span>
            </TabsTrigger>
            <TabsTrigger value="audience">
              <Users size={16} className="mr-1" />
              <span>Audience</span>
            </TabsTrigger>
            <TabsTrigger value="monetization">
              <CircleDollarSign size={16} className="mr-1" />
              <span>Monétisation</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats">
            <CreatorStats performer={performer} />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentInsights performerId={performer.id} />
          </TabsContent>
          
          <TabsContent value="audience">
            <AudienceAnalytics performerId={performer.id} />
          </TabsContent>
          
          <TabsContent value="monetization">
            <MonetizationTools performerId={performer.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CreatorDashboard;
