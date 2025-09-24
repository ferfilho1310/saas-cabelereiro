
// Edge Function: Lembrete de agendamento
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://gydlprrqffqgqayogqug.supabase.co;
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5ZGxwcnJxZmZxZ3FheW9ncXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2ODQ2ODQsImV4cCI6MjA3NDI2MDY4NH0.SFit8uLKvIVV2xVnOwtFHTkOBv7IOS68dV464dEKi_8";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
    const now = new Date();
    const inTenMinutes = new Date(now.getTime() + 10 * 60000).toISOString().slice(0, 16);

    const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("datahora", inTenMinutes);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    if (data && data.length > 0) {
        for (const appointment of data) {
            console.log("🔔 Lembrete:", appointment);
            // Aqui você pode integrar com Twilio, WhatsApp API, etc.
        }
    }

    return new Response(JSON.stringify({ status: "ok", found: data?.length || 0 }), { status: 200 });
});
