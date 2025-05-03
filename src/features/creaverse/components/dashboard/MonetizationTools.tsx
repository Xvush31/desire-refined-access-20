
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { CircleDollarSign, TrendingUp, Star } from "lucide-react";

interface MonetizationToolsProps {
  performerId: number;
}

const MonetizationTools: React.FC<MonetizationToolsProps> = ({ performerId }) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Outils de Monétisation</h2>
      
      <p className="text-muted-foreground">
        Maximisez vos revenus avec nos outils de monétisation avancés.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CircleDollarSign size={18} className="mr-2 text-brand-red" />
              Niveaux d'Abonnement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Configurez différents niveaux d'abonnement pour offrir plus de valeur à vos fans et augmenter vos revenus.
              </p>
              <Button className="w-full">Gérer les niveaux</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp size={18} className="mr-2 text-brand-red" />
              Stratégies de Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Optimisez vos prix pour maximiser vos revenus et votre taux de conversion.
              </p>
              <Button className="w-full" variant="outline">
                Explorer les stratégies
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star size={18} className="mr-2 text-brand-red" />
              Contenu Premium
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Créez et gérez du contenu premium pour augmenter vos revenus par abonné.
              </p>
              <Button className="w-full" variant="outline">
                Gérer le contenu premium
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonetizationTools;
