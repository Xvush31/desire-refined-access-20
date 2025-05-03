
import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: string;
}

const ProgressBar = ({ 
  value, 
  max = 100, 
  color = "bg-gradient-to-r from-[#FF91A4] to-[#FF6B8B]", 
  height = "h-1.5" 
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={`creaverse-progress-bar ${height}`}>
      <div 
        className={`creaverse-progress-fill ${color}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
