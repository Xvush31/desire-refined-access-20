import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, CircleDollarSign, Clock, Star, MessageCircle, FileText, Lock, Download, Users, Loader2 } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import NowPaymentsSubscriptionButton from "../NowPaymentsSubscriptionButton";
import { toast } from "sonner";

interface MonetizationTiersProps {
  performerId: number;
  onSubscribe: () => void;
}

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  callToAction: string;
  popular?: boolean;
  trialDays?: number;
  trialPrice?: number;
  discount?: {
    months: number;
    percentage: number;
  };
  color?: string;
  icon: React.ReactNode;
}

const MonetizationTiers: React.FC<MonetizationTiersProps> = ({ performerId, onSubscribe }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  const cardClass = theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-zinc-800/80 border-zinc-700';
  
  useEffect(() => {
    const fetchTiers = async () => {
      try {
        // Fetch tiers from database
        const { data, error } = await supabase
          .from("subscription_tiers")
          .select("*")
          .eq("is_active", true)
          .order("price_usdt");
          
        if (error) {
          console.error("Error fetching tiers:", error);
          return;
        }
        
        if (data && data.length > 0) {
          // Transform to our component's expected format
          const mappedTiers = data.map((tier, index) => {
            let icon;
            if (index === 0) icon = <Users className="text-sky-500" />;
            else if (index === 1) icon = <Star className="text-amber-500" />;
            else icon = <CircleDollarSign className="text-purple-500" />;
            
            // Ensure features is always an array of strings
            const features = Array.isArray(tier.features) 
              ? tier.features.map(feat => String(feat))
              : tier.features 
                ? (typeof tier.features === 'object' 
                  ? Object.values(tier.features).map(feat => String(feat))
                  : [String(tier.features)])
                : [
                  "Accès à tout le contenu standard",
                  "Messages privés (réponse sous 48h)"
                ];
            
            return {
              id: tier.id,
              name: tier.name,
              price: tier.price_usdt,
              period: "mois",
              description: tier.name === "Premium" ? "Notre offre la plus populaire." : 
                           tier.name === "VIP" ? "L'expérience ultime sans compromis." : 
                           "L'essentiel pour commencer.",
              features: features,
              callToAction: `Devenir ${tier.name}`,
              popular: tier.name === "Premium",
              color: tier.name === "Premium" ? "from-pink-500 to-purple-500" : undefined,
              icon
            };
          });
          
          setTiers(mappedTiers);
        } else {
          // Use default tiers if no data in database
          setTiers(getDefaultTiers());
        }
      } catch (err) {
        console.error("Error in fetchTiers:", err);
        setTiers(getDefaultTiers());
      } finally {
        setLoading(false);
      }
    };
    
    fetchTiers();
  }, []);
  
  const getDefaultTiers = (): SubscriptionTier[] => [
    {
      id: "fan",
      name: "Fan",
      price: 7,
      period: "mois",
      description: "L'essentiel pour commencer.",
      icon: <Users className="text-sky-500" />,
      features: [
        "Accès à tout le contenu standard",
        "Messages privés (réponse sous 48h)",
        "Contenu exclusif hebdomadaire"
      ],
      callToAction: "Commencer maintenant",
      trialDays: 7,
      trialPrice: 1
    },
    {
      id: "superfan",
      name: "Super-Fan",
      price: 19,
      period: "mois",
      description: "Notre offre la plus populaire.",
      icon: <Star className="text-amber-500" />,
      features: [
        "Tout le contenu Fan +",
        "Sessions live hebdomadaires",
        "Réponses prioritaires (sous 24h)",
        "Contenu personnalisé mensuel"
      ],
      callToAction: "Devenir Super-Fan",
      popular: true,
      discount: {
        months: 3,
        percentage: 15
      },
      color: "from-pink-500 to-purple-500"
    },
    {
      id: "vip",
      name: "VIP",
      price: 49,
      period: "mois",
      description: "L'expérience ultime sans compromis.",
      icon: <CircleDollarSign className="text-purple-500" />,
      features: [
        "Tout le contenu Super-Fan +",
        "Contenu sur demande mensuel",
        "Réponses garanties sous 6h",
        "Accès à l'archive complète",
        "Cadeaux physiques trimestriels"
      ],
      callToAction: "Devenir VIP",
      discount: {
        months: 12,
        percentage: 25
      }
    }
  ];
  
  // Icons pour les features
  const featureIcons: Record<string, React.ReactNode> = {
    "Accès à tout le contenu standard": <FileText size={16} />,
    "Messages privés (réponse sous 48h)": <MessageCircle size={16} />,
    "Contenu exclusif hebdomadaire": <Star size={16} />,
    "Sessions live hebdomadaires": <Users size={16} />,
    "Réponses prioritaires (sous 24h)": <Clock size={16} />,
    "Contenu personnalisé mensuel": <FileText size={16} />,
    "Contenu sur demande mensuel": <FileText size={16} />,
    "Réponses garanties sous 6h": <Clock size={16} />,
    "Accès à l'archive complète": <Lock size={16} />,
    "Cadeaux physiques trimestriels": <Download size={16} />,
    "Tout le contenu Fan +": <Check size={16} />,
    "Tout le contenu Super-Fan +": <Check size={16} />,
  };
  
  const handleSubscribe = async (tier: SubscriptionTier) => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.info("Connexion requise pour vous abonner");
        navigate("/login");
        return;
      }
      
      // If authenticated, proceed with subscription
      onSubscribe();
    } catch (err) {
      console.error("Error in handleSubscribe:", err);
      toast.error("Une erreur est survenue");
    }
  };

  if (loading) {
    return (
      <section className={`${bgClass} p-4 flex justify-center items-center h-64`}>
        <Loader2 className="animate-spin text-brand-red h-8 w-8" />
      </section>
    );
  }

  return (
    <section className={`${bgClass} p-4`}>
      <div className="mb-5">
        <h2 className="text-xl font-bold mb-1 flex items-center">
          <CircleDollarSign className="mr-2 text-brand-red" size={20} />
          Abonnements Disponibles
        </h2>
        <p className="text-sm text-muted-foreground">
          Choisissez l'expérience qui vous convient et accédez à du contenu exclusif.
        </p>
      </div>
      
      <div className="space-y-4">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`${cardClass} rounded-xl p-4 relative border ${tier.popular ? 'ring-2 ring-brand-accent' : ''}`}
          >
            {tier.popular && (
              <Badge 
                className={`absolute -top-2 right-4 bg-gradient-to-r ${tier.color || 'from-pink-500 to-purple-500'} text-white px-3 py-0.5`}
              >
                Populaire
              </Badge>
            )}
            
            <div className="flex items-center mb-3">
              <div className="mr-3 bg-muted rounded-full p-2">
                {tier.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
            </div>
            
            <div className="flex items-end gap-1 mb-3">
              <span className="text-2xl font-bold">{tier.price}€</span>
              <span className="text-sm text-muted-foreground mb-1">/{tier.period}</span>
            </div>
            
            <ul className="space-y-2 mb-4">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start text-sm">
                  <span className="text-brand-red mr-2 mt-0.5">
                    {featureIcons[feature] || <Check size={16} />}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <NowPaymentsSubscriptionButton
              productName={`Abonnement ${tier.name}`}
              amount={tier.price}
              tierId={tier.id}
              className={tier.popular ? 'w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white' : 'w-full bg-muted hover:bg-muted/80 text-foreground'}
            >
              {tier.callToAction}
            </NowPaymentsSubscriptionButton>
            
            {tier.trialDays && (
              <p className="text-xs text-center mt-3 text-muted-foreground">
                {tier.trialDays} jours d'essai à {tier.trialPrice}€
              </p>
            )}
            
            {tier.discount && (
              <p className="text-xs text-center mt-3 text-brand-accent">
                Économisez {tier.discount.percentage}% avec abonnement {tier.discount.months} mois
              </p>
            )}
          </div>
        ))}
      </div>
      
      <p className="text-center text-xs text-muted-foreground mt-4">
        Tous les abonnements sont sans engagement. Annulez à tout moment.
      </p>
    </section>
  );
};

export default MonetizationTiers;
