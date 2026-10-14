"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataSkeleton } from "@/components/data-skeleton";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { ErrorNotice } from "@/components/dashboard/kpi-section";
import { respondentsFixture } from "@/components/dashboard/fixtures";
import {
  labelMap,
  numberFormat,
  useApi,
  type CatalogItem,
  type Paginated,
  type Respondent,
} from "@/lib/api";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

export type RespondentRow = {
  id: number;
  activity: string;
  health: string;
  risk: string;
  riskCode: number;
  education: string;
};

const riskStyles: Record<number, string> = {
  1: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300",
  2: "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-300",
  3: "bg-brand-peach-soft text-[#9a4f33] ring-brand-peach dark:bg-brand-peach/15 dark:text-brand-peach",
  4: "bg-brand-navy text-white ring-brand-navy",
  5: "bg-muted text-muted-foreground ring-border",
};

export function RespondentsTable({ rows }: { rows: RespondentRow[] }) {
  return (
    <Table>
      <TableCaption className="sr-only">
        Encuestados con su actividad, salud, percepción de riesgo y educación
      </TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead scope="col" className="pl-5">
            <span className="inline-flex">ID</span>
          </TableHead>
          <TableHead scope="col">
            <span className="inline-flex">Actividad principal</span>
          </TableHead>
          <TableHead scope="col">
            <span className="inline-flex">Estado de salud</span>
          </TableHead>
          <TableHead scope="col">
            <span className="inline-flex">Riesgo percibido de fumar</span>
          </TableHead>
          <TableHead scope="col" className="pr-5">
            <span className="inline-flex">Nivel educativo</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} className="h-14">
            <TableCell className="text-muted-foreground pl-5 font-mono text-xs">
              <span className="inline-flex">#{String(row.id).padStart(5, "0")}</span>
            </TableCell>
            <TableCell className="font-medium">
              <span className="inline-flex">{row.activity}</span>
            </TableCell>
            <TableCell>
              <span className="inline-flex">{row.health}</span>
            </TableCell>
            <TableCell>
              <Badge
                className={cn("rounded-full ring-1", riskStyles[row.riskCode] ?? riskStyles[5])}
              >
                {row.risk}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground pr-5">
              <span className="inline-flex">{row.education}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function pageWindow(page: number, pages: number): (number | "…")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const around = [page - 1, page, page + 1].filter((p) => p > 1 && p < pages);
  const result: (number | "…")[] = [1];
  if (around[0] > 2) result.push("…");
  result.push(...around);
  if (around[around.length - 1] < pages - 1) result.push("…");
  result.push(pages);
  return result;
}

export function RespondentsSection({ refreshKey }: { refreshKey: number }) {
  const [page, setPage] = useState(1);
  const catalogs = useApi<
    [
      { items: CatalogItem[] },
      { items: CatalogItem[] },
      { items: CatalogItem[] },
      { items: CatalogItem[] },
    ]
  >(
    [
      "/catalogs/activities",
      "/catalogs/health-statuses",
      "/catalogs/risks",
      "/catalogs/education-levels",
    ],
    refreshKey,
  );
  const list = useApi<[Paginated<Respondent>]>(
    [`/respondents?limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`],
    refreshKey,
  );

  const loading = catalogs.loading || list.loading;
  const error = catalogs.error ?? list.error;
  const total = list.data?.[0].total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  let rows: RespondentRow[] | undefined;
  if (catalogs.data && list.data) {
    const [activities, health, risks, education] = catalogs.data.map((c) => labelMap(c.items));
    const riskCodes = new Map(catalogs.data[2].items.map((r) => [r.id, r.code]));
    rows = list.data[0].items.map((r) => ({
      id: r.id,
      activity: activities.get(r.mainActivityId) ?? "Sin dato",
      health: health.get(r.healthStatusId) ?? "Sin dato",
      risk: risks.get(r.smokingRiskId) ?? "Sin dato",
      riskCode: riskCodes.get(r.smokingRiskId) ?? 5,
      education: education.get(r.educationLevelId) ?? "Sin dato",
    }));
  }

  const goTo = (target: number) => (event: React.MouseEvent) => {
    if (target < 1 || target > pages || target === page) {
      event.preventDefault();
      return;
    }
    setPage(target);
  };

  return (
    <section id="encuestados" aria-labelledby="titulo-encuestados" className="scroll-mt-20">
      <SectionHeading
        id="titulo-encuestados"
        eyebrow="Encuestados"
        title="Explora las respuestas"
        description="Muestra paginada de las personas que respondieron el cuestionario individual."
        action={
          total > 0 && (
            <Badge variant="secondary" className="h-7 rounded-full px-3">
              {numberFormat.format(total)} registros
            </Badge>
          )
        }
      />
      {error ? (
        <ErrorNotice message={error} />
      ) : (
        <Card className="ring-foreground/[0.07] gap-0 rounded-2xl py-0">
          <DataSkeleton
            name="respondents-table"
            loading={loading}
            fixture={<RespondentsTable rows={respondentsFixture} />}
            fallbackClassName="h-[30rem]"
            snapshotConfig={{ leafTags: ["span"] }}
          >
            {rows && <RespondentsTable rows={rows} />}
          </DataSkeleton>
          <footer className="flex flex-col items-center justify-between gap-3 border-t px-5 py-4 sm:flex-row">
            <p className="text-muted-foreground text-sm" aria-live="polite">
              Página <strong className="text-foreground">{numberFormat.format(page)}</strong> de{" "}
              {numberFormat.format(pages)}
            </p>
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#encuestados"
                    onClick={goTo(page - 1)}
                    aria-disabled={page === 1}
                    className={cn(page === 1 && "pointer-events-none opacity-40")}
                  />
                </PaginationItem>
                {pageWindow(page, pages).map((p, i) =>
                  p === "…" ? (
                    <PaginationItem key={`gap-${i}`} className="hidden sm:block">
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p} className={cn(p !== page && "hidden sm:block")}>
                      <PaginationLink
                        href="#encuestados"
                        isActive={p === page}
                        onClick={goTo(p)}
                        className={cn(
                          "min-w-8 px-2 tabular-nums",
                          p === page &&
                            "border-brand-navy bg-brand-navy hover:bg-brand-navy/90 text-white hover:text-white",
                        )}
                      >
                        {numberFormat.format(p)}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#encuestados"
                    onClick={goTo(page + 1)}
                    aria-disabled={page === pages}
                    className={cn(page === pages && "pointer-events-none opacity-40")}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </footer>
        </Card>
      )}
    </section>
  );
}
