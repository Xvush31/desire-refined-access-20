
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Users, Clock, Calendar, Video, MessageCircle, Download } from "lucide-react";

export interface TierFeature {
  text: string;
  icon?: "check" | "star" | "users" | "clock" | "calendar" | "video" | "message" | "download";
  highlight?: boolean;
}

export interface SubscriptionTierData {
  id: string;
  name: string;
  price: number;
  period: "month" | "year" | "weekly";
  description: string;
  features: TierFeature[];
  popular?: boolean;
  color?: string;
  trial?: {
    days: number;
    price: number;
  };
  discount?: {
    period: number;
    percentage: number;
  };
}

interface SubscriptionTierProps {
  tier: SubscriptionTierData;
  onSubscribe: (tierId: string) => void;
  className?: string;
}

const SubscriptionTier: React.FC<SubscriptionTierProps> = ({
  tier,
  onSubscribe,
  className = ""
}) => {
  const getFeatureIcon = (icon?: string) => {
    switch (icon) {
      case "star": return <Star size={16} />;
      case "users": return <Users size={16} />;
      case "clock": return <Clock size={16} />;
      case "calendar": return <Calendar size={16} />;
      case "video": return <Video size={16} />;
      case "message": return <MessageCircle size={16} />;
      case "download": return <Download size={16} />;
      case "check":
      default: return <Check size={16} />;
    }
  };

  const getPeriodLabel = () => {
    switch (tier.period) {
      case "year": return "an";
      case "weekly": return "semaine";
      case "month":
      default: return "mois";
    }
  };

  return (
    <Card className={`border overflow-hidden ${tier.popular ? 'ring-2 ring-brand-red' : ''} ${className}`}>
      {tier.popular && (
        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
          Populaire
        </Badge>
      )}
      
      <CardHeader className={`${tier.color ? `bg-gradient-to-r ${tier.color} text-white` : ''} pb-4 pt-6`}>
        <h3 className="text-xl font-bold">{tier.name}</h3>
        <p className="text-sm opacity-90">{tier.description}</p>
        
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-extrabold">{tier.price}€</span>
          <span className="text-sm ml-1 opacity-90">/{getPeriodLabel()}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li 
              key={index} 
              className={`flex items-start gap-2 ${feature.highlight ? 'text-brand-red font-medium' : ''}`}
            >
              <span className={`mt-0.5 ${feature.highlight ? 'text-brand-red' : 'text-brand-accent'}`}>
                {getFeatureIcon(feature.icon)}
              </span>
              <span className="text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2 pt-2 pb-6">
        <Button 
          className={`w-full ${tier.popular ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white' : ''}`}
          variant={tier.popular ? "default" : "outline"}
          onClick={() => onSubscribe(tier.id)}
        >
          Devenir {tier.name}
        </Button>
        
        {tier.trial && (
          <p className="text-xs text-center mt-1 text-muted-foreground">
            {tier.trial.days} jours d'essai pour {tier.trial.price}€
          </p>
        )}
        
        {tier.discount && (
          <p className="text-xs text-center mt-1 text-brand-accent">
            Économisez {tier.discount.percentage}% avec abonnement {tier.discount.period} mois
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubscriptionTier;
