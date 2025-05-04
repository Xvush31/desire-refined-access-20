
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/hooks/use-theme';
import { Brain, Sparkles, Headphones, Zap, Compass } from 'lucide-react';
import { toast } from 'sonner';

// Demo content for the immersive showcase
const demoCreatorPosts = [
  {
    id: 1,
    creatorId: "creator1",
    creatorName: "Sophie Dream",
    creatorAvatar: "https://picsum.photos/seed/creator1/100/100",
    image: "https://picsum.photos/seed/post1/1080/1920",
    caption: "Explorez l'immersion comme jamais auparavant avec notre nouvelle technologie IA ambiante.",
    timestamp: "Il y a 2 heures",
    likes: 1245,
    comments: 89,
    shares: 34,
    bookmarks: 67,
  },
  {
    id: 2,
    creatorId: "creator2",
    creatorName: "Max Immersion",
    creatorAvatar: "https://picsum.photos/seed/creator2/100/100",
    image: "https://picsum.photos/seed/post2/1080/1920",
    caption: "Ressentez l'énergie de chaque contenu grâce à notre système d'adaptation intelligente.",
    timestamp: "Il y a 4 heures",
    likes: 2378,
    comments: 156,
    shares: 87,
    bookmarks: 112,
  },
];

const ImmersiveShowcase: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const { theme } = useTheme();
  const [showVideo, setShowVideo] = useState(false);
  
  const features = [
    {
      id: "ai-adaptation",
      title: "Adaptation IA",
      description: "Notre système d'IA détecte l'ambiance du contenu et adapte l'expérience en temps réel pour une immersion parfaite.",
      icon: <Brain className="h-8 w-8" />,
      color: "bg-gradient-to-r from-indigo-500 to-purple-600"
    },
    {
      id: "biometric",
      title: "Synchronisation Biométrique",
      description: "Connectez vos appareils portables pour une expérience qui s'adapte à votre rythme cardiaque et vos réactions physiologiques.",
      icon: <Zap className="h-8 w-8" />,
      color: "bg-gradient-to-r from-red-500 to-orange-600"
    },
    {
      id: "neuroaesthetic",
      title: "Boucles Neuro-Esthétiques",
      description: "Des patterns visuels et sonores qui stimulent des réponses émotionnelles spécifiques pour une expérience plus intense.",
      icon: <Sparkles className="h-8 w-8" />,
      color: "bg-gradient-to-r from-pink-500 to-rose-600"
    },
    {
      id: "ambient",
      title: "Paysages Sonores Ambients",
      description: "Des compositions sonores génératives qui s'adaptent parfaitement au contenu que vous explorez.",
      icon: <Headphones className="h-8 w-8" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-600"
    },
    {
      id: "personalized",
      title: "Expérience Personnalisée",
      description: "Une ambiance unique qui évolue avec vous, apprenant de vos préférences pour une immersion toujours plus profonde.",
      icon: <Compass className="h-8 w-8" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-600"
    }
  ];
  
  // Change feature every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [features.length]);
  
  // Handle demo launch
  const launchImmersiveDemo = () => {
    toast.info("Préparez-vous à une expérience immersive unique...", {
      duration: 2000,
      onAutoClose: () => {
        // After toast finishes, show video
        setShowVideo(true);
      }
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <AnimatePresence mode="wait">
          {showVideo ? (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button 
                className="absolute top-4 right-4 z-10"
                variant="outline"
                onClick={() => setShowVideo(false)}
              >
                Fermer
              </Button>
              <div className="w-full h-full max-w-4xl">
                <div className="relative w-full h-0 pb-[56.25%]">
                  {/* Replace with your actual demo video */}
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="XVush Immersive Experience"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      
        <section className="relative">
          {/* Hero Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center parallax-bg"
              style={{ 
                backgroundImage: "url(https://picsum.photos/seed/xvushimmersive/1920/1080)", 
                filter: "blur(8px) brightness(0.4)"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          </div>
          
          {/* Hero Content */}
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-4 px-3 py-1 text-sm">Nouveau</Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                  L'Expérience Immersive XVush
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                  Plongez dans un nouvel univers où technologie et sensations fusionnent pour créer des moments inoubliables.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white"
                    onClick={launchImmersiveDemo}
                  >
                    Démo Immersive
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/subscription">Débloquer l'Accès Premium</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Technologies Immersives Révolutionnaires</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Notre système d'IA avancé crée des expériences sur mesure qui s'adaptent à votre contenu et vos émotions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Feature Showcase */}
              <div className="order-2 md:order-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    className="bg-card rounded-xl p-8 shadow-lg border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`rounded-full w-16 h-16 flex items-center justify-center mb-6 ${features[currentFeature].color} text-white`}>
                      {features[currentFeature].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{features[currentFeature].title}</h3>
                    <p className="text-muted-foreground mb-6">{features[currentFeature].description}</p>
                    <div className="flex gap-2">
                      {features.map((_, index) => (
                        <button
                          key={index}
                          className={`h-2 rounded-full transition-all ${
                            index === currentFeature ? "w-8 bg-primary" : "w-2 bg-muted"
                          }`}
                          onClick={() => setCurrentFeature(index)}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Visualization */}
              <div className="order-1 md:order-2">
                <Card className="overflow-hidden border border-border">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${features[currentFeature].id}/800/600`}
                      alt={features[currentFeature].title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-sm flex items-center justify-center`}>
                      <div className={`${features[currentFeature].color} w-32 h-32 rounded-full flex items-center justify-center animate-pulse`}>
                        {features[currentFeature].icon}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 opacity-90" />
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ 
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0z" fill="none" /%3E%3Cpath d="M10 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="rgba(255,255,255,0.05)" /%3E%3C/svg%3E")',
              backgroundSize: '30px 30px'
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Prêt à Redéfinir Vos Expériences Digitales?
              </motion.h2>
              <motion.p 
                className="text-xl opacity-90 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Rejoignez des milliers d'utilisateurs qui découvrent chaque jour de nouvelles dimensions de contenu grâce à notre technologie d'immersion adaptative.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-purple-900 hover:bg-white/90"
                  asChild
                >
                  <Link to="/creaverse">Explorer CreaVerse</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ImmersiveShowcase;
