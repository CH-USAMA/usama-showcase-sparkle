import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface CopyButtonProps {
  text: string;
  /** Accessible name, also the analytics label. */
  label: string;
  /** Visible text before copying. */
  children?: string;
  /** Analytics event name. */
  event?: string;
  className?: string;
}

/** Copies `text`; "Copied" is announced to screen readers. */
const CopyButton = ({ text, label, children = "Copy", event = "prompt_copy", className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackEvent(event, { item: label });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (permissions, old browser): the text is still selectable.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-md border border-hairline/[0.12] px-2.5 font-inter text-xs font-medium text-muted-foreground transition-colors duration-standard hover:border-hairline/[0.24] hover:text-foreground ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : children}</span>
    </button>
  );
};

export default CopyButton;
