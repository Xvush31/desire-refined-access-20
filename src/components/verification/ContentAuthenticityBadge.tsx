
import React, { useEffect, useState } from 'react';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import genuineService, { VerificationLevel } from '@/services/genuineVerification';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import GenuineBadge from './GenuineBadge';

interface ContentAuthenticityBadgeProps {
  contentId: string | number;
  creatorId: string | number;
  showDetails?: boolean;
  className?: string;
}

/**
 * Badge d'authenticité pour le contenu
 * Indique si un contenu est authentique et provient d'un créateur vérifié
 */
const ContentAuthenticityBadge: React.FC<ContentAuthenticityBadgeProps> = ({
  contentId,
  creatorId,
  showDetails = false,
  className = ''
}) => {
  const [loading, setLoading] = useState(true);
  const [isGenuine, setIsGenuine] = useState(false);
  const [creatorVerification, setCreatorVerification] = useState<VerificationLevel>(VerificationLevel.NONE);
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    const verifyContent = async () => {
      setLoading(true);
      
      try {
        // Vérifier l'authenticité du contenu
        const contentIsGenuine = await genuineService.isContentGenuine(contentId, creatorId);
        setIsGenuine(contentIsGenuine);
        
        // Obtenir le niveau de vérification du créateur
        const creatorStatus = await genuineService.getCreatorVerificationStatus(creatorId);
        setCreatorVerification(creatorStatus.level);
        
        // Générer un token d'authenticité si le contenu est authentique
        if (contentIsGenuine) {
          const authenticityToken = await genuineService.generateAuthenticityToken(contentId, creatorId);
          setToken(authenticityToken);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du contenu:', error);
        setIsGenuine(false);
      } finally {
        setLoading(false);
      }
    };
    
    verifyContent();
  }, [contentId, creatorId]);
  
  if (loading) {
    return <Skeleton className="h-6 w-24" />;
  }
  
  const badgeText = isGenuine 
    ? 'Contenu authentique' 
    : 'Authenticité non vérifiée';
  
  const badgeColor = isGenuine 
    ? 'bg-green-500 text-white' 
    : 'bg-amber-500 text-white';
  
  const badgeIcon = isGenuine 
    ? <CheckCircle className="h-4 w-4" /> 
    : <AlertCircle className="h-4 w-4" />;
  
  // Affichage simple pour l'intégration dans d'autres composants
  if (!showDetails) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${badgeColor} ${className}`}>
              {badgeIcon}
              <span>GENUINE™</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{badgeText}</p>
            <p className="text-xs text-muted-foreground">
              {isGenuine 
                ? 'Ce contenu a été vérifié comme authentique' 
                : 'L\'authenticité de ce contenu n\'a pas pu être vérifiée'}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  // Affichage détaillé avec informations sur le créateur
  return (
    <div className={`p-3 rounded-lg border ${isGenuine ? 'border-green-200' : 'border-amber-200'} ${className}`}>
      <div className="flex items-start gap-3">
        {/* Badge du créateur */}
        <div className="flex-shrink-0">
          <GenuineBadge level={creatorVerification} size="lg" />
        </div>
        
        {/* Informations sur l'authenticité */}
        <div className="flex-grow">
          <div className="flex items-center gap-1 mb-1">
            <div className={`h-2 w-2 rounded-full ${isGenuine ? 'bg-green-500' : 'bg-amber-500'}`} />
            <h4 className="font-semibold">{badgeText}</h4>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">
            {isGenuine 
              ? 'Ce contenu a été vérifié et certifié authentique par le système GENUINE™' 
              : 'L\'authenticité de ce contenu n\'a pas pu être vérifiée par le système GENUINE™'}
          </p>
          
          {isGenuine && token && (
            <div className="mt-3">
              <div className="bg-muted p-2 rounded overflow-hidden text-xs font-mono truncate">
                {token}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Certificat d'authenticité unique pour ce contenu
              </p>
            </div>
          )}
        </div>
      </div>
      
      {creatorVerification !== VerificationLevel.NONE && (
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-brand-red" />
          <span>Ce contenu est protégé par Triple Shield™</span>
        </div>
      )}
      
      {!isGenuine && (
        <div className="mt-3">
          <Button variant="outline" size="sm" className="w-full">
            Signaler un contenu suspect
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentAuthenticityBadge;
