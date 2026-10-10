import { tobaccoUseRepository } from "@/app/lib/repositories/tobacco-use.repository";

export const tobaccoUseService = {
  list: (limit: number, offset: number) => tobaccoUseRepository.findAll(limit, offset),
  get: (id: number) => tobaccoUseRepository.findOne(id),
  getByRespondent: (respondentId: number) => tobaccoUseRepository.findByRespondent(respondentId),
  update: (id: number, data: Parameters<typeof tobaccoUseRepository.update>[1]) =>
    tobaccoUseRepository.update(id, data),
  remove: (id: number) => tobaccoUseRepository.delete(id),
};
