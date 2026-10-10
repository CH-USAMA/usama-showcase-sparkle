import { useId } from "react";
import type { FlowStage } from "@/data/types";
import { usePrefersReducedMotion } from "@/hooks/usePointerField";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";

/**
 * Cover art for a project that has no honest screenshot: a private backend, a
 * pipeline, an internal tool. It draws the system's own request path, taken
 * from the case study's `flow`, with one particle travelling through it.
 *
 * SVG with a fixed viewBox, so the type scales with the card and a six-stage
 * path still fits a 360px phone card. Up to three stages run in one row; more
 * snake onto a second row, right to left, so the path stays continuous.
 *
 * `tone="panel"` draws white on the blue illustration panel (cards);
 * `tone="plain"` uses the page's own surfaces (full-width figures).
 */

const W = 640;
const H = 400;
const PAD_X = 48;
const BOX_H = 64;

interface ProjectCoverProps {
  stages: FlowStage[];
  /** Small caption in the top-left corner, e.g. the project category. */
  caption?: string;
  tone?: "panel" | "plain";
  /** Inside a link or card that names itself: hide the diagram from AT. */
  decorative?: boolean;
  className?: string;
}

const TONES = {
  panel: {
    wrap: "fx-panel",
    dot: "hsl(0 0% 100% / 0.16)",
    caption: "hsl(0 0% 100% / 0.75)",
    path: "hsl(0 0% 100% / 0.35)",
    particle: "hsl(0 0% 100%)",
    box: "hsl(222 70% 14% / 0.55)",
    boxStroke: "hsl(0 0% 100% / 0.22)",
    firstStroke: "hsl(0 0% 100% / 0.95)",
    marker: "hsl(0 0% 100%)",
    label: "hsl(0 0% 100%)",
    note: "hsl(0 0% 100% / 0.7)",
  },
  plain: {
    wrap: "bg-surface-2",
    dot: "hsl(var(--hairline) / 0.09)",
    caption: "hsl(var(--subtle-foreground))",
    path: "hsl(var(--hairline) / 0.22)",
    particle: "hsl(var(--primary))",
    box: "hsl(var(--surface-1))",
    boxStroke: "hsl(var(--hairline) / 0.16)",
    firstStroke: "hsl(var(--primary) / 0.9)",
    marker: "hsl(var(--primary))",
    label: "hsl(var(--foreground))",
    note: "hsl(var(--muted-foreground))",
  },
};

const ProjectCover = ({ stages, caption, tone = "plain", decorative = false, className = "" }: ProjectCoverProps) => {
  const reduced = usePrefersReducedMotion();
  const pauseRef = usePauseOffscreen<HTMLDivElement>();
  const gridId = useId().replace(/:/g, "");
  const t = TONES[tone];
  const list = stages.slice(0, 6);
  const n = list.length;

  const perRow = n <= 3 ? n : Math.ceil(n / 2);
  const rows = n <= 3 ? 1 : 2;
  const gap = perRow >= 3 ? 36 : 48;
  const boxW = (W - PAD_X * 2 - gap * (perRow - 1)) / perRow;
  const rowY = rows === 1 ? [H / 2 + 8] : [H / 2 - 52, H / 2 + 76];

  const boxes = list.map((s, i) => {
    const row = i < perRow ? 0 : 1;
    const col = row === 0 ? i : perRow - 1 - (i - perRow);
    const x = PAD_X + col * (boxW + gap);
    const cy = rowY[row];
    return { s, x, y: cy - BOX_H / 2, cx: x + boxW / 2, cy };
  });

  // Shrink a label that would overrun its box (approximate glyph width per char).
  const fit = (text: string, max: number, perChar: number) => Math.min(max, (boxW - 44) / Math.max(1, text.length * perChar));

  // One continuous path through every stage centre.
  const d = boxes.map((b, i) => `${i === 0 ? "M" : "L"}${b.cx.toFixed(1)} ${b.cy.toFixed(1)}`).join(" ");

  return (
    <div ref={pauseRef} className={`relative aspect-[16/10] w-full ${t.wrap} ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        {...(decorative
          ? { "aria-hidden": true }
          : { role: "img", "aria-label": `System path: ${list.map((s) => s.label).join(", then ")}` })}
      >
        <defs>
          <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={t.dot} />
          </pattern>
        </defs>
        <rect width={W} height={H} fill={`url(#${gridId})`} />

        {caption && (
          <text
            x={PAD_X - 16}
            y={44}
            className="font-inter"
            fontSize={12}
            fontWeight={600}
            letterSpacing="0.08em"
            fill={t.caption}
          >
            {caption.toUpperCase()}
          </text>
        )}

        <path d={d} fill="none" stroke={t.path} strokeWidth={1.5} />
        {!reduced && (
          <path
            d={d}
            fill="none"
            stroke={t.particle}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="22 978"
            className="anim-particle"
            style={{ animationDuration: "4.5s" }}
          />
        )}

        {boxes.map((b, i) => (
          <g key={b.s.label + i}>
            <rect
              x={b.x}
              y={b.y}
              width={boxW}
              height={BOX_H}
              rx={10}
              fill={t.box}
              stroke={i === 0 ? t.firstStroke : t.boxStroke}
            />
            <circle cx={b.x + 18} cy={b.cy} r={3.5} fill={t.marker} opacity={i === 0 ? 1 : 0.5} />
            <text
              x={b.x + 32}
              y={b.s.note ? b.cy - 6 : b.cy}
              dominantBaseline="middle"
              className="font-inter"
              fontSize={fit(b.s.label, 16, 0.56)}
              fontWeight={600}
              fill={t.label}
            >
              {b.s.label}
            </text>
            {b.s.note && (
              <text x={b.x + 32} y={b.cy + 13} dominantBaseline="middle" className="font-inter" fontSize={fit(b.s.note, 12, 0.53)} fill={t.note}>
                {b.s.note}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ProjectCover;
