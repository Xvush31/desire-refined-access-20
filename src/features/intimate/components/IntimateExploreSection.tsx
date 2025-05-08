
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

const IntimateExploreSection: React.FC = () => {
  return (
    <section className="py-12">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8 text-white"
      >
        Explorez INTIMATE
      </motion.h2>
      
      <Tabs defaultValue="creators" className="w-full">
        <TabsList className="w-full mb-6 bg-purple-900/30 grid grid-cols-2 lg:grid-cols-4">
          <TabsTrigger 
            value="creators"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Pour les Créateurs
          </TabsTrigger>
          <TabsTrigger 
            value="subscribers"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Pour les Abonnés
          </TabsTrigger>
          <TabsTrigger 
            value="protection"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Protection
          </TabsTrigger>
          <TabsTrigger 
            value="pricing"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Tarification
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="creators" className="mt-0">
          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Pour les Créateurs</h3>
                  <p className="text-purple-200 mb-6">
                    INTIMATE offre aux créateurs une plateforme équitable, sécurisée et lucrative pour partager leur contenu exclusif. 
                    Notre modèle économique transparent et nos outils innovants vous permettent de vous concentrer sur la création.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-purple-100">Commission réduite de 15% seulement</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-purple-100">Paiements ultra-rapides en 48h maximum</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-purple-100">Protection Triple Shield™ contre le piratage</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-purple-100">Outils d'analyse INSIGHT™ pour optimiser vos revenus</span>
                    </li>
                  </ul>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                  >
                    Devenir Créateur <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-lg"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1554941829-202a0b2403b8?q=80&w=500&h=700&fit=crop" 
                    alt="Creator experience" 
                    className="w-full h-full object-cover rounded-lg opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-bold text-lg">Prenez le contrôle de votre contenu</p>
                    <p className="text-purple-200 text-sm">Avec des outils conçus pour votre succès</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscribers" className="mt-0">
          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Pour les Abonnés</h3>
                  <p className="text-purple-200 mb-6">
                    Découvrez une expérience premium avec des interactions authentiques et un contenu de haute qualité. 
                    Notre système GENUINE™ garantit que vous communiquez directement avec vos créateurs favoris.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-purple-100">Interactions authentiques certifiées</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-purple-100">Contenu exclusif de haute qualité</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-purple-100">Programme de fidélité LOYALTY™</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-purple-100">Options de paiement flexibles et sécurisées</span>
                    </li>
                  </ul>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                  >
                    Explorer les Créateurs <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-lg"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?q=80&w=500&h=700&fit=crop" 
                    alt="Subscriber experience" 
                    className="w-full h-full object-cover rounded-lg opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-bold text-lg">Connexions authentiques</p>
                    <p className="text-purple-200 text-sm">Interactions véritables avec vos créateurs préférés</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="protection" className="mt-0">
          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-white">Protection Inégalée</h3>
              <p className="text-purple-200 mb-6">Notre système Triple Shield™ offre une protection complète du contenu à chaque étape.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-800/30 p-5 rounded-xl border border-purple-500/30">
                  <h4 className="text-xl font-bold mb-2 text-white">Filigranes Dynamiques</h4>
                  <p className="text-purple-200 mb-4">Invisibles à l'œil nu, les filigranes identifient chaque utilisateur pour tracer l'origine des fuites.</p>
                  <Button variant="link" className="text-purple-300 hover:text-purple-200 p-0">
                    En savoir plus
                  </Button>
                </div>
                
                <div className="bg-purple-800/30 p-5 rounded-xl border border-purple-500/30">
                  <h4 className="text-xl font-bold mb-2 text-white">Détection Automatique</h4>
                  <p className="text-purple-200 mb-4">Notre système scanne en permanence le web pour détecter votre contenu partagé sans autorisation.</p>
                  <Button variant="link" className="text-purple-300 hover:text-purple-200 p-0">
                    En savoir plus
                  </Button>
                </div>
                
                <div className="bg-purple-800/30 p-5 rounded-xl border border-purple-500/30">
                  <h4 className="text-xl font-bold mb-2 text-white">Retrait DMCA Automatisé</h4>
                  <p className="text-purple-200 mb-4">Service proactif qui soumet automatiquement des demandes de retrait DMCA pour protéger votre contenu.</p>
                  <Button variant="link" className="text-purple-300 hover:text-purple-200 p-0">
                    En savoir plus
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing" className="mt-0">
          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-white">Tarification Transparente</h3>
              <p className="text-purple-200 mb-6">Découvrez notre modèle économique équitable qui favorise la croissance des créateurs.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-purple-800/30 p-6 rounded-xl border border-purple-500/30">
                  <h4 className="text-xl font-bold mb-2 text-white">Pour les Créateurs</h4>
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span className="text-purple-200">Commission de base</span>
                      <span className="font-bold text-white">15%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-purple-200">Programme de fidélité</span>
                      <span className="font-bold text-white">Jusqu'à 10%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-purple-200">Délai de paiement</span>
                      <span className="font-bold text-white">48h maximum</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-purple-200">Protection chargebacks</span>
                      <span className="font-bold text-white">100%</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-800/30 p-6 rounded-xl border border-purple-500/30">
                  <h4 className="text-xl font-bold mb-2 text-white">Pour les Abonnés</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold text-white mb-1">Abonnements Flexibles</h5>
                      <p className="text-purple-200 text-sm">Les créateurs définissent leurs propres niveaux d'abonnement</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-white mb-1">Options de Paiement</h5>
                      <p className="text-purple-200 text-sm">Cartes bancaires, portefeuilles électroniques, cryptomonnaies</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-white mb-1">Contenu à la Carte</h5>
                      <p className="text-purple-200 text-sm">Achats individuels disponibles sans abonnement</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                >
                  Commencer Maintenant
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default IntimateExploreSection;
