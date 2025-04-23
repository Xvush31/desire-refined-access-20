
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="À propos">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <p className="text-lg mb-6">
              Bienvenue sur notre plateforme dédiée aux créateurs de contenu premium et à leurs admirateurs.
            </p>
            <p className="mb-6">
              Notre mission est de créer un environnement sécurisé, respectueux et innovant où les créateurs peuvent partager leur art et se connecter directement avec leur public. Nous valorisons la créativité, l'authenticité et la confidentialité.
            </p>
            <p className="mb-6">
              Fondée en 2025, notre plateforme a rapidement évolué pour devenir un espace de référence pour les créateurs de contenu adulte, offrant des outils innovants comme XTease et des systèmes de monétisation équitables.
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-4">Notre équipe</h2>
            <p className="mb-6">
              Notre équipe est composée de professionnels passionnés par la technologie, l'innovation et le respect des créateurs. Nous travaillons sans relâche pour améliorer l'expérience sur notre plateforme et offrir les meilleures fonctionnalités.
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-4">Nos valeurs</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Respect et consentement</li>
              <li className="mb-2">Confidentialité et sécurité</li>
              <li className="mb-2">Innovation technologique</li>
              <li className="mb-2">Support aux créateurs</li>
              <li className="mb-2">Communauté inclusive</li>
            </ul>
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default About;
