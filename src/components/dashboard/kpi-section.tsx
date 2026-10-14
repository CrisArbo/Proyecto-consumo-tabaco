"use client";

import type { LucideIcon } from "lucide-react";
import { Cigarette, Home, RefreshCw, Users, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DataSkeleton } from "@/components/data-skeleton";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { kpiFixture } from "@/components/dashboard/fixtures";
import { numberFormat, percent, useApi, type Paginated } from "@/lib/api";
import { cn } from "@/lib/utils";

type AnswerStat<K extends string> = Record<K, number> & { count: number };

export type KpiModel = {
  households: number;
  persons: number;
  smoked: number;
  vaped: number;
  respondents: number;
};

type Kpi = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  share?: number;
  tone: "navy" | "peach";
};

function toKpis(model: KpiModel): Kpi[] {
  const smokedPct = percent(model.smoked, model.respondents);
  const vapedPct = percent(model.vaped, model.respondents);
  return [
    {
      label: "Hogares encuestados",
      value: numberFormat.format(model.households),
      detail: "Unidades visitadas en todo el país",
      icon: Home,
      tone: "navy",
    },
    {
      label: "Personas registradas",
      value: numberFormat.format(model.persons),
      detail: "Integrantes de los hogares visitados",
      icon: Users,
      tone: "navy",
    },
    {
      label: "Alguna vez fumó",
      value: `${smokedPct.toFixed(1)}%`,
      detail: `${numberFormat.format(model.smoked)} personas`,
      icon: Cigarette,
      share: smokedPct,
      tone: "peach",
    },
    {
      label: "Alguna vez vapeó",
      value: `${vapedPct.toFixed(1)}%`,
      detail: `${numberFormat.format(model.vaped)} personas`,
      icon: Wind,
      share: vapedPct,
      tone: "peach",
    },
  ];
}

export function KpiGrid({ model }: { model: KpiModel }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {toKpis(model).map(({ label, value, detail, icon: Icon, share, tone }) => (
        <Card
          as="li"
          key={label}
          className="group ring-foreground/[0.07] relative gap-0 overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgb(30_58_95/0.35)]"
        >
          <span
            aria-hidden
            className={cn(
              "absolute -top-10 -right-10 size-28 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-100",
              tone === "navy" ? "bg-brand-navy/10" : "bg-brand-peach/40",
            )}
          />
          <div className="relative flex items-start justify-between">
            <h3 className="text-muted-foreground text-sm font-medium">{label}</h3>
            <span
              className={cn(
                "grid size-10 place-items-center rounded-xl",
                tone === "navy"
                  ? "bg-brand-navy text-white"
                  : "bg-brand-peach-soft text-brand-navy",
              )}
            >
              <Icon className="size-5" />
            </span>
          </div>
          <data
            value={value}
            className="font-heading text-brand-navy relative mt-3 text-4xl font-semibold tracking-tight tabular-nums dark:text-white"
          >
            {value}
          </data>
          {share !== undefined && (
            <Progress value={share} aria-label={`${label}: ${value}`} className="relative mt-4" />
          )}
          <p className="text-muted-foreground relative mt-3 text-xs">{detail}</p>
        </Card>
      ))}
    </ul>
  );
}

export function KpiSection({
  refreshKey,
  onRefresh,
}: {
  refreshKey: number;
  onRefresh: () => void;
}) {
  const { data, loading, error } = useApi<
    [
      Paginated<unknown>,
      Paginated<unknown>,
      Paginated<unknown>,
      { items: AnswerStat<"everSmokedId">[] },
      { items: AnswerStat<"everVapedId">[] },
    ]
  >(
    [
      "/households?limit=1",
      "/persons?limit=1",
      "/respondents?limit=1",
      "/stats/tobacco-use-by-answer",
      "/stats/vape-use-by-answer",
    ],
    refreshKey,
  );

  const model: KpiModel | undefined = data && {
    households: data[0].total,
    persons: data[1].total,
    respondents: data[2].total,
    smoked: data[3].items.find((i) => i.everSmokedId === 1)?.count ?? 0,
    vaped: data[4].items.find((i) => i.everVapedId === 1)?.count ?? 0,
  };

  return (
    <section id="indicadores" aria-labelledby="titulo-indicadores" className="scroll-mt-20">
      <SectionHeading
        id="titulo-indicadores"
        eyebrow="Indicadores"
        title="La encuesta en cifras"
        description="Totales calculados en tiempo real a partir de la API paginada y de las estadísticas agregadas."
        action={
          <Button
            variant="outline"
            size="lg"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-xl"
          >
            <RefreshCw data-icon="inline-start" className={cn(loading && "animate-spin")} />
            Actualizar datos
          </Button>
        }
      />
      {error ? (
        <ErrorNotice message={error} />
      ) : (
        <DataSkeleton
          name="kpi-grid"
          loading={loading}
          fixture={<KpiGrid model={kpiFixture} />}
          fallbackClassName="h-44"
        >
          {model && <KpiGrid model={model} />}
        </DataSkeleton>
      )}
    </section>
  );
}

export function ErrorNotice({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="border-destructive/30 bg-destructive/5 text-destructive rounded-2xl border p-4 text-sm"
    >
      No pudimos cargar esta sección: {message}
    </p>
  );
}
