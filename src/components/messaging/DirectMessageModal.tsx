
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, PaperclipIcon, Lock, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientAvatar?: string;
  isPremiumUser: boolean;
}

export const DirectMessageModal: React.FC<DirectMessageModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  recipientAvatar,
  isPremiumUser
}) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock previous messages for demo purposes
  const mockMessages = isPremiumUser ? [
    { id: 1, text: "Salut, j'ai adoré ta dernière vidéo !", sender: 'user', timestamp: '10:30' },
    { id: 2, text: "Merci beaucoup ! J'apprécie ton soutien ❤️", sender: 'creator', timestamp: '10:35' },
  ] : [];
  
  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    if (!isPremiumUser) {
      toast({
        title: "Abonnement premium requis",
        description: "L'envoi de messages directs est réservé aux membres premium.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: `Votre message a été envoyé à ${recipientName}.`,
      });
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={recipientAvatar} />
              <AvatarFallback>{recipientName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{recipientName}</DialogTitle>
              <DialogDescription className="text-xs">
                {isPremiumUser ? 'Messagerie privée sécurisée' : 'Fonctionnalité premium'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        {!isPremiumUser ? (
          <div className="bg-muted/30 p-4 rounded-lg text-center">
            <Lock className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Fonctionnalité Premium</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Les messages directs sont disponibles uniquement pour les membres premium.
            </p>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
              Devenir membre premium
            </Button>
          </div>
        ) : (
          <>
            <div className="max-h-[300px] overflow-y-auto p-4 space-y-4 border rounded-md">
              {mockMessages.length > 0 ? (
                mockMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user' 
                          ? 'bg-brand-red/80 text-white' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs opacity-70 block text-right mt-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>Commencez la conversation avec {recipientName}</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
              >
                <PaperclipIcon className="h-4 w-4" />
                <span className="sr-only">Joindre un fichier</span>
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Écrire à ${recipientName}...`}
                className="flex-1"
              />
              <Button 
                onClick={handleSubmit} 
                disabled={!message.trim() || isSubmitting}
                className="rounded-full"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Envoyer un message</span>
              </Button>
            </div>
            
            <DialogFooter className="flex items-center text-xs text-muted-foreground">
              <Info className="h-3 w-3 mr-1" />
              Messages chiffrés de bout en bout
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DirectMessageModal;
