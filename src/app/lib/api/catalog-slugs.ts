import { catalogService } from "@/app/lib/services/catalog.service";

export const catalogSlugs = {
  genders: catalogService.listGenders,
  answers: catalogService.listAnswers,
  activities: catalogService.listActivities,
  "health-statuses": catalogService.listHealthStatuses,
  risks: catalogService.listRisks,
  "education-levels": catalogService.listEducationLevels,
  "first-use-timings": catalogService.listFirstUseTimings,
} as const;

export type CatalogSlug = keyof typeof catalogSlugs;
