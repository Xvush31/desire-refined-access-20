
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CalendarView = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendrier</h1>
        <Button asChild variant="outline" size="sm">
          <Link to="/creaverse-app/">Retour à l'accueil</Link>
        </Button>
      </div>
      
      <Card className="creaverse-glass-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-1 text-center">
            <div className="p-2 font-medium">Lun</div>
            <div className="p-2 font-medium">Mar</div>
            <div className="p-2 font-medium">Mer</div>
            <div className="p-2 font-medium">Jeu</div>
            <div className="p-2 font-medium">Ven</div>
            <div className="p-2 font-medium">Sam</div>
            <div className="p-2 font-medium">Dim</div>
            
            {/* Exemple de jours du calendrier */}
            {Array.from({ length: 31 }).map((_, i) => (
              <div 
                key={i}
                className="p-2 border rounded-md hover:bg-muted cursor-pointer"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
