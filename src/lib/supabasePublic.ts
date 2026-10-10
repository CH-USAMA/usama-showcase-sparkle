import { DEFAULT_SUPABASE_ANON_KEY, DEFAULT_SUPABASE_URL } from "./supabaseDefaults";

/**
 * Public Supabase coordinates for plain fetch calls to edge functions, so the
 * pages that only call a function do not pull in supabase-js. Environment
 * values win; the fallbacks are in ./supabaseDefaults.
 */
export const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;

export const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_ANON_KEY;
