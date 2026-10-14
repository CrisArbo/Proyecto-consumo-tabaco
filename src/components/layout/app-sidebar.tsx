import Link from "next/link";
import { BookOpen, Database } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { SectionNav } from "@/components/layout/section-nav";

export function AppSidebar() {
  return (
    <aside
      aria-label="Navegación principal"
      className="bg-sidebar text-sidebar-foreground sticky top-0 hidden h-svh w-72 shrink-0 flex-col overflow-hidden lg:flex"
    >
      <div
        aria-hidden
        className="bg-brand-peach/15 pointer-events-none absolute -top-24 -right-24 size-64 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-[#4f7cac]/25 blur-3xl"
      />

      <header className="relative px-6 pt-7 pb-8">
        <Brand />
      </header>

      <div className="relative flex flex-1 flex-col gap-8 overflow-y-auto px-3">
        <SectionNav />

        <nav aria-label="Recursos">
          <p className="text-sidebar-foreground/50 mb-3 px-3 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
            Recursos
          </p>
          <ul>
            <li>
              <Link
                href="/api-docs"
                className="text-sidebar-foreground/70 hover:bg-sidebar-accent flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-white"
              >
                <BookOpen className="size-4" />
                Documentación API
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <section
        aria-labelledby="fuente-datos"
        className="relative m-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10"
      >
        <div className="mb-2 flex items-center gap-2">
          <Database className="text-brand-peach size-4" />
          <h2 id="fuente-datos" className="text-sm font-semibold text-white">
            Fuente de datos
          </h2>
        </div>
        <p className="text-sidebar-foreground/70 text-xs leading-relaxed">
          Encuesta Nacional de Consumo de Sustancias Psicoactivas (ENCSPA), Colombia.
        </p>
      </section>
    </aside>
  );
}
