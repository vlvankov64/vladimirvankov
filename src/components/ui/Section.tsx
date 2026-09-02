import type { ReactNode } from "react";

/** Full-bleed page band. Three grounds, matching the original's palette. */
export type SectionTone = "paper" | "mist" | "ink";

const tones: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-paper",
};

export function Section({
  tone = "paper",
  id,
  className = "",
  children,
}: {
  tone?: SectionTone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative w-full ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}
