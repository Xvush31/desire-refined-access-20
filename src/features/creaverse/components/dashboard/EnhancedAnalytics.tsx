
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Clock, TrendingUp, Users } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface EnhancedAnalyticsProps {
  performerId: number;
}

// Sample data - in a real app, this would come from an API
const viewsData = [
  { name: "Jan", views: 4000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 5000 },
  { name: "Apr", views: 4800 },
  { name: "May", views: 6000 },
  { name: "Jun", views: 8000 },
];

const engagementData = [
  { name: 'Likes', value: 400 },
  { name: 'Comments', value: 300 },
  { name: 'Shares', value: 200 },
  { name: 'Saves', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const watchTimeData = [
  { name: "Mon", minutes: 120 },
  { name: "Tue", minutes: 140 },
  { name: "Wed", minutes: 180 },
  { name: "Thu", minutes: 160 },
  { name: "Fri", minutes: 200 },
  { name: "Sat", minutes: 250 },
  { name: "Sun", minutes: 190 },
];

const EnhancedAnalytics: React.FC<EnhancedAnalyticsProps> = ({ performerId }) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  const textColor = theme === 'light' ? '#1a1a1a' : '#e1e1e1';
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Analyse Avancée</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp size={18} className="mr-2 text-brand-red" />
              Evolution des Vues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={viewsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#eee' : '#333'} />
                  <XAxis dataKey="name" stroke={textColor} />
                  <YAxis stroke={textColor} />
                  <Tooltip contentStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a', color: textColor }} />
                  <Line type="monotone" dataKey="views" stroke="#e91e63" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users size={18} className="mr-2 text-brand-red" />
              Répartition de l'Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a', color: textColor }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock size={18} className="mr-2 text-brand-red" />
              Temps de Visionnage (minutes)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={watchTimeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#eee' : '#333'} />
                  <XAxis dataKey="name" stroke={textColor} />
                  <YAxis stroke={textColor} />
                  <Tooltip contentStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a', color: textColor }} />
                  <Line type="monotone" dataKey="minutes" stroke="#00C49F" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recommandations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-1 rounded mr-2 text-xs">+15%</span>
                <span>Publiez plus de contenu entre 18h et 21h pour maximiser l'engagement</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 p-1 rounded mr-2 text-xs">Conseil</span>
                <span>Vos vidéos de 7-10 minutes génèrent 35% plus de revenus</span>
              </li>
              <li className="flex items-start">
                <span className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 p-1 rounded mr-2 text-xs">Tendance</span>
                <span>Le hashtag #exclusif augmente vos conversions de 23%</span>
              </li>
              <li className="flex items-start">
                <span className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 p-1 rounded mr-2 text-xs">Opportunité</span>
                <span>67% de vos abonnés premium aimeraient plus de Lives</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAnalytics;
