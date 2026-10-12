import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import Mascot from "@/components/Mascot";
import LanguageSwitch from "@/components/tools/LanguageSwitch";
import { mainLangProps, toolAlternates } from "@/components/tools/toolMeta";
import { SITE_URL } from "@/data/site";
import { toolsIn } from "@/data/tools";
import { useToolsText } from "@/i18n/tools";
import { toolsPath } from "@/lib/locale";
import { useEnter } from "@/lib/boot";

/** /tools (and /ar/tools, /fr/tools): the free tools, one card each. */
const Tools = () => {
  const enter = useEnter();
  const { locale, t } = useToolsText();
  const tools = toolsIn(t);
  const url = `${SITE_URL}${toolsPath(locale)}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: t.common.freeTools,
      inLanguage: locale,
      itemListElement: tools.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: tool.name,
        url: `${SITE_URL}${toolsPath(locale, tool.slug)}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.common.home, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: t.common.freeTools, item: url },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={t.index.metaTitle} description={t.index.metaDescription} canonical={url} jsonLd={jsonLd} alternates={toolAlternates()} />
      <Navbar />

      <main id="main" {...mainLangProps(locale)} className="fx-glow-top relative pb-24 pt-32 lg:pt-40">
        <div className="container mx-auto">
          <div className="flex justify-end">
            <LanguageSwitch locale={locale} label={t.common.language} />
          </div>
          <div className="mt-6 flex items-start justify-between gap-8">
            <div className="max-w-3xl">
              <span className="chip-hue">
                <span className="mono-label">{t.common.freeTools}</span>
              </span>
              <h1 className="type-display mt-5 text-foreground">{t.index.h1}</h1>
              <p className="enter-lift type-lead mt-6 text-muted-foreground" {...enter()}>
                {t.index.lead}
              </p>
            </div>
            <Mascot className="mt-12 hidden shrink-0 sm:inline-flex lg:me-12" lines={t.common.mascotIndex} label={t.common.mascotPoke} />
          </div>

          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {tools.map((tool, i) => (
              <Reveal as="li" key={tool.slug} index={i}>
                <Link to={toolsPath(locale, tool.slug)} className="card-surface card-surface-hover group flex h-full flex-col p-6">
                  <span className="flex items-center justify-between gap-3 font-inter text-lg font-semibold tracking-tight text-foreground">
                    {tool.name}
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-subtle transition-colors duration-standard group-hover:text-primary rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-3 font-inter text-sm leading-relaxed text-muted-foreground">{tool.summary}</span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-12 max-w-3xl font-inter text-sm leading-relaxed text-muted-foreground">
              {t.index.guideBefore}{" "}
              <Link to="/learn-ai" className="text-foreground underline underline-offset-4 hover:text-primary">
                {t.index.guideLink}
              </Link>
              {t.index.guideAfter}
            </p>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tools;
