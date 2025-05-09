
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SubscriptionTier {
  id: string;
  name: string;
  price_usdt: number;
  features: string[];
}

export interface SubscriptionDetails {
  active: boolean;
  subscription?: {
    id: string;
    is_active: boolean;
    starts_at: string;
    expires_at: string;
  };
  expiresAt?: string;
  tier?: SubscriptionTier;
}

/**
 * Create a payment invoice using NowPayments
 * @param amount The amount to charge
 * @param productName The product name
 * @param tierId The subscription tier ID
 * @returns The invoice data or null if there was an error
 */
export const createPaymentInvoice = async (
  amount: number, 
  productName: string,
  tierId?: string
): Promise<{invoice_url: string; id: string} | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Vous devez être connecté pour vous abonner");
      return null;
    }
    
    const { data, error } = await supabase.functions.invoke("create-invoice", {
      body: {
        amount,
        productName,
        userId: user.id,
        tierId
      }
    });

    if (error) {
      console.error("Error creating invoice:", error);
      toast.error("Erreur lors de la création de la facture");
      return null;
    }

    if (!data.invoice_url) {
      toast.error("Impossible de créer la facture NOWPayments");
      return null;
    }

    return data;
  } catch (e) {
    console.error("Error in createPaymentInvoice:", e);
    toast.error("Erreur lors de la connexion à NOWPayments");
    return null;
  }
};

/**
 * Check if the user has an active subscription
 * @returns Details about the user's subscription status
 */
export const checkSubscription = async (): Promise<SubscriptionDetails | null> => {
  try {
    const { data, error } = await supabase.functions.invoke("verify-subscription");

    if (error) {
      console.error("Error verifying subscription:", error);
      return null;
    }

    return data as SubscriptionDetails;
  } catch (e) {
    console.error("Error in checkSubscription:", e);
    return null;
  }
};

/**
 * Format a date to a human-readable string
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export const formatExpiryDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
