import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  /** `null` omits the tag (error pages have no canonical URL). */
  canonical?: string | null;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://www.chaudharyusama.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

const SEOHead = ({
  title = "Usama Munawar | Websites, Apps & Production Systems",
  description = "Usama Munawar designs and ships websites, mobile apps and production systems with React, React Native, Node.js, TypeScript and Laravel/PHP.",
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  jsonLd,
}: SEOHeadProps) => {
  const url = canonical || `${BASE_URL}${typeof window !== "undefined" ? window.location.pathname : "/"}`;
  // Share scrapers need absolute image URLs; site paths get the canonical origin.
  const image = /^https?:\/\//i.test(ogImage) ? ogImage : `${BASE_URL}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {canonical !== null && <link rel="canonical" href={url} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={ogType} />
      {canonical !== null && <meta property="og:url" content={url} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
