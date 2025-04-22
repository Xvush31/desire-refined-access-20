
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import TimeScaleSelector from './TimeScaleSelector';

type TimeScale = 'day' | 'week' | 'month';

// Data for different time scales
const revenueDataByScale = {
  day: [
    { name: "00h", revenue: 120 },
    { name: "04h", revenue: 50 },
    { name: "08h", revenue: 200 },
    { name: "12h", revenue: 320 },
    { name: "16h", revenue: 450 },
    { name: "20h", revenue: 280 },
    { name: "24h", revenue: 150 },
  ],
  week: [
    { name: "Lun", revenue: 4000 },
    { name: "Mar", revenue: 3500 },
    { name: "Mer", revenue: 5000 },
    { name: "Jeu", revenue: 4700 },
    { name: "Ven", revenue: 6000 },
    { name: "Sam", revenue: 5500 },
    { name: "Dim", revenue: 7000 },
  ],
  month: [
    { name: "Jan", revenue: 4000 },
    { name: "Fév", revenue: 4500 },
    { name: "Mar", revenue: 5000 },
    { name: "Avr", revenue: 4700 },
    { name: "Mai", revenue: 6000 },
    { name: "Juin", revenue: 5500 },
    { name: "Juil", revenue: 7000 },
  ],
};

const engagementDataByScale = {
  day: [
    { name: "00h", engagement: 60 },
    { name: "04h", engagement: 35 },
    { name: "08h", engagement: 75 },
    { name: "12h", engagement: 90 },
    { name: "16h", engagement: 100 },
    { name: "20h", engagement: 85 },
    { name: "24h", engagement: 70 },
  ],
  week: [
    { name: "Lun", engagement: 85 },
    { name: "Mar", engagement: 70 },
    { name: "Mer", engagement: 90 },
    { name: "Jeu", engagement: 65 },
    { name: "Ven", engagement: 75 },
    { name: "Sam", engagement: 95 },
    { name: "Dim", engagement: 100 },
  ],
  month: [
    { name: "Jan", engagement: 85 },
    { name: "Fév", engagement: 70 },
    { name: "Mar", engagement: 90 },
    { name: "Avr", engagement: 65 },
    { name: "Mai", engagement: 75 },
    { name: "Juin", engagement: 95 },
    { name: "Juil", engagement: 100 },
  ],
};

// Heat map data
const heatMapData = [
  { hour: '00', day: 'Lun', value: 12 },
  { hour: '00', day: 'Mar', value: 8 },
  { hour: '00', day: 'Mer', value: 5 },
  { hour: '00', day: 'Jeu', value: 7 },
  { hour: '00', day: 'Ven', value: 2 },
  { hour: '00', day: 'Sam', value: 15 },
  { hour: '00', day: 'Dim', value: 18 },
  
  { hour: '06', day: 'Lun', value: 25 },
  { hour: '06', day: 'Mar', value: 18 },
  { hour: '06', day: 'Mer', value: 13 },
  { hour: '06', day: 'Jeu', value: 15 },
  { hour: '06', day: 'Ven', value: 10 },
  { hour: '06', day: 'Sam', value: 22 },
  { hour: '06', day: 'Dim', value: 28 },
  
  { hour: '12', day: 'Lun', value: 45 },
  { hour: '12', day: 'Mar', value: 38 },
  { hour: '12', day: 'Mer', value: 52 },
  { hour: '12', day: 'Jeu', value: 48 },
  { hour: '12', day: 'Ven', value: 55 },
  { hour: '12', day: 'Sam', value: 60 },
  { hour: '12', day: 'Dim', value: 50 },
  
  { hour: '18', day: 'Lun', value: 58 },
  { hour: '18', day: 'Mar', value: 68 },
  { hour: '18', day: 'Mer', value: 72 },
  { hour: '18', day: 'Jeu', value: 65 },
  { hour: '18', day: 'Ven', value: 78 },
  { hour: '18', day: 'Sam', value: 82 },
  { hour: '18', day: 'Dim', value: 70 },
];

// Fonction pour calculer la couleur en fonction de la valeur
const getHeatMapColor = (value: number) => {
  // De rouge foncé (valeur faible) à rouge vif (valeur élevée)
  const minValue = 0;
  const maxValue = 100;
  const ratio = (value - minValue) / (maxValue - minValue);
  
  // RGB values from darker red to bright red
  const r = Math.floor(192 + (ratio * 63)); // 192 to 255
  const g = Math.floor(30 + (ratio * 20));  // 30 to 50
  const b = Math.floor(60 + (ratio * 40));  // 60 to 100
  
  return `rgb(${r}, ${g}, ${b})`;
};

const DashboardCharts = () => {
  const [timeScale, setTimeScale] = useState<TimeScale>('month');
  const [showHeatMap, setShowHeatMap] = useState(false);
  
  const revenueData = revenueDataByScale[timeScale];
  const engagementData = engagementDataByScale[timeScale];

  const getBarFill = (value: number, maxValue: number) => {
    const ratio = value / maxValue;
    return getHeatMapColor(ratio * 100);
  };

  const maxRevenue = Math.max(...revenueData.map(item => item.revenue));
  
  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold tracking-tight">Analyses & Tendances</h2>
        <div className="flex items-center space-x-4">
          <TimeScaleSelector activeScale={timeScale} onChange={setTimeScale} />
          <button
            className={`text-sm micro-animation-pop ${showHeatMap ? 'text-brand-red' : 'text-muted-foreground'}`}
            onClick={() => setShowHeatMap(!showHeatMap)}
          >
            {showHeatMap ? 'Voir Graphiques Standard' : 'Voir Carte de Chaleur'}
          </button>
        </div>
      </div>
      
      {!showHeatMap ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border card-hover hover-card micro-pop">
            <CardHeader>
              <CardTitle>Revenus sur {timeScale === 'day' ? '24h' : timeScale === 'week' ? '7 jours' : '7 mois'}</CardTitle>
              <CardDescription className="text-muted-foreground">
                Évolution {timeScale === 'day' ? 'horaire' : timeScale === 'week' ? 'journalière' : 'mensuelle'} de vos revenus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenus",
                      theme: {
                        light: "#e91e63",
                        dark: "#e91e63",
                      },
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}€`}
                      />
                      <Tooltip content={<ChartTooltipContent nameKey="name" labelKey="Revenue" />} />
                      <Bar
                        dataKey="revenue"
                        name="revenue"
                        radius={[4, 4, 0, 0]}
                      >
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBarFill(entry.revenue, maxRevenue)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border card-hover hover-card micro-pop">
            <CardHeader>
              <CardTitle>Engagement {timeScale === 'day' ? 'sur 24h' : timeScale === 'week' ? 'Hebdomadaire' : 'Mensuel'}</CardTitle>
              <CardDescription className="text-muted-foreground">
                Taux d'engagement {timeScale === 'day' ? 'par heure' : timeScale === 'week' ? 'par jour' : 'par mois'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    engagement: {
                      label: "Engagement",
                      theme: {
                        light: "#D2C7BA",
                        dark: "#D2C7BA",
                      },
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip content={<ChartTooltipContent nameKey="name" labelKey="Engagement" />} />
                      <Bar
                        dataKey="engagement"
                        name="engagement"
                        fill="var(--color-engagement)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="bg-card border-border card-hover hover-card micro-pop">
          <CardHeader>
            <CardTitle>Carte de Chaleur - Activité des Abonnés</CardTitle>
            <CardDescription className="text-muted-foreground">
              Visualisation de l'activité par jour et heure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full p-4">
              <div className="flex mb-2">
                <div className="w-[60px]"></div>
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                  <div key={day} className="flex-1 text-center text-xs text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              {['00', '06', '12', '18'].map(hour => (
                <div key={hour} className="flex mb-2">
                  <div className="w-[60px] flex items-center justify-end pr-2 text-xs text-muted-foreground">
                    {hour}h
                  </div>
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => {
                    const data = heatMapData.find(d => d.hour === hour && d.day === day);
                    return (
                      <div 
                        key={`${hour}-${day}`} 
                        className="flex-1 aspect-square m-1 rounded-sm transition-all duration-300 hover:scale-110 micro-animation-pop cursor-pointer"
                        style={{ 
                          backgroundColor: data ? getHeatMapColor(data.value) : '#333',
                        }}
                        title={`${day} ${hour}h: ${data?.value || 0} activités`}
                      />
                    );
                  })}
                </div>
              ))}
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: getHeatMapColor(0) }}></div>
                  <span className="text-xs mr-4">Moins actif</span>
                </div>
                <div className="w-20 h-2 mx-2 rounded-sm" style={{ 
                  background: 'linear-gradient(to right, rgb(192, 30, 60), rgb(255, 50, 100))'
                }}></div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: getHeatMapColor(100) }}></div>
                  <span className="text-xs">Plus actif</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardCharts;
