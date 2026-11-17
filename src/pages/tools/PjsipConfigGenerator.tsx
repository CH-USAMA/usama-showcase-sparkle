import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import ToolPage from "@/components/tools/ToolPage";
import CopyButton from "@/components/CopyButton";
import { Check, Choices, Field, NumberField, fieldCls } from "@/components/tools/fields";
import { useToolsText } from "@/i18n/tools";
import {
  CODECS,
  DEFAULT_INPUT,
  MAX_EXTENSIONS,
  buildDialplan,
  buildPjsip,
  extensionRange,
  makePasswords,
  type AsteriskVersion,
  type Codec,
  type PjsipInput,
  type Transport,
  type TrunkAuth,
} from "@/data/tools/pjsipConfig";

const PjsipConfigGenerator = () => {
  const { t: all } = useToolsText();
  const t = all.pjsip;
  const [input, setInput] = useState<PjsipInput>(DEFAULT_INPUT);
  // Made in the browser after the first render, so the prerendered page shows placeholders.
  const [passwords, setPasswords] = useState<string[]>([]);
  const set =
    <K extends keyof PjsipInput>(key: K) =>
    (v: PjsipInput[K]) =>
      setInput((i) => ({ ...i, [key]: v }));

  const count = extensionRange(input).length;
  useEffect(() => {
    setPasswords((p) => (p.length >= count ? p : [...p, ...makePasswords(count - p.length)]));
  }, [count]);

  const pjsip = useMemo(() => buildPjsip(input, t.files, passwords), [input, t.files, passwords]);
  const dialplan = useMemo(() => buildDialplan(input, t.files), [input, t.files]);
  const exts = extensionRange(input);

  const text = (id: keyof PjsipInput, label: string, opts: { hint?: string; placeholder?: string; type?: string } = {}) => (
    <Field id={`pj-${id}`} label={label} hint={opts.hint}>
      <input
        id={`pj-${id}`}
        type={opts.type ?? "text"}
        className={fieldCls}
        dir="ltr"
        autoComplete="off"
        spellCheck={false}
        value={input[id] as string}
        placeholder={opts.placeholder}
        maxLength={200}
        onChange={(e) => set(id)(e.target.value as never)}
      />
    </Field>
  );
  const toggleCodec = (c: Codec) =>
    setInput((i) => {
      const on = i.codecs.includes(c);
      const next = on ? i.codecs.filter((x) => x !== c) : CODECS.filter((x) => x === c || i.codecs.includes(x));
      return { ...i, codecs: next.length ? next : i.codecs };
    });
  const heading = (id: string, label: string) => (
    <h2 id={id} className="font-inter text-sm font-medium text-foreground">
      {label}
    </h2>
  );

  const output = (id: string, name: string, body: string, copyLabel: string, event: string) => (
    <section className="card-surface p-5 sm:p-6" aria-labelledby={id}>
      <div className="flex items-center justify-between gap-3">
        <h2 id={id} className="font-mono text-sm font-medium text-foreground" dir="ltr">
          {name}
        </h2>
        <CopyButton text={body} label={copyLabel} event={event} copiedText={all.common.copied}>
          {all.common.copy}
        </CopyButton>
      </div>
      <pre
        dir="ltr"
        className="mt-4 max-h-[32rem] overflow-auto whitespace-pre rounded-lg bg-surface-2 p-4 text-start font-mono text-[12.5px] leading-relaxed text-foreground"
      >
        {body}
      </pre>
    </section>
  );

  return (
    <ToolPage slug="pjsip-config-generator">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* ---- inputs ---- */}
        <div className="space-y-6">
          <section className="card-surface space-y-5 p-5 sm:p-6" aria-labelledby="pj-server">
            {heading("pj-server", "Asterisk")}
            <div>
              <p className="font-inter text-sm font-medium text-foreground">{t.versionLabel}</p>
              <div className="mt-2">
                <Choices<AsteriskVersion>
                  label={t.versionLabel}
                  options={[
                    { value: "current", label: t.versions.current },
                    { value: "older", label: t.versions.older },
                  ]}
                  value={input.version}
                  onChange={set("version")}
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_8rem]">
              <div>
                <p className="font-inter text-sm font-medium text-foreground">{t.transportLabel}</p>
                <div className="mt-2">
                  <Choices<Transport>
                    label={t.transportLabel}
                    options={[
                      { value: "udp", label: t.transports.udp },
                      { value: "tcp", label: t.transports.tcp },
                      { value: "tls", label: t.transports.tls },
                    ]}
                    value={input.transport}
                    onChange={(v) => setInput((i) => ({ ...i, transport: v, port: v === "tls" ? 5061 : i.port === 5061 ? 5060 : i.port }))}
                  />
                </div>
              </div>
              <NumberField id="pj-port" label={t.portLabel} value={input.port} onChange={set("port")} min={1} max={65535} />
            </div>
            <Check id="pj-nat" checked={input.nat} onChange={set("nat")}>
              {t.nat}
            </Check>
            {input.nat && (
              <div className="grid gap-5 sm:grid-cols-2">
                {text("publicIp", t.publicIpLabel, { placeholder: "203.0.113.10" })}
                {text("localNet", t.localNetLabel, { hint: t.localNetHint, placeholder: "192.168.0.0/16" })}
              </div>
            )}
          </section>

          <section className="card-surface space-y-5 p-5 sm:p-6" aria-labelledby="pj-trunk">
            {heading("pj-trunk", t.trunkHeading)}
            <div>
              <p className="font-inter text-sm font-medium text-foreground">{t.trunkAuthLabel}</p>
              <div className="mt-2">
                <Choices<TrunkAuth>
                  label={t.trunkAuthLabel}
                  options={[
                    { value: "register", label: t.trunkAuths.register },
                    { value: "ip", label: t.trunkAuths.ip },
                  ]}
                  value={input.trunkAuth}
                  onChange={set("trunkAuth")}
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_6.5rem]">
              {text("trunkName", t.trunkNameLabel, { placeholder: "mytrunk" })}
              {text("host", t.hostLabel, { placeholder: "sip.example-provider.com" })}
              <NumberField id="pj-hostPort" label={t.hostPortLabel} value={input.hostPort} onChange={set("hostPort")} min={1} max={65535} />
            </div>
            {input.trunkAuth === "register" ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {text("username", t.usernameLabel)}
                {text("password", t.passwordLabel, { hint: t.passwordHint, type: "password" })}
              </div>
            ) : (
              text("providerIps", t.providerIpsLabel, { hint: t.providerIpsHint, placeholder: "198.51.100.1, 198.51.100.2" })
            )}
            {text("callerId", t.callerIdLabel, { placeholder: "+353..." })}
          </section>

          <section className="card-surface space-y-5 p-5 sm:p-6" aria-labelledby="pj-phones">
            {heading("pj-phones", t.phonesHeading)}
            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField id="pj-extStart" label={t.extStartLabel} value={input.extStart} onChange={set("extStart")} min={1} max={99999999} />
              <NumberField id="pj-extCount" label={t.extCountLabel} value={input.extCount} onChange={set("extCount")} min={1} max={MAX_EXTENSIONS} />
            </div>
            <div>
              <p className="font-inter text-sm font-medium text-foreground">{t.codecsLabel}</p>
              <p className="mt-1 font-inter text-xs leading-relaxed text-subtle">{t.codecHint}</p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2" dir="ltr">
                {CODECS.map((c) => (
                  <Check key={c} id={`pj-codec-${c}`} checked={input.codecs.includes(c)} onChange={() => toggleCodec(c)}>
                    {c}
                  </Check>
                ))}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {text("outboundPrefix", t.prefixLabel, { hint: t.prefixHint, placeholder: "9" })}
              <Field id="pj-inbound" label={t.inboundLabel}>
                <select
                  id="pj-inbound"
                  dir="ltr"
                  className={fieldCls}
                  value={exts.includes(String(input.inboundTo)) ? String(input.inboundTo) : exts[0]}
                  onChange={(e) => set("inboundTo")(Number(e.target.value))}
                >
                  {exts.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-inter text-xs text-subtle">{t.passwordsNote}</p>
              <button
                type="button"
                onClick={() => setPasswords(makePasswords(count))}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-hairline/[0.12] px-3 font-inter text-xs font-medium text-muted-foreground transition-colors duration-standard hover:border-hairline/[0.24] hover:text-foreground"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                {t.newPasswords}
              </button>
            </div>
          </section>
        </div>

        {/* ---- output ---- */}
        <div className="min-w-0 space-y-6">
          {output("pj-out-pjsip", "pjsip.conf", pjsip, t.copyPjsip, "pjsip_conf_copy")}
          {output("pj-out-dialplan", "extensions.conf", dialplan, t.copyDialplan, "pjsip_dialplan_copy")}
          <p className="font-inter text-xs leading-relaxed text-subtle">{t.outputHint}</p>
        </div>
      </div>
    </ToolPage>
  );
};

export default PjsipConfigGenerator;
