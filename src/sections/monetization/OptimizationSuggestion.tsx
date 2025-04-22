
import React from 'react';
import { Star, ArrowRight, Check } from "lucide-react";

interface OptimizationSuggestionProps {
  isApplied: boolean;
  onApply: () => void;
}

const OptimizationSuggestion: React.FC<OptimizationSuggestionProps> = ({ 
  isApplied, 
  onApply 
}) => {
  return (
    <div className={`mt-6 p-4 bg-muted rounded-lg transition-all ${isApplied ? 'micro-success' : ''}`}>
      <h4 className="text-sm font-medium mb-2 flex items-center">
        <Star className="h-4 w-4 mr-1 text-brand-red" />
        Suggestion d'Optimisation
      </h4>
      <p className="text-sm text-muted-foreground mb-2">
        Nos analyses suggèrent d'ajouter un contenu exclusif par semaine au niveau Elite pour augmenter les conversions de 24%.
      </p>
      <button 
        className="text-xs flex items-center text-brand-red hover:underline micro-animation-pop"
        onClick={onApply}
      >
        {isApplied ? (
          <>
            <Check className="h-3 w-3 mr-1" />
            Suggestion appliquée
          </>
        ) : (
          <>
            Appliquer cette suggestion <ArrowRight className="h-3 w-3 ml-1" />
          </>
        )}
      </button>
    </div>
  );
};

export default OptimizationSuggestion;
