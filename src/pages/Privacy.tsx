
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Politique de confidentialité">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <p className="text-sm text-muted-foreground mb-6">
              Dernière mise à jour : 10 avril 2025
            </p>
            
            <h2 className="text-xl font-bold mb-4">1. Collecte d'informations</h2>
            <p className="mb-6">
              Nous collectons des informations personnelles lorsque vous créez un compte, effectuez un paiement, ou interagissez avec notre plateforme. Ces informations peuvent inclure votre nom, adresse e-mail, et informations de paiement.
            </p>
            
            <h2 className="text-xl font-bold mb-4">2. Utilisation des données</h2>
            <p className="mb-6">
              Vos données sont utilisées pour gérer votre compte, traiter les paiements, améliorer nos services et vous fournir du contenu personnalisé. Notre mode Fantôme vous permet de naviguer avec une confidentialité accrue.
            </p>
            
            <h2 className="text-xl font-bold mb-4">3. Partage d'informations</h2>
            <p className="mb-6">
              Nous ne partageons pas vos informations personnelles avec des tiers sans votre consentement explicite, sauf lorsque requis par la loi.
            </p>
            
            <h2 className="text-xl font-bold mb-4">4. Sécurité</h2>
            <p className="mb-6">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données personnelles contre tout accès non autorisé ou traitement illégal.
            </p>
            
            <h2 className="text-xl font-bold mb-4">5. Vos droits</h2>
            <p className="mb-6">
              Vous avez le droit d'accéder à vos données personnelles, de les rectifier, de les supprimer ou d'en limiter le traitement. Vous pouvez également retirer votre consentement à tout moment.
            </p>
            
            <h2 className="text-xl font-bold mb-4">6. Cookies</h2>
            <p className="mb-6">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer vos préférences de cookies via notre bannière de consentement.
            </p>
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default Privacy;
