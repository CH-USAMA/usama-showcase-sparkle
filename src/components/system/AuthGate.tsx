import type { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";

/**
 * Wraps only the routes that actually authenticate.
 *
 * AuthProvider used to sit at the root of App, which pulled
 * @supabase/supabase-js into the entry chunk and therefore onto the home page,
 * where nothing signs in. Lighthouse attributed a large share of the entry
 * payload to script the landing page never calls.
 *
 * This file is the lazy boundary: because App imports it with React.lazy, the
 * Supabase client is fetched when someone opens /auth or /admin, and not
 * before.
 */
const AuthGate = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AuthGate;
