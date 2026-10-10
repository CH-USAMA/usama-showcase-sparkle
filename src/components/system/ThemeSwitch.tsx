import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Theme switch, as a sliding pill. The knob sits left on the black theme and
 * right on paper, carrying the icon of the theme you are on.
 *
 * `theme` can be "system", so the state comes from what is actually applied to
 * the document rather than from the stored preference.
 *
 * The knob and icon follow the `dark` class on <html> in CSS rather than
 * React state: the prerendered HTML is built in the dark theme, and the
 * inline theme script has already applied a visitor's own before it paints.
 */
const ThemeSwitch = ({ className = "" }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label="Light theme"
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`group inline-flex h-10 shrink-0 items-center rounded-full ${className}`}
    >
      {/* 28px track inside a 40px tap target */}
      <span className="relative inline-flex h-7 w-12 items-center rounded-full border border-hairline/[0.14] bg-surface-2 transition-colors duration-standard group-hover:border-hairline/[0.28]">
        <span className="absolute left-[3px] flex h-5 w-5 translate-x-5 items-center justify-center rounded-full bg-foreground text-background shadow transition-transform duration-standard ease-out-expo dark:translate-x-0">
          <Moon className="hidden h-3 w-3 dark:block" aria-hidden="true" />
          <Sun className="h-3 w-3 dark:hidden" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
};

export default ThemeSwitch;
