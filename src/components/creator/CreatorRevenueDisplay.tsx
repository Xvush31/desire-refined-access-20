
import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface CreatorRevenueDisplayProps {
  monthlyRevenue: number;
  monthlyRevenueChange: number;
  revenueData: Array<{ day: number; value: number }>;
}

const CreatorRevenueDisplay: React.FC<CreatorRevenueDisplayProps> = ({
  monthlyRevenue,
  monthlyRevenueChange,
  revenueData
}) => {
  const chartColor = monthlyRevenueChange >= 0 ? "#10b981" : "#ef4444";
  
  return (
    <div className="mt-6 bg-gray-50 dark:bg-zinc-800/70 rounded-xl p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium">Revenus ce mois</h3>
        <div className="flex items-center">
          <span className="text-2xl font-bold">${monthlyRevenue.toLocaleString('fr-FR')}</span>
          <span className={`ml-2 ${monthlyRevenueChange >= 0 ? 'text-green-500' : 'text-red-500'} font-medium text-sm flex items-center`}>
            {monthlyRevenueChange >= 0 ? '↗' : '↘'} {Math.abs(monthlyRevenueChange)}%
          </span>
        </div>
      </div>
      
      <div className="h-24 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={chartColor} 
              fill="url(#revenueGradient)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CreatorRevenueDisplay;
