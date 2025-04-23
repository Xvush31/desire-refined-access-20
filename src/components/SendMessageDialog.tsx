
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface SendMessageDialogProps {
  performerName: string;
  performerId: number;
}

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({ performerName, performerId }) => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Veuillez saisir un message");
      return;
    }
    
    // Simulate sending message - will be replaced with actual backend integration
    toast.success(`Message envoyé à ${performerName}`);
    setMessage("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageCircle size={18} className="mr-2" /> Message privé
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Envoyer un message à {performerName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSendMessage} className="space-y-4 mt-4">
          <textarea
            className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
            placeholder="Votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit">
              <MessageCircle className="mr-2 h-4 w-4" />
              Envoyer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageDialog;
