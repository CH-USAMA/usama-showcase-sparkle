import type { ReactNode } from "react";

/* Plain form controls for the /tools pages, styled to the site's surfaces.
   Native elements on purpose: no Radix chunk on pages that only need inputs. */

const controlCls =
  "rounded-lg border border-hairline/[0.14] bg-surface-1 px-3 py-2.5 font-inter text-sm text-foreground placeholder:text-subtle transition-colors duration-standard hover:border-hairline/[0.24] focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30";

export const fieldCls = `w-full ${controlCls}`;
/** For a control that shares a row with another one. */
export const inlineFieldCls = controlCls;

export const Field = ({ id, label, hint, children }: { id: string; label: string; hint?: string; children: ReactNode }) => (
  <div>
    <label htmlFor={id} className="font-inter text-sm font-medium text-foreground">
      {label}
    </label>
    {hint && <p className="mt-1 font-inter text-xs leading-relaxed text-subtle">{hint}</p>}
    <div className="mt-2">{children}</div>
  </div>
);

/** A row of mutually exclusive options, rendered as buttons with aria-pressed. */
export function Choices<T extends string>({
  label,
  options,
  value,
  onChange,
  quiet = [],
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  /** Options whose selected state is neutral rather than highlighted (e.g. "Skip"). */
  quiet?: T[];
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`inline-flex min-h-9 items-center rounded-md border px-3 font-inter text-xs font-medium transition-colors duration-standard ${
              on && quiet.includes(o.value)
                ? "border-hairline/[0.2] bg-surface-2 text-foreground"
                : on
                  ? "border-primary/60 bg-primary/10 text-foreground"
                  : "border-hairline/[0.12] text-muted-foreground hover:border-hairline/[0.24] hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export const Check = ({ id, checked, onChange, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) => (
  <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 font-inter text-sm text-muted-foreground hover:text-foreground">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
    />
    <span>{children}</span>
  </label>
);
