/**
 * Public Supabase coordinates for plain fetch calls to edge functions, so the
 * pages that only call a function do not pull in supabase-js. Environment
 * values win; the fallbacks are the same public project URL and anon key the
 * generated client (src/integrations/supabase/client.ts) ships with. The anon
 * key is public by design.
 */
export const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL || "https://bjsbzhcbcsylmfkdcxeo.supabase.co";

export const SUPABASE_ANON_KEY: string =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqc2J6aGNiY3N5bG1ma2RjeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMjI3MzQsImV4cCI6MjA4ODg5ODczNH0.aJn5q_CCJG2xwFOKP5FiOuKXYuVf3IDKzCEveTdMhKU";
