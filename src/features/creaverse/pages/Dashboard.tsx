
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProfileSection from "../components/header/ProfileSection";
import HeaderInfo from "../components/header/HeaderInfo";
import CreatorMetrics from "../components/header/CreatorMetrics";
import TierProgressBar from "../components/header/TierProgressBar";
import RevenueSection from "../components/header/RevenueSection";

const Dashboard = () => {
  // Mock data for the dashboard
  const creatorData = {
    name: "Marie Créatrice",
    username: "mariecreation",
    bio: "Créatrice de contenu digital et spécialiste en lifestyle",
    tier: "gold" as const,
    avatar: "https://i.pravatar.cc/150?img=23",
    isOnline: true,
    tierProgress: 75,
    metrics: {
      followers: 24500,
      following: 143,
      superfans: 230,
      retentionRate: 92,
      watchMinutes: 45600
    },
    revenue: 3450,
    growthRate: 8.5,
    upcomingEvent: {
      title: "Live Q&A Session",
      time: "Today at 8PM",
      type: "live" as const,
      countdown: "Starts in 3h 24min"
    }
  };
  
  const handleSubscribe = () => {
    console.log("Subscribe button clicked");
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <Button asChild variant="outline" size="sm">
          <Link to="/creaverse-app/">Retour à l'accueil</Link>
        </Button>
      </div>
      
      <Card className="creaverse-glass-card mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/5">
              <ProfileSection
                avatar={creatorData.avatar}
                isOnline={creatorData.isOnline}
                name={creatorData.name}
              />
            </div>
            
            <div className="md:w-3/5 space-y-6">
              <HeaderInfo
                name={creatorData.name}
                username={creatorData.username}
                bio={creatorData.bio}
                tier={creatorData.tier}
              />
              
              <CreatorMetrics metrics={creatorData.metrics} />
              
              <TierProgressBar tier={creatorData.tier} progress={creatorData.tierProgress} />
            </div>
            
            <div className="md:w-1/5">
              <RevenueSection
                isCreator={true}
                revenue={creatorData.revenue}
                growthRate={creatorData.growthRate}
                upcomingEvent={creatorData.upcomingEvent}
                onSubscribe={handleSubscribe}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="creaverse-glass-card">
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Vue d'ensemble de vos statistiques</p>
          </CardContent>
        </Card>
        
        <Card className="creaverse-glass-card">
          <CardHeader>
            <CardTitle>Contenu</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gérez votre contenu</p>
          </CardContent>
        </Card>
        
        <Card className="creaverse-glass-card">
          <CardHeader>
            <CardTitle>Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Suivez vos revenus</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
