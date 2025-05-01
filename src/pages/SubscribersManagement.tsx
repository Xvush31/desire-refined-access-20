
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Settings, 
  MessageCircle, 
  Filter, 
  Download,
  CalendarClock,
  CreditCard,
  DollarSign,
  Heart,
  TrendingUp,
  User,
  ShieldCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for subscribers
const subscribers = [
  { 
    id: 1, 
    name: "Jean Pierre", 
    username: "jpierre", 
    avatar: "https://i.pravatar.cc/150?img=1", 
    plan: "vip", 
    subscriptionDate: "15/11/2024",
    revenue: "149.94€",
    messages: 23,
    status: "active",
    lastActive: "Il y a 2 heures"
  },
  { 
    id: 2, 
    name: "Sophie Martin", 
    username: "sophiem", 
    avatar: "https://i.pravatar.cc/150?img=5", 
    plan: "premium", 
    subscriptionDate: "03/01/2025",
    revenue: "49.95€",
    messages: 12,
    status: "active",
    lastActive: "Il y a 1 jour"
  },
  { 
    id: 3, 
    name: "Thomas Dubois", 
    username: "tdubois", 
    avatar: "https://i.pravatar.cc/150?img=8", 
    plan: "standard", 
    subscriptionDate: "22/02/2025",
    revenue: "0€",
    messages: 3,
    status: "active",
    lastActive: "Il y a 3 jours"
  },
  { 
    id: 4, 
    name: "Claire Bernard", 
    username: "cbernard", 
    avatar: "https://i.pravatar.cc/150?img=9", 
    plan: "premium", 
    subscriptionDate: "08/12/2024",
    revenue: "39.96€",
    messages: 8,
    status: "active",
    lastActive: "Il y a 5 heures"
  },
  { 
    id: 5, 
    name: "Michel Lambert", 
    username: "mlambert", 
    avatar: "https://i.pravatar.cc/150?img=12", 
    plan: "premium", 
    subscriptionDate: "14/04/2025",
    revenue: "9.99€",
    messages: 0,
    status: "active",
    lastActive: "Aujourd'hui"
  },
  { 
    id: 6, 
    name: "Isabelle Fontaine", 
    username: "ifontaine", 
    avatar: "https://i.pravatar.cc/150?img=13", 
    plan: "vip", 
    subscriptionDate: "29/10/2024",
    revenue: "174.93€",
    messages: 31,
    status: "active",
    lastActive: "Il y a 1 heure"
  },
  { 
    id: 7, 
    name: "Antoine Dufresne", 
    username: "adufresne", 
    avatar: "https://i.pravatar.cc/150?img=30", 
    plan: "standard", 
    subscriptionDate: "05/03/2025",
    revenue: "15€",
    messages: 5,
    status: "inactive",
    lastActive: "Il y a 2 semaines"
  },
  { 
    id: 8, 
    name: "Marie Rousseau", 
    username: "mrousseau", 
    avatar: "https://i.pravatar.cc/150?img=32", 
    plan: "premium", 
    subscriptionDate: "17/01/2025",
    revenue: "59.94€",
    messages: 18,
    status: "active",
    lastActive: "Hier"
  },
];

const SubscribersManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Abonnés</h1>
            <p className="text-gray-600 dark:text-gray-300">Gérez vos abonnés et vos formules d'abonnement</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total abonnés</p>
                  <h3 className="text-2xl font-bold">1,932</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenus mensuels</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">12,450€</h3>
                    <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">+8%</Badge>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Taux de rétention</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">92.4%</h3>
                    <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">+2.1%</Badge>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Taux de conversion</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">5.8%</h3>
                    <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">+0.5%</Badge>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscribers List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>Liste des abonnés</CardTitle>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Rechercher un abonné..."
                    className="pl-9 w-full md:w-[250px]"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <div className="flex justify-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="vip">VIP</TabsTrigger>
                  <TabsTrigger value="premium">Premium</TabsTrigger>
                  <TabsTrigger value="standard">Standard</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="space-y-6">
                  {subscribers.map((subscriber) => (
                    <div key={subscriber.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/80">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={subscriber.avatar} />
                          <AvatarFallback>{subscriber.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{subscriber.name}</h3>
                            {subscriber.status === "active" && (
                              <div className="ml-2 w-2 h-2 rounded-full bg-green-500"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">@{subscriber.username}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <CalendarClock className="h-4 w-4 mr-1.5" />
                            Depuis {subscriber.subscriptionDate}
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <CreditCard className="h-4 w-4 mr-1.5" />
                            {subscriber.plan === "vip" ? "VIP" : 
                             subscriber.plan === "premium" ? "Premium" : "Standard"}
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <DollarSign className="h-4 w-4 mr-1.5" />
                            {subscriber.revenue}
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            {subscriber.messages} messages
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            Message
                          </Button>
                          <Button variant="ghost" size="sm">Profil</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {subscriber.plan === "vip" ? (
                          <Badge className="vip-badge">VIP</Badge>
                        ) : subscriber.plan === "premium" ? (
                          <Badge className="premium-badge">Premium</Badge>
                        ) : (
                          <Badge variant="outline">Standard</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="vip" className="mt-0">
                <div className="space-y-6">
                  {subscribers.filter(s => s.plan === "vip").map((subscriber) => (
                    <div key={subscriber.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/80">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={subscriber.avatar} />
                          <AvatarFallback>{subscriber.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{subscriber.name}</h3>
                            {subscriber.status === "active" && (
                              <div className="ml-2 w-2 h-2 rounded-full bg-green-500"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">@{subscriber.username}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <CalendarClock className="h-4 w-4 mr-1.5" />
                            Depuis {subscriber.subscriptionDate}
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <CreditCard className="h-4 w-4 mr-1.5" />
                            VIP
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <DollarSign className="h-4 w-4 mr-1.5" />
                            {subscriber.revenue}
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            {subscriber.messages} messages
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            Message
                          </Button>
                          <Button variant="ghost" size="sm">Profil</Button>
                        </div>
                      </div>
                      
                      <Badge className="vip-badge">VIP</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="premium" className="mt-0">
                <div className="space-y-6">
                  {subscribers.filter(s => s.plan === "premium").map((subscriber) => (
                    <div key={subscriber.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/80">
                      {/* Same structure as before but filtering for premium subscribers */}
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={subscriber.avatar} />
                          <AvatarFallback>{subscriber.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{subscriber.name}</h3>
                            {subscriber.status === "active" && (
                              <div className="ml-2 w-2 h-2 rounded-full bg-green-500"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">@{subscriber.username}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <CalendarClock className="h-4 w-4 mr-1.5" />
                            Depuis {subscriber.subscriptionDate}
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <CreditCard className="h-4 w-4 mr-1.5" />
                            Premium
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <DollarSign className="h-4 w-4 mr-1.5" />
                            {subscriber.revenue}
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            {subscriber.messages} messages
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            Message
                          </Button>
                          <Button variant="ghost" size="sm">Profil</Button>
                        </div>
                      </div>
                      
                      <Badge className="premium-badge">Premium</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="standard" className="mt-0">
                <div className="space-y-6">
                  {subscribers.filter(s => s.plan === "standard").map((subscriber) => (
                    <div key={subscriber.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/80">
                      {/* Same structure as before but filtering for standard subscribers */}
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={subscriber.avatar} />
                          <AvatarFallback>{subscriber.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{subscriber.name}</h3>
                            {subscriber.status === "active" && (
                              <div className="ml-2 w-2 h-2 rounded-full bg-green-500"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">@{subscriber.username}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <CalendarClock className="h-4 w-4 mr-1.5" />
                            Depuis {subscriber.subscriptionDate}
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <CreditCard className="h-4 w-4 mr-1.5" />
                            Standard
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <DollarSign className="h-4 w-4 mr-1.5" />
                            {subscriber.revenue}
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            {subscriber.messages} messages
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            Message
                          </Button>
                          <Button variant="ghost" size="sm">Profil</Button>
                        </div>
                      </div>
                      
                      <Badge variant="outline">Standard</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Subscription Plans */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5 text-pink-500" />
              Formules d'abonnement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Standard</h3>
                  <p className="text-3xl font-bold mb-4">Gratuit</p>
                  <div className="text-gray-500 text-sm mb-6">
                    <p>Accès limité au contenu</p>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      </div>
                      <span className="text-sm">Contenu public</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      </div>
                      <span className="text-sm">Publication communautaire</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 mr-2"></div>
                      <span className="text-sm">Contenu exclusif</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Abonnés</span>
                      <span className="font-semibold">1,452</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-pink-200 dark:border-pink-900/50 bg-gradient-to-r from-pink-50 to-pink-100/20 dark:from-pink-900/20 dark:to-pink-900/5">
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <Badge className="premium-badge">Populaire</Badge>
                </div>
                <CardContent className="p-6 pt-10">
                  <h3 className="text-lg font-medium mb-2">Premium</h3>
                  <p className="text-3xl font-bold mb-1">9,99€</p>
                  <p className="text-gray-500 text-sm mb-4">par mois</p>
                  <div className="text-gray-500 text-sm mb-6">
                    <p>Accès à tout mon contenu exclusif</p>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-900/30 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      </div>
                      <span className="text-sm">Contenu public</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-900/30 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      </div>
                      <span className="text-sm">Publication communautaire</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-900/30 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      </div>
                      <span className="text-sm">Contenu exclusif</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-900/30 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      </div>
                      <span className="text-sm">Messages personnalisés</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 mr-2"></div>
                      <span className="text-sm">Accès prioritaire</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Abonnés</span>
                      <span className="font-semibold">430</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-purple-200 dark:border-purple-900/50 bg-gradient-to-r from-purple-50 to-purple-100/20 dark:from-purple-900/20 dark:to-purple-900/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">VIP</h3>
                  <p className="text-3xl font-bold mb-1">24,99€</p>
                  <p className="text-gray-500 text-sm mb-4">par mois</p>
                  <div className="text-gray-500 text-sm mb-6">
                    <p>Expérience premium avec accès prioritaire</p>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      </div>
                      <span className="text-sm">Contenu public</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      </div>
                      <span className="text-sm">Publication communautaire</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      </div>
                      <span className="text-sm">Contenu exclusif</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      </div>
                      <span className="text-sm">Messages personnalisés</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      </div>
                      <span className="text-sm">Accès prioritaire</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Abonnés</span>
                      <span className="font-semibold">80</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscribersManagement;
