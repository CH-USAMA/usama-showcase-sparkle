import type { ComponentType, ReactNode } from "react";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import {
  Bot,
  Check,
  Database,
  FileSpreadsheet,
  Mail,
  MessageSquare,
  Phone,
  PhoneOff,
  Sparkles,
  Webhook,
  Workflow,
} from "lucide-react";

/**
 * Small interface sketches for the service cards, one per capability, drawn
 * on the blue illustration panel. They are pictures of the kind of thing each
 * service produces, not data: every figure in them is placeholder UI copy.
 * Decorative, so the whole visual is hidden from assistive tech; the card's
 * own title and summary carry the meaning.
 */

const Win = ({ className = "", children, bar = true }: { className?: string; children: ReactNode; bar?: boolean }) => (
  <div
    className={`absolute overflow-hidden rounded-lg border border-white/15 bg-[hsl(222_55%_9%/0.92)] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] ${className}`}
  >
    {bar && (
      <div className="flex h-5 items-center gap-1 border-b border-white/10 px-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      </div>
    )}
    {children}
  </div>
);

const Frontend = () => (
  <Win className="bottom-0 left-[12%] right-0 top-[14%] rounded-b-none rounded-r-none">
    <div className="flex h-full">
      <div className="w-[22%] space-y-1.5 border-r border-white/10 p-2">
        {[70, 55, 62, 48].map((w, i) => (
          <div key={i} className={`h-1.5 rounded-full ${i === 0 ? "bg-white/70" : "bg-white/20"}`} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex-1 p-2.5">
        <div className="grid grid-cols-3 gap-1.5">
          {[
            ["Revenue", "$48.2k"],
            ["Orders", "1,284"],
            ["Visitors", "36.9k"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-md border border-white/10 bg-white/[0.04] p-1.5">
              <div className="text-[7px] text-white/50">{k}</div>
              <div className="text-[11px] font-semibold text-white">{v}</div>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 200 70" className="mt-2 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sv-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#5eb1ff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#5eb1ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 55 C 25 50, 35 30, 60 34 S 100 52, 125 30 S 170 12, 200 18 L 200 70 L 0 70 Z" fill="url(#sv-area)" />
          <path d="M0 55 C 25 50, 35 30, 60 34 S 100 52, 125 30 S 170 12, 200 18" fill="none" stroke="#8cc8ff" strokeWidth="2" />
        </svg>
      </div>
    </div>
  </Win>
);

const Handset = ({ className, children }: { className: string; children: ReactNode }) => (
  <div className={`absolute w-[30%] rounded-[18px] border-[3px] border-white/25 bg-[hsl(222_55%_9%)] p-1.5 shadow-2xl ${className}`}>
    <div className="mx-auto mb-1.5 h-1.5 w-8 rounded-full bg-white/20" />
    {children}
  </div>
);

const Mobile = () => (
  <>
    <Handset className="left-[16%] top-[16%] h-[100%] -rotate-6">
      {[0, 1, 2].map((i) => (
        <div key={i} className="mb-1.5 rounded-md bg-white/[0.06] p-1.5">
          <div className="h-8 rounded bg-gradient-to-br from-sky-400/50 to-blue-600/40" />
          <div className="mt-1 h-1 w-3/4 rounded-full bg-white/40" />
        </div>
      ))}
    </Handset>
    <Handset className="right-[16%] top-[8%] h-[100%] rotate-6">
      <div className="rounded-lg bg-white p-1.5 text-[7px] text-slate-900 shadow">
        <div className="flex items-center gap-1 font-semibold">
          <span className="h-2.5 w-2.5 rounded bg-blue-600" /> Your order shipped
        </div>
        <div className="mt-0.5 text-slate-500">Arriving Thursday</div>
      </div>
      <div className="mt-2 space-y-1.5">
        {[80, 60, 70].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-white/20" style={{ width: `${w}%` }} />
        ))}
      </div>
    </Handset>
  </>
);

const Node = () => (
  <Win className="inset-x-[8%] bottom-[10%] top-[12%]">
    <div className="space-y-1 p-2.5 font-mono text-[8.5px] leading-tight sm:text-[9.5px]">
      <div className="text-white/50">$ npm run start</div>
      <div className="text-sky-300">▸ api listening on :3000</div>
      <div className="text-white/80">
        <span className="text-emerald-300">POST</span> /v1/orders <span className="text-emerald-300">201</span>{" "}
        <span className="text-white/40">18ms</span>
      </div>
      <div className="text-white/80">
        <span className="text-sky-300">GET</span> /v1/orders/42 <span className="text-emerald-300">200</span>{" "}
        <span className="text-white/40">6ms</span>
      </div>
      <div className="text-white/80">
        <span className="text-amber-300">PATCH</span> /v1/stock <span className="text-emerald-300">204</span>{" "}
        <span className="text-white/40">9ms</span>
      </div>
      <div className="text-sky-300">▸ worker email.send ✓</div>
      <div className="flex items-center gap-1 text-white/50">
        <span className="inline-block h-2.5 w-1.5 animate-pulse bg-white/70" />
      </div>
    </div>
  </Win>
);

const Laravel = () => (
  <Win className="inset-x-[7%] bottom-[8%] top-[10%]">
    <div className="flex border-b border-white/10 font-mono text-[8px] text-white/60">
      <span className="border-r border-white/10 bg-white/[0.06] px-2 py-1 text-white">PlaceOrder.php</span>
      <span className="px-2 py-1">OrderPolicy.php</span>
    </div>
    <pre className="p-2.5 font-mono text-[8.5px] leading-[1.55] text-white/85 sm:text-[9.5px]">
      <span className="text-violet-300">final class</span> <span className="text-sky-300">PlaceOrder</span>
      {"\n{\n    "}
      <span className="text-violet-300">public function</span> <span className="text-sky-200">handle</span>
      {"(Order $order): "}
      <span className="text-violet-300">void</span>
      {"\n    {\n        DB::"}
      <span className="text-sky-200">transaction</span>
      {"(fn () => $order->"}
      <span className="text-sky-200">place</span>
      {"());\n        SendReceipt::"}
      <span className="text-sky-200">dispatch</span>
      {"($order)->"}
      <span className="text-sky-200">onQueue</span>
      {"("}
      <span className="text-emerald-300">'mail'</span>
      {");\n    }\n}"}
    </pre>
  </Win>
);

const Saas = () => (
  <>
    <div className="absolute left-[8%] top-[14%] w-[46%] rounded-xl bg-white p-3 text-slate-900 shadow-2xl">
      <div className="flex items-center justify-between text-[8px]">
        <span className="font-semibold">Pro plan</span>
        <span className="rounded-full bg-slate-100 p-0.5">
          <span className="rounded-full bg-slate-900 px-1.5 py-0.5 text-[7px] text-white">Yearly</span>
          <span className="px-1.5 text-[7px] text-slate-500">Monthly</span>
        </span>
      </div>
      <div className="mt-2 text-[18px] font-semibold leading-none">
        $49<span className="text-[8px] font-normal text-slate-500"> / seat / mo</span>
      </div>
      <div className="mt-2.5 h-5 rounded-md bg-blue-600 text-center text-[8px] leading-5 text-white">Upgrade</div>
    </div>
    <Win bar={false} className="bottom-[10%] right-[6%] w-[52%]">
      {[
        ["Acme Inc", "12 seats", "Active"],
        ["Globex", "4 seats", "Trial"],
        ["Initech", "30 seats", "Active"],
      ].map(([n, s, st]) => (
        <div key={n} className="flex items-center justify-between border-b border-white/10 px-2.5 py-1.5 text-[8px] last:border-0">
          <span className="font-medium text-white">{n}</span>
          <span className="text-white/50">{s}</span>
          <span className={`rounded-full px-1.5 py-0.5 ${st === "Active" ? "bg-emerald-400/20 text-emerald-300" : "bg-amber-400/20 text-amber-200"}`}>
            {st}
          </span>
        </div>
      ))}
    </Win>
  </>
);

const Ai = () => (
  <Win className="inset-x-[9%] bottom-[8%] top-[10%]">
    <div className="space-y-2 p-2.5 text-[8.5px] sm:text-[9.5px]">
      <div className="ml-auto w-fit max-w-[75%] rounded-lg rounded-br-sm bg-blue-600 px-2 py-1 text-white">
        What is our refund window?
      </div>
      <div className="flex items-center gap-1 text-white/50">
        <Sparkles className="h-2.5 w-2.5" /> Searched 4 documents
      </div>
      <div className="w-fit max-w-[85%] rounded-lg rounded-bl-sm bg-white/[0.08] px-2 py-1.5 text-white/90">
        Refunds are accepted within 30 days of delivery, provided the item is unused.
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["policy.pdf · p.3", "terms.md"].map((c) => (
            <span key={c} className="rounded border border-white/15 px-1 py-0.5 text-[7px] text-sky-200">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Win>
);

/** Hub and spokes, with one signal running each wire. */
const Automation = () => {
  const nodes = [
    { x: 16, y: 22, I: Webhook },
    { x: 84, y: 22, I: Mail },
    { x: 8, y: 52, I: FileSpreadsheet },
    { x: 92, y: 52, I: MessageSquare },
    { x: 16, y: 82, I: Database },
    { x: 84, y: 82, I: Bot },
  ];
  return (
    <>
      {/* The panel is 16:10, so a 160x100 viewBox maps 1:1 with no
          distortion and strokes keep their width. */}
      <svg viewBox="0 0 160 100" className="absolute inset-0 h-full w-full">
        {nodes.map((n, i) => {
          const x = n.x * 1.6;
          const d = `M${x} ${n.y} C ${(x + 80) / 2} ${n.y}, ${(x + 80) / 2} 52, 80 52`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
              <path
                d={d}
                fill="none"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="60 940"
                pathLength={1000}
                className="anim-particle"
                style={{ animationDelay: `${-i * 0.9}s`, animationDuration: "3.6s" }}
              />
            </g>
          );
        })}
      </svg>
      {nodes.map(({ x, y, I }, i) => (
        <span
          key={i}
          className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-700 shadow-lg"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <I className="h-3.5 w-3.5" />
        </span>
      ))}
      <span className="absolute left-1/2 top-[52%] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-700 shadow-[0_0_0_6px_rgba(255,255,255,0.15)]">
        <Workflow className="h-5 w-5" />
      </span>
    </>
  );
};

const Voip = () => (
  <>
    <div className="absolute left-1/2 top-[12%] w-[62%] -translate-x-1/2 rounded-xl border border-white/15 bg-[hsl(222_55%_9%/0.92)] p-3 text-center shadow-2xl">
      <div className="text-[8px] uppercase tracking-wider text-white/50">Incoming · Dispatch queue</div>
      <div className="mt-1 text-[13px] font-semibold text-white">+353 ··· 4821</div>
      <div className="mt-2 flex h-6 items-center justify-center gap-[3px]">
        {[5, 9, 14, 8, 18, 11, 6, 15, 10, 7, 13, 5, 9].map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-sky-300/80" style={{ height: h }} />
        ))}
      </div>
      <div className="mt-2.5 flex justify-center gap-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white">
          <PhoneOff className="h-3.5 w-3.5" />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Phone className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
    <div className="absolute bottom-[10%] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[8px] font-medium text-slate-900 shadow-lg">
      <span className="flex -space-x-1.5">
        {["bg-sky-500", "bg-indigo-500", "bg-emerald-500"].map((c) => (
          <span key={c} className={`h-3.5 w-3.5 rounded-full border border-white ${c}`} />
        ))}
      </span>
      3 agents available
    </div>
  </>
);

const Realtime = () => (
  <Win className="inset-x-[8%] bottom-[8%] top-[12%]">
    <div className="flex items-center justify-between border-b border-white/10 px-2.5 py-1.5 text-[8px]">
      <span className="flex items-center gap-1 font-medium text-white">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
      </span>
      <span className="flex -space-x-1.5">
        {["A", "S", "M", "R"].map((c, i) => (
          <span
            key={c}
            className="flex h-4 w-4 items-center justify-center rounded-full border border-[hsl(222_55%_9%)] text-[7px] font-semibold text-white"
            style={{ background: ["#3b82f6", "#6366f1", "#0ea5e9", "#10b981"][i] }}
          >
            {c}
          </span>
        ))}
      </span>
    </div>
    <ul className="space-y-1.5 p-2.5 text-[8.5px] text-white/80">
      {[
        ["#dispatch", "Ali joined the channel"],
        ["order 4821", "status → out for delivery"],
        ["driver 12", "location updated"],
        ["#support", "Sara is typing…"],
      ].map(([k, v], i) => (
        <li key={k} className="flex items-center gap-1.5" style={{ opacity: 1 - i * 0.18 }}>
          <span className="h-1 w-1 rounded-full bg-sky-300" />
          <span className="text-sky-200">{k}</span> {v}
        </li>
      ))}
    </ul>
  </Win>
);

const Ring = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-sky-400 shadow-[0_0_18px_rgba(56,152,255,0.6)]">
      <Check className="h-4 w-4 text-white" />
    </span>
    <span className="text-[8px] text-white/70">{label}</span>
  </div>
);

const Cloud = () => (
  <Win bar={false} className="inset-x-[10%] bottom-[12%] top-[14%] flex flex-col items-center justify-center">
    <div className="text-[8px] font-medium text-white/60">main · deploy pipeline</div>
    <div className="mt-3 flex items-end gap-5">
      <Ring label="Build" />
      <Ring label="Tests" />
      <Ring label="Deploy" />
    </div>
  </Win>
);

const VISUALS: Record<string, ComponentType> = {
  frontend: Frontend,
  mobile: Mobile,
  node: Node,
  laravel: Laravel,
  saas: Saas,
  ai: Ai,
  automation: Automation,
  voip: Voip,
  realtime: Realtime,
  cloud: Cloud,
};

const ServiceVisual = ({ id }: { id: string }) => {
  const V = VISUALS[id] ?? Frontend;
  const pauseRef = usePauseOffscreen<HTMLDivElement>();
  return (
    <div ref={pauseRef} aria-hidden="true" className="fx-panel relative aspect-[16/10] overflow-hidden rounded-xl">
      <div className="fx-dotgrid absolute inset-0" />
      <V />
    </div>
  );
};

export default ServiceVisual;
