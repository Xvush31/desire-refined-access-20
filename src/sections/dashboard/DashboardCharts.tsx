
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Fév", revenue: 4500 },
  { name: "Mar", revenue: 5000 },
  { name: "Avr", revenue: 4700 },
  { name: "Mai", revenue: 6000 },
  { name: "Juin", revenue: 5500 },
  { name: "Juil", revenue: 7000 },
];

const engagementData = [
  { name: "Lun", engagement: 85 },
  { name: "Mar", engagement: 70 },
  { name: "Mer", engagement: 90 },
  { name: "Jeu", engagement: 65 },
  { name: "Ven", engagement: 75 },
  { name: "Sam", engagement: 95 },
  { name: "Dim", engagement: 100 },
];

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="bg-card border-border card-hover hover-card micro-pop">
        <CardHeader>
          <CardTitle>Revenus sur 7 mois</CardTitle>
          <CardDescription className="text-muted-foreground">
            Évolution mensuelle de vos revenus
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
                  <Bar
                    dataKey="revenue"
                    name="revenue"
                    fill="var(--color-revenue)"
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" labelKey="Revenue" />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border card-hover hover-card micro-pop">
        <CardHeader>
          <CardTitle>Engagement Hebdomadaire</CardTitle>
          <CardDescription className="text-muted-foreground">
            Taux d'engagement par jour de la semaine
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
                  <Bar
                    dataKey="engagement"
                    name="engagement"
                    fill="var(--color-engagement)"
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" labelKey="Engagement" />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
