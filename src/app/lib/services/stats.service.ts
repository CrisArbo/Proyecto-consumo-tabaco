import { statsRepository } from "@/app/lib/repositories/stats.repository";

export const statsService = {
  personsByGender: () => statsRepository.countPersonsByGender(),
  respondentsByActivity: () => statsRepository.countRespondentsByActivity(),
  tobaccoUseByAnswer: () => statsRepository.countTobaccoUseByAnswer(),
  vapeUseByAnswer: () => statsRepository.countVapeUseByAnswer(),
};
