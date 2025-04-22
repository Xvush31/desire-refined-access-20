
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

const privateMessages = [
  { 
    id: 1, 
    sender: "Marie L.", 
    message: "Ton dernier contenu était incroyable! J'adorerais savoir comment tu as fait cette transition.", 
    time: "il y a 15 min", 
    priority: "super-fan",
    read: false 
  },
  { 
    id: 2, 
    sender: "Thomas R.", 
    message: "Est-ce que tu prévois une collaboration avec d'autres créateurs bientôt?", 
    time: "il y a 1h", 
    priority: "standard",
    read: false 
  },
  { 
    id: 3, 
    sender: "Sophie M.", 
    message: "J'ai une question sur ton programme d'affiliation.", 
    time: "il y a 3h", 
    priority: "super-fan",
    read: true 
  },
  { 
    id: 4, 
    sender: "Lucas D.", 
    message: "Merci pour tes conseils, ça m'a beaucoup aidé!", 
    time: "hier", 
    priority: "standard",
    read: true 
  },
];

const PrivateMessages = () => {
  const [messages, setMessages] = useState(privateMessages);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const markAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const handleReply = (id: number) => {
    if (replyingTo === id) {
      if (replyText.trim()) {
        toast.success("Réponse envoyée", {
          description: `Votre réponse a été envoyée à ${messages.find(m => m.id === id)?.sender}`
        });
        markAsRead(id);
        setReplyText("");
      } else {
        toast.error("Veuillez saisir un message");
      }
    }
    setReplyingTo(replyingTo === id ? null : id);
  };

  const unreadCount = messages.filter(msg => !msg.read).length;
  const priorityCount = messages.filter(msg => msg.priority === "super-fan" && !msg.read).length;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-tight">Messagerie Privée</h2>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Badge className="bg-brand-red animate-pulse">{unreadCount} non lu{unreadCount > 1 ? 's' : ''}</Badge>
          )}
          {priorityCount > 0 && (
            <Badge className="bg-yellow-500">
              {priorityCount} prioritaire{priorityCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>
      
      <Card className="bg-card border-border card-hover hover-card micro-pop">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="data-table">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[15%]">Expéditeur</TableHead>
                  <TableHead className="w-[55%]">Message</TableHead>
                  <TableHead className="w-[15%]">Reçu</TableHead>
                  <TableHead className="w-[15%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <React.Fragment key={message.id}>
                    <TableRow className={!message.read ? 'bg-muted/20' : ''}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          {message.sender}
                          {message.priority === "super-fan" && (
                            <Badge className="bg-yellow-500 micro-animation-scale">
                              Super-fan
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {!message.read && (
                          <div className="w-2 h-2 rounded-full bg-brand-red inline-block mr-2" />
                        )}
                        <span className={!message.read ? 'font-medium' : ''}>
                          {message.message}
                        </span>
                      </TableCell>
                      <TableCell>{message.time}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleReply(message.id)}
                            className="text-brand-red hover:underline text-sm micro-animation-pop flex items-center"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {replyingTo === message.id ? 'Annuler' : 'Répondre'}
                          </button>
                          {!message.read && (
                            <button 
                              onClick={() => markAsRead(message.id)}
                              className="text-muted-foreground hover:underline text-sm micro-animation-pop"
                            >
                              Lu
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {replyingTo === message.id && (
                      <TableRow className="micro-animation-fade-in">
                        <TableCell colSpan={4} className="p-0">
                          <div className="bg-muted/20 p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium">Répondre à {message.sender}</span>
                            </div>
                            <textarea 
                              className="w-full p-2 border border-border rounded-md bg-card"
                              rows={3}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Votre réponse..."
                            />
                            <div className="flex justify-end mt-2">
                              <button 
                                className="bg-brand-red text-white px-4 py-2 rounded-md text-sm micro-animation-pop"
                                onClick={() => handleReply(message.id)}
                              >
                                Envoyer
                              </button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PrivateMessages;
