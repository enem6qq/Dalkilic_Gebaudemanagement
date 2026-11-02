import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Serverseitiger Supabase-Client (Service-Role-Key). Niemals im Browser verwenden.
 * Gibt null zurück, wenn die Umgebungsvariablen fehlen – dann läuft die Seite im Demo-Modus.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
