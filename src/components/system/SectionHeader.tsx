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
 *
 * The eyebrow row reads `--hue` from the section around it, so each section's
 * index, rule and label arrive in that section's domain colour. The heading
 * itself stays foreground white — colour is for the labels, not the argument.
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
          {/* The eyebrow carries the section's domain colour as a filled chip.
              As bare 10px text the hue system was present but invisible. */}
          <span className="chip-hue">
            {index && <span className="mono-tiny tabular-nums opacity-70">{index}</span>}
            <span className="mono-label">{eyebrow}</span>
          </span>
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
