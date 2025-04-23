
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Conditions d'utilisation">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <p className="text-sm text-muted-foreground mb-6">
              Dernière mise à jour : 15 avril 2025
            </p>
            
            <h2 className="text-xl font-bold mb-4">1. Acceptation des conditions</h2>
            <p className="mb-6">
              En accédant et en utilisant cette plateforme, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>
            
            <h2 className="text-xl font-bold mb-4">2. Admissibilité</h2>
            <p className="mb-6">
              L'accès à notre plateforme est strictement réservé aux personnes âgées de 18 ans ou plus. En utilisant ce service, vous confirmez que vous avez l'âge légal requis.
            </p>
            
            <h2 className="text-xl font-bold mb-4">3. Compte utilisateur</h2>
            <p className="mb-6">
              Vous êtes responsable du maintien de la confidentialité de votre compte et de votre mot de passe. Vous acceptez d'informer immédiatement la plateforme de toute utilisation non autorisée de votre compte.
            </p>
            
            <h2 className="text-xl font-bold mb-4">4. Contenu</h2>
            <p className="mb-6">
              Les utilisateurs sont responsables du contenu qu'ils publient. La plateforme se réserve le droit de supprimer tout contenu qui viole nos politiques.
            </p>
            
            <h2 className="text-xl font-bold mb-4">5. Propriété intellectuelle</h2>
            <p className="mb-6">
              Les créateurs conservent leurs droits sur le contenu qu'ils publient. En publiant du contenu, vous accordez à la plateforme une licence limitée pour l'héberger et le rendre accessible.
            </p>
            
            <h2 className="text-xl font-bold mb-4">6. Modifications des conditions</h2>
            <p className="mb-6">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des changements significatifs.
            </p>
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default Terms;
