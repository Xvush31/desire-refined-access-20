
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Camera, 
  Image, 
  Edit,
  Filter, 
  Crop
} from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from '../../hooks/use-mobile';

type EditorMode = 'capture' | 'edit' | null;

const MobileEditorActions: React.FC = () => {
  const [editorMode, setEditorMode] = useState<EditorMode>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Référence à l'élément video pour la capture
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  // Fonction pour démarrer la capture vidéo
  const startVideoCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setEditorMode('capture');
        toast.success("Caméra activée", {
          description: "Prêt à capturer votre contenu"
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'accès à la caméra:", error);
      toast.error("Impossible d'accéder à la caméra", {
        description: "Vérifiez les permissions de votre appareil"
      });
    }
  };
  
  // Fonction pour capturer l'image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const imageData = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageData);
        stopVideoCapture();
        setEditorMode('edit');
        
        toast.success("Image capturée", {
          description: "Vous pouvez maintenant l'éditer"
        });
      }
    }
  };
  
  // Fonction pour arrêter la capture vidéo
  const stopVideoCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  // Fonction pour appliquer un filtre (simulation)
  const applyFilter = (filterType: string) => {
    toast.success(`Filtre ${filterType} appliqué`, {
      description: "Votre image a été modifiée"
    });
  };
  
  // Fonction pour recadrer l'image (simulation)
  const cropImage = () => {
    toast.success("Image recadrée", {
      description: "Le recadrage a été appliqué"
    });
  };
  
  // Fonction pour publier le contenu
  const publishContent = () => {
    toast.success("Contenu publié!", {
      description: "Votre contenu est maintenant visible"
    });
    setCapturedImage(null);
    setEditorMode(null);
  };

  // Si l'appareil n'est pas mobile, ne rien afficher
  if (!isMobile) return null;
  
  return (
    <Card className="mb-6 bg-card border-border animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Edit className="mr-2 h-5 w-5 text-brand-red" />
          Création Rapide
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!editorMode && (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center micro-animation-pop" 
              onClick={startVideoCapture}
            >
              <Camera className="mr-2 h-4 w-4" />
              Capturer
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center micro-animation-pop" 
              onClick={() => setEditorMode('edit')}
            >
              <Image className="mr-2 h-4 w-4" />
              Éditer Image
            </Button>
          </div>
        )}
        
        {editorMode === 'capture' && (
          <div className="space-y-4">
            <div className="relative rounded overflow-hidden bg-black border border-muted">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="w-full h-64 object-cover"
              ></video>
              
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <Button 
                  variant="default" 
                  className="rounded-full w-12 h-12 flex items-center justify-center bg-brand-red hover:bg-brand-red/90 micro-animation-scale"
                  onClick={captureImage}
                >
                  <Camera className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full" 
              onClick={() => {
                stopVideoCapture();
                setEditorMode(null);
              }}
            >
              Annuler
            </Button>
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
        )}
        
        {editorMode === 'edit' && (
          <div className="space-y-4">
            <div className="relative rounded overflow-hidden border border-muted">
              {capturedImage ? (
                <img 
                  src={capturedImage} 
                  alt="Image capturée" 
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Sélectionnez une image</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant="outline" 
                className="flex items-center micro-animation-pop" 
                onClick={() => applyFilter('Luminosité')}
              >
                <Filter className="mr-2 h-4 w-4" />
                Luminosité
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center micro-animation-pop" 
                onClick={() => applyFilter('Contraste')}
              >
                <Filter className="mr-2 h-4 w-4" />
                Contraste
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center micro-animation-pop" 
                onClick={cropImage}
              >
                <Crop className="mr-2 h-4 w-4" />
                Recadrer
              </Button>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setCapturedImage(null);
                  setEditorMode(null);
                }}
              >
                Annuler
              </Button>
              <Button 
                variant="default"
                className="bg-brand-red hover:bg-brand-red/90 micro-animation-pop"
                onClick={publishContent}
              >
                Publier
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MobileEditorActions;
