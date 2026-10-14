"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { sections } from "@/components/layout/sections";

export function SectionNav() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Secciones del panel">
      <p className="text-sidebar-foreground/50 mb-3 px-3 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
        Panel
      </p>
      <ul className="flex flex-col gap-1">
        {sections.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-white"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "bg-brand-peach absolute inset-y-2 left-0 w-1 rounded-full transition-opacity",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
                <Icon className={cn("size-4", isActive && "text-brand-peach")} />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
