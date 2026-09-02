import { forwardRef, useCallback, useRef, useState } from "react";
import type { ReactNode, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion, useFinePointer } from "@/hooks/usePointerField";

type Tone = "primary" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  /** Show the trailing arrow that slides on hover. */
  arrow?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  "aria-label"?: string;
  "data-cursor"?: string;
}

interface LinkProps extends BaseProps {
  /** Internal route — rendered as <Link> so it never full-reloads the SPA. */
  to: string;
  href?: never;
}
interface AnchorProps extends BaseProps {
  /** External URL, mailto:, tel:, or a static file. */
  href: string;
  to?: never;
  download?: string | boolean;
  target?: string;
}
interface ButtonProps extends BaseProps {
  to?: never;
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
}

type CTAProps = LinkProps | AnchorProps | ButtonProps;

const tones: Record<Tone, string> = {
  primary:
    "bg-primary text-primary-foreground font-semibold hover:bg-primary-glow " +
    "shadow-[0_8px_28px_-12px_hsl(var(--primary)/0.6)] hover:shadow-[0_12px_36px_-12px_hsl(var(--primary)/0.75)]",
  ghost:
    "text-foreground border border-hairline/[0.14] bg-surface-1/60 backdrop-blur-sm " +
    "hover:border-primary/40 hover:bg-surface-2/70",
  quiet:
    "text-muted-foreground hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-[52px] px-7 text-[15px] gap-2.5",
};

/**
 * The one call-to-action component.
 *
 * Two things it fixes beyond looks:
 *  - internal destinations render as <Link>, so the primary CTA no longer
 *    triggers a full document reload on every click;
 *  - the magnetic hover is pointer- and motion-gated, so it costs nothing on
 *    touch devices and disappears under prefers-reduced-motion.
 */
const CTA = forwardRef<HTMLElement, CTAProps>((props, _ref) => {
  const {
    children,
    tone = "primary",
    size = "md",
    arrow = false,
    className = "",
    ...rest
  } = props as CTAProps & Record<string, unknown>;

  const el = useRef<HTMLElement | null>(null);
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const magnetic = fine && !reduced && tone !== "quiet";

  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!magnetic || !el.current) return;
      const r = el.current.getBoundingClientRect();
      // Cap the pull at 5px: enough to feel alive, not enough to miss the target.
      const x = ((e.clientX - (r.left + r.width / 2)) / r.width) * 10;
      const y = ((e.clientY - (r.top + r.height / 2)) / r.height) * 8;
      setShift({ x: Math.max(-5, Math.min(5, x)), y: Math.max(-4, Math.min(4, y)) });
    },
    [magnetic]
  );

  const onLeave = useCallback(() => setShift({ x: 0, y: 0 }), []);

  const classes =
    "group relative inline-flex items-center justify-center rounded-full " +
    "transition-[background-color,border-color,box-shadow,color] duration-standard ease-out-expo " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none " +
    `${tones[tone]} ${sizes[size]} ${className}`;

  const style = magnetic
    ? {
        transform: `translate3d(${shift.x}px, ${shift.y}px, 0)`,
        transition: shift.x === 0 && shift.y === 0
          ? "transform 380ms cubic-bezier(0.16,1,0.3,1)"
          : "transform 120ms linear",
      }
    : undefined;

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-standard ease-out-expo group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  const shared = {
    className: classes,
    style,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    "data-cursor": (rest["data-cursor"] as string) ?? "interactive",
  };

  if ("to" in props && props.to) {
    const { to, onClick, ...a } = props as LinkProps;
    return (
      <Link
        to={to}
        onClick={onClick}
        aria-label={a["aria-label"]}
        ref={el as React.Ref<HTMLAnchorElement>}
        {...shared}
      >
        {inner}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const { href, download, target, onClick } = props as AnchorProps;
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        onClick={onClick}
        download={download}
        target={target ?? (external ? "_blank" : undefined)}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={props["aria-label"]}
        ref={el as React.Ref<HTMLAnchorElement>}
        {...shared}
      >
        {inner}
      </a>
    );
  }

  const { type = "button", disabled, onClick } = props as ButtonProps;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={props["aria-label"]}
      ref={el as React.Ref<HTMLButtonElement>}
      {...shared}
    >
      {inner}
    </button>
  );
});

CTA.displayName = "CTA";

export default CTA;
