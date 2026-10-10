import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Calls /api/admin/* with the signed-in user's Supabase access token. The
 * server verifies the token and checks the email against ADMIN_EMAILS; this
 * file only carries it.
 */
export class AdminError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function adminFetch<T>(
  path: string,
  init: { method?: "GET" | "POST" | "PUT" | "DELETE"; body?: unknown } = {}
): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new AdminError(401, "Sign in required");

  const res = await fetch(`/api/admin/${path}`, {
    method: init.method ?? "GET",
    headers: {
      authorization: `Bearer ${token}`,
      ...(init.body !== undefined ? { "content-type": "application/json" } : {}),
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json() : null;
  if (!res.ok) {
    throw new AdminError(
      res.status,
      (payload && typeof payload.error === "string" && payload.error) ||
        (isJson ? `Request failed (${res.status})` : "The content API is not available here")
    );
  }
  return payload as T;
}

/** Lines ↔ array helpers for the list fields in the editors. */
export const toLines = (a: string[] | undefined) => (a ?? []).join("\n");
export const fromLines = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const toCsv = (a: string[] | undefined) => (a ?? []).join(", ");
export const fromCsv = (s: string) =>
  s
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

/**
 * Sanitises a slug while it is being typed: lowercase, spaces become hyphens,
 * anything else invalid is dropped, but a trailing hyphen is kept so "my-"
 * can become "my-post". The strict `slugify` runs on blur and on save.
 */
export const slugTyping = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+/, "")
    .slice(0, 80);

/** Warns before the tab is closed or reloaded while `dirty` is true. */
export function useUnsavedGuard(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
}
