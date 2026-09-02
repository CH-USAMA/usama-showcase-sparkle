import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/ThemeProvider"

// Canonical domain guard: send the published Lovable mirror to the canonical Vercel domain
// (preview/editor hosts are left untouched so the Lovable preview keeps working).
const CANONICAL_HOST = "dev-usama-portfolio.vercel.app"
const MIRROR_HOSTS = ["usama-showcase-sparkle.lovable.app"]
if (typeof window !== "undefined" && MIRROR_HOSTS.includes(window.location.hostname)) {
  window.location.replace(
    `https://${CANONICAL_HOST}${window.location.pathname}${window.location.search}${window.location.hash}`
  )
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
