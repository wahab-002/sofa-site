import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// While real product photos are being wired, prefer the local catalog (same as localhost).
// Set NEXT_PUBLIC_USE_LOCAL_CATALOG=false on Vercel to use Supabase again.
const useLocalCatalog = process.env.NEXT_PUBLIC_USE_LOCAL_CATALOG !== "false";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !useLocalCatalog);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
