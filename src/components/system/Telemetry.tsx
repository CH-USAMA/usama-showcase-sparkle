import type { ReactNode } from "react";

export interface Readout {
  label: string;
  value: ReactNode;
  /** Renders a pulsing status dot before the value. */
  status?: "on" | "idle";
}

interface TelemetryProps {
  items: Readout[];
  className?: string;
  columns?: 2 | 3 | 4;
}

/**
 * Telemetry readouts.
 *
 * Deliberately reports facts that are true and checkable — stack, working
 * hours, location, availability — rather than inventing uptime percentages.
 * Fake dashboards are the fastest way to lose a technical reader.
 */
const Telemetry = ({ items, className = "", columns = 2 }: TelemetryProps) => {
  const cols =
    columns === 4 ? "sm:grid-cols-4" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <dl
      className={`grid grid-cols-2 ${cols} gap-px overflow-hidden rounded-lg border border-hairline/[0.09] bg-hairline/[0.06] ${className}`}
    >
      {items.map((item) => (
        <div key={item.label} className="bg-surface-1/80 px-4 py-3.5 backdrop-blur-sm">
          <dt className="mono-tiny text-subtle">{item.label}</dt>
          <dd className="mt-2 flex items-center gap-2">
            {item.status && (
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  item.status === "on" ? "bg-primary anim-status" : "bg-muted-foreground/60"
                }`}
              />
            )}
            <span className="font-mono text-[11.5px] leading-[1.45] tracking-tight text-foreground sm:text-[12.5px]">
              {item.value}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default Telemetry;
