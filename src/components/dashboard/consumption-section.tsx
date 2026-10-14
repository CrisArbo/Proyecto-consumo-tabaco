"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DataSkeleton } from "@/components/data-skeleton";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { ErrorNotice } from "@/components/dashboard/kpi-section";
import { consumptionFixture } from "@/components/dashboard/fixtures";
import { labelMap, numberFormat, percent, useApi, type CatalogItem } from "@/lib/api";

export type ConsumptionModel = {
  total: number;
  smoked: number;
  vaped: number;
  rows: { answer: string; tabaco: number; vapeo: number }[];
};

const chartConfig = {
  tabaco: { label: "Tabaco", color: "var(--chart-1)" },
  vapeo: { label: "Vapeo", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function ConsumptionView({ model }: { model: ConsumptionModel }) {
  const ratio = model.vaped === 0 ? 0 : model.smoked / model.vaped;

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card as="figure" className="ring-foreground/[0.07] rounded-2xl xl:col-span-2">
        <CardHeader>
          <CardTitle>
            <h3>¿Alguna vez ha consumido…?</h3>
          </CardTitle>
          <CardDescription>Porcentaje de respuestas por tipo de producto</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
            <BarChart data={model.rows} barGap={10} margin={{ top: 24 }}>
              <CartesianGrid vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="answer" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis hide domain={[0, 100]} />
              <ChartTooltip
                cursor={{ fill: "var(--muted)", radius: 12 }}
                content={
                  <ChartTooltipContent
                    formatter={(v, name) =>
                      `${chartConfig[name as keyof typeof chartConfig].label}: ${Number(v).toFixed(1)}%`
                    }
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="tabaco"
                fill="var(--color-tabaco)"
                radius={[10, 10, 4, 4]}
                maxBarSize={72}
              >
                <LabelList
                  dataKey="tabaco"
                  position="top"
                  formatter={(v) => `${Number(v).toFixed(1)}%`}
                  className="fill-foreground text-xs font-semibold"
                />
              </Bar>
              <Bar
                dataKey="vapeo"
                fill="var(--color-vapeo)"
                radius={[10, 10, 4, 4]}
                maxBarSize={72}
              >
                <LabelList
                  dataKey="vapeo"
                  position="top"
                  formatter={(v) => `${Number(v).toFixed(1)}%`}
                  className="fill-foreground text-xs font-semibold"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <figcaption className="text-muted-foreground px-4 text-xs">
          Base: {numberFormat.format(model.total)} personas encuestadas.
        </figcaption>
      </Card>

      <Card
        as="aside"
        aria-labelledby="titulo-hallazgo"
        className="bg-brand-peach-soft ring-brand-peach/40 dark:bg-brand-navy relative justify-between overflow-hidden rounded-2xl"
      >
        <span
          aria-hidden
          className="bg-brand-peach/50 absolute -right-16 -bottom-16 size-56 rounded-full blur-2xl"
        />
        <CardHeader className="relative">
          <p className="text-brand-navy/70 dark:text-brand-peach flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
            <Sparkles className="size-3.5" />
            Hallazgo
          </p>
          <h3
            id="titulo-hallazgo"
            className="font-heading text-brand-navy text-xl font-semibold dark:text-white"
          >
            El cigarrillo sigue muy por delante del vapeo
          </h3>
        </CardHeader>
        <CardContent className="relative">
          <data
            value={ratio.toFixed(1)}
            className="font-heading text-brand-navy block text-7xl font-semibold tracking-tight tabular-nums dark:text-white"
          >
            {ratio.toFixed(1).replace(".", ",")}×
          </data>
          <p className="text-brand-navy/80 mt-3 text-sm leading-relaxed dark:text-white/80">
            Por cada persona que ha probado un cigarrillo electrónico, unas {Math.round(ratio)} han
            fumado tabaco alguna vez en su vida.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

type AnswerRow = { count: number } & Record<string, number>;

export function ConsumptionSection({ refreshKey }: { refreshKey: number }) {
  const { data, loading, error } = useApi<
    [{ items: AnswerRow[] }, { items: AnswerRow[] }, { items: CatalogItem[] }]
  >(["/stats/tobacco-use-by-answer", "/stats/vape-use-by-answer", "/catalogs/answers"], refreshKey);

  let model: ConsumptionModel | undefined;
  if (data) {
    const [tobacco, vape, answers] = data;
    const labels = labelMap(answers.items);
    const tobaccoTotal = tobacco.items.reduce((sum, i) => sum + i.count, 0);
    const vapeTotal = vape.items.reduce((sum, i) => sum + i.count, 0);
    const count = (items: AnswerRow[], field: string, id: number) =>
      items.find((i) => i[field] === id)?.count ?? 0;
    model = {
      total: tobaccoTotal,
      smoked: count(tobacco.items, "everSmokedId", 1),
      vaped: count(vape.items, "everVapedId", 1),
      rows: answers.items
        .map((a) => ({
          answer: labels.get(a.id) ?? String(a.code),
          tabaco: percent(count(tobacco.items, "everSmokedId", a.id), tobaccoTotal),
          vapeo: percent(count(vape.items, "everVapedId", a.id), vapeTotal),
        }))
        .filter((row) => row.tabaco > 0 || row.vapeo > 0),
    };
  }

  return (
    <section id="consumo" aria-labelledby="titulo-consumo" className="scroll-mt-20">
      <SectionHeading
        id="titulo-consumo"
        eyebrow="Consumo"
        title="Tabaco frente a vapeo"
        description="Comparación entre quienes alguna vez fumaron cigarrillos y quienes alguna vez usaron cigarrillos electrónicos o vaporizadores."
      />
      {error ? (
        <ErrorNotice message={error} />
      ) : (
        <DataSkeleton
          name="consumption"
          loading={loading}
          fixture={<ConsumptionView model={consumptionFixture} />}
          fallbackClassName="h-96"
        >
          {model && <ConsumptionView model={model} />}
        </DataSkeleton>
      )}
    </section>
  );
}
