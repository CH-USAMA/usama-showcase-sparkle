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
          motion: ['framer-motion'],
          query: ['@tanstack/react-query'],
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
