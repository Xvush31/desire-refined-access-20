
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface SendMessageDialogProps {
  performerName: string;
  performerId: number;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  performerName,
  performerId,
  isOpen,
  onOpenChange
}) => {
  const [message, setMessage] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Veuillez saisir un message");
      return;
    }

    // Simulate sending message - will be replaced with actual backend integration
    toast.success(`Message envoyé à ${performerName}`);
    setMessage("");
    setOpen(false);
  };

  return <Dialog open={open} onOpenChange={setOpen}>
      {!isOpen && <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Contacter</span>
          </Button>
        </DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Envoyer un message à {performerName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSendMessage} className="space-y-4 mt-4">
          <textarea className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" placeholder="Votre message..." value={message} onChange={e => setMessage(e.target.value)} />
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Envoyer</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
};

export default SendMessageDialog;
