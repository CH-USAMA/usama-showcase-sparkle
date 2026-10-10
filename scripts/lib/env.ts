import { existsSync, readFileSync } from "node:fs";

/**
 * Loads .env then .env.local into process.env for build scripts, without
 * overriding variables that are already set (so Vercel's env always wins).
 */
export function loadEnv() {
  for (const file of [".env", ".env.local"]) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const [, key, raw] = m;
      if (process.env[key] !== undefined) continue;
      process.env[key] = raw.replace(/^(['"])(.*)\1$/, "$2");
    }
  }
}
