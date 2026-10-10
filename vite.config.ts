import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { apiDevServer } from "./scripts/vite-api-dev";

export default defineConfig(({ mode, command, isSsrBuild }) => {
  // The /api functions read server-only variables (TURSO_*, ADMIN_EMAILS)
  // from process.env, as they do on Vercel. In dev, load every .env* value
  // into process.env for them. This does not expose anything to the browser:
  // only VITE_-prefixed variables are ever inlined into client code.
  if (command === "serve") {
    for (const [k, v] of Object.entries(loadEnv(mode, process.cwd(), ""))) {
      process.env[k] ??= v;
    }
  }

  return {
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    apiDevServer(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // `vite build --ssr src/entry-server.tsx` (see package.json): the server
  // bundle scripts/prerender.ts renders every public route with at build time.
  // Node runs it once, locally; none of it ships to the browser.
  build: isSsrBuild ? { outDir: "dist-ssr", target: "node18", minify: false, copyPublicDir: false, reportCompressedSize: false } : {
    rollupOptions: {
      output: {
        // Only group things the entry actually needs. Naming a manual chunk
        // for a purely dynamic import (react-syntax-highlighter) promoted it
        // into the entry's modulepreload set, so every page eagerly fetched
        // ~227 kB gzipped of highlighter it never rendered. Leave it out and
        // Rollup keeps it a real lazy chunk, loaded only by CodeBlock.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
          // framer-motion is deliberately NOT named here. Naming a manual
          // chunk for a library that is only reached through dynamic imports
          // promotes it into the entry's modulepreload set, which is exactly
          // what happened to react-syntax-highlighter before it. Once Navbar,
          // ProofStrip and Reveal stopped importing it, every remaining
          // consumer was a lazy section, but the manual chunk kept 135 kB on
          // the critical path of a page that never used it. Left unnamed,
          // Rollup keeps it inside the lazy chunks that actually need it.
        },
      },
    },
    // scripts/prerender.ts reads dist/.vite/manifest.json to emit per-route
    // modulepreload links, then deletes it.
    manifest: true,
    target: 'es2020',
    cssMinify: true,
    minify: 'esbuild',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
  },
};
});
