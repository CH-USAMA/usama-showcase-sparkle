import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ImageOff, XCircle } from "lucide-react";
import ToolPage from "@/components/tools/ToolPage";
import CopyButton from "@/components/CopyButton";
import { Check, Choices, Field, fieldCls } from "@/components/tools/fields";
import { useToolsText } from "@/i18n/tools";
import {
  DESC_MAX,
  TITLE_MAX,
  breadcrumbOf,
  buildTags,
  checksOf,
  clip,
  httpUrl,
  type CheckLevel,
  type MetaInput,
  type OgType,
} from "@/data/tools/metaTags";

const LEVEL = {
  ok: { Icon: CheckCircle2, cls: "text-primary" },
  warn: { Icon: AlertTriangle, cls: "text-amber-300" },
  bad: { Icon: XCircle, cls: "text-red-300" },
} satisfies Record<CheckLevel, unknown>;

const MetaTagGenerator = () => {
  const { t: all } = useToolsText();
  const t = all.meta;
  const blank: MetaInput = { title: "", description: "", url: "", siteName: "", image: "", imageAlt: "", type: "website", twitter: "", noindex: false };
  const [input, setInput] = useState<MetaInput>({ ...blank, ...t.defaults });
  // The URL whose image failed to load, so the preview falls back to the placeholder.
  const [brokenImage, setBrokenImage] = useState("");
  const set =
    <K extends keyof MetaInput>(key: K) =>
    (v: MetaInput[K]) =>
      setInput((i) => ({ ...i, [key]: v }));

  const tags = useMemo(() => buildTags(input), [input]);
  const checks = useMemo(() => checksOf(input), [input]);
  const url = httpUrl(input.url);
  const image = httpUrl(input.image) && input.image !== brokenImage ? input.image.trim() : "";
  const title = input.title.trim() || t.titleFallback;
  const description = input.description.trim() || t.descFallback;
  const host = url?.hostname.replace(/^www\./, "") ?? "example.com";

  const text = (id: keyof MetaInput, label: string, opts: { ltr?: boolean; hint?: string; placeholder?: string } = {}) => (
    <Field id={`mt-${id}`} label={label} hint={opts.hint}>
      <input
        id={`mt-${id}`}
        className={fieldCls}
        dir={opts.ltr ? "ltr" : "auto"}
        value={input[id] as string}
        placeholder={opts.placeholder}
        maxLength={500}
        onChange={(e) => set(id)(e.target.value as never)}
      />
    </Field>
  );
  const counter = (n: number, max: number) => (
    <span className={`font-inter text-xs tabular-nums ${n > max ? "text-amber-300" : "text-subtle"}`} dir="ltr">
      {t.count(n, max)}
    </span>
  );

  return (
    <ToolPage slug="meta-tag-generator">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---- inputs ---- */}
        <div className="card-surface space-y-6 p-5 sm:p-6">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="mt-title" className="font-inter text-sm font-medium text-foreground">
                {t.titleLabel}
              </label>
              {counter(input.title.trim().length, TITLE_MAX)}
            </div>
            <input id="mt-title" className={`${fieldCls} mt-2`} dir="auto" maxLength={300} value={input.title} onChange={(e) => set("title")(e.target.value)} />
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="mt-description" className="font-inter text-sm font-medium text-foreground">
                {t.descLabel}
              </label>
              {counter(input.description.trim().length, DESC_MAX)}
            </div>
            <textarea
              id="mt-description"
              rows={3}
              dir="auto"
              maxLength={600}
              className={`${fieldCls} mt-2 resize-y`}
              value={input.description}
              onChange={(e) => set("description")(e.target.value)}
            />
          </div>
          {text("url", t.urlLabel, { ltr: true, placeholder: "https://" })}
          <div className="grid gap-5 sm:grid-cols-2">
            {text("siteName", t.siteLabel)}
            {text("twitter", t.twitterLabel, { ltr: true, placeholder: "@" })}
          </div>
          {text("image", t.imageLabel, { ltr: true, hint: t.imageHint, placeholder: "https://" })}
          {text("imageAlt", t.altLabel)}
          <div>
            <p className="font-inter text-sm font-medium text-foreground">{t.typeLabel}</p>
            <div className="mt-2">
              <Choices<OgType>
                label={t.typeGroup}
                options={[
                  { value: "website", label: t.types.website },
                  { value: "article", label: t.types.article },
                ]}
                value={input.type}
                onChange={set("type")}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Check id="mt-noindex" checked={input.noindex} onChange={set("noindex")}>
              {t.noindex}
            </Check>
            <button
              type="button"
              onClick={() => setInput(blank)}
              className="inline-flex min-h-9 items-center rounded-md border border-hairline/[0.12] px-3 font-inter text-xs font-medium text-muted-foreground transition-colors duration-standard hover:border-hairline/[0.24] hover:text-foreground"
            >
              {t.clear}
            </button>
          </div>
        </div>

        {/* ---- previews and output ---- */}
        <div className="min-w-0 space-y-6">
          <section className="card-surface p-5 sm:p-6" aria-labelledby="mt-google">
            <h2 id="mt-google" className="font-inter text-sm font-medium text-foreground">
              {t.googleHeading}
            </h2>
            {/* A result as Google prints it in dark mode; laid out left to right whatever the page language. */}
            <div dir="ltr" className="mt-4 rounded-lg bg-[#1f1f1f] p-4 text-start font-[arial,sans-serif]">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#303134] text-xs font-semibold uppercase text-[#e8eaed]" aria-hidden="true">
                  {(input.siteName.trim() || host).charAt(0)}
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-sm text-[#dadce0]">{input.siteName.trim() || host}</span>
                  <span className="block truncate text-xs text-[#bdc1c6]">{url ? breadcrumbOf(url) : "https://example.com"}</span>
                </span>
              </div>
              <p dir="auto" className="mt-2 text-[20px] leading-snug text-[#99c3ff]">
                {clip(title, TITLE_MAX)}
              </p>
              <p dir="auto" className="mt-1 text-sm leading-normal text-[#bfbfbf]">
                {clip(description, DESC_MAX)}
              </p>
            </div>
          </section>

          <section className="card-surface p-5 sm:p-6" aria-labelledby="mt-social">
            <h2 id="mt-social" className="font-inter text-sm font-medium text-foreground">
              {t.socialHeading}
            </h2>
            <p className="mt-1 font-inter text-xs text-subtle">{t.socialHint}</p>
            <div className="mt-4 max-w-md overflow-hidden rounded-lg border border-hairline/[0.14] bg-surface-1">
              {image ? (
                <img
                  key={image}
                  src={image}
                  alt={input.imageAlt}
                  width={1200}
                  height={630}
                  referrerPolicy="no-referrer"
                  onError={() => setBrokenImage(input.image)}
                  className="aspect-[1.91/1] w-full object-cover"
                />
              ) : (
                <div className="grid aspect-[1.91/1] w-full place-items-center bg-surface-2 p-6 text-center">
                  <span className="flex flex-col items-center gap-2 font-inter text-xs text-subtle">
                    <ImageOff className="h-5 w-5" aria-hidden="true" />
                    {t.noImage}
                  </span>
                </div>
              )}
              <div className="border-t border-hairline/[0.1] p-3.5">
                <p className="font-inter text-[11px] uppercase tracking-wide text-subtle" dir="ltr">
                  {host}
                </p>
                <p dir="auto" className="mt-1 line-clamp-2 font-inter text-sm font-semibold text-foreground">
                  {title}
                </p>
                <p dir="auto" className="mt-0.5 line-clamp-2 font-inter text-xs text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          </section>

          <section className="card-surface p-5 sm:p-6" aria-labelledby="mt-checks">
            <h2 id="mt-checks" className="font-inter text-sm font-medium text-foreground">
              {t.checksHeading}
            </h2>
            <ul className="mt-3 space-y-2" aria-live="polite">
              {checks.map((c) => {
                const { Icon, cls } = LEVEL[c.level];
                return (
                  <li key={c.id} className="flex items-start gap-2.5 font-inter text-sm text-muted-foreground">
                    <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${cls}`} aria-hidden="true" />
                    <span>{t.checks[c.id][c.message]}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="card-surface p-5 sm:p-6" aria-labelledby="mt-tags">
            <div className="flex items-center justify-between gap-3">
              <h2 id="mt-tags" className="font-inter text-sm font-medium text-foreground">
                {t.tagsHeading}
              </h2>
              <CopyButton text={tags} label={t.copyTags} event="meta_tags_copy" copiedText={all.common.copied}>
                {all.common.copy}
              </CopyButton>
            </div>
            <pre
              dir="ltr"
              className="mt-4 max-h-[26rem] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-surface-2 p-4 text-start font-mono text-[12.5px] leading-relaxed text-foreground"
            >
              {tags}
            </pre>
            <p className="mt-3 font-inter text-xs leading-relaxed text-subtle">{t.tagsHint}</p>
          </section>
        </div>
      </div>
    </ToolPage>
  );
};

export default MetaTagGenerator;
