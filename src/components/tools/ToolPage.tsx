import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import Mascot from "@/components/Mascot";
import LanguageSwitch from "@/components/tools/LanguageSwitch";
import { SITE_URL } from "@/data/site";
import { NEXT_LINK, toolsIn, type ToolSlug } from "@/data/tools";
import { useToolsText } from "@/i18n/tools";
import { toolsPath } from "@/lib/locale";
import { mainLangProps, toolAlternates } from "@/components/tools/toolMeta";
import { trackEvent } from "@/lib/analytics";
import { useEnter } from "@/lib/boot";

/**
 * Shared frame for /tools/:slug in every language: header, the tool, then the
 * how-to sections and FAQ that give the page something to rank for, and links
 * onward. The tool renders its default state on the server, so the
 * prerendered page already shows a working form.
 */
const ToolPage = ({ slug, children }: { slug: ToolSlug; children: ReactNode }) => {
  const enter = useEnter();
  const { locale, t } = useToolsText();
  const tool = t.tools[slug];
  const url = `${SITE_URL}${toolsPath(locale, slug)}`;
  const others = toolsIn(t).filter((x) => x.slug !== slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      description: tool.metaDescription,
      url,
      inLanguage: locale,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@type": "Person", name: "Usama Munawar", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: tool.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.common.home, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: t.common.freeTools, item: `${SITE_URL}${toolsPath(locale)}` },
        { "@type": "ListItem", position: 3, name: tool.name, item: url },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={tool.metaTitle}
        description={tool.metaDescription}
        canonical={url}
        jsonLd={jsonLd}
        alternates={toolAlternates(slug)}
      />
      <Navbar />

      <main id="main" {...mainLangProps(locale)} className="fx-glow-top relative pb-24 pt-32 lg:pt-40">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb">
              <Link
                to={toolsPath(locale)}
                className="-my-2.5 inline-flex min-h-10 items-center gap-2 py-2.5 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                {t.common.allTools}
              </Link>
            </nav>
            <LanguageSwitch locale={locale} slug={slug} label={t.common.language} />
          </div>

          {/* h1 is the LCP element: painted, never faded in */}
          <div className="mt-10 flex items-start justify-between gap-8">
            <div className="max-w-3xl">
              <span className="chip-hue">
                <span className="mono-label">{t.common.freeTool}</span>
              </span>
              <h1 className="type-display mt-5 text-foreground">{tool.name}</h1>
              <p className="enter-lift type-lead mt-6 text-muted-foreground" {...enter()}>
                {tool.lead}
              </p>
            </div>
            <Mascot className="mt-12 hidden shrink-0 sm:inline-flex lg:me-12" lines={t.common.mascotTool} label={t.common.mascotPoke} />
          </div>

          <div className="mt-12">{children}</div>

          <div className="mt-16 max-w-3xl">
            {tool.guide.map((s, i) => (
              <Reveal key={s.heading}>
                <section className={`py-10 ${i > 0 ? "border-t border-hairline/[0.08]" : "pt-0"}`}>
                  <h2 className="type-h3 text-foreground">{s.heading}</h2>
                  <p className="type-body measure mt-4 text-muted-foreground">{s.body}</p>
                </section>
              </Reveal>
            ))}

            <Reveal>
              <section className="border-t border-hairline/[0.08] py-10">
                <h2 className="type-h3 text-foreground">{t.common.faq}</h2>
                <dl className="mt-7 border-t border-hairline/[0.08]">
                  {tool.faqs.map((f) => (
                    <div key={f.q} className="border-b border-hairline/[0.08] py-5">
                      <dt className="font-inter text-[15px] font-medium text-foreground">{f.q}</dt>
                      <dd className="type-body measure mt-2.5 text-muted-foreground">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>
          </div>

          <Reveal>
            <div className="card-surface mt-6 max-w-3xl p-6 sm:p-8">
              <h2 className="font-inter text-xl font-semibold text-foreground">{tool.next.title}</h2>
              <p className="type-body mt-2 text-muted-foreground">{tool.next.text}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTA to={NEXT_LINK[slug]} size="md" arrow onClick={() => trackEvent("tool_next_step", { tool: slug, to: NEXT_LINK[slug], locale })}>
                  {tool.next.label}
                </CTA>
                <CTA to="/book" tone="ghost" size="md" onClick={() => trackEvent("book_call_click", { location: `tool_${slug}`, locale })}>
                  {t.common.bookCall + t.common.inEnglish}
                </CTA>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <section className="mt-16 border-t border-hairline/[0.08] pt-10">
              <h2 className="type-h3 text-foreground">{t.common.moreTools}</h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to={toolsPath(locale, o.slug)} className="card-surface card-surface-hover group flex h-full flex-col p-5">
                      <span className="flex items-center justify-between gap-3 font-inter text-[15px] font-medium text-foreground">
                        {o.name}
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-subtle transition-colors duration-standard group-hover:text-primary rtl:-scale-x-100"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-2 font-inter text-sm leading-relaxed text-muted-foreground">{o.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolPage;
