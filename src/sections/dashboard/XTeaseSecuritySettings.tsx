
import React from "react";

const XTeaseSecuritySettings: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium mb-2">Protection du contenu</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Filigrane invisible</p>
            <p className="text-sm text-muted-foreground">Ajoute un filigrane invisible à toutes les vidéos</p>
          </div>
          <div className="w-16">
            <div className="w-12 h-6 flex items-center bg-brand-gradient rounded-full p-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Détection de capture d'écran</p>
            <p className="text-sm text-muted-foreground">Détecte et bloque les captures d'écran</p>
          </div>
          <div className="w-16">
            <div className="w-12 h-6 flex items-center bg-brand-gradient rounded-full p-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Filigrane visible sur violation</p>
            <p className="text-sm text-muted-foreground">Affiche un filigrane visible en cas de tentative de capture</p>
          </div>
          <div className="w-16">
            <div className="w-12 h-6 flex items-center bg-brand-gradient rounded-full p-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-medium mb-2">Notifications</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Alertes en temps réel</p>
            <p className="text-sm text-muted-foreground">Recevoir des alertes pour les incidents de sécurité</p>
          </div>
          <div className="w-16">
            <div className="w-12 h-6 flex items-center bg-brand-gradient rounded-full p-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Rapport hebdomadaire</p>
            <p className="text-sm text-muted-foreground">Recevoir un rapport hebdomadaire par email</p>
          </div>
          <div className="w-16">
            <div className="w-12 h-6 flex items-center bg-muted rounded-full p-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default XTeaseSecuritySettings;
