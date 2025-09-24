
// Edge Function: Lembrete de agendamento
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
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
