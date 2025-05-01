
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  BarChart, 
  Bar, 
  Area, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Eye, 
  ThumbsUp, 
  Calendar,
  Settings,
  MessageSquare,
  Bell 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data for charts
const revenueData = [
  { name: 'Jan', revenue: 1400 },
  { name: 'Fév', revenue: 1600 },
  { name: 'Mar', revenue: 1500 },
  { name: 'Avr', revenue: 1800 },
  { name: 'Mai', revenue: 2400 },
  { name: 'Juin', revenue: 2100 },
  { name: 'Juil', revenue: 2600 },
];

const engagementData = [
  { name: 'Lun', likes: 240, comments: 80 },
  { name: 'Mar', likes: 300, comments: 100 },
  { name: 'Mer', likes: 320, comments: 120 },
  { name: 'Jeu', likes: 280, comments: 90 },
  { name: 'Ven', likes: 390, comments: 150 },
  { name: 'Sam', likes: 490, comments: 200 },
  { name: 'Dim', likes: 430, comments: 170 },
];

const subscriberData = [
  { name: 'Standard', value: 1400 },
  { name: 'Premium', value: 430 },
  { name: 'VIP', value: 80 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Gérez votre activité et suivez vos performances</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Mai 2025
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenus ce mois</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">2 432€</h3>
                    <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">+12%</Badge>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nouveaux abonnés</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">128</h3>
                    <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">+24%</Badge>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Vues totales</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">34.2K</h3>
                    <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">+8%</Badge>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Engagement</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">18.5%</h3>
                    <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">+2%</Badge>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <ThumbsUp className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-pink-500" />
                Revenus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F472B6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F472B6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => [`${value}€`, 'Revenus']} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#EC4899" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Bar dataKey="likes" name="Likes" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="comments" name="Commentaires" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity and Subscribers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p><span className="font-medium">Michel Lambert</span> s'est abonné à votre formule Premium</p>
                    <p className="text-sm text-gray-500">Il y a 23 minutes</p>
                  </div>
                  <Badge className="premium-badge">Premium</Badge>
                </div>
                
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=25" />
                    <AvatarFallback>CR</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p><span className="font-medium">Claire Rousseau</span> a commenté votre photo</p>
                    <p className="text-sm text-gray-500">Il y a 1 heure</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-pink-600">
                    <MessageSquare className="h-4 w-4 mr-1" /> Répondre
                  </Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=30" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p><span className="font-medium">Antoine Dufresne</span> a envoyé un tip de 15€</p>
                    <p className="text-sm text-gray-500">Il y a 3 heures</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-pink-600">Remercier</Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=22" />
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p><span className="font-medium">Elise Moreau</span> a passé au niveau VIP</p>
                    <p className="text-sm text-gray-500">Il y a 5 heures</p>
                  </div>
                  <Badge className="vip-badge">VIP</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Abonnés par Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={subscriberData} 
                    layout="vertical"
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" name="Abonnés" radius={[0, 4, 4, 0]}>
                      {subscriberData.map((entry, index) => {
                        const colors = ["#94A3B8", "#EC4899", "#7E22CE"];
                        return <rect key={index} fill={colors[index]} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-slate-400 rounded-full mr-2"></div>
                    <span>Standard</span>
                  </div>
                  <span className="font-semibold">1,400</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                    <span>Premium</span>
                  </div>
                  <span className="font-semibold">430</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-700 rounded-full mr-2"></div>
                    <span>VIP</span>
                  </div>
                  <span className="font-semibold">80</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
