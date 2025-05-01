
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Star, DollarSign, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import SendTipDialog from "./SendTipDialog";
import PriorityMessageDialog from "./PriorityMessageDialog";
import MessageEffect from "./MessageEffect";
import { motion, AnimatePresence } from "framer-motion";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "performer";
  timestamp: Date;
  isPriority?: boolean;
  tipAmount?: number;
  isNew?: boolean;
  attachments?: Array<{
    type: "image" | "video";
    url: string;
  }>;
}

interface MessagingSystemProps {
  performerId: string;
  performerName: string;
  performerAvatar: string;
  onClose?: () => void;
}

const MessagingSystem: React.FC<MessagingSystemProps> = ({
  performerId,
  performerName,
  performerAvatar,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Bonjour ! Je suis ravi de discuter avec vous. N'hésitez pas à me poser des questions sur mon contenu !`,
      sender: "performer",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTipDialog, setShowTipDialog] = useState(false);
  const [showPriorityDialog, setShowPriorityDialog] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date>(new Date(Date.now() - 3600000));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate performer typing after user sends message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage && lastMessage.sender === "user") {
      const timer1 = setTimeout(() => {
        setIsTyping(true);
      }, 1000);
      
      const timer2 = setTimeout(() => {
        setIsTyping(false);
        
        // Show performer response after typing
        const responses = [
          "Merci pour votre message ! Je suis ravi de pouvoir échanger avec vous.",
          "C'est toujours un plaisir de discuter avec mes fans. Merci de votre soutien !",
          "J'apprécie beaucoup votre message. N'hésitez pas si vous avez des questions.",
          "Votre message me fait très plaisir ! J'espère que vous appréciez mon contenu."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        addMessage({
          id: `msg-${Date.now()}`,
          content: randomResponse,
          sender: "performer",
          timestamp: new Date(),
          isNew: true,
        });
      }, 3000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    addMessage({
      id: `msg-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      isNew: true,
    });
    
    setInputMessage("");
  };

  const handleSendTip = (amount: number) => {
    setShowTipDialog(false);
    
    toast.success(`Pourboire de ${amount}€ envoyé à ${performerName}`, {
      description: "Merci pour votre générosité !",
    });
    
    addMessage({
      id: `tip-${Date.now()}`,
      content: `J'ai envoyé un pourboire de ${amount}€`,
      sender: "user",
      timestamp: new Date(),
      tipAmount: amount,
      isNew: true,
    });
  };

  const handleSendPriorityMessage = (message: string, price: number) => {
    setShowPriorityDialog(false);
    
    toast.success(`Message prioritaire envoyé à ${performerName}`, {
      description: `Coût: ${price}€ - Votre message sera traité en priorité`,
    });
    
    addMessage({
      id: `priority-${Date.now()}`,
      content: message,
      sender: "user",
      timestamp: new Date(),
      isPriority: true,
      isNew: true,
    });
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const file = e.target.files[0];
    const fileType = file.type.startsWith('image/') ? 'image' : 'video';
    
    // In a real app, you'd upload this file to storage and get a URL
    // For demo purposes, we'll create an object URL
    const url = URL.createObjectURL(file);
    
    toast.success(`${fileType === 'image' ? 'Image' : 'Vidéo'} attachée`, {
      description: "Votre pièce jointe a été ajoutée au message",
    });
    
    addMessage({
      id: `attachment-${Date.now()}`,
      content: `J'ai partagé ${fileType === 'image' ? 'une image' : 'une vidéo'}`,
      sender: "user",
      timestamp: new Date(),
      attachments: [{ type: fileType, url }],
      isNew: true,
    });
  };

  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Less than a minute
    if (diff < 60000) {
      return "À l'instant";
    }
    
    // Less than an hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `Il y a ${minutes} min`;
    }
    
    // Today
    if (date.toDateString() === now.toDateString()) {
      return `Aujourd'hui à ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Hier à ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Older
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const bgClass = theme === 'dark' 
    ? 'bg-zinc-900 border-zinc-800' 
    : 'bg-white border-gray-100';
  
  const inputBgClass = theme === 'dark'
    ? 'bg-zinc-800 border-zinc-700'
    : 'bg-gray-50 border-gray-200';

  return (
    <div className={`flex flex-col h-full max-h-[85vh] rounded-lg border ${bgClass} shadow-lg`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${bgClass}`}>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={performerAvatar} alt={performerName} />
              <AvatarFallback>{performerName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          </div>
          <div>
            <h3 className="font-medium">{performerName}</h3>
            <p className="text-xs text-muted-foreground">En ligne</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <span className="sr-only">Fermer</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <AnimatePresence key={message.id} mode="sync">
            <motion.div
              initial={message.isNew ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-end gap-2",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "performer" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={performerAvatar} alt={performerName} />
                  <AvatarFallback>{performerName.substring(0, 2)}</AvatarFallback>
                </Avatar>
              )}
              
              <div className={cn(
                "max-w-[70%] rounded-lg p-3",
                message.sender === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : theme === 'dark' ? "bg-zinc-800" : "bg-gray-100",
                message.isPriority && "ring-2 ring-yellow-500",
                "relative"
              )}>
                {message.isPriority && (
                  <div className="absolute -top-2 -right-2 transform translate-x-1/4 -translate-y-1/4">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  </div>
                )}
                
                <div className="break-words">{message.content}</div>
                
                {message.attachments && message.attachments.map((attachment, i) => (
                  <div key={i} className="mt-2">
                    {attachment.type === 'image' ? (
                      <img 
                        src={attachment.url} 
                        alt="Pièce jointe" 
                        className="rounded-md max-h-40 object-cover"
                      />
                    ) : (
                      <video 
                        src={attachment.url} 
                        controls 
                        className="rounded-md max-h-40 w-full"
                      />
                    )}
                  </div>
                ))}
                
                {message.tipAmount && (
                  <MessageEffect type="tip" amount={message.tipAmount} />
                )}
                
                <div className="text-xs mt-2 opacity-70">
                  {formatMessageDate(message.timestamp)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ))}
        
        {isTyping && (
          <div className="flex items-end gap-2 justify-start">
            <Avatar className="h-8 w-8">
              <AvatarImage src={performerAvatar} alt={performerName} />
              <AvatarFallback>{performerName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className={cn(
              "rounded-lg p-3 max-w-[70%]",
              theme === 'dark' ? "bg-zinc-800" : "bg-gray-100"
            )}>
              <div className="flex gap-1 items-center">
                <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t p-4 space-y-4">
        <div className="flex flex-row items-center gap-2">
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={() => setShowTipDialog(true)}
          >
            <DollarSign className="h-5 w-5 text-yellow-500" />
            <span className="sr-only">Envoyer un pourboire</span>
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={() => setShowPriorityDialog(true)}
          >
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="sr-only">Message prioritaire</span>
          </Button>
          
          <div className="relative">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="rounded-full"
              onClick={() => document.getElementById('attachment-input')?.click()}
            >
              <Paperclip className="h-5 w-5" />
              <span className="sr-only">Joindre un fichier</span>
            </Button>
            <input
              id="attachment-input"
              type="file"
              accept="image/*,video/*"
              onChange={handleAttachment}
              className="hidden"
            />
          </div>
        </div>
      
        <div className="flex items-center gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Votre message..."
            className={`flex-1 min-h-10 resize-none rounded-full px-4 py-2 ${inputBgClass}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button type="submit" variant="default" size="icon" className="rounded-full">
            <Send className="h-5 w-5" />
            <span className="sr-only">Envoyer</span>
          </Button>
        </div>
      </form>
      
      {/* Dialogs */}
      <SendTipDialog
        isOpen={showTipDialog}
        onClose={() => setShowTipDialog(false)}
        onSendTip={handleSendTip}
        performerName={performerName}
      />
      
      <PriorityMessageDialog
        isOpen={showPriorityDialog}
        onClose={() => setShowPriorityDialog(false)}
        onSendPriority={handleSendPriorityMessage}
        performerName={performerName}
      />
    </div>
  );
};

export default MessagingSystem;
