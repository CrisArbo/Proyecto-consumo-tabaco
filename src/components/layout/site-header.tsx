import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/layout/brand";
import { HealthBadge } from "@/components/layout/health-badge";

export function SiteHeader() {
  return (
    <header className="border-border/70 bg-background/75 sticky top-0 z-30 border-b backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-10">
        <Brand tone="dark" className="lg:hidden" />
        <nav aria-label="Ruta de navegación" className="hidden lg:block">
          <ol className="flex items-center gap-2 text-sm">
            <li className="text-muted-foreground">Panel</li>
            <li aria-hidden className="text-muted-foreground/50">
              /
            </li>
            <li aria-current="page" className="text-foreground font-medium">
              Resumen general
            </li>
          </ol>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <HealthBadge />
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<Link href="/api-docs" />}
            className="hidden sm:inline-flex"
          >
            <BookOpen data-icon="inline-start" />
            API
          </Button>
        </div>
      </div>
    </header>
  );
}
