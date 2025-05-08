
import React from "react";
import { motion } from "framer-motion";
import { Shield, Heart, MessageSquare, ChartBar, Calendar, DollarSign } from "lucide-react";

const IntimateFeaturesList: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Triple Shield™",
      description: "Système anti-fuite avec filigranes dynamiques, détection automatique du contenu volé et service DMCA automatisé.",
      delay: 0.1
    },
    {
      icon: DollarSign,
      title: "Équité Économique",
      description: "Commission de base de 15%, paiements ultra-rapides en 48h et protection totale contre les chargebacks.",
      delay: 0.2
    },
    {
      icon: ChartBar,
      title: "INSIGHT™",
      description: "Tableau de bord analytique avec analyse détaillée des performances et segmentation des fans par engagement.",
      delay: 0.3
    },
    {
      icon: Calendar,
      title: "Planificateur",
      description: "Planification des publications avec suggestions d'horaires optimaux et analyse des tendances du marché.",
      delay: 0.4
    },
    {
      icon: MessageSquare,
      title: "CONNECT™",
      description: "Messagerie enrichie avec réponses prioritisées selon le niveau d'abonnement et outils de traduction.",
      delay: 0.5
    },
    {
      icon: Heart,
      title: "LOYALTY™",
      description: "Programme de fidélité pour créateurs et abonnés avec récompenses et accès anticipé aux contenus.",
      delay: 0.6
    }
  ];

  return (
    <section className="py-12">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12 text-white"
      >
        Fonctionnalités Révolutionnaires
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: feature.delay }}
            className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="mb-4 bg-purple-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center">
              <feature.icon className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-purple-200">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IntimateFeaturesList;
