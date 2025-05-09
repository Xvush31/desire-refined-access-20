
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { createPaymentInvoice } from "@/utils/subscriptionUtils";
import { Loader2 } from "lucide-react";

type NowPaymentsModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  productName?: string;
  amount: number;
  tierId?: string;
};

const NowPaymentsSubscriptionModal: React.FC<NowPaymentsModalProps> = ({
  open,
  onOpenChange,
  productName = "Abonnement Premium",
  amount,
  tierId
}) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const invoice = await createPaymentInvoice(amount, productName, tierId);
      if (invoice && invoice.invoice_url) {
        // Redirect to the payment page
        window.location.href = invoice.invoice_url;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Paiement crypto avec NOWPayments</DialogTitle>
        </DialogHeader>
        <div className="text-sm mb-3 text-muted-foreground">
          Votre abonnement sera activé après validation du paiement par NOWPayments.
        </div>
        <button
          className="bg-brand-accent text-white px-4 py-2 rounded w-full flex items-center justify-center"
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirection...
            </>
          ) : (
            `Payer ${amount}€ avec NOWPayments`
          )}
        </button>
        <div className="text-xs mt-2 text-muted-foreground">
          Après paiement, vous serez redirigé vers une page de confirmation.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NowPaymentsSubscriptionModal;
