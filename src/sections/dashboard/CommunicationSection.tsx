
import React from 'react';
import PrivateMessages from './PrivateMessages';
import SubscriberSegments from './SubscriberSegments';

const CommunicationSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PrivateMessages />
      <SubscriberSegments />
    </div>
  );
};

export default CommunicationSection;
