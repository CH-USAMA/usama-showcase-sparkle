import { SITE_URL } from "@/data/site";
import { LOCALES, toolsPath, type Locale } from "@/lib/locale";

/** hreflang links for a /tools page: every language, plus English as the default. */
export const toolAlternates = (slug?: string) => [
  ...LOCALES.map((l) => ({ hrefLang: l, href: `${SITE_URL}${toolsPath(l, slug)}` })),
  { hrefLang: "x-default", href: `${SITE_URL}${toolsPath("en", slug)}` },
];

/** Arabic pages read right to left; the site's header and footer stay English. */
export const mainLangProps = (locale: Locale) => (locale === "en" ? {} : { lang: locale, dir: locale === "ar" ? "rtl" : "ltr" });
