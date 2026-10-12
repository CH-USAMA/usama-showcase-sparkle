import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { SITE_URL } from "@/data/site";
import { TOOLS, type ToolMeta } from "@/data/tools";
import { trackEvent } from "@/lib/analytics";
import { useEnter } from "@/lib/boot";

interface ToolPageProps {
  tool: ToolMeta;
  /** The interactive tool itself. */
  children: ReactNode;
  /** The closing card: where a reader who wants more help goes next. */
  next: { title: string; text: string; to: string; label: string };
}

/**
 * Shared frame for /tools/:slug: header, the tool, then the how-to sections
 * and FAQ that give the page something to rank for, and links onward.
 * The tool renders its default state on the server, so the prerendered page
 * already shows a working form.
 */
const ToolPage = ({ tool, children, next }: ToolPageProps) => {
  const enter = useEnter();
  const url = `${SITE_URL}/tools/${tool.slug}`;
  const others = TOOLS.filter((t) => t.slug !== tool.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      description: tool.metaDescription,
      url,
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
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE_URL}/tools` },
        { "@type": "ListItem", position: 3, name: tool.name, item: url },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={tool.metaTitle} description={tool.metaDescription} canonical={url} jsonLd={jsonLd} />
      <Navbar />

      <main id="main" className="fx-glow-top relative pb-24 pt-32 lg:pt-40">
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb">
            <Link
              to="/tools"
              className="-my-2.5 inline-flex min-h-10 items-center gap-2 py-2.5 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All free tools
            </Link>
          </nav>

          {/* h1 is the LCP element: painted, never faded in */}
          <div className="mt-10 max-w-3xl">
            <span className="chip-hue">
              <span className="mono-label">Free tool</span>
            </span>
            <h1 className="type-display mt-5 text-foreground">{tool.name}</h1>
            <p className="enter-lift type-lead mt-6 text-muted-foreground" {...enter()}>
              {tool.lead}
            </p>
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
                <h2 className="type-h3 text-foreground">Frequently asked</h2>
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
              <h2 className="font-inter text-xl font-semibold text-foreground">{next.title}</h2>
              <p className="type-body mt-2 text-muted-foreground">{next.text}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTA to={next.to} size="md" arrow onClick={() => trackEvent("tool_next_step", { tool: tool.slug, to: next.to })}>
                  {next.label}
                </CTA>
                <CTA to="/book" tone="ghost" size="md" onClick={() => trackEvent("book_call_click", { location: `tool_${tool.slug}` })}>
                  Book a free call
                </CTA>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <section className="mt-16 border-t border-hairline/[0.08] pt-10">
              <h2 className="type-h3 text-foreground">More free tools</h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {others.map((t) => (
                  <li key={t.slug}>
                    <Link to={`/tools/${t.slug}`} className="card-surface card-surface-hover group flex h-full flex-col p-5">
                      <span className="flex items-center justify-between gap-3 font-inter text-[15px] font-medium text-foreground">
                        {t.name}
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-colors duration-standard group-hover:text-primary" aria-hidden="true" />
                      </span>
                      <span className="mt-2 font-inter text-sm leading-relaxed text-muted-foreground">{t.summary}</span>
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
