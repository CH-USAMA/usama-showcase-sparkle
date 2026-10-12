import { Link } from "react-router-dom";
import { Languages } from "lucide-react";
import { LOCALES, LOCALE_NAMES, toolsPath, type Locale } from "@/lib/locale";

/** Links to this /tools page in the other languages. Each name is written in its own language. */
const LanguageSwitch = ({ locale, slug, label }: { locale: Locale; slug?: string; label: string }) => (
  <nav aria-label={label} className="flex items-center gap-1.5">
    <Languages className="h-4 w-4 text-subtle" aria-hidden="true" />
    {LOCALES.map((l) =>
      l === locale ? (
        <span key={l} lang={l} aria-current="page" className="rounded-md bg-surface-2 px-2.5 py-1.5 font-inter text-xs font-medium text-foreground">
          {LOCALE_NAMES[l]}
        </span>
      ) : (
        <Link
          key={l}
          to={toolsPath(l, slug)}
          lang={l}
          hrefLang={l}
          className="rounded-md px-2.5 py-1.5 font-inter text-xs text-muted-foreground transition-colors duration-standard hover:text-foreground"
        >
          {LOCALE_NAMES[l]}
        </Link>
      )
    )}
  </nav>
);

export default LanguageSwitch;
