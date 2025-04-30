
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SupportHistoryEntry } from "../../api/services/relationshipService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CircleDollarSign, Gift, CreditCard, Ticket } from "lucide-react";

interface SupportHistoryProps {
  history: SupportHistoryEntry[];
  className?: string;
}

const SupportHistory: React.FC<SupportHistoryProps> = ({ history, className = "" }) => {
  // Sort history by date (newest first)
  const sortedHistory = [...history].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'subscription': return <CreditCard size={16} className="text-blue-500" />;
      case 'tip': return <CircleDollarSign size={16} className="text-green-500" />;
      case 'purchase': return <Ticket size={16} className="text-purple-500" />;
      case 'gift': return <Gift size={16} className="text-pink-500" />;
      default: return <CircleDollarSign size={16} className="text-gray-500" />;
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'subscription': return 'Abonnement';
      case 'tip': return 'Pourboire';
      case 'purchase': return 'Achat';
      case 'gift': return 'Cadeau';
      default: return 'Support';
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Historique de support</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedHistory.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            Aucun historique de support
          </div>
        ) : (
          <div className="space-y-3">
            {sortedHistory.map((entry) => (
              <div key={entry.id} className="flex items-start p-3 border rounded-md bg-card/50">
                <div className="mr-3 mt-1 p-2 rounded-full bg-muted">
                  {getIcon(entry.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-medium">{getTypeLabel(entry.type)}</h4>
                    <span className="text-brand-red font-semibold">
                      {entry.amount.toFixed(2)}€
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {format(entry.timestamp, "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupportHistory;
