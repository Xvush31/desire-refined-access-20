import React, { useState } from 'react';
import TimeScaleSelector from './TimeScaleSelector';
import RevenueChart from './charts/RevenueChart';
import EngagementChart from './charts/EngagementChart';
import HeatMap from './charts/HeatMap';
import { TimeScale } from './types';

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

// Function to calculate color based on value
const getHeatMapColor = (value: number) => {
  const minValue = 0;
  const maxValue = 100;
  const ratio = (value - minValue) / (maxValue - minValue);
  
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

  return (
    <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <h2 className="text-xl font-semibold tracking-tight">Analyses & Tendances</h2>
        <div className="flex flex-wrap items-center gap-4">
          <TimeScaleSelector activeScale={timeScale} onChange={setTimeScale} />
          <button
            className={`text-sm micro-animation-pop ${showHeatMap ? 'text-brand-red' : 'text-muted-foreground'}`}
            onClick={() => setShowHeatMap(!showHeatMap)}
          >
            {showHeatMap ? 'Graphiques Standards' : 'Carte de Chaleur'}
          </button>
        </div>
      </div>
      
      {!showHeatMap ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <RevenueChart 
            timeScale={timeScale}
            data={revenueData}
            getBarFill={getBarFill}
          />
          <EngagementChart 
            timeScale={timeScale}
            data={engagementData}
          />
        </div>
      ) : (
        <HeatMap 
          data={heatMapData}
          getHeatMapColor={getHeatMapColor}
        />
      )}
    </div>
  );
};

export default DashboardCharts;
