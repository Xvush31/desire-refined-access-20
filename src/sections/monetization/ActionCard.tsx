
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface ActionCardProps {
  title: string;
  children: React.ReactNode;
  actionLabel: string;
  onAction: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  children, 
  actionLabel, 
  onAction 
}) => {
  return (
    <Card className="bg-card border-border card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        <button 
          onClick={onAction}
          className="w-full py-1.5 bg-muted text-white text-sm rounded hover:bg-muted/80 transition-colors micro-animation-pop"
        >
          {actionLabel}
        </button>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
