
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HomeIcon, AlertCircleIcon } from "lucide-react";

interface NotFoundStateProps {
  errorMessage: string;
}

const NotFoundState: React.FC<NotFoundStateProps> = ({ errorMessage }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md">
        <div className="flex justify-center mb-6">
          <AlertCircleIcon size={64} className="text-destructive" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Contenu non trouvé</h2>
        <p className="text-muted-foreground mb-6">
          {errorMessage || "Le contenu que vous recherchez n'existe pas ou n'est plus disponible."}
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="default"
            onClick={() => navigate("/creaverse")}
            className="flex items-center gap-2"
          >
            <HomeIcon size={16} />
            Retour à CreaVerse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
