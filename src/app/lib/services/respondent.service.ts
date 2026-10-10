import { respondentRepository } from "@/app/lib/repositories/respondent.repository";

export const respondentService = {
  list: (limit: number, offset: number) => respondentRepository.findAll(limit, offset),
  get: (id: number) => respondentRepository.findOne(id),
  getByPerson: (personId: number) => respondentRepository.findByPerson(personId),
  update: (id: number, data: Parameters<typeof respondentRepository.update>[1]) =>
    respondentRepository.update(id, data),
  remove: (id: number) => respondentRepository.delete(id),
};
