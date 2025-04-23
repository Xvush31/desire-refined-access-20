
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    
    if (result.outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-card p-4 rounded-lg shadow-lg border border-border z-50 md:left-auto md:w-[300px]">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Installer l'application</h3>
          <p className="text-sm text-muted-foreground">Accédez rapidement à notre application depuis votre écran d'accueil</p>
        </div>
        <Button onClick={handleInstallClick} variant="default" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Installer</span>
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
