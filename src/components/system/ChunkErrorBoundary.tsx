import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|error loading dynamically imported|Failed to fetch|ChunkLoadError|Loading chunk/i;

/**
 * Catches a page whose code fails to load. The usual cause is a deploy: the
 * HTML a visitor has open names chunks from the previous build, and those
 * files are gone. Loading the page fresh fixes it, so do that once per path
 * per session; anything else, or a second failure, shows a way out instead
 * of an empty screen.
 */
class ChunkErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    const key = `reloaded:${window.location.pathname}`;
    if (CHUNK_ERROR.test(String(error?.message ?? error)) && !sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      window.location.reload();
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main id="main" className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-inter text-lg font-medium text-foreground">This page did not load.</p>
        <a href={typeof window === "undefined" ? "/" : window.location.href} className="font-inter text-sm text-primary underline underline-offset-4">
          Try again
        </a>
      </main>
    );
  }
}

export default ChunkErrorBoundary;
