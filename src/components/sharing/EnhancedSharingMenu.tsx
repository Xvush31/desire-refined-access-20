
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Share2, Copy, CheckCheck, MessageSquare, Link, Send } from 'lucide-react';

interface EnhancedSharingMenuProps {
  videoId: number;
  videoTitle: string;
  url?: string;
  discreetMode?: boolean;
}

export const EnhancedSharingMenu: React.FC<EnhancedSharingMenuProps> = ({
  videoId,
  videoTitle,
  url = window.location.href,
  discreetMode = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDirectLink, setShowDirectLink] = useState(false);
  
  // Generate a discrete title for sharing
  const getDiscreteTitle = (title: string) => {
    if (!discreetMode) return title;
    return "Contenu intéressant à découvrir";
  };
  
  const shareTitle = getDiscreteTitle(videoTitle);
  
  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageSquare className="h-4 w-4" />,
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' - ' + url)}`, '_blank');
        setIsOpen(false);
      }
    },
    {
      name: 'Telegram',
      icon: <Send className="h-4 w-4" />,
      action: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
        setIsOpen(false);
      }
    },
    {
      name: 'Lien direct',
      icon: <Link className="h-4 w-4" />,
      action: () => {
        setShowDirectLink(true);
      }
    }
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({
      title: "Lien copié",
      description: "Le lien a été copié dans votre presse-papiers"
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-muted"
          aria-label="Partager"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="end" alignOffset={5}>
        <div className="space-y-4">
          <h3 className="text-sm font-medium leading-none mb-3">
            {discreetMode ? "Partager discrètement" : "Partager ce contenu"}
          </h3>
          
          {showDirectLink ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  value={url}
                  readOnly
                  className="h-8 text-xs"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="px-2 h-8"
                  onClick={copyToClipboard}
                >
                  {copied ? <CheckCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs"
                onClick={() => setShowDirectLink(false)}
              >
                Retour
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  size="sm"
                  className="h-auto flex flex-col items-center py-2 px-1"
                  onClick={option.action}
                >
                  <span className="mb-1">{option.icon}</span>
                  <span className="text-xs">{option.name}</span>
                </Button>
              ))}
            </div>
          )}
          
          {discreetMode && (
            <p className="text-xs text-muted-foreground mt-2">
              Mode discret activé : le partage ne révèle pas le contenu explicite
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedSharingMenu;
