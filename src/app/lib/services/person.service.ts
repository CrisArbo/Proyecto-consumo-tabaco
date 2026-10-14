import { personRepository } from "@/app/lib/repositories/person.repository";

export const personService = {
  list: (limit: number, offset: number) => personRepository.findAll(limit, offset),
  count: () => personRepository.count(),
  get: (id: number) => personRepository.findOne(id),
  listByHousehold: (householdId: number) => personRepository.findByHousehold(householdId),
  update: (id: number, data: Parameters<typeof personRepository.update>[1]) =>
    personRepository.update(id, data),
  remove: (id: number) => personRepository.delete(id),
};
