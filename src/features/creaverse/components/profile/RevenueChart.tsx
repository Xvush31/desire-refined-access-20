
import React from 'react';
import { cn } from '@/lib/utils';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Sample data for the revenue chart
const defaultRevenueData = [
  { day: '01', amount: 140 },
  { day: '05', amount: 180 },
  { day: '10', amount: 120 },
  { day: '15', amount: 160 },
  { day: '20', amount: 210 },
  { day: '25', amount: 190 },
  { day: '30', amount: 240 }
];

interface RevenueChartProps {
  data?: Array<{ day: string, amount: number }>;
  growthRate?: number;
  className?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ 
  data = defaultRevenueData, 
  growthRate = 0, 
  className 
}: RevenueChartProps) => {
  const isPositiveGrowth = growthRate >= 0;
  
  return (
    <div className={cn("w-full h-12 flex items-center gap-2", className)}>
      <div className="flex-grow h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={isPositiveGrowth ? "#16a34a" : "#dc2626"} 
                  stopOpacity={0.3} 
                />
                <stop 
                  offset="95%" 
                  stopColor={isPositiveGrowth ? "#16a34a" : "#dc2626"} 
                  stopOpacity={0} 
                />
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke={isPositiveGrowth ? "#16a34a" : "#dc2626"} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#revenueGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {growthRate !== 0 && (
        <div className={cn(
          "flex items-center text-xs font-medium",
          isPositiveGrowth ? "text-green-500" : "text-red-500"
        )}>
          {isPositiveGrowth ? (
            <TrendingUp size={14} className="mr-1" />
          ) : (
            <TrendingDown size={14} className="mr-1" />
          )}
          {Math.abs(growthRate)}%
        </div>
      )}
    </div>
  );
};

export default RevenueChart;
