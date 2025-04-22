
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useIsMobile } from '@/hooks/use-mobile';
import { TimeScale } from '../types';

interface RevenueChartProps {
  timeScale: TimeScale;
  data: Array<{ name: string; revenue: number }>;
  getBarFill: (value: number, maxValue: number) => string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ timeScale, data, getBarFill }) => {
  const isMobile = useIsMobile();
  const maxRevenue = Math.max(...data.map(item => item.revenue));

  return (
    <Card className="bg-card border-border card-hover hover-card micro-pop">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">
          Revenus sur {timeScale === 'day' ? '24h' : timeScale === 'week' ? '7 jours' : '7 mois'}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Évolution {timeScale === 'day' ? 'horaire' : timeScale === 'week' ? 'journalière' : 'mensuelle'} de vos revenus
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[250px] md:h-[300px]">
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
              <BarChart data={data}>
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
                <Bar dataKey="revenue" name="revenue" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarFill(entry.revenue, maxRevenue)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        {isMobile && (
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Faites pivoter votre appareil pour une meilleure vue
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
