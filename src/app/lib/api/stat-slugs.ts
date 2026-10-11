import { statsService } from "@/app/lib/services/stats.service";

export const statSlugs = {
  "persons-by-gender": statsService.personsByGender,
  "respondents-by-activity": statsService.respondentsByActivity,
  "tobacco-use-by-answer": statsService.tobaccoUseByAnswer,
  "vape-use-by-answer": statsService.vapeUseByAnswer,
} as const;

export type StatSlug = keyof typeof statSlugs;
