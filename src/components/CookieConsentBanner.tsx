
import React, { useState, useEffect } from "react";
import { regulatoryFirewall } from "@/services/regulatoryFirewall";
import { Cookie, Check, X } from "lucide-react";

const COOKIE_KEY = "cookie-consent-given";

const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Affiche uniquement si la règlementation locale l’impose et pas encore accepté
    const shouldShow =
      regulatoryFirewall.requiresCookieNotice() &&
      localStorage.getItem(COOKIE_KEY) !== "true";

    setVisible(shouldShow);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  const handleDecline = () => {
    setVisible(false);
    // Optionnel : selon RGPD, on peut gérer ou limiter les cookies ici
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-4 flex justify-center">
      <div className="bg-background border border-border rounded-lg shadow-xl px-4 py-3 flex flex-col sm:flex-row items-center gap-3 max-w-2xl w-full animate-slide-up">
        <Cookie className="text-yellow-500 shrink-0" />
        <div className="flex-1 text-sm text-muted-foreground">
          Ce site utilise des cookies pour améliorer votre expérience, conformément aux réglementations locales (RGPD).{" "}
          <a
            href="/politique-cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-brand-accent"
          >
            En savoir plus
          </a>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleAccept}
            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-brand-accent text-white font-medium text-xs shadow hover:bg-brand-accent/90 transition-colors"
            aria-label="Accepter les cookies"
          >
            <Check className="w-4 h-4" /> Accepter
          </button>
          <button
            onClick={handleDecline}
            className="inline-flex items-center gap-1 px-3 py-1 rounded border border-muted text-muted-foreground text-xs bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Refuser les cookies"
          >
            <X className="w-4 h-4" /> Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
