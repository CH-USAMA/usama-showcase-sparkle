/**
 * npm run content:migrate
 *
 * Brings the Turso schema up to date: creates missing tables and adds the
 * columns listed in ADDED_COLUMNS (api/_lib/db.ts). It never touches rows and
 * is safe to run again. Run it before deploying code that reads a new column.
 */
import { loadEnv } from "./lib/env";
import { db, ensureSchema } from "../api/_lib/db";

loadEnv();
await ensureSchema(db());
console.log("migrate: schema is up to date");
