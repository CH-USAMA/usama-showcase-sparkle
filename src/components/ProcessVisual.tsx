import { Fragment } from "react";
import type { ComponentType, ReactNode } from "react";
import { Check, GitMerge, Video } from "lucide-react";
import ProjectCover from "@/components/system/ProjectCover";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";

/**
 * Illustrations for the process cards. Each sits on the lit horizon at the
 * foot of its card and bleeds off the bottom edge. They depict the artefact
 * each stage produces; every name and number in them is placeholder UI copy,
 * and the whole visual is hidden from assistive tech.
 */

const Glass = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div
    className={`absolute overflow-hidden rounded-xl border border-white/15 bg-[hsl(222_50%_8%/0.9)] text-white shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md ${className}`}
  >
    {children}
  </div>
);

const Bar = ({ children }: { children?: ReactNode }) => (
  <div className="flex h-6 items-center gap-1.5 border-b border-white/10 px-2.5">
    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
    {children}
  </div>
);

const Discovery = () => (
  <Glass className="left-1/2 top-[14%] w-[86%] max-w-[600px] -translate-x-1/2">
    <Bar>
      <span className="ml-2 flex items-center gap-1 text-[10px] text-white/60">
        <Video className="h-3 w-3" /> Discovery call · 30 min
      </span>
    </Bar>
    <div className="grid grid-cols-[1fr_1fr_1.3fr] gap-2 p-2.5">
      {["U", "You"].map((n, i) => (
        <div key={n} className="flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/35 to-blue-800/40">
          <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold ${i ? "bg-white text-slate-900" : "bg-blue-500 text-white"}`}>
            {n}
          </span>
        </div>
      ))}
      <div className="rounded-lg border border-white/10 p-2 text-[10px]">
        <div className="font-semibold text-white/80">Notes</div>
        {["Goals", "Constraints", "What is breaking", "v1 scope"].map((t, i) => (
          <div key={t} className="mt-1.5 flex items-center gap-1.5 text-white/70">
            <span className={`flex h-3 w-3 items-center justify-center rounded ${i < 3 ? "bg-emerald-400/90" : "border border-white/30"}`}>
              {i < 3 && <Check className="h-2 w-2 text-slate-900" />}
            </span>
            {t}
          </div>
        ))}
      </div>
    </div>
  </Glass>
);

const Architecture = () => (
  <>
    <div className="absolute left-[7%] top-[16%] w-[50%] max-w-[320px] rotate-[-4deg] rounded-xl bg-white p-4 text-slate-900 shadow-2xl">
      <div className="text-[10px] font-semibold">Technical proposal</div>
      <div className="mt-1 text-[8px] text-slate-500">Stack · data model · milestones</div>
      {[92, 80, 86, 64].map((w, i) => (
        <div key={i} className="mt-1.5 h-1 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
      ))}
      <div className="mt-3 grid grid-cols-2 gap-1.5 text-[8px]">
        <div className="rounded-md bg-blue-50 p-1.5">
          <div className="text-slate-500">Quote</div>
          <div className="font-semibold">Fixed</div>
        </div>
        <div className="rounded-md bg-blue-50 p-1.5">
          <div className="text-slate-500">Timeline</div>
          <div className="font-semibold">6 weeks</div>
        </div>
      </div>
    </div>
    <Glass className="right-[5%] top-[26%] w-[48%] max-w-[320px] rotate-[3deg]">
      <ProjectCover
        tone="panel"
        stages={[{ label: "Client" }, { label: "API" }, { label: "Queue" }, { label: "Database" }]}
      />
    </Glass>
  </>
);

const Implementation = () => (
  <Glass className="left-1/2 top-[14%] w-[88%] max-w-[640px] -translate-x-1/2">
    <Bar>
      <span className="ml-2 text-[10px] text-white/60">Board · this week</span>
      <span className="ml-auto rounded-full bg-sky-400/20 px-2 py-0.5 text-[8px] text-sky-200">Demo Friday</span>
    </Bar>
    <div className="grid grid-cols-3 gap-2 p-2.5 text-[10px]">
      {[
        ["To do", ["Refund flow", "Admin export"]],
        ["In progress", ["Checkout API", "Webhooks"]],
        ["Done", ["Auth", "Catalogue", "Search"]],
      ].map(([col, cards]) => (
        <div key={col as string} className="rounded-lg bg-white/[0.04] p-1.5">
          <div className="mb-1.5 font-semibold text-white/60">{col as string}</div>
          {(cards as string[]).map((c) => (
            <div key={c} className="mb-1 flex items-center justify-between rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-1 text-white/85">
              {c}
              {col === "Done" && <GitMerge className="h-2.5 w-2.5 text-violet-300" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  </Glass>
);

const Hardening = () => (
  <Glass className="left-1/2 top-[16%] w-[84%] max-w-[520px] -translate-x-1/2">
    <Bar>
      <span className="ml-2 font-mono text-[10px] text-white/60">php artisan test</span>
    </Bar>
    <div className="space-y-1.5 p-3 font-mono text-[10.5px]">
      {["Checkout\\PlaceOrderTest", "Payments\\WebhookTest", "Queue\\RetryPolicyTest", "Load\\PeakHourTest"].map((t) => (
        <div key={t} className="flex items-center gap-2">
          <span className="rounded bg-emerald-400 px-1 text-[8px] font-bold text-slate-900">PASS</span>
          <span className="text-white/80">{t}</span>
        </div>
      ))}
      <div className="pt-1.5 text-white/60">
        Tests: <span className="text-emerald-300">all passed</span> · known limits documented
      </div>
    </div>
  </Glass>
);

const STEPS = ["Commit", "Build", "Migrate", "Release"];

const Deployment = () => (
  <Glass className="left-1/2 top-[14%] w-[88%] max-w-[620px] -translate-x-1/2">
    <Bar>
      <span className="ml-2 font-mono text-[10px] text-white/60">deploy · main</span>
      <span className="ml-auto flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-medium text-slate-900">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Rollback ready
      </span>
    </Bar>
    <div className="p-4">
      <div className="flex items-center">
        {STEPS.map((step, i) => (
          <Fragment key={step}>
            <div className="flex flex-col items-center gap-1.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-sky-400 bg-sky-400/15 shadow-[0_0_16px_rgba(56,152,255,0.55)]">
                <Check className="h-4 w-4 text-white" />
              </span>
              <span className="text-[10px] text-white/75">{step}</span>
            </div>
            {i < STEPS.length - 1 && <span className="mb-5 h-px flex-1 bg-gradient-to-r from-sky-400/80 to-sky-400/30" />}
          </Fragment>
        ))}
      </div>
      <div className="mt-4 space-y-1 font-mono text-[10px] text-white/65">
        <div><span className="text-emerald-300">✓</span> migrations ran forward</div>
        <div><span className="text-emerald-300">✓</span> zero-downtime swap complete</div>
      </div>
    </div>
  </Glass>
);

const Observability = () => (
  <Glass className="left-1/2 top-[14%] w-[86%] max-w-[600px] -translate-x-1/2">
    <Bar>
      <span className="ml-2 text-[10px] text-white/60">Production · last 24h</span>
      <span className="ml-auto flex items-center gap-1 text-[8px] text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Healthy
      </span>
    </Bar>
    <div className="p-3">
      <svg viewBox="0 0 300 90" className="w-full">
        <defs>
          <linearGradient id="pv-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#5eb1ff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#5eb1ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" x2="300" y1="22" y2="22" stroke="#f87171" strokeOpacity="0.6" strokeDasharray="4 4" />
        <text x="296" y="16" textAnchor="end" fontSize="8" fill="#fca5a5">alert threshold</text>
        <path d="M0 70 L25 66 L50 68 L75 58 L100 62 L125 50 L150 56 L175 48 L200 52 L225 44 L250 49 L275 40 L300 45 L300 90 L0 90 Z" fill="url(#pv-area)" />
        <path d="M0 70 L25 66 L50 68 L75 58 L100 62 L125 50 L150 56 L175 48 L200 52 L225 44 L250 49 L275 40 L300 45" fill="none" stroke="#8cc8ff" strokeWidth="2" />
      </svg>
      <div className="mt-1 space-y-0.5 font-mono text-[10px] text-white/60">
        <div><span className="text-sky-300">info</span> queue.depth=0 workers=4</div>
        <div><span className="text-sky-300">info</span> health /up 200</div>
      </div>
    </div>
  </Glass>
);

const VISUALS: Record<string, ComponentType> = {
  "01": Discovery,
  "02": Architecture,
  "03": Implementation,
  "04": Hardening,
  "05": Deployment,
  "06": Observability,
};

const ProcessVisual = ({ n }: { n: string }) => {
  const V = VISUALS[n] ?? Discovery;
  const pauseRef = usePauseOffscreen<HTMLDivElement>();
  return (
    <div ref={pauseRef} aria-hidden="true" className="relative h-[250px] overflow-hidden sm:h-[290px] lg:h-[320px]">
      <div className="fx-horizon" />
      <V />
    </div>
  );
};

export default ProcessVisual;
