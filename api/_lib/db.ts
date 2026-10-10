import { createClient, type Client } from "@libsql/client/web";

/**
 * Turso connection, shared by every function in this process.
 *
 * The `web` build talks to Turso over HTTPS with fetch: no native modules, so
 * it runs the same in Vercel functions, in the Vite dev middleware and in the
 * build scripts. Credentials are server-only env vars (no VITE_ prefix), so
 * they are never inlined into the browser bundle.
 */
let client: Client | null = null;

export function db(): Client {
  if (client) return client;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) throw new Error("TURSO_DATABASE_URL is not set");
  client = createClient({ url, authToken });
  return client;
}

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS posts (
    id             TEXT PRIMARY KEY,
    slug           TEXT NOT NULL UNIQUE,
    title          TEXT NOT NULL,
    seo_title      TEXT,
    excerpt        TEXT NOT NULL DEFAULT '',
    content        TEXT NOT NULL DEFAULT '',
    featured_image TEXT,
    author         TEXT NOT NULL DEFAULT 'Usama Munawar',
    tags           TEXT NOT NULL DEFAULT '[]',
    status         TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at   TEXT NOT NULL,
    created_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  )`,
  `CREATE INDEX IF NOT EXISTS posts_feed ON posts (status, published_at DESC)`,
  `CREATE TABLE IF NOT EXISTS projects (
    id         INTEGER PRIMARY KEY,
    slug       TEXT NOT NULL UNIQUE,
    status     TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    featured   INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    project    TEXT,
    case_study TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    CHECK (project IS NOT NULL OR case_study IS NOT NULL)
  )`,
  `CREATE INDEX IF NOT EXISTS projects_order ON projects (status, sort_order)`,
];

/**
 * Columns added after the tables were first created. Each runs once: the
 * column is added only if PRAGMA table_info does not list it yet.
 */
const ADDED_COLUMNS: { table: string; column: string; definition: string }[] = [
  // The title search results show, when the headline is too long for them.
  { table: "posts", column: "seo_title", definition: "TEXT" },
];

export async function migrate(c: Client = db()) {
  for (const { table, column, definition } of ADDED_COLUMNS) {
    const cols = await c.execute(`PRAGMA table_info(${table})`);
    if (!cols.rows.some((r) => r.name === column)) {
      await c.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    }
  }
}

export async function ensureSchema(c: Client = db()) {
  await c.batch(SCHEMA, "write");
  await migrate(c);
}
