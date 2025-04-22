
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useIsMobile } from '@/hooks/use-mobile';
import { TimeScale } from '../types';

interface EngagementChartProps {
  timeScale: TimeScale;
  data: Array<{ name: string; engagement: number }>;
}

const EngagementChart: React.FC<EngagementChartProps> = ({ timeScale, data }) => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-card border-border card-hover hover-card micro-pop">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">
          Engagement {timeScale === 'day' ? 'sur 24h' : timeScale === 'week' ? 'Hebdomadaire' : 'Mensuel'}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Taux d'engagement {timeScale === 'day' ? 'par heure' : timeScale === 'week' ? 'par jour' : 'par mois'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[250px] md:h-[300px]">
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
        {isMobile && (
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Faites pivoter votre appareil pour une meilleure vue
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
