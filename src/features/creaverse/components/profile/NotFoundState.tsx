
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NotFoundStateProps {
  message?: string;
}

const NotFoundState: React.FC<NotFoundStateProps> = ({ message = "Profil non trouvé" }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'light' ? 'bg-gray-50' : 'bg-black/90'}`}>
      <div className="text-center max-w-md p-6">
        <h1 className="text-3xl font-bold mb-4">@Error</h1>
        <p className="text-xl mb-6">{message}</p>
        <div className="bg-muted/20 rounded-lg p-6 mb-8 border border-border">
          <p className="text-muted-foreground mb-2">
            Le profil demandé n'est pas accessible ou n'existe pas.
          </p>
          <p className="text-muted-foreground">
            Veuillez vérifier l'URL ou revenir à l'accueil.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={() => navigate(-1)}>Retour</Button>
          <Button variant="outline" onClick={() => navigate("/creaverse")}>
            Aller à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
