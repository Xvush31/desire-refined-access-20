
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Home, 
  BarChart2, 
  Users, 
  Heart, 
  Image, 
  Video
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-pink-600">CreatorVerse</span> par XVush
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Gérez votre présence en ligne, connectez-vous avec vos fans et développez votre audience
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/creator">
            <Card className="hover:shadow-lg transition-all h-full">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center mb-4">
                  <Home className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Profil Créateur</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Votre profil public et contenu
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard">
            <Card className="hover:shadow-lg transition-all h-full">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <BarChart2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Statistiques et analytics
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/subscribers">
            <Card className="hover:shadow-lg transition-all h-full">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Abonnés</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Gérez vos fans et abonnements
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Activity Summary */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Activité Récente</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
                <Heart className="text-pink-500" />
                <div className="flex-grow">
                  <p className="font-medium">12 nouveaux fans cette semaine</p>
                </div>
                <Badge>+15%</Badge>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
                <Image className="text-blue-500" />
                <div className="flex-grow">
                  <p className="font-medium">3 nouveaux posts ont généré de l'engagement</p>
                </div>
                <Badge>Hot 🔥</Badge>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
                <Video className="text-purple-500" />
                <div className="flex-grow">
                  <p className="font-medium">Votre vidéo a atteint 1000 vues</p>
                </div>
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">Trending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Preview */}
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="flex-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Calendrier</h3>
                <Link to="/calendar">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Voir tout
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Session photo</p>
                    <p className="text-sm text-gray-500">13 Mai, 14:00</p>
                  </div>
                  <Badge variant="outline">À venir</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Live streaming</p>
                    <p className="text-sm text-gray-500">15 Mai, 20:00</p>
                  </div>
                  <Badge variant="outline">Planifié</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Fans */}
          <Card className="flex-1">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Top Fans</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Fan" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jean Pierre</p>
                    <p className="text-sm text-gray-500">Premium · 6 mois</p>
                  </div>
                  <Badge className="ml-auto gold-badge">VIP</Badge>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Fan" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Sophie Martin</p>
                    <p className="text-sm text-gray-500">Premium · 4 mois</p>
                  </div>
                  <Badge className="ml-auto premium-badge">Premium</Badge>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=8" alt="Fan" />
                    <AvatarFallback>TD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Thomas Dubois</p>
                    <p className="text-sm text-gray-500">Standard · 2 mois</p>
                  </div>
                  <Badge className="ml-auto" variant="outline">Fan</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
