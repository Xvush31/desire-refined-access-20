
import React, { useState } from "react";
import NowPaymentsSubscriptionModal from "./NowPaymentsSubscriptionModal";

const NowPaymentsSubscriptionButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="w-full py-2 text-white bg-brand-accent rounded-lg font-semibold mt-4 shadow hover:bg-brand-accent/90 transition-colors"
        onClick={() => setOpen(true)}
      >
        S'abonner avec NOWPayments
      </button>
      <NowPaymentsSubscriptionModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default NowPaymentsSubscriptionButton;
