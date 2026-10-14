"use client";

import { useState } from "react";
import { KpiSection } from "@/components/dashboard/kpi-section";
import { ConsumptionSection } from "@/components/dashboard/consumption-section";
import { PopulationSection } from "@/components/dashboard/population-section";
import { RespondentsSection } from "@/components/dashboard/respondents-section";

export function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex flex-col gap-14 px-4 py-12 sm:px-6 lg:px-10">
      <KpiSection refreshKey={refreshKey} onRefresh={() => setRefreshKey((k) => k + 1)} />
      <ConsumptionSection refreshKey={refreshKey} />
      <PopulationSection refreshKey={refreshKey} />
      <RespondentsSection refreshKey={refreshKey} />
    </div>
  );
}
