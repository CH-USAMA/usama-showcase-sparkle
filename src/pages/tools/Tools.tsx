import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import Mascot from "@/components/Mascot";
import { SITE_URL } from "@/data/site";
import { TOOLS, TOOLS_INDEX } from "@/data/tools";
import { useEnter } from "@/lib/boot";

const url = `${SITE_URL}/tools`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free tools",
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE_URL}/tools/${t.slug}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Free tools", item: url },
    ],
  },
];

/** /tools: the free tools, one card each. */
const Tools = () => {
  const enter = useEnter();
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={TOOLS_INDEX.metaTitle} description={TOOLS_INDEX.metaDescription} canonical={url} jsonLd={jsonLd} />
      <Navbar />

      <main id="main" className="fx-glow-top relative pb-24 pt-32 lg:pt-40">
        <div className="container mx-auto">
          <div className="flex items-start justify-between gap-8">
          <div className="max-w-3xl">
            <span className="chip-hue">
              <span className="mono-label">Free tools</span>
            </span>
            <h1 className="type-display mt-5 text-foreground">Free tools for building with AI</h1>
            <p className="enter-lift type-lead mt-6 text-muted-foreground" {...enter()}>
              Small, honest tools for founders and developers: write better prompts, plan the first version of your app,
              estimate what AI will cost you, and write a README people actually read. No sign-up, and everything runs in
              your browser.
            </p>
          </div>
          <Mascot
            className="mt-12 hidden shrink-0 sm:inline-flex lg:mr-12"
            lines={["Hi! Pick a tool 👋", "No sign-up needed.", "Everything runs in your browser.", "Try the prompt builder!"]}
          />
          </div>

          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {TOOLS.map((t, i) => (
              <Reveal as="li" key={t.slug} index={i}>
                <Link to={`/tools/${t.slug}`} className="card-surface card-surface-hover group flex h-full flex-col p-6">
                  <span className="flex items-center justify-between gap-3 font-inter text-lg font-semibold tracking-tight text-foreground">
                    {t.name}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-colors duration-standard group-hover:text-primary" aria-hidden="true" />
                  </span>
                  <span className="mt-3 font-inter text-sm leading-relaxed text-muted-foreground">{t.summary}</span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-12 max-w-3xl font-inter text-sm leading-relaxed text-muted-foreground">
              New to AI assistants? Start with the free guide,{" "}
              <Link to="/learn-ai" className="text-foreground underline underline-offset-4 hover:text-primary">
                how to use AI in daily life
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tools;
