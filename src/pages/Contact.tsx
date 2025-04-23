
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Contact">
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-8">
              Nous sommes là pour vous aider. Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
            </p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nom</label>
                  <Input id="name" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                <Input id="subject" placeholder="Objet de votre message" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Détaillez votre demande ici..." 
                  rows={6}
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-brand-accent hover:bg-brand-accent/90">
                  Envoyer
                </Button>
              </div>
            </form>
            
            <div className="mt-12 border-t border-muted pt-8">
              <h3 className="text-xl font-semibold mb-4">Autres moyens de nous contacter</h3>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span> 
                  <span className="text-muted-foreground">support@example.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Téléphone:</span>
                  <span className="text-muted-foreground">+33 (0)1 23 45 67 89</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Adresse:</span>
                  <span className="text-muted-foreground">123 Rue de l'Innovation, 75001 Paris, France</span>
                </p>
              </div>
            </div>
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default Contact;
