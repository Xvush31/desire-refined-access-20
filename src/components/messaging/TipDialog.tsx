
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  performerName: string;
}

const TipDialog: React.FC<TipDialogProps> = ({ isOpen, onClose, performerName }) => {
  const tipAmounts = [5, 10, 20, 50, 100];

  const handleTip = (amount: number) => {
    // TODO: Intégrer avec le système de paiement
    toast.success(`Pourboire de ${amount}€ envoyé à ${performerName}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Envoyer un pourboire à {performerName}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          {tipAmounts.map((amount) => (
            <Button
              key={amount}
              onClick={() => handleTip(amount)}
              className="w-full font-bold animated-gradient-bg hover:opacity-90"
            >
              {amount}€
            </Button>
          ))}
          <Button
            onClick={() => handleTip(200)}
            className="w-full col-span-3 font-bold animated-gradient-bg hover:opacity-90"
          >
            Autre montant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipDialog;
