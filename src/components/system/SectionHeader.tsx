import type { ReactNode } from "react";
import Reveal from "@/components/system/Reveal";

interface SectionHeaderProps {
  /** Two-digit section index, e.g. "02" — reinforces the systems language. */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * One header treatment for the whole page. Left-aligned by default: centred
 * headings read as marketing, left-aligned read as documentation, and this
 * site is arguing that its author is an engineer.
 */
const SectionHeader = ({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: SectionHeaderProps) => {
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} ${className}`}>
      <Reveal>
        <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
          {index && (
            <span className="mono-tiny text-primary/70 tabular-nums">{index}</span>
          )}
          <span className="h-px w-8 bg-primary/40" aria-hidden="true" />
          <span className="mono-label text-primary">{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal index={1}>
        <h2 className="type-h2 mt-6 text-foreground">{title}</h2>
      </Reveal>

      {lead && (
        <Reveal index={2}>
          <p className="type-lead mt-5 text-muted-foreground max-w-2xl">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeader;
