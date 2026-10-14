import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function SectionHeading({ id, eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <hgroup className="max-w-2xl">
        <p className="text-brand-navy/70 dark:text-brand-peach mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
          <span aria-hidden className="bg-brand-peach h-px w-6" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="font-heading text-brand-navy text-2xl font-semibold tracking-tight sm:text-3xl dark:text-white"
        >
          {title}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
      </hgroup>
      {action}
    </header>
  );
}
