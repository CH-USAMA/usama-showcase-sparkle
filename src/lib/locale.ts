import { useLocation } from "react-router-dom";

/**
 * Languages for the /tools section. English lives at /tools, the others under
 * a prefix (/ar/tools, /fr/tools). The rest of the site is English only.
 */
export type Locale = "en" | "ar" | "fr";

export const LOCALES: Locale[] = ["en", "ar", "fr"];
export const PREFIXED_LOCALES: Locale[] = ["ar", "fr"];

export const LOCALE_NAMES: Record<Locale, string> = { en: "English", ar: "العربية", fr: "Français" };

export const localeOf = (pathname: string): Locale => {
  const m = /^\/(ar|fr)(?=\/|$)/.exec(pathname);
  return (m?.[1] as Locale | undefined) ?? "en";
};

export const toolsPath = (locale: Locale, slug?: string) =>
  `${locale === "en" ? "" : `/${locale}`}/tools${slug ? `/${slug}` : ""}`;

export const useLocale = (): Locale => localeOf(useLocation().pathname);
