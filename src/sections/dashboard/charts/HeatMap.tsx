
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';

interface HeatMapProps {
  data: Array<{ hour: string; day: string; value: number }>;
  getHeatMapColor: (value: number) => string;
}

const HeatMap: React.FC<HeatMapProps> = ({ data, getHeatMapColor }) => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-card border-border card-hover hover-card micro-pop">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">Carte de Chaleur - Activité des Abonnés</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Visualisation de l'activité par jour et heure
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[400px] w-full overflow-x-auto">
          <div className="flex mb-2">
            <div className="w-[60px]"></div>
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="flex-1 text-center text-xs text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          {['00', '06', '12', '18'].map(hour => (
            <div key={hour} className="flex mb-2">
              <div className="w-[60px] flex items-center justify-end pr-2 text-xs text-muted-foreground">
                {hour}h
              </div>
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => {
                const cellData = data.find(d => d.hour === hour && d.day === day);
                return (
                  <div 
                    key={`${hour}-${day}`} 
                    className="flex-1 aspect-square m-1 rounded-sm transition-all duration-300 hover:scale-110 micro-animation-pop cursor-pointer"
                    style={{ 
                      backgroundColor: cellData ? getHeatMapColor(cellData.value) : '#333',
                    }}
                    title={`${day} ${hour}h: ${cellData?.value || 0} activités`}
                  />
                );
              })}
            </div>
          ))}
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: getHeatMapColor(0) }}></div>
              <span className="text-xs mr-4">Moins actif</span>
            </div>
            <div className="w-20 h-2 mx-2 rounded-sm" style={{ 
              background: 'linear-gradient(to right, rgb(192, 30, 60), rgb(255, 50, 100))'
            }}></div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: getHeatMapColor(100) }}></div>
              <span className="text-xs">Plus actif</span>
            </div>
          </div>
          {isMobile && (
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Faites glisser horizontalement pour voir toutes les données
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatMap;
