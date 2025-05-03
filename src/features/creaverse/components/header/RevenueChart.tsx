
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RevenueChartProps {
  growthRate?: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ growthRate = 0 }) => {
  const isPositive = growthRate >= 0;
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-10 relative">
        {/* Simple chart representation - can be replaced with real chart later */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <path
              d="M0,10 Q25,5 50,10 T100,10"
              fill="none"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
      
      {growthRate !== 0 && (
        <div className={`flex items-center text-xs font-medium ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? (
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
