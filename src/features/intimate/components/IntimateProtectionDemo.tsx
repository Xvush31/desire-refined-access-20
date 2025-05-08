
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, FileSearch, AlertTriangle, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const IntimateProtectionDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isWatermarkVisible, setIsWatermarkVisible] = useState(false);

  const handleDemoClick = (demo: string) => {
    setActiveDemo(demo);
    
    // For watermark demo, toggle watermark visibility
    if (demo === 'watermark') {
      setIsWatermarkVisible(prev => !prev);
    } else {
      setIsWatermarkVisible(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-2 text-white text-center"
        >
          Triple Shield™ Protection
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-purple-200 mb-8 text-center"
        >
          Découvrez comment notre technologie protège votre contenu avec un niveau de sécurité inégalé
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Button
            variant={activeDemo === 'watermark' ? "default" : "outline"}
            className={`h-auto py-6 ${activeDemo === 'watermark' 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30'}`}
            onClick={() => handleDemoClick('watermark')}
          >
            <div className="flex flex-col items-center">
              <Shield className="h-10 w-10 mb-2" />
              <h3 className="text-lg font-bold mb-1">Filigranes Dynamiques</h3>
              <p className="text-sm text-center">Uniques par utilisateur et invisibles à l'œil nu</p>
            </div>
          </Button>
          
          <Button
            variant={activeDemo === 'detection' ? "default" : "outline"}
            className={`h-auto py-6 ${activeDemo === 'detection' 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30'}`}
            onClick={() => handleDemoClick('detection')}
          >
            <div className="flex flex-col items-center">
              <FileSearch className="h-10 w-10 mb-2" />
              <h3 className="text-lg font-bold mb-1">Détection Automatique</h3>
              <p className="text-sm text-center">Identification du contenu volé sur le web</p>
            </div>
          </Button>
          
          <Button
            variant={activeDemo === 'dmca' ? "default" : "outline"}
            className={`h-auto py-6 ${activeDemo === 'dmca' 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30'}`}
            onClick={() => handleDemoClick('dmca')}
          >
            <div className="flex flex-col items-center">
              <AlertTriangle className="h-10 w-10 mb-2" />
              <h3 className="text-lg font-bold mb-1">Retrait DMCA</h3>
              <p className="text-sm text-center">Service de retrait automatisé et proactif</p>
            </div>
          </Button>
        </div>
        
        <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6">
          {activeDemo === 'watermark' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Filigranes Dynamiques Invisibles</h3>
              <p className="text-purple-200">Notre technologie intègre des filigranes uniques à chaque utilisateur, invisibles à l'œil nu mais détectables par notre système.</p>
              
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&h=450&fit=crop" 
                  alt="Sample content" 
                  className="w-full h-auto rounded-lg"
                />
                
                {isWatermarkVisible && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/70 p-4 rounded-lg">
                      <p className="text-white text-center mb-2">Filigrane révélé (démonstration)</p>
                      <p className="text-purple-300 text-sm text-center">ID: USER-2469813 • TIMESTAMP: 2023-05-08 14:32:17</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                <Button 
                  variant="default" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setIsWatermarkVisible(prev => !prev)}
                >
                  {isWatermarkVisible ? "Masquer le filigrane" : "Révéler le filigrane"}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card className="bg-purple-900/50 border-purple-500/30 p-4">
                  <h4 className="font-bold text-white mb-2">Invisible</h4>
                  <p className="text-purple-200 text-sm">Imperceptible pour l'utilisateur mais présent dans chaque image et vidéo</p>
                </Card>
                <Card className="bg-purple-900/50 border-purple-500/30 p-4">
                  <h4 className="font-bold text-white mb-2">Unique</h4>
                  <p className="text-purple-200 text-sm">Identifie précisément l'utilisateur à l'origine d'une fuite</p>
                </Card>
                <Card className="bg-purple-900/50 border-purple-500/30 p-4">
                  <h4 className="font-bold text-white mb-2">Résistant</h4>
                  <p className="text-purple-200 text-sm">Persiste même après recadrage, compression ou modification</p>
                </Card>
              </div>
            </div>
          )}
          
          {activeDemo === 'detection' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Détection Automatique du Contenu</h3>
              <p className="text-purple-200">Notre système analyse en permanence le web pour identifier votre contenu partagé sans autorisation, grâce à des algorithmes avancés.</p>
              
              <div className="rounded-lg bg-[#1A1F2C] p-4 border border-purple-500/30">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <FileSearch size={16} className="text-purple-400" />
                  </div>
                  <span className="text-purple-200 font-medium">Scanner de contenu</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 px-3 rounded bg-purple-900/30">
                    <span className="text-purple-200">Scan en cours...</span>
                    <span className="text-purple-300 text-sm">85%</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 px-3 rounded bg-green-900/30">
                    <div className="flex items-center">
                      <Check size={16} className="text-green-400 mr-2" />
                      <span className="text-green-200">contenu_exclusif_01.jpg</span>
                    </div>
                    <span className="text-green-300 text-sm">Protégé</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 px-3 rounded bg-red-900/30">
                    <div className="flex items-center">
                      <AlertTriangle size={16} className="text-red-400 mr-2" />
                      <span className="text-red-200">shooting_privé_03.jpg</span>
                    </div>
                    <span className="text-red-300 text-sm">2 occurrences trouvées</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card className="bg-purple-900/50 border-purple-500/30 p-4">
                  <h4 className="font-bold text-white mb-2">Scan Continu</h4>
                  <p className="text-purple-200 text-sm">Surveillance permanente des plateformes, réseaux sociaux et sites web</p>
                </Card>
                <Card className="bg-purple-900/50 border-purple-500/30 p-4">
                  <h4 className="font-bold text-white mb-2">Alertes Instantanées</h4>
                  <p className="text-purple-200 text-sm">Notification immédiate en cas de détection de votre contenu</p>
                </Card>
              </div>
            </div>
          )}
          
          {activeDemo === 'dmca' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Service de Retrait DMCA Automatisé</h3>
              <p className="text-purple-200">Lorsqu'une violation est détectée, notre système déclenche automatiquement des procédures de retrait DMCA pour protéger votre contenu.</p>
              
              <div className="rounded-lg bg-[#1A1F2C] p-4 border border-purple-500/30">
                <h4 className="font-bold text-white mb-4">Processus de retrait</h4>
                
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500/30"></div>
                  
                  <div className="pl-10 pb-6 relative">
                    <div className="absolute left-2.5 w-3 h-3 rounded-full bg-green-500 transform -translate-x-1/2"></div>
                    <h5 className="text-white font-medium">Détection</h5>
                    <p className="text-purple-200 text-sm">Le contenu non autorisé est identifié par notre système</p>
                  </div>
                  
                  <div className="pl-10 pb-6 relative">
                    <div className="absolute left-2.5 w-3 h-3 rounded-full bg-green-500 transform -translate-x-1/2"></div>
                    <h5 className="text-white font-medium">Vérification</h5>
                    <p className="text-purple-200 text-sm">Confirmation que le contenu vous appartient</p>
                  </div>
                  
                  <div className="pl-10 pb-6 relative">
                    <div className="absolute left-2.5 w-3 h-3 rounded-full bg-green-500 transform -translate-x-1/2"></div>
                    <h5 className="text-white font-medium">Soumission DMCA</h5>
                    <p className="text-purple-200 text-sm">Envoi automatique des demandes de retrait</p>
                  </div>
                  
                  <div className="pl-10 relative">
                    <div className="absolute left-2.5 w-3 h-3 rounded-full bg-purple-500/50 transform -translate-x-1/2"></div>
                    <h5 className="text-white font-medium">Suivi</h5>
                    <p className="text-purple-200 text-sm">Surveillance de la conformité et escalade si nécessaire</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card className="bg-purple-900/50 border-purple-500/30 p-4">
                  <h4 className="font-bold text-white mb-2">Rapide</h4>
                  <p className="text-purple-200 text-sm">Délai de réaction minimal pour limiter l'exposition du contenu</p>
                </Card>
                <Card className="bg-purple-900/50 border-purple-500/30 p-4">
                  <h4 className="font-bold text-white mb-2">Automatisé</h4>
                  <p className="text-purple-200 text-sm">Pas de démarches manuelles pour protéger votre contenu</p>
                </Card>
                <Card className="bg-purple-900/50 border-purple-500/30 p-4">
                  <h4 className="font-bold text-white mb-2">Efficace</h4>
                  <p className="text-purple-200 text-sm">Taux de succès élevé grâce à notre expertise juridique</p>
                </Card>
              </div>
            </div>
          )}
          
          {!activeDemo && (
            <div className="flex items-center justify-center py-12">
              <p className="text-purple-200 text-lg">Sélectionnez une fonctionnalité de protection pour en savoir plus</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default IntimateProtectionDemo;
