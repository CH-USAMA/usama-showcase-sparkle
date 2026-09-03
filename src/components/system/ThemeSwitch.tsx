import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Theme switch, in the site's own language rather than the shadcn button.
 *
 * The stylesheet already carries a full light palette (hairlines invert to
 * dark, every hue token has a re-darkened sibling), so this only had to be
 * exposed, not built. Dark stays the default and the canonical design.
 *
 * `theme` can be "system", so the icon is chosen from what is actually applied
 * to the document rather than from the stored preference; otherwise a visitor
 * on system-dark would see a moon while looking at a dark page.
 */
const ThemeSwitch = ({ className = "" }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline/[0.1] text-muted-foreground transition-colors duration-standard hover:border-hairline/[0.2] hover:text-foreground ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeSwitch;
