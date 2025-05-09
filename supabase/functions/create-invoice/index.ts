
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateInvoicePayload {
  amount: number;
  currencyFrom: string;
  productName: string;
  orderId?: string;
  successUrl?: string;
  cancelUrl?: string;
  userId?: string;
  tierId?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the API key from environment variables
    const apiKey = Deno.env.get("NOWPAYMENTS_API_KEY");
    if (!apiKey) {
      throw new Error("NOWPAYMENTS_API_KEY not found in environment variables");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase configuration missing");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Parse the request body
    const { amount, currencyFrom = "eur", productName, orderId, successUrl, cancelUrl, userId, tierId } = 
      await req.json() as CreateInvoicePayload;

    // Generate a unique orderId if not provided
    const generatedOrderId = orderId || `order_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    // Set default URLs if not provided
    const origin = new URL(req.url).origin;
    const finalSuccessUrl = successUrl || `${origin}/subscription-confirmation`;
    const finalCancelUrl = cancelUrl || `${origin}/subscription`;

    // Create the invoice using NowPayments API
    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: currencyFrom,
        order_id: generatedOrderId,
        order_description: productName,
        success_url: finalSuccessUrl,
        cancel_url: finalCancelUrl,
        ipn_callback_url: `${supabaseUrl}/functions/v1/nowpayments-webhook`,
        // Additional metadata can be added here
        metadata: {
          userId: userId || "",
          tierId: tierId || "",
        }
      }),
    });

    const data = await response.json();
    
    // If the user is authenticated, record this pending transaction
    if (userId && data.id) {
      // Store the payment information in the database
      const { error } = await supabase
        .from("transactions")
        .insert({
          user_id: userId,
          amount_usdt: amount,
          status: "pending",
          transaction_type: "subscription",
          reference_id: data.id,
        });
        
      if (error) {
        console.error("Error recording transaction:", error);
      }
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
