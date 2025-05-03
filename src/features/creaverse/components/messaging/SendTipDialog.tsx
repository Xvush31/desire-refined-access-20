
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface SendTipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSendTip: (amount: number) => void;
  performerName: string;
}

const SendTipDialog: React.FC<SendTipDialogProps> = ({
  isOpen,
  onClose,
  onSendTip,
  performerName,
}) => {
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  
  const predefinedAmounts = [5, 10, 20, 50, 100];
  
  const handleSubmit = () => {
    const amount = selectedAmount !== null 
      ? selectedAmount 
      : parseFloat(customAmount);
      
    if (!isNaN(amount) && amount > 0) {
      onSendTip(amount);
    }
  };
  
  const handlePredefinedAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };
  
  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Envoyer un pourboire à {performerName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="my-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {predefinedAmounts.map((amount) => (
              <motion.div
                key={amount}
                className="relative"
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="button"
                  onClick={() => handlePredefinedAmount(amount)}
                  className={`w-full h-14 rounded-lg font-bold text-lg relative overflow-hidden transition-all ${
                    selectedAmount === amount
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {amount}€
                  
                  {selectedAmount === amount && (
                    <motion.div
                      className="absolute inset-0 bg-white opacity-20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="number"
              value={customAmount}
              onChange={handleCustomAmount}
              placeholder="Montant personnalisé"
              className="pl-10"
              min="1"
              step="1"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
            disabled={selectedAmount === null && (!customAmount || isNaN(parseFloat(customAmount)) || parseFloat(customAmount) <= 0)}
          >
            Envoyer le pourboire
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendTipDialog;
