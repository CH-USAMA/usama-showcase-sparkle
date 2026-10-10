import { Children, isValidElement, lazy, Suspense } from "react";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/markdown";
import { safeHref } from "@/lib/url";

// The highlighter is ~630 kB; it only downloads for posts that contain code.
const CodeBlock = lazy(() => import("@/components/CodeBlock"));

/**
 * The one markdown renderer: blog posts and the admin preview both use it, so
 * the preview is exactly what readers get.
 *
 * react-markdown builds React elements and never injects raw HTML, so post
 * bodies (now written in /admin) cannot carry markup, and raw HTML in
 * third-party READMEs is skipped. URLs pass through
 * safeHref: http(s), mailto, site paths and in-page #anchors only.
 * GitHub-flavoured extensions (tables, task lists, strikethrough, autolinks)
 * come from remark-gfm.
 */

/** Plain text of rendered children, for heading anchors. */
const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : isValidElement(c) ? textOf(c.props.children) : ""))
    .join("");

/** A node of the parsed markdown tree (hast), as far as code blocks need. */
type HastNode = { type: string; value?: string; children?: HastNode[]; properties?: { className?: unknown } };
const hastText = (n: HastNode | undefined): string =>
  !n ? "" : n.type === "text" ? n.value ?? "" : (n.children ?? []).map(hastText).join("");

/** A fenced block: plain until the highlighter arrives, and always plain at build time. */
const BlockCode = ({ lang, code }: { lang?: string; code: string }) => {
  const plain = (
    <pre className="my-6 overflow-x-auto rounded-xl bg-surface-2 p-4 text-sm">
      <code>{code}</code>
    </pre>
  );
  if (import.meta.env.SSR) return plain;
  return (
    <Suspense fallback={plain}>
      <CodeBlock language={lang ?? "text"} code={code} />
    </Suspense>
  );
};

const urlTransform = (url: string) => (/^#[\w-]+$/.test(url) ? url : safeHref(url) ?? "");

const components: Components = {
  h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>;
    const external = /^https?:\/\//i.test(href);
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }) =>
    src ? <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className="rounded-xl border border-hairline/[0.1]" /> : null,
  table: ({ children }) => (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-hairline/[0.1]">
      <table className="w-full border-collapse text-left font-inter text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-hairline/[0.12] bg-surface-2 px-4 py-2.5 font-semibold text-foreground">{children}</th>
  ),
  td: ({ children }) => <td className="border-b border-hairline/[0.08] px-4 py-2.5 align-top text-muted-foreground">{children}</td>,
  // Fenced code is rendered here, from the parsed tree, so a one-line fence
  // without a language is still a block; `code` below is then only inline.
  pre: ({ node }) => {
    const code = node?.children?.[0] as HastNode | undefined;
    const cls = code?.properties?.className;
    const lang = (Array.isArray(cls) ? cls : []).map(String).find((c) => c.startsWith("language-"))?.slice(9);
    return <BlockCode lang={lang} code={hastText(code).replace(/\n$/, "")} />;
  },
  code: ({ children }) => <code className="inline-code">{children}</code>,
};

const Markdown = ({ children, className = "" }: { children: string; className?: string }) => (
  <div className={`prose-site prose prose-lg max-w-none ${className}`}>
    {/* skipHtml: raw HTML in a README (logos, badge rows) is dropped rather than
        printed as literal markup; it is never rendered as HTML. */}
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} urlTransform={urlTransform} skipHtml>
      {children}
    </ReactMarkdown>
  </div>
);

export default Markdown;
