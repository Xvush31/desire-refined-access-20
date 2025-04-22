
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

type TimeScale = 'day' | 'week' | 'month';

interface TimeScaleSelectorProps {
  activeScale: TimeScale;
  onChange: (scale: TimeScale) => void;
}

const TimeScaleSelector: React.FC<TimeScaleSelectorProps> = ({ activeScale, onChange }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <div className="flex border border-border rounded-md overflow-hidden">
        <Button 
          variant={activeScale === 'day' ? 'default' : 'ghost'}
          className={`h-8 px-3 rounded-none ${activeScale === 'day' ? 'bg-brand-red text-white' : ''}`}
          onClick={() => onChange('day')}
        >
          <span className="text-xs font-medium">Jour</span>
        </Button>
        <Button 
          variant={activeScale === 'week' ? 'default' : 'ghost'}
          className={`h-8 px-3 rounded-none border-l border-r border-border ${activeScale === 'week' ? 'bg-brand-red text-white' : ''}`}
          onClick={() => onChange('week')}
        >
          <span className="text-xs font-medium">Semaine</span>
        </Button>
        <Button 
          variant={activeScale === 'month' ? 'default' : 'ghost'}
          className={`h-8 px-3 rounded-none ${activeScale === 'month' ? 'bg-brand-red text-white' : ''}`}
          onClick={() => onChange('month')}
        >
          <span className="text-xs font-medium">Mois</span>
        </Button>
      </div>
    </div>
  );
};

export default TimeScaleSelector;
