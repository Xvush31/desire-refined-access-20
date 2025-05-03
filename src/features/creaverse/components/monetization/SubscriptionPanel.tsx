
import React from 'react';
import SubscriptionTier from './SubscriptionTier';
import { cn } from '@/lib/utils';

interface SubscriptionPanelProps {
  className?: string;
  onSubscribe?: (tier: string) => void;
}

const SubscriptionPanel = ({ className, onSubscribe }: SubscriptionPanelProps) => {
  const handleSubscribe = (tier: string) => {
    if (onSubscribe) {
      onSubscribe(tier);
    }
  };

  return (
    <div className={cn("border rounded-xl p-5 bg-card", className)}>
      <h2 className="text-xl font-semibold mb-5">Join the exclusive universe</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SubscriptionTier 
          name="Fan"
          price={7}
          features={[
            "Access to all standard content",
            "Private messages (response within 48h)",
            "Weekly exclusive content"
          ]}
          discountInfo="7-day trial for $1"
          buttonLabel="Become a Fan"
          onSubscribe={() => handleSubscribe('fan')}
        />
        
        <SubscriptionTier 
          name="Super-Fan"
          price={19}
          features={[
            "All Fan content +",
            "Weekly live sessions",
            "Priority responses (within 24h)",
            "Monthly personalized content"
          ]}
          discountInfo="Save 15% on 3 months"
          buttonLabel="Become a Super-Fan"
          popular={true}
          onSubscribe={() => handleSubscribe('superfan')}
        />
        
        <SubscriptionTier 
          name="VIP"
          price={49}
          features={[
            "All Super-Fan content +",
            "Monthly on-demand content",
            "Guaranteed responses within 6h",
            "Access to complete archive",
            "Quarterly gifts"
          ]}
          discountInfo="Save 25% on 12 months"
          buttonLabel="Become VIP"
          onSubscribe={() => handleSubscribe('vip')}
        />
      </div>
    </div>
  );
};

export default SubscriptionPanel;
