import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
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
    target: 'es2020',
    cssMinify: true,
    minify: 'esbuild',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
  },
}));
