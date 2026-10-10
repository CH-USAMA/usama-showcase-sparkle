import { lazy, Suspense, useEffect, useState } from "react";
import { loadCommandMenu } from "@/lib/commandMenu";

/*
 * The command palette (cmdk, its dialog, a dozen icons) is ~23 kB gzipped that
 * almost nobody opens, and it was loading on every route at startup. This gate
 * listens for the same triggers (Cmd/Ctrl-K, "/" outside a field, and the
 * navbar's open-command-menu event), and only then fetches and mounts the
 * palette, already open. After that the palette owns its own shortcuts.
 */
const CommandMenu = lazy(loadCommandMenu);

const isTypingTarget = (el: EventTarget | null) => {
  const node = el as HTMLElement | null;
  if (!node) return false;
  return node.tagName === "INPUT" || node.tagName === "TEXTAREA" || node.tagName === "SELECT" || node.isContentEditable;
};

const CommandMenuGate = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const onKey = (e: KeyboardEvent) => {
      const k = (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      const slash = e.key === "/" && !e.metaKey && !e.ctrlKey && !isTypingTarget(e.target);
      if (!k && !slash) return;
      e.preventDefault();
      setMounted(true);
    };
    const onRequest = () => setMounted(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onRequest);
    };
  }, [mounted]);

  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <CommandMenu initialOpen />
    </Suspense>
  );
};

export default CommandMenuGate;
