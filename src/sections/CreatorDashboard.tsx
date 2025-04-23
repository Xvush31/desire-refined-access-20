
import React, { useState } from 'react';
import { useEngagementSequences } from '../hooks/useEngagementSequences';
import { useIsMobile } from '../hooks/use-mobile';
import DashboardHeader from './dashboard/DashboardHeader';
import MetricsSection from './dashboard/MetricsSection';
import InsightsSection from './dashboard/InsightsSection';
import CommunicationSection from './dashboard/CommunicationSection';
import SecuritySection from './dashboard/SecuritySection';
import CommunityBadges from '../features/community/CommunityBadges';
import CreatorSupport from './dashboard/CreatorSupport';
import MobileEditorActions from './dashboard/MobileEditorActions';
import CurrencySelector from '@/components/dashboard/CurrencySelector';
import WithdrawRequest from '@/components/dashboard/WithdrawRequest';
import LanguageSelector from '@/components/dashboard/LanguageSelector';
import { useLocale } from '@/contexts/LocaleContext';

// Simulé : affichage revenus par devise (EUR, USD, GBP, USDT)
const getRevenue = (currency: string) => {
  switch (currency) {
    case "EUR": return "7 245€";
    case "USD": return "$7,765";
    case "GBP": return "£6,210";
    case "USDT": return "7,765₮";
    default: return "7 245€";
  }
};

const CreatorDashboard: React.FC = () => {
  useEngagementSequences();
  const isMobile = useIsMobile();
  const [currency, setCurrency] = useState("EUR");
  const { t } = useLocale();

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="flex flex-row gap-2 justify-start items-center mb-4">
        <LanguageSelector />
        <CurrencySelector currency={currency} onChange={setCurrency} />
      </div>

      <div className="mb-6 md:flex md:items-center md:gap-12">
        <div>
          <div className="text-lg md:text-2xl font-bold mb-1">
            {t("dashboard.revenue")} ({currency}):
          </div>
          <div className="text-2xl md:text-3xl text-brand-red font-extrabold">{getRevenue(currency)}</div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-auto flex items-center">
          <WithdrawRequest />
        </div>
      </div>

      <DashboardHeader />
      {isMobile && <MobileEditorActions />}
      <MetricsSection />
      <InsightsSection />
      <CommunicationSection />
      <CommunityBadges />
      <SecuritySection />
      <CreatorSupport />
    </div>
  );
};

export default CreatorDashboard;

