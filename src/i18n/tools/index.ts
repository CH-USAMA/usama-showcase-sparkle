import type { Locale } from "@/lib/locale";
import { useLocale } from "@/lib/locale";
import en, { type ToolsText } from "./en";
import ar from "./ar";
import fr from "./fr";

export type { ToolsText };

export const TOOLS_TEXT: Record<Locale, ToolsText> = { en, ar, fr };

/** The /tools text for the language in the current URL. */
export const useToolsText = () => {
  const locale = useLocale();
  return { locale, t: TOOLS_TEXT[locale] };
};
