
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";

interface ContentInsightsProps {
  performerId: number;
}

const ContentInsights: React.FC<ContentInsightsProps> = ({ performerId }) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  // Ici, vous pourriez charger les données d'analyse de contenu depuis une API
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Analyse de Contenu</h2>
      
      <p className="text-muted-foreground">
        Analysez les performances de votre contenu et identifiez les tendances pour optimiser vos futures publications.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Contenu le plus performant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Cette fonctionnalité sera bientôt disponible dans CreaVerse.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recommandations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Des recommandations personnalisées pour améliorer votre contenu seront bientôt disponibles dans CreaVerse.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentInsights;
