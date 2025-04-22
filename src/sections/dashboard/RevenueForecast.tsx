
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';

const forecastData = [
  { day: '1', actual: 240, forecast: 240 },
  { day: '5', actual: 280, forecast: 285 },
  { day: '10', actual: 300, forecast: 320 },
  { day: '15', actual: null, forecast: 380 },
  { day: '20', actual: null, forecast: 420 },
  { day: '25', actual: null, forecast: 460 },
  { day: '30', actual: null, forecast: 520 },
];

const RevenueForecast = () => {
  const projectedGrowth = "+24%";
  const projectedRevenue = "15,600€";

  return (
    <Card className="bg-card border-border hover-card micro-pop">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-brand-red" />
          Prévisions de Revenus (30 jours)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{projectedRevenue}</p>
              <p className="text-sm text-muted-foreground">Revenus projetés</p>
            </div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              {projectedGrowth}
            </div>
          </div>
        </div>

        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <XAxis 
                dataKey="day" 
                stroke="#888888"
                tickLine={false}
                tickFormatter={(value) => `J${value}`}
              />
              <YAxis 
                stroke="#888888"
                tickLine={false}
                tickFormatter={(value) => `${value}€`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#e91e63"
                strokeWidth={2}
                dot={{ fill: "#e91e63" }}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#D2C7BA"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <div className="w-3 h-3 rounded-full bg-brand-red mr-2" />
            <span>Revenus réels</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-3 h-3 rounded-full border-2 border-muted-foreground mr-2" />
            <span>Prévisions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueForecast;
