
import React from "react";
import { Check } from "lucide-react";

interface XTeaseSecurityIncidentBannerProps {
  show: boolean;
}

const XTeaseSecurityIncidentBanner: React.FC<XTeaseSecurityIncidentBannerProps> = ({
  show,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 top-4 mx-auto w-11/12 max-w-md z-50 animate-fade-in">
      <div className="bg-red-500/90 text-white px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-center">
          <div className="rounded-full bg-white p-1 mr-3">
            <Check className="h-4 w-4 text-red-500" />
          </div>
          <div>
            <p className="font-semibold">Tentative de capture détectée</p>
            <p className="text-sm">
              Notre système a détecté une capture d'écran. Le contenu est protégé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XTeaseSecurityIncidentBanner;
