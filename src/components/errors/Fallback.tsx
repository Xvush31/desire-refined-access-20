
import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/button';

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold text-center">Oups ! Une erreur est survenue</h2>
        
        <div className="p-4 border rounded bg-muted/50">
          <p className="text-sm font-mono text-destructive overflow-auto max-h-60">
            {error.message}
          </p>
        </div>
        
        <div className="space-y-2">
          <p className="text-center text-muted-foreground">
            Une erreur inattendue s'est produite dans l'application. Vous pouvez essayer de:
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Actualiser la page</li>
            <li>Vider le cache du navigateur</li>
            <li>Vous déconnecter et vous reconnecter</li>
          </ul>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={resetErrorBoundary}>
            Réessayer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
