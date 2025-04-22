
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts";

interface RevenueSource {
  name: string;
  value: number;
}

interface RevenueChartProps {
  data: RevenueSource[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <Card className="bg-card border-border card-hover">
      <CardHeader>
        <CardTitle>Distribution des Revenus</CardTitle>
        <CardDescription className="text-muted-foreground">
          Répartition par source de revenus
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
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
              <BarChart 
                data={data} 
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 70 }}
              >
                <XAxis 
                  type="number" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k€`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar 
                  dataKey="value" 
                  name="revenue" 
                  radius={[0, 4, 4, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? "#e91e63" : "#D2C7BA"} 
                    />
                  ))}
                </Bar>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      nameKey="name"
                      labelKey="revenue"
                    />
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Potentiel de Croissance</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Contenus Premium</span>
                <span className="text-brand-red">+42% potentiel</span>
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-red h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Messages Privés</span>
                <span className="text-brand-red">+28% potentiel</span>
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-red h-full rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
