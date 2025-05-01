
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface PriorityMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSendPriority: (message: string, price: number) => void;
  performerName: string;
}

const PriorityMessageDialog: React.FC<PriorityMessageDialogProps> = ({
  isOpen,
  onClose,
  onSendPriority,
  performerName,
}) => {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState(5);
  
  const handleSubmit = () => {
    if (message.trim()) {
      onSendPriority(message, price);
      setMessage("");
    }
  };

  const prices = [
    { value: 5, label: "5€", description: "Priorité standard" },
    { value: 10, label: "10€", description: "Haute priorité" },
    { value: 20, label: "20€", description: "Super priorité" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Message prioritaire pour {performerName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="priority-message">Votre message prioritaire</Label>
            <Textarea
              id="priority-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Saisissez votre message prioritaire..."
              className="mt-1"
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Les messages prioritaires sont traités en premier par le créateur.
            </p>
          </div>
          
          <div>
            <Label>Niveau de priorité</Label>
            <RadioGroup 
              value={price.toString()} 
              onValueChange={(value) => setPrice(parseInt(value))}
              className="mt-2 grid grid-cols-3 gap-3"
            >
              {prices.map((priceOption) => (
                <Label 
                  key={priceOption.value} 
                  htmlFor={`price-${priceOption.value}`}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${price === priceOption.value ? 'border-yellow-500 bg-yellow-500/10' : 'border-border hover:bg-accent'}`}
                >
                  <RadioGroupItem 
                    id={`price-${priceOption.value}`} 
                    value={priceOption.value.toString()} 
                    className="sr-only"
                  />
                  <span className="font-bold">{priceOption.label}</span>
                  <span className="text-xs text-muted-foreground mt-1">{priceOption.description}</span>
                  {price === priceOption.value && (
                    <div className="mt-2">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      >
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      </motion.div>
                    </div>
                  )}
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!message.trim()}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-amber-500 hover:opacity-90"
          >
            Envoyer ({price}€)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PriorityMessageDialog;
