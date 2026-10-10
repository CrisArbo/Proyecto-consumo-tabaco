import { vapeUseRepository } from "@/app/lib/repositories/vape-use.repository";

export const vapeUseService = {
  list: (limit: number, offset: number) => vapeUseRepository.findAll(limit, offset),
  get: (id: number) => vapeUseRepository.findOne(id),
  getByRespondent: (respondentId: number) => vapeUseRepository.findByRespondent(respondentId),
  update: (id: number, data: Parameters<typeof vapeUseRepository.update>[1]) =>
    vapeUseRepository.update(id, data),
  remove: (id: number) => vapeUseRepository.delete(id),
};
