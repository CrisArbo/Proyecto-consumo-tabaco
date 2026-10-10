import {
  catAnswerRepository,
  catActivityRepository,
  catEducationLevelRepository,
  catFirstUseTimingRepository,
  catGenderRepository,
  catHealthStatusRepository,
  catRiskRepository,
} from "@/app/lib/repositories/catalog.repository";

export const catalogService = {
  listGenders: () => catGenderRepository.findAll(),
  listAnswers: () => catAnswerRepository.findAll(),
  listActivities: () => catActivityRepository.findAll(),
  listHealthStatuses: () => catHealthStatusRepository.findAll(),
  listRisks: () => catRiskRepository.findAll(),
  listEducationLevels: () => catEducationLevelRepository.findAll(),
  listFirstUseTimings: () => catFirstUseTimingRepository.findAll(),
};
