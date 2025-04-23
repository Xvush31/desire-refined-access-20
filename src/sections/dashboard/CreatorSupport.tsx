
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, HelpCircle } from "lucide-react";
import { toast } from "sonner";

const CreatorSupport = () => {
  const [supportMessage, setSupportMessage] = useState("");

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé", {
      description: "Notre équipe vous répondra dans les plus brefs délais",
    });
    setSupportMessage("");
  };

  return (
    <Card className="bg-card border-border mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-brand-red" />
          Support & Documentation
        </CardTitle>
        <CardDescription>
          Guides, tutoriels et assistance pour optimiser votre expérience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="docs" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="docs" className="flex items-center justify-center gap-2">
              <BookOpen className="h-4 w-4" />
              Documentation
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center justify-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center justify-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="docs" className="mt-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Édition Mobile</h3>
                <p className="text-muted-foreground">
                  Capturez et éditez du contenu directement depuis votre mobile :
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Utilisez le bouton capture pour filmer ou photographier</li>
                  <li>Appliquez des filtres et recadrez vos contenus</li>
                  <li>Publiez en quelques clics</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Prévisions & Analytics</h3>
                <p className="text-muted-foreground">
                  Comprenez vos performances et optimisez vos revenus :
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Analysez les tendances d'engagement</li>
                  <li>Suivez les prévisions de revenus</li>
                  <li>Identifiez les contenus les plus performants</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Sécurité & Protection</h3>
                <p className="text-muted-foreground">
                  Protégez votre contenu et vos revenus :
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Filigranes invisibles sur vos contenus</li>
                  <li>Détection des captures d'écran</li>
                  <li>Tableau de bord de sécurité en temps réel</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Comment sont calculées les prévisions de revenus ?</h3>
                <p className="text-muted-foreground">
                  Les prévisions sont basées sur vos tendances d'engagement, taux de conversion et historique de revenus, 
                  analysés par notre Intelligence Artificielle.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Comment fonctionne la protection du contenu ?</h3>
                <p className="text-muted-foreground">
                  Chaque contenu est protégé par des filigranes invisibles uniques. Toute tentative de capture est 
                  détectée et signalée dans votre tableau de bord de sécurité.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Comment obtenir plus de badges communautaires ?</h3>
                <p className="text-muted-foreground">
                  Les badges sont attribués en fonction de votre engagement, qualité de contenu et fidélité de votre 
                  audience. Consultez les critères détaillés dans la section Badges.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-4">
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Message pour le support</label>
                <textarea 
                  className="w-full min-h-[100px] p-2 rounded-md border bg-background"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Décrivez votre problème ou posez votre question..."
                />
              </div>
              <Button 
                type="submit"
                className="w-full"
                disabled={!supportMessage.trim()}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Envoyer au support
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CreatorSupport;
