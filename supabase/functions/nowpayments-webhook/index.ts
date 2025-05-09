
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";
import { createHmac } from "https://deno.land/std@0.170.0/node/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NowPaymentsIPNPayload {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  order_id: string;
  order_description: string;
  ipn_callback_url: string;
  created_at: string;
  updated_at: string;
  purchase_id: string;
  metadata?: {
    userId: string;
    tierId: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the IPN secret from environment variables
    const ipnSecret = Deno.env.get("NOWPAYMENTS_IPN_SECRET");
    if (!ipnSecret) {
      throw new Error("NOWPAYMENTS_IPN_SECRET not found in environment variables");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase configuration missing");
    }
    
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify the authenticity of the IPN request
    const signature = req.headers.get("x-nowpayments-sig");
    const rawBody = await req.text();
    
    // Generate HMAC-SHA512 hash to verify the request
    const hmac = createHmac("sha512", ipnSecret);
    hmac.update(rawBody);
    const calculatedSignature = hmac.digest("hex");
    
    if (signature !== calculatedSignature) {
      console.error("Invalid signature from NowPayments IPN");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Parse the payload
    const payload = JSON.parse(rawBody) as NowPaymentsIPNPayload;
    const { payment_id, payment_status, price_amount, metadata } = payload;
    const userId = metadata?.userId;
    const tierId = metadata?.tierId;
    
    console.log("Received IPN:", { payment_id, payment_status, userId, tierId });
    
    if (payment_status === "finished" && userId && tierId) {
      // Update the transaction status
      const { data: txData, error: txError } = await supabase
        .from("transactions")
        .update({ status: "completed" })
        .match({ reference_id: payment_id })
        .select();
        
      if (txError) {
        console.error("Error updating transaction:", txError);
      }
      
      // Get subscription tier details
      const { data: tierData, error: tierError } = await supabase
        .from("subscription_tiers")
        .select("duration_days")
        .eq("id", tierId)
        .single();
        
      if (tierError) {
        console.error("Error fetching tier details:", tierError);
        return new Response(JSON.stringify({ status: "error", message: "Tier not found" }), {
          status: 200, // Still return 200 to acknowledge the IPN
          headers: { "Content-Type": "application/json" },
        });
      }
      
      const durationDays = tierData?.duration_days || 30; // Default to 30 days if not specified
      
      // Calculate expiration date
      const now = new Date();
      const expiresAt = new Date(now);
      expiresAt.setDate(now.getDate() + durationDays);
      
      // Create a subscription record
      const { error: subError } = await supabase
        .from("user_subscriptions")
        .insert({
          user_id: userId,
          tier_id: tierId,
          starts_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          is_active: true,
          transaction_id: txData?.[0]?.id,
        });
        
      if (subError) {
        console.error("Error creating subscription:", subError);
      }
    } else if (payment_status === "failed" && userId) {
      // Update the transaction status for failed payments
      const { error: txError } = await supabase
        .from("transactions")
        .update({ status: "failed" })
        .match({ reference_id: payment_id });
        
      if (txError) {
        console.error("Error updating transaction status:", txError);
      }
    }

    // Always respond with 200 OK to acknowledge the IPN
    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing IPN:", error);
    // Still return 200 OK to prevent NOWPayments from retrying
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
});
