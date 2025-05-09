
import React, { useState } from "react";
import NowPaymentsSubscriptionModal from "./NowPaymentsSubscriptionModal";

interface NowPaymentsSubscriptionButtonProps {
  productName?: string;
  amount?: number;
  tierId?: string;
  className?: string;
  children?: React.ReactNode;
}

const NowPaymentsSubscriptionButton: React.FC<NowPaymentsSubscriptionButtonProps> = ({
  productName = "Abonnement Premium",
  amount = 9.99,
  tierId,
  className = "",
  children
}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button
        className={`${className || "w-full py-3 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-[#e91e63] to-[#ff9800] hover:from-[#d81557] hover:to-[#f57c00] transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-[#e91e63] focus:ring-offset-2 focus:ring-offset-[#1A1F2C]"}`}
        onClick={() => setOpen(true)}
      >
        {children || "S'abonner maintenant avec NOWPayments"}
      </button>
      <NowPaymentsSubscriptionModal 
        open={open} 
        onOpenChange={setOpen} 
        productName={productName}
        amount={amount}
        tierId={tierId}
      />
    </>
  );
};

export default NowPaymentsSubscriptionButton;
