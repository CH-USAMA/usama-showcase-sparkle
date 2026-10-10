import { existsSync } from "node:fs";
import path from "node:path";
import type { IncomingMessage } from "node:http";
import type { Plugin } from "vite";

/**
 * Serves the Vercel functions in /api from the Vite dev server, so
 * `npm run dev` on :8080 behaves like production without `vercel dev`.
 *
 * /api/admin/posts → api/admin/posts.ts, calling its exported GET/POST/PUT/
 * DELETE with a standard Request and streaming the Response back. Files are
 * loaded through Vite's SSR loader, so edits to a function hot-reload.
 * Underscore paths (api/_lib) are private, exactly as on Vercel.
 */
const API_DIR = path.resolve("api");
/** Admin payloads are text; nothing legitimate comes close to this. */
const MAX_BODY = 1_000_000;

export function apiDevServer(): Plugin {
  return {
    name: "api-dev-server",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? "/", "http://localhost");
        if (!url.pathname.startsWith("/api/")) return next();

        const route = url.pathname.replace(/^\/api\//, "").replace(/\/$/, "");
        // Only plain route names: lowercase segments, no drive letters,
        // backslashes, dots or private `_` folders. Then confirm the resolved
        // file is still inside api/, since path.resolve() jumps to any
        // absolute path it is handed (e.g. /api/C:/elsewhere/file).
        const file = path.resolve(API_DIR, `${route}.ts`);
        if (
          !/^[a-z0-9-]+(\/[a-z0-9-]+)*$/.test(route) ||
          !file.startsWith(API_DIR + path.sep) ||
          !existsSync(file)
        ) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ error: "No such function" }));
        }

        try {
          const mod = await server.ssrLoadModule(file);
          const handler = mod[req.method ?? "GET"];
          if (typeof handler !== "function") {
            res.statusCode = 405;
            return res.end(JSON.stringify({ error: "Method not allowed" }));
          }

          const body = ["GET", "HEAD"].includes(req.method ?? "GET") ? undefined : await readBody(req);
          const headers = new Headers();
          for (const [k, v] of Object.entries(req.headers)) {
            if (typeof v === "string") headers.set(k, v);
            else if (Array.isArray(v)) headers.set(k, v.join(", "));
          }

          const response: Response = await handler(
            new Request(`http://localhost:8080${req.url}`, { method: req.method, headers, body })
          );
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (e) {
          server.ssrFixStacktrace(e as Error);
          console.error("[api-dev]", e);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Internal error" }));
        }
      });
    },
  };
}

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > MAX_BODY) {
        req.destroy();
        reject(new Error("Body too large"));
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
