import { useEffect, useMemo, useState } from "react";
import {
  Braces,
  Brain,
  Code2,
  Container,
  Database,
  Hexagon,
  PhoneCall,
  Radio,
  Server,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePointerVars, usePrefersReducedMotion } from "@/hooks/usePointerField";
import SystemCore from "@/components/system/SystemCore";

/* ---------------------------------------------------------------------------
   A system diagram, not an orbit.

   Nodes are routed to the centre through shared vertical trunks with
   right-angled elbows — the way an actual rack or PCB is drawn. Signals travel
   inward along those trunks as short dashes.

   Two compositions, not one scaled: `wide` is a two-sided bus for landscape,
   `compact` is a single descending trunk for portrait.

   Parallax is driven by CSS custom properties written straight to the DOM
   (see usePointerVars), never React state. Re-rendering this tree — ten nodes
   of six SVG elements each — on every pointermove was the single largest
   frame cost on the page.
--------------------------------------------------------------------------- */

interface NodeDef {
  id: string;
  label: string;
  meta: string;
  icon: LucideIcon;
  /**
   * Laravel is the specialisation, not one of ten peers. Ten identically
   * weighted boxes said "knows ten things", which is the reading the whole
   * site is arguing against.
   */
  weight?: "primary";
}

/** First five render down the left bus, last five down the right. */
const NODES: NodeDef[] = [
  { id: "laravel", label: "Laravel", meta: "Core backend", icon: Server, weight: "primary" },
  { id: "node", label: "Node.js", meta: "Real-time · events", icon: Hexagon },
  { id: "redis", label: "Redis", meta: "Queues · cache", icon: Database },
  { id: "api", label: "APIs", meta: "REST · GraphQL", icon: Braces },
  { id: "docker", label: "Docker", meta: "Deploy", icon: Container },
  { id: "ai", label: "LLMs", meta: "Retrieval · tools", icon: Brain },
  { id: "python", label: "Python", meta: "AI · RAG · agents", icon: Code2 },
  { id: "automation", label: "Automation", meta: "n8n · MCP", icon: Workflow },
  { id: "asterisk", label: "Asterisk", meta: "SIP · IVR", icon: PhoneCall },
  { id: "realtime", label: "Real-time", meta: "WebSockets", icon: Radio },
];

/** Orthogonal path with rounded corners: horizontal → trunk → horizontal. */
function elbow(x1: number, y1: number, tx: number, y2: number, x2: number, r = 14) {
  const h1 = Math.sign(tx - x1) || 1;
  const v = Math.sign(y2 - y1) || 1;
  const h2 = Math.sign(x2 - tx) || 1;
  if (Math.abs(y2 - y1) < 1) return `M${x1} ${y1} L${x2} ${y2}`;
  return [
    `M${x1} ${y1}`,
    `L${tx - h1 * r} ${y1}`,
    `Q${tx} ${y1} ${tx} ${y1 + v * r}`,
    `L${tx} ${y2 - v * r}`,
    `Q${tx} ${y2} ${tx + h2 * r} ${y2}`,
    `L${x2} ${y2}`,
  ].join(" ");
}

type Layout = "wide" | "compact";

interface Geometry {
  vb: { w: number; h: number };
  photo: { cx: number; cy: number; r: number };
  type: { label: number; meta: number; dotX: number; textX: number };
  nodes: {
    def: NodeDef;
    /** anchor point on the node where the wire attaches */
    ax: number;
    ay: number;
    /** node box top-left, in viewBox units */
    x: number;
    y: number;
    w: number;
    h: number;
    side: "left" | "right";
    path: string;
  }[];
}

function buildWide(): Geometry {
  // Nearly square (720/680) rather than the old 620/540. At a fixed column
  // width a squarer box is a taller box, which is most of what "bigger" means
  // here — and five rows a side need the height.
  const W = 720, H = 680;
  const cx = W / 2, cy = H / 2, pr = 122;
  const boxW = 146, boxH = 54;
  const pad = 20;
  const leftTrunk = 196, rightTrunk = W - leftTrunk;
  // Symmetric about cy, so the composition reads centred at rest. The middle
  // row sits exactly on cy and runs straight in — elbow() handles that case.
  const rows = [76, 190, cy, 490, 604];

  const left = NODES.slice(0, 5).map((def, i) => {
    const y = rows[i];
    const x = pad;
    const ax = x + boxW;
    return {
      def, x, y: y - boxH / 2, w: boxW, h: boxH, ax, ay: y, side: "left" as const,
      path: elbow(ax, y, leftTrunk, cy, cx - pr - 14),
    };
  });

  const right = NODES.slice(5).map((def, i) => {
    const y = rows[i];
    const x = W - pad - boxW;
    return {
      def, x, y: y - boxH / 2, w: boxW, h: boxH, ax: x, ay: y, side: "right" as const,
      path: elbow(x, y, rightTrunk, cy, cx + pr + 14),
    };
  });

  return {
    vb: { w: W, h: H },
    photo: { cx, cy, r: pr },
    type: { label: 15, meta: 10, dotX: 18, textX: 32 },
    nodes: [...left, ...right],
  };
}

function buildCompact(): Geometry {
  const W = 380, H = 560;
  const cx = W / 2, cy = 96, pr = 62;
  const boxW = 116, boxH = 40;
  const trunk = cx;
  // Photo at the top, a single trunk descending, nodes branching alternately.
  // Six of the ten — a phone does not need the whole bus to make the point.
  const rows = [216, 274, 332, 390, 448, 506];
  const picked = ["laravel", "ai", "node", "python", "asterisk", "realtime"].map(
    (id) => NODES.find((n) => n.id === id)!
  );

  const nodes = picked.map((def, i) => {
    const side = i % 2 === 0 ? ("left" as const) : ("right" as const);
    const y = rows[i];
    const x = side === "left" ? 8 : W - 8 - boxW;
    const ax = side === "left" ? x + boxW : x;
    // branch off the vertical trunk: short horizontal run into the trunk
    const path = `M${ax} ${y} L${side === "left" ? trunk - 16 : trunk + 16} ${y} Q${trunk} ${y} ${trunk} ${y - 14} L${trunk} ${cy + pr + 12}`;
    return { def, x, y: y - boxH / 2, w: boxW, h: boxH, ax, ay: y, side, path };
  });

  return {
    vb: { w: W, h: H },
    photo: { cx, cy, r: pr },
    type: { label: 12.5, meta: 8.5, dotX: 15, textX: 26 },
    nodes,
  };
}

/**
 * Parallax transform for a layer, in viewBox units per unit of pointer offset.
 * `--px` / `--py` are unitless -1..1 and default to 0, so this is also the
 * correct resting transform when the pointer field is disabled.
 */
const drift = (d: number) =>
  `translate3d(calc(var(--px, 0) * ${d}px), calc(var(--py, 0) * ${(d * 0.7).toFixed(2)}px), 0)`;

// Nodes and photo share a depth. Giving the photo less drift than the node
// cluster (it used to be 3 against 11) made the portrait read as off-centre
// whenever the pointer sat to one side — the thing it must never do, since it
// is the anchor the whole diagram points at.
const DEPTH_LAYER = 8;
const DEPTH_WIRES = 4;
const DEPTH_RING = 6;

const SystemGraph = () => {
  const [layout, setLayout] = useState<Layout>("wide");
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const ref = usePointerVars<HTMLDivElement>();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setLayout(mq.matches ? "wide" : "compact");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const geo = useMemo(() => (layout === "wide" ? buildWide() : buildCompact()), [layout]);
  const { vb, photo, nodes, type } = geo;

  const photoPct = {
    left: `${(photo.cx / vb.w) * 100}%`,
    top: `${(photo.cy / vb.h) * 100}%`,
    width: `${((photo.r * 2) / vb.w) * 100}%`,
    // -50%/-50% centres the box on (cx, cy); the parallax has to compose into
    // the same transform or it would replace the centring entirely.
    transform: `translate(-50%, -50%) ${drift(DEPTH_LAYER)}`,
  };

  return (
    <div
      ref={ref}
      className="relative w-full select-none"
      style={{ aspectRatio: `${vb.w} / ${vb.h}` }}
      role="img"
      aria-label="System diagram: Laravel, Node.js, Redis, APIs, Docker, AI, Python, automation, Asterisk and real-time services routed into a central node routed into a central node that shows the request lifecycle."
    >
      <svg
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="sg-wire" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--hairline))" stopOpacity="0.10" />
            <stop offset="55%" stopColor="hsl(var(--hairline))" stopOpacity="0.20" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.32" />
          </linearGradient>
          <radialGradient id="sg-core" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* core halo */}
        <circle cx={photo.cx} cy={photo.cy} r={photo.r * 2.1} fill="url(#sg-core)" />

        {/* ---- wires ---- */}
        <g style={{ transform: drift(DEPTH_WIRES) }}>
          {nodes.map((n, i) => {
            const on = hovered === n.def.id;
            return (
              <g key={n.def.id}>
                <path
                  d={n.path}
                  fill="none"
                  stroke="url(#sg-wire)"
                  strokeWidth={1}
                  className="transition-opacity duration-standard"
                  opacity={hovered && !on ? 0.28 : 1}
                />
                {/* travelling signal: a short dash sliding along the wire */}
                {!reduced && (
                  <path
                    d={n.path}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth={on ? 2 : 1.5}
                    strokeLinecap="round"
                    strokeDasharray="3 300"
                    className="anim-dash-flow"
                    style={{
                      animationDelay: `${i * 1.3}s`,
                      animationDuration: on ? "5s" : "14s",
                      opacity: on ? 0.95 : 0.55,
                    }}
                  />
                )}
                {/* junction dot where the wire meets the core */}
                <circle
                  cx={n.side === "left" ? photo.cx - photo.r - 14 : photo.cx + photo.r + 14}
                  cy={layout === "wide" ? photo.cy : photo.cy + photo.r + 12}
                  r={on ? 2.6 : 1.8}
                  fill="hsl(var(--primary))"
                  opacity={on ? 1 : 0.5}
                  className="transition-all duration-standard"
                />
              </g>
            );
          })}
        </g>

        {/* ---- instrument ring around the core ---- */}
        <g style={{ transform: drift(DEPTH_RING) }}>
          <circle
            cx={photo.cx}
            cy={photo.cy}
            r={photo.r + 18}
            fill="none"
            stroke="hsl(var(--hairline))"
            strokeOpacity={0.14}
            strokeWidth={1}
          />
          <circle
            cx={photo.cx}
            cy={photo.cy}
            r={photo.r + 32}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity={0.28}
            strokeWidth={1}
            strokeDasharray="2 10"
            style={
              reduced
                ? undefined
                : {
                    transformOrigin: `${photo.cx}px ${photo.cy}px`,
                    animation: "rotate-slow 64s linear infinite",
                  }
            }
          />
          {/* quadrant ticks: instrument, not decoration */}
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const r1 = photo.r + 23;
            const r2 = photo.r + 29;
            return (
              <line
                key={deg}
                x1={photo.cx + Math.cos(rad) * r1}
                y1={photo.cy + Math.sin(rad) * r1}
                x2={photo.cx + Math.cos(rad) * r2}
                y2={photo.cy + Math.sin(rad) * r2}
                stroke="hsl(var(--primary))"
                strokeOpacity={0.5}
                strokeWidth={1}
              />
            );
          })}
        </g>

        {/* ---- nodes ---- */}
        <g style={{ transform: drift(DEPTH_LAYER) }}>
          {nodes.map((n) => {
            const on = hovered === n.def.id;
            // The specialisation is drawn heavier at rest: a brighter hairline,
            // a filled dot and a heavier label. Everything else stays quiet.
            const lead = n.def.weight === "primary";
            return (
              <g
                key={n.def.id}
                onMouseEnter={() => setHovered(n.def.id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-default"
                style={{ pointerEvents: "auto" }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx={9}
                  fill="hsl(var(--surface-1))"
                  stroke={on ? "hsl(var(--primary))" : "hsl(var(--hairline))"}
                  strokeOpacity={on ? 0.7 : lead ? 0.34 : 0.13}
                  strokeWidth={1}
                  className="transition-all duration-standard"
                />
                {on && (
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx={9}
                    fill="hsl(var(--primary))"
                    opacity={0.07}
                  />
                )}
                <circle
                  cx={n.x + type.dotX}
                  cy={n.y + n.h / 2}
                  r={lead ? 3.2 : 2.6}
                  fill="hsl(var(--primary))"
                  opacity={on || lead ? 1 : 0.55}
                  className="transition-opacity duration-standard"
                />
                <text
                  x={n.x + type.textX}
                  y={n.y + n.h / 2 - 4}
                  fill="hsl(var(--foreground))"
                  className="font-inter"
                  fontSize={type.label}
                  fontWeight={lead ? 680 : 550}
                  dominantBaseline="middle"
                >
                  {n.def.label}
                </text>
                <text
                  x={n.x + type.textX}
                  y={n.y + n.h / 2 + 13}
                  fill="hsl(var(--muted-foreground))"
                  className="font-mono"
                  fontSize={type.meta}
                  letterSpacing="0.06em"
                  dominantBaseline="middle"
                >
                  {n.def.meta}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* ---- the core at the centre of the system ---- */}
      <div className="absolute" style={photoPct}>
        <div className="relative aspect-square w-full">
          <div
            className="absolute -inset-4 rounded-full opacity-70 blur-2xl"
            style={{ background: "radial-gradient(circle, hsl(var(--hue, var(--primary))/0.18), transparent 70%)" }}
            aria-hidden="true"
          />
          <SystemCore />
        </div>
      </div>
    </div>
  );
};

export default SystemGraph;
