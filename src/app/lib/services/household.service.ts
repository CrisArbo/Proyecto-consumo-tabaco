import { householdRepository } from "@/app/lib/repositories/household.repository";

export const householdService = {
  list: (limit: number, offset: number) => householdRepository.findAll(limit, offset),
  get: (id: number) => householdRepository.findOne(id),
  remove: (id: number) => householdRepository.delete(id),
};
