import Link from "next/link";
import { cn } from "@/lib/utils";

export function CloudMark({ className, sun = true }: { className?: string; sun?: boolean }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" aria-hidden className={className}>
      {sun && <circle cx="35" cy="9" r="6" className="fill-brand-peach" />}
      <path
        d="M14 30h22a10 10 0 0 0 1.6-19.87A13 13 0 0 0 12.5 9.2 10.5 10.5 0 0 0 14 30Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Brand({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label="Prevalencia, inicio"
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl transition-colors",
          tone === "light"
            ? "bg-white/10 text-white ring-1 ring-white/15"
            : "bg-brand-navy text-white",
        )}
      >
        <CloudMark className="w-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-semibold tracking-tight",
            tone === "light" ? "text-white" : "text-brand-navy",
          )}
        >
          Prevalencia
        </span>
        <span
          className={cn(
            "text-[0.7rem] font-medium tracking-[0.18em] uppercase",
            tone === "light" ? "text-brand-peach" : "text-muted-foreground",
          )}
        >
          Entre Nubes
        </span>
      </span>
    </Link>
  );
}
