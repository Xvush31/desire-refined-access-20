
import React from 'react';
import ContentSuggestions from './ContentSuggestions';
import RevenueForecast from './RevenueForecast';

const InsightsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ContentSuggestions />
      <RevenueForecast />
    </div>
  );
};

export default InsightsSection;
