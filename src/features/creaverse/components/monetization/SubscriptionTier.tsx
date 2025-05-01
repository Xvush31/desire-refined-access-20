
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubscriptionTierProps {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  className?: string;
  onSubscribe?: () => void;
  discountInfo?: string;
  currency?: string;
  buttonLabel?: string;
}

const SubscriptionTier = ({
  name,
  price,
  features,
  popular = false,
  className,
  onSubscribe,
  discountInfo,
  currency = '$',
  buttonLabel = 'Subscribe',
}: SubscriptionTierProps) => {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden relative border animate-fade-in',
        popular ? 'border-primary ring-2 ring-primary/30' : 'border-border',
        className
      )}
    >
      {popular && (
        <div className="absolute top-0 w-full text-center bg-primary text-primary-foreground text-xs font-medium py-1">
          POPULAR
        </div>
      )}
      <div className={cn('p-5', popular ? 'pt-7' : '')}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {currency}{price}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </div>
            {discountInfo && (
              <div className="text-xs text-primary mt-1">{discountInfo}</div>
            )}
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check size={16} className="text-green-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={onSubscribe}
          className={cn(
            "mt-5 w-full",
            popular 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionTier;
