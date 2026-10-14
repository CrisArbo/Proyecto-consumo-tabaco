"use client";

import { Badge } from "@/components/ui/badge";
import { useApi } from "@/lib/api";
import { cn } from "@/lib/utils";

export function HealthBadge() {
  const { data, error, loading } = useApi<[string]>(["/health"]);
  const online = !!data && !error;

  return (
    <Badge variant="outline" className="h-7 gap-2 rounded-full px-3" aria-live="polite">
      <span className="relative flex size-2">
        {online && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            loading ? "bg-muted-foreground/40" : online ? "bg-emerald-500" : "bg-destructive",
          )}
        />
      </span>
      {loading ? "Conectando…" : online ? "API en línea" : "API sin conexión"}
    </Badge>
  );
}
