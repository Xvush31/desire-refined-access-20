
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

type NowPaymentsModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

const NOWPAYMENTS_API_KEY = ""; // NE PAS METTRE VOTRE CLÉ ICI, utiliser une fonction serverless/Supabase en prod !

const PRODUCT_NAME = "Abonnement Premium";
const AMOUNT = 9.99; // Prix en EUR

const NowPaymentsSubscriptionModal: React.FC<NowPaymentsModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      // Exemple : test en sandbox public
      const res = await fetch("https://api.nowpayments.io/v1/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": NOWPAYMENTS_API_KEY || "demo-api-key", // DEVELOPPER EN SANDBOX
        },
        body: JSON.stringify({
          price_amount: AMOUNT,
          price_currency: "eur",
          order_description: PRODUCT_NAME,
          success_url: window.location.origin + "/subscription-confirmation",
          cancel_url: window.location.origin + "/subscription",
        }),
      });
      const data = await res.json();
      if (data && data.invoice_url) {
        window.location.href = data.invoice_url;
      } else {
        toast.error("Impossible de créer la facture NOWPayments.");
      }
    } catch (e) {
      toast.error("Erreur lors de la connexion à NOWPayments.");
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
          className="bg-brand-accent text-white px-4 py-2 rounded w-full"
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? "Redirection..." : `Payer ${AMOUNT}€ avec NOWPayments`}
        </button>
        <div className="text-xs mt-2 text-muted-foreground">
          Après paiement, vous serez redirigé vers une page de confirmation.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NowPaymentsSubscriptionModal;
