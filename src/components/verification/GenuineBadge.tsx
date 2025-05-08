
import React, { useState } from 'react';
import { Shield, ShieldCheck, ShieldAlert, Star, Info, CheckCircle2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  VerificationLevel,
  VerificationType,
  VerificationStatus
} from '@/services/genuineVerification';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface GenuineBadgeProps {
  level: VerificationLevel;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
  onClick?: () => void;
  verificationStatus?: VerificationStatus;
  creatorId?: string | number;
  creatorName?: string;
}

/**
 * Composant Badge GENUINE™
 * Affiche un badge selon le niveau de vérification du créateur
 */
const GenuineBadge: React.FC<GenuineBadgeProps> = ({
  level,
  size = 'md',
  showTooltip = true,
  className,
  onClick,
  verificationStatus,
  creatorId,
  creatorName = 'Ce créateur'
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Styles et icônes selon le niveau
  const styles = {
    sm: 'h-4 w-4 p-0.5',
    md: 'h-6 w-6 p-1',
    lg: 'h-8 w-8 p-1.5'
  };
  
  const colors = {
    [VerificationLevel.NONE]: 'bg-gray-400',
    [VerificationLevel.BASIC]: 'bg-blue-500',
    [VerificationLevel.VERIFIED]: 'bg-green-500',
    [VerificationLevel.GENUINE]: 'bg-red-500',
    [VerificationLevel.PARTNER]: 'bg-purple-500'
  };
  
  const labels = {
    [VerificationLevel.NONE]: 'Non vérifié',
    [VerificationLevel.BASIC]: 'Basique',
    [VerificationLevel.VERIFIED]: 'Vérifié',
    [VerificationLevel.GENUINE]: 'GENUINE™',
    [VerificationLevel.PARTNER]: 'Partenaire'
  };
  
  const descriptions = {
    [VerificationLevel.NONE]: 'Ce créateur n\'a pas complété la vérification',
    [VerificationLevel.BASIC]: 'Email et téléphone vérifiés',
    [VerificationLevel.VERIFIED]: 'Identité vérifiée',
    [VerificationLevel.GENUINE]: 'Certification complète GENUINE™',
    [VerificationLevel.PARTNER]: 'Partenaire officiel XDose'
  };
  
  const icons = {
    [VerificationLevel.NONE]: <Shield className="w-full h-full" />,
    [VerificationLevel.BASIC]: <ShieldCheck className="w-full h-full" />,
    [VerificationLevel.VERIFIED]: <CheckCircle2 className="w-full h-full" />,
    [VerificationLevel.GENUINE]: <Shield className="w-full h-full" />,
    [VerificationLevel.PARTNER]: <Star className="w-full h-full" />
  };
  
  // Gérer le clic sur le badge
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setDialogOpen(true);
    }
  };
  
  // Rendu du badge selon que le tooltip est activé ou non
  const badgeElement = (
    <div
      className={cn(
        'rounded-full flex items-center justify-center text-white cursor-pointer',
        styles[size],
        colors[level],
        className
      )}
      onClick={handleClick}
    >
      {icons[level]}
    </div>
  );
  
  // Étapes de vérification pour l'explication
  const verificationSteps = [
    { type: VerificationType.EMAIL, label: 'Email vérifié', description: 'Confirmation par lien envoyé à l\'adresse email' },
    { type: VerificationType.PHONE, label: 'Téléphone vérifié', description: 'Confirmation par code SMS' },
    { type: VerificationType.ID, label: 'Pièce d\'identité', description: 'Document d\'identité officiel vérifié' },
    { type: VerificationType.FACE, label: 'Vérification faciale', description: 'Correspondance avec la pièce d\'identité' },
    { type: VerificationType.ADDRESS, label: 'Adresse vérifiée', description: 'Justificatif de domicile vérifié' },
    { type: VerificationType.BIOMETRIC, label: 'Biométrie enregistrée', description: 'Données biométriques sécurisées' },
    { type: VerificationType.ACTIVITY, label: 'Activité confirmée', description: 'Historique d\'activité cohérent' }
  ];
  
  return (
    <>
      {showTooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {badgeElement}
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="flex flex-col">
                <span className="font-semibold">{labels[level]}</span>
                <span className="text-xs text-muted-foreground">{descriptions[level]}</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        badgeElement
      )}
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className={cn('h-6 w-6 rounded-full flex items-center justify-center', colors[level])}>
                {icons[level]}
              </div>
              <span>Vérification {labels[level]}</span>
            </DialogTitle>
            <DialogDescription>
              {creatorName} a obtenu le niveau de vérification {labels[level]}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="bg-muted p-3 rounded">
              <p className="text-sm text-muted-foreground mb-2">{descriptions[level]}</p>
              {level !== VerificationLevel.NONE && verificationStatus && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Étapes de vérification:</p>
                  <div className="space-y-1">
                    {verificationSteps.map((step) => {
                      const completed = verificationStatus.completedSteps.includes(step.type);
                      const required = verificationStatus.completedSteps.includes(step.type) || 
                                     verificationStatus.pendingSteps.includes(step.type);
                      
                      if (!required) return null;
                      
                      return (
                        <div key={step.type} className="flex items-center gap-2">
                          <div className={`h-4 w-4 flex-shrink-0 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                            {completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                          </div>
                          <span className={`text-sm ${completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {verificationStatus?.lastVerified && (
                <div className="mt-3 text-xs text-muted-foreground">
                  Vérifié le: {new Date(verificationStatus.lastVerified).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Info className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">
                Le système GENUINE™ garantit l'authenticité des créateurs et de leur contenu.
              </span>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Fermer</Button>
            
            {level === VerificationLevel.NONE && (
              <Button className="mt-2 sm:mt-0" variant="default" onClick={() => setDialogOpen(false)}>
                Demander une vérification
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenuineBadge;
