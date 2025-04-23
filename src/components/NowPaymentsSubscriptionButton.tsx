
import React, { useState } from "react";
import NowPaymentsSubscriptionModal from "./NowPaymentsSubscriptionModal";

const NowPaymentsSubscriptionButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="w-full py-3 text-white font-semibold rounded-lg shadow-lg 
        bg-gradient-to-r from-[#e91e63] to-[#ff9800] 
        hover:from-[#d81557] hover:to-[#f57c00]
        transform transition-all duration-200 hover:scale-[1.02]
        focus:ring-2 focus:ring-[#e91e63] focus:ring-offset-2 focus:ring-offset-[#1A1F2C]"
        onClick={() => setOpen(true)}
      >
        S'abonner maintenant avec NOWPayments
      </button>
      <NowPaymentsSubscriptionModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default NowPaymentsSubscriptionButton;
