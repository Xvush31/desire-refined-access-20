
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Check } from 'lucide-react';

interface SubscriptionPromoBannerProps {
  tier?: 'basic' | 'premium' | 'vip' | 'elite';
  onClose?: () => void;
}

const SubscriptionPromoBanner: React.FC<SubscriptionPromoBannerProps> = ({ 
  tier = 'premium',
  onClose
}) => {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return null;
  }

  const handleClose = () => {
    setIsClosed(true);
    if (onClose) onClose();
  };

  const getTierData = () => {
    switch (tier) {
      case 'basic':
        return {
          name: 'Basic',
          price: '9,99 €',
          highlight: 'Accès standard aux vidéos',
          className: 'from-slate-800 to-slate-900'
        };
      case 'premium':
        return {
          name: 'Premium',
          price: '14,99 €',
          highlight: 'Vidéos exclusives en HD',
          className: 'animated-gradient-bg'
        };
      case 'vip':
        return {
          name: 'VIP',
          price: '19,99 €',
          highlight: 'Contenu non censuré et chats privés',
          className: 'from-purple-800 to-purple-900'
        };
      case 'elite':
        return {
          name: 'Elite',
          price: '24,99 €',
          highlight: 'Expérience complète et contenu personalisé',
          className: 'from-amber-600 to-amber-800'
        };
    }
  };

  const tierData = getTierData();

  return (
    <div className={`relative w-full p-4 mb-4 rounded-xl bg-gradient-to-r ${tierData.className} text-white shadow-lg overflow-hidden`}>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-white/70 hover:text-white"
        aria-label="Fermer"
      >
        <X size={18} />
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-lg font-bold">{tierData.name} - {tierData.price}/mois</h3>
          <p className="text-sm flex items-center">
            <Check className="h-4 w-4 mr-1" /> {tierData.highlight}
          </p>
        </div>
        
        <Link
          to="/subscription"
          className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
        >
          S'abonner
        </Link>
      </div>
      
      {/* Subtle background decoration */}
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
    </div>
  );
};

export default SubscriptionPromoBanner;
