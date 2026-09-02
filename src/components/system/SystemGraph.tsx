import { useEffect, useMemo, useState } from "react";
import { Braces, Brain, Container, Database, PhoneCall, Radio, Server, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePointerField, usePrefersReducedMotion } from "@/hooks/usePointerField";
import profileWebp from "@/assets/usama-profile.webp";
import profileJpg from "@/assets/usama-profile.jpg";

/* ---------------------------------------------------------------------------
   A system diagram, not an orbit.

   Nodes are routed to the centre through shared vertical trunks with
   right-angled elbows — the way an actual rack or PCB is drawn. Signals travel
   inward along those trunks as short dashes.

   Two compositions, not one scaled: `wide` is a two-sided bus for landscape,
   `compact` is a single descending trunk for portrait.
--------------------------------------------------------------------------- */

interface NodeDef {
  id: string;
  label: string;
  meta: string;
  icon: LucideIcon;
}

const NODES: NodeDef[] = [
  { id: "laravel", label: "Laravel", meta: "App layer", icon: Server },
  { id: "redis", label: "Redis", meta: "Queues · cache", icon: Database },
  { id: "api", label: "APIs", meta: "REST · GraphQL", icon: Braces },
  { id: "docker", label: "Docker", meta: "Deploy", icon: Container },
  { id: "ai", label: "AI", meta: "RAG · agents", icon: Brain },
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
  const W = 620, H = 540;
  const cx = 310, cy = 270, pr = 84;
  const boxW = 118, boxH = 46;
  const leftTrunk = 176, rightTrunk = 444;
  const rows = [64, 152, 388, 476];

  const left = NODES.slice(0, 4).map((def, i) => {
    const y = rows[i];
    const x = 30;
    const ax = x + boxW;
    return {
      def, x, y: y - boxH / 2, w: boxW, h: boxH, ax, ay: y, side: "left" as const,
      path: elbow(ax, y, leftTrunk, cy, cx - pr - 14),
    };
  });

  const right = NODES.slice(4).map((def, i) => {
    const y = rows[i];
    const x = W - 30 - boxW;
    const ax = x;
    return {
      def, x, y: y - boxH / 2, w: boxW, h: boxH, ax, ay: y, side: "right" as const,
      path: elbow(ax, y, rightTrunk, cy, cx + pr + 14),
    };
  });

  return { vb: { w: W, h: H }, photo: { cx, cy, r: pr }, nodes: [...left, ...right] };
}

function buildCompact(): Geometry {
  const W = 380, H = 560;
  const cx = 190, cy = 96, pr = 62;
  const boxW = 116, boxH = 40;
  const trunk = 190;
  // Photo at the top, a single trunk descending, nodes branching alternately.
  const rows = [216, 274, 332, 390, 448, 506];
  const picked = [NODES[0], NODES[4], NODES[1], NODES[5], NODES[6], NODES[7]];

  const nodes = picked.map((def, i) => {
    const side = i % 2 === 0 ? ("left" as const) : ("right" as const);
    const y = rows[i];
    const x = side === "left" ? 8 : W - 8 - boxW;
    const ax = side === "left" ? x + boxW : x;
    // branch off the vertical trunk: short horizontal run into the trunk
    const path = `M${ax} ${y} L${side === "left" ? trunk - 16 : trunk + 16} ${y} Q${trunk} ${y} ${trunk} ${y - 14} L${trunk} ${cy + pr + 12}`;
    return { def, x, y: y - boxH / 2, w: boxW, h: boxH, ax, ay: y, side, path };
  });

  return { vb: { w: W, h: H }, photo: { cx, cy, r: pr }, nodes };
}

const SystemGraph = () => {
  const [layout, setLayout] = useState<Layout>("wide");
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const { ref, offset, enabled } = usePointerField<HTMLDivElement>();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setLayout(mq.matches ? "wide" : "compact");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const geo = useMemo(() => (layout === "wide" ? buildWide() : buildCompact()), [layout]);
  const { vb, photo, nodes } = geo;

  // Parallax depths: wires drift least, nodes more, photo least of all so it
  // stays the anchor the eye returns to.
  const drift = (d: number) =>
    enabled ? { transform: `translate3d(${offset.x * d}px, ${offset.y * d * 0.7}px, 0)` } : undefined;

  // The photo is centred with a -50%/-50% translate, so its parallax has to be
  // composed into the same transform — an inline `transform` would otherwise
  // replace the centring and knock the portrait half its own width off-centre.
  const photoTransform = `translate(-50%, -50%) translate3d(${
    enabled ? offset.x * 3 : 0
  }px, ${enabled ? offset.y * 2.1 : 0}px, 0)`;

  const photoPct = {
    left: `${(photo.cx / vb.w) * 100}%`,
    top: `${(photo.cy / vb.h) * 100}%`,
    width: `${((photo.r * 2) / vb.w) * 100}%`,
  };

  return (
    <div
      ref={ref}
      className="relative w-full select-none"
      style={{ aspectRatio: `${vb.w} / ${vb.h}` }}
      role="img"
      aria-label="System diagram: Laravel, Redis, APIs, Docker, AI, automation, Asterisk and real-time services routed into a central node representing Usama Munawar."
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
          <filter id="sg-soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* core halo */}
        <circle cx={photo.cx} cy={photo.cy} r={photo.r * 2.3} fill="url(#sg-core)" />

        {/* ---- wires ---- */}
        <g style={drift(6)}>
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
                {/* travelling signal — a short dash sliding along the wire */}
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
                      animationDelay: `${i * 1.65}s`,
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
        <g style={drift(3)}>
          <circle
            cx={photo.cx}
            cy={photo.cy}
            r={photo.r + 16}
            fill="none"
            stroke="hsl(var(--hairline))"
            strokeOpacity={0.14}
            strokeWidth={1}
          />
          <circle
            cx={photo.cx}
            cy={photo.cy}
            r={photo.r + 28}
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
          {/* quadrant ticks — instrument, not decoration */}
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const r1 = photo.r + 20;
            const r2 = photo.r + 26;
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
        <g style={drift(11)}>
          {nodes.map((n) => {
            const on = hovered === n.def.id;
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
                  rx={8}
                  fill="hsl(var(--surface-1))"
                  stroke={on ? "hsl(var(--primary))" : "hsl(var(--hairline))"}
                  strokeOpacity={on ? 0.7 : 0.13}
                  strokeWidth={1}
                  className="transition-all duration-standard"
                />
                {on && (
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx={8}
                    fill="hsl(var(--primary))"
                    opacity={0.07}
                  />
                )}
                <circle
                  cx={n.x + 15}
                  cy={n.y + n.h / 2}
                  r={2.4}
                  fill="hsl(var(--primary))"
                  opacity={on ? 1 : 0.55}
                  className="transition-opacity duration-standard"
                />
                <text
                  x={n.x + 26}
                  y={n.y + (n.h / 2) - 3}
                  fill="hsl(var(--foreground))"
                  className="font-inter"
                  fontSize={12.5}
                  fontWeight={550}
                  dominantBaseline="middle"
                >
                  {n.def.label}
                </text>
                <text
                  x={n.x + 26}
                  y={n.y + (n.h / 2) + 12}
                  fill="hsl(var(--muted-foreground))"
                  className="font-mono"
                  fontSize={8.5}
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

      {/* ---- the person at the centre of the system ---- */}
      <div className="absolute" style={{ ...photoPct, transform: photoTransform }}>
        <div className="relative aspect-square w-full">
          <div
            className="absolute -inset-3 rounded-full opacity-70 blur-2xl"
            style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.22), transparent 70%)" }}
            aria-hidden="true"
          />
          <picture>
            <source srcSet={profileWebp} type="image/webp" />
            <img
              src={profileJpg}
              alt="Usama Munawar, Backend Systems Engineer"
              width={340}
              height={340}
              decoding="async"
              /* React 18 only forwards the lowercase attribute name */
              {...{ fetchpriority: "high" }}
              className="relative h-full w-full rounded-full object-cover ring-1 ring-hairline/[0.16]"
            />
          </picture>
          <span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: "inset 0 0 40px hsl(var(--background) / 0.55)" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default SystemGraph;
