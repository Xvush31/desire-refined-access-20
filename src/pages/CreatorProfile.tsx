
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Calendar, 
  Users, 
  ImageIcon, 
  Video, 
  ClipboardList 
} from "lucide-react";

const CreatorProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Cover Image */}
        <div className="h-64 md:h-80 bg-gradient-to-r from-pink-400 to-purple-500 rounded-b-xl relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Info */}
        <div className="px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Avatar with Story Ring */}
            <div className="story-ring flex-shrink-0">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white dark:border-zinc-900">
                <AvatarImage src="https://i.pravatar.cc/300?img=35" />
                <AvatarFallback className="bg-pink-500 text-white text-4xl">JD</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      Jessica Dubois
                    </h1>
                    <Badge className="premium-badge ml-2">Créatrice Premium</Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    @jessicadubois • Créatrice de contenu lifestyle
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button className="bg-pink-600 hover:bg-pink-700">
                    <Heart className="mr-2 h-4 w-4" /> S'abonner
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" /> Message
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium mr-1">24.5K</span>
                  <span className="text-gray-500 dark:text-gray-400">abonnés</span>
                </div>
                <div className="flex items-center">
                  <ImageIcon className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium mr-1">142</span>
                  <span className="text-gray-500 dark:text-gray-400">photos</span>
                </div>
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium mr-1">38</span>
                  <span className="text-gray-500 dark:text-gray-400">vidéos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="max-w-3xl mt-6 text-gray-700 dark:text-gray-300">
            <p>Créatrice lifestyle partageant mes voyages, ma routine bien-être et mes moments de vie. 
              J'adore interagir avec ma communauté et partager des astuces pour une vie épanouie. 
              ✨ Nouvelle collection de photos disponible pour les abonnés premium!</p>
          </div>

          {/* Content Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="photos">
              <TabsList className="mb-8 bg-gray-100 dark:bg-zinc-800 p-1">
                <TabsTrigger value="photos" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" /> Photos
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video className="h-4 w-4" /> Vidéos
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Calendrier
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" /> À propos
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="photos" className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden group relative">
                      <img 
                        src={`https://picsum.photos/500/500?random=${i+10}`} 
                        alt="Content" 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {i % 3 === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Badge className="premium-badge">Premium</Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="videos">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-video bg-gray-200 dark:bg-zinc-800 rounded-lg overflow-hidden relative group">
                      <img 
                        src={`https://picsum.photos/600/400?random=${i+20}`} 
                        alt="Video thumbnail" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                        3:42
                      </div>
                      {i % 4 === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Badge className="premium-badge">Premium</Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="calendar">
                <div className="bg-white dark:bg-zinc-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Événements à venir</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="text-center">
                        <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 font-bold rounded-lg p-2 min-w-12">
                          <div className="text-xs">MAI</div>
                          <div className="text-xl">15</div>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold">Live Streaming Q&A</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">20:00 - 21:30</p>
                        <p className="text-sm text-gray-500 mt-1">Session interactive avec mes abonnés</p>
                      </div>
                      <Button variant="outline" size="sm">Rappel</Button>
                    </div>
                    
                    <div className="flex gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="text-center">
                        <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 font-bold rounded-lg p-2 min-w-12">
                          <div className="text-xs">MAI</div>
                          <div className="text-xl">22</div>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold">Lancement Collection Été</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">12:00</p>
                        <p className="text-sm text-gray-500 mt-1">Nouvelles photos exclusives pour mes abonnés premium</p>
                      </div>
                      <Badge className="premium-badge self-start">Premium</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="about">
                <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 max-w-3xl">
                  <h3 className="text-xl font-semibold mb-4">À propos de moi</h3>
                  <div className="space-y-4">
                    <p>
                      Passionnée de photographie et de voyage, je partage avec vous mon univers coloré et inspirant.
                      Après des études en communication visuelle, j'ai décidé de me consacrer pleinement à la création de contenu.
                    </p>
                    <p>
                      Mon objectif est de vous inspirer au quotidien à travers mes contenus lifestyle, mes voyages et mes collaborations avec différentes marques.
                      Je suis ravie de pouvoir partager cette aventure avec vous !
                    </p>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold mb-2">Mes formules d'abonnement</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-gray-50 dark:bg-zinc-700/40 rounded-lg">
                          <div>
                            <p className="font-medium">Standard</p>
                            <p className="text-sm text-gray-500">Accès aux contenus publics</p>
                          </div>
                          <p className="font-semibold">Gratuit</p>
                        </div>
                        
                        <div className="flex justify-between p-3 bg-gradient-to-r from-pink-500/10 to-pink-500/5 dark:from-pink-900/20 dark:to-pink-900/10 rounded-lg border border-pink-200 dark:border-pink-900/50">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">Premium</p>
                              <Badge className="premium-badge">Populaire</Badge>
                            </div>
                            <p className="text-sm text-gray-500">Accès à tous mes contenus exclusifs</p>
                          </div>
                          <p className="font-semibold">9,99€/mois</p>
                        </div>
                        
                        <div className="flex justify-between p-3 bg-gradient-to-r from-purple-500/10 to-purple-500/5 dark:from-purple-900/20 dark:to-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-900/50">
                          <div>
                            <p className="font-medium">VIP</p>
                            <p className="text-sm text-gray-500">Accès VIP + messages personnalisés</p>
                          </div>
                          <p className="font-semibold">24,99€/mois</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
