
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";

interface AudienceAnalyticsProps {
  performerId: number;
}

const AudienceAnalytics: React.FC<AudienceAnalyticsProps> = ({ performerId }) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  // Ici, vous pourriez charger les données d'analyse d'audience depuis une API
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Analyse de l'Audience</h2>
      
      <p className="text-muted-foreground">
        Comprenez qui sont vos fans et comment ils interagissent avec votre contenu.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Démographie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Les données démographiques de votre audience seront bientôt disponibles dans CreaVerse.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Comportement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                L'analyse du comportement de votre audience sera bientôt disponible dans CreaVerse.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudienceAnalytics;
