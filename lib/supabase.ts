import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Opt in to the local offline catalog with NEXT_PUBLIC_USE_LOCAL_CATALOG=true.
// Default: use Supabase when URL + anon key are configured.
const useLocalCatalog = process.env.NEXT_PUBLIC_USE_LOCAL_CATALOG === "true";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !useLocalCatalog);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      global: {
        // Avoid Next.js fetch Data Cache serving stale catalog rows after syncs.
        fetch: (input: RequestInfo | URL, init?: RequestInit) =>
          fetch(input, { ...init, cache: "no-store" }),
      },
    })
  : null;
