"use client";

import { useEffect, useState } from "react";

const API_BASE = "/api/v1";

const MIN_LOADING_MS = 650;

export type CatalogItem = { id: number; code: number; label: string };

export type Paginated<T> = { items: T[]; limit: number; offset: number; total: number };

export type Respondent = {
  id: number;
  personId: number;
  mainActivityId: number;
  healthStatusId: number;
  smokingRiskId: number;
  educationLevelId: number;
};

type Envelope<T> = { data: T } | { error: string };

async function getJson<T>(path: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { signal });
  const body = (await res.json()) as Envelope<T>;
  if ("error" in body) throw new Error(body.error);
  return body.data;
}

type ApiState<T> = { key: string; data?: T; error?: string };

export function useApi<T extends unknown[]>(paths: string[], refreshKey = 0) {
  const key = `${refreshKey}:${paths.join("|")}`;
  const [state, setState] = useState<ApiState<T>>({ key: "" });

  useEffect(() => {
    const controller = new AbortController();
    const requested = key.slice(key.indexOf(":") + 1).split("|");
    const delay = new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS));

    Promise.all([Promise.all(requested.map((p) => getJson(p, controller.signal))), delay])
      .then(([data]) => setState({ key, data: data as T }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setState({ key, error: err instanceof Error ? err.message : "Error desconocido" });
      });

    return () => controller.abort();
  }, [key]);

  const current = state.key === key;
  return {
    data: current ? state.data : undefined,
    error: current ? state.error : undefined,
    loading: !current,
  };
}

export function labelMap(items: CatalogItem[]) {
  return new Map(items.map((item) => [item.id, item.label]));
}

export const numberFormat = new Intl.NumberFormat("es-CO");

export function percent(part: number, total: number) {
  return total === 0 ? 0 : (part / total) * 100;
}
