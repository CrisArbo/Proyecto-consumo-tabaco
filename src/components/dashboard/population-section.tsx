"use client";

import { Bar, BarChart, Cell, Label, LabelList, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DataSkeleton } from "@/components/data-skeleton";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { ErrorNotice } from "@/components/dashboard/kpi-section";
import { populationFixture } from "@/components/dashboard/fixtures";
import { labelMap, numberFormat, percent, useApi, type CatalogItem } from "@/lib/api";

export type PopulationModel = {
  genders: { key: string; label: string; count: number }[];
  activities: { label: string; count: number }[];
};

const genderColors = ["var(--chart-2)", "var(--chart-1)", "var(--chart-3)"];

const activityConfig = {
  count: { label: "Personas", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function PopulationView({ model }: { model: PopulationModel }) {
  const total = model.genders.reduce((sum, g) => sum + g.count, 0);
  const genderConfig = Object.fromEntries(
    model.genders.map((g, i) => [
      g.key,
      { label: g.label, color: genderColors[i % genderColors.length] },
    ]),
  ) satisfies ChartConfig;
  const genderData = model.genders.map((g) => ({ ...g, fill: `var(--color-${g.key})` }));

  return (
    <div className="grid gap-4 xl:grid-cols-5">
      <Card as="figure" className="ring-foreground/[0.07] rounded-2xl xl:col-span-2">
        <CardHeader>
          <CardTitle>
            <h3>Distribución por género</h3>
          </CardTitle>
          <CardDescription>Personas registradas en los hogares</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <ChartContainer config={genderConfig} className="aspect-square h-60">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="key" hideLabel />} />
              <Pie
                data={genderData}
                dataKey="count"
                nameKey="key"
                innerRadius={68}
                outerRadius={100}
                strokeWidth={4}
                paddingAngle={2}
                cornerRadius={8}
              >
                {genderData.map((g) => (
                  <Cell key={g.key} fill={g.fill} />
                ))}
                <Label
                  content={({ viewBox }) =>
                    viewBox && "cx" in viewBox ? (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground font-heading text-2xl font-semibold"
                        >
                          {numberFormat.format(total)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 22}
                          className="fill-muted-foreground text-xs"
                        >
                          personas
                        </tspan>
                      </text>
                    ) : null
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <dl className="grid w-full grid-cols-2 gap-3">
            {genderData.map((g) => (
              <div key={g.key} className="bg-muted/60 rounded-xl p-3">
                <dt className="text-muted-foreground flex items-center gap-2 text-xs">
                  <span
                    aria-hidden
                    className="size-2.5 rounded-full"
                    style={{ background: g.fill }}
                  />
                  {g.label}
                </dt>
                <dd className="font-heading text-brand-navy mt-1 text-xl font-semibold tabular-nums dark:text-white">
                  {percent(g.count, total).toFixed(1)}%
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Card as="figure" className="ring-foreground/[0.07] rounded-2xl xl:col-span-3">
        <CardHeader>
          <CardTitle>
            <h3>Actividad principal</h3>
          </CardTitle>
          <CardDescription>
            A qué se dedicaron las personas encuestadas la última semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={activityConfig} className="aspect-auto h-[22rem] w-full">
            <BarChart data={model.activities} layout="vertical" margin={{ left: 8, right: 56 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="label"
                width={170}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(v: string) => (v.length > 24 ? `${v.slice(0, 22)}…` : v)}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)", radius: 8 }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="count" radius={8} barSize={22}>
                {model.activities.map((a, i) => (
                  <Cell
                    key={a.label}
                    fill={i === 0 ? "var(--chart-1)" : i < 3 ? "var(--chart-3)" : "var(--chart-5)"}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  position="right"
                  formatter={(v) => numberFormat.format(Number(v))}
                  className="fill-foreground text-xs font-medium"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

type GroupRow = { count: number } & Record<string, number>;

export function PopulationSection({ refreshKey }: { refreshKey: number }) {
  const { data, loading, error } = useApi<
    [
      { items: GroupRow[] },
      { items: GroupRow[] },
      { items: CatalogItem[] },
      { items: CatalogItem[] },
    ]
  >(
    [
      "/stats/persons-by-gender",
      "/stats/respondents-by-activity",
      "/catalogs/genders",
      "/catalogs/activities",
    ],
    refreshKey,
  );

  let model: PopulationModel | undefined;
  if (data) {
    const [byGender, byActivity, genders, activities] = data;
    const genderLabels = labelMap(genders.items);
    const activityLabels = labelMap(activities.items);
    model = {
      genders: byGender.items
        .toSorted((a, b) => a.genderId - b.genderId)
        .map((g) => ({
          key: `g${g.genderId}`,
          label: genderLabels.get(g.genderId) ?? "Sin dato",
          count: g.count,
        })),
      activities: byActivity.items
        .map((a) => ({ label: activityLabels.get(a.mainActivityId) ?? "Sin dato", count: a.count }))
        .toSorted((a, b) => b.count - a.count),
    };
  }

  return (
    <section id="poblacion" aria-labelledby="titulo-poblacion" className="scroll-mt-20">
      <SectionHeading
        id="titulo-poblacion"
        eyebrow="Población"
        title="¿Quiénes respondieron?"
        description="Perfil demográfico y ocupacional de las personas que participaron en la encuesta."
      />
      {error ? (
        <ErrorNotice message={error} />
      ) : (
        <DataSkeleton
          name="population"
          loading={loading}
          fixture={<PopulationView model={populationFixture} />}
          fallbackClassName="h-[30rem]"
        >
          {model && <PopulationView model={model} />}
        </DataSkeleton>
      )}
    </section>
  );
}
