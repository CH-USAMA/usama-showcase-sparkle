import { useEffect, useState } from "react";

/**
 * Dev-only accent picker. Rendered from App.tsx behind `import.meta.env.DEV`,
 * so it is tree-shaken out of production builds.
 *
 * It only sets `data-accent` on <html>; every colour on the site derives from
 * that attribute (see the accent sets at the top of index.css). To ship a
 * different accent, change which set the bare `:root` selector points at.
 */
const ACCENTS = [
  { id: "cobalt", swatch: "hsl(212 92% 44%)" },
  { id: "forest", swatch: "hsl(160 70% 26%)" },
  { id: "rust", swatch: "hsl(14 78% 44%)" },
  { id: "ink", swatch: "hsl(224 24% 11%)" },
] as const;

const KEY = "dev-accent";

const PaletteSwitcher = () => {
  const [accent, setAccent] = useState<string>(() => localStorage.getItem(KEY) ?? "cobalt");

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    localStorage.setItem(KEY, accent);
  }, [accent]);

  return (
    <div
      className="fixed bottom-4 left-4 z-[60] flex items-center gap-1.5 rounded-full border border-hairline/[0.12] bg-surface-1 p-1.5 shadow-elegant"
      role="radiogroup"
      aria-label="Accent colour (dev only)"
    >
      {ACCENTS.map((a) => (
        <button
          key={a.id}
          type="button"
          role="radio"
          aria-checked={accent === a.id}
          title={a.id}
          onClick={() => setAccent(a.id)}
          className={`h-6 w-6 rounded-full border border-hairline/[0.2] ring-offset-2 ring-offset-surface-1 transition-shadow ${
            accent === a.id ? "ring-2 ring-foreground/70" : ""
          }`}
          style={{ backgroundColor: a.swatch }}
        />
      ))}
    </div>
  );
};

export default PaletteSwitcher;
