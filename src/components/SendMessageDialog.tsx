
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface SendMessageDialogProps {
  recipientName: string;
  recipientId: string;
  trigger?: React.ReactNode;
}

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  recipientName,
  recipientId,
  trigger
}) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Veuillez saisir un message");
      return;
    }

    setIsSending(true);
    
    try {
      // Simulate sending a message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Message envoyé à ${recipientName}`);
      setMessage('');
      setIsOpen(false);
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
      console.error("Message sending error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Envoyer un message</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message à {recipientName}</DialogTitle>
          <DialogDescription>
            Envoyez un message privé à {recipientName}. Ils seront notifiés lorsqu'ils se connecteront.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Écrivez votre message ici..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        <DialogFooter>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => setIsOpen(false)}
            disabled={isSending}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            onClick={handleSend}
            disabled={isSending || !message.trim()}
          >
            {isSending ? "Envoi..." : "Envoyer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageDialog;
