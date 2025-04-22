
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, TrendingUp, Video, Image } from 'lucide-react';

const trendData = [
  { type: "Behind the scenes", engagement: 92, growth: "+28%" },
  { type: "Séances photos", engagement: 84, growth: "+15%" },
  { type: "Q&R vidéo", engagement: 78, growth: "+12%" },
];

const ContentSuggestions = () => {
  return (
    <Card className="bg-card border-border hover-card micro-pop">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-red" />
          Suggestions d'IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendData.map((trend, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {trend.type.includes("vidéo") ? (
                    <Video className="h-4 w-4 text-brand-red" />
                  ) : (
                    <Image className="h-4 w-4 text-brand-red" />
                  )}
                  <span className="font-medium">{trend.type}</span>
                </div>
                <div className="flex items-center text-green-500 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {trend.growth}
                </div>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className="bg-brand-red h-full rounded-full transition-all duration-300" 
                  style={{ width: `${trend.engagement}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Engagement: {trend.engagement}%
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentSuggestions;
