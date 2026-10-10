import type { CreateInput } from "@prisma/orm-postgres/orm-client";
import type { Scalars } from "@prisma/orm-postgres/family-contract/types";
import type { Contract, Models } from "@/prisma/contract.d";
import { db } from "@/prisma/db";

type Person = Scalars<Models.public_Person>;
type PersonUpdateInput = Partial<Omit<Person, "id">>;

export const personRepository = {
  async findAll(limit: number, offset: number): Promise<Person[]> {
    return db.orm.public.Person.orderBy((p) => p.id.asc())
      .limit(limit)
      .offset(offset)
      .all();
  },

  async findOne(id: number): Promise<Person | null> {
    return db.orm.public.Person.first({ id });
  },

  async findByHousehold(householdId: number): Promise<Person[]> {
    return db.orm.public.Person.where({ householdId }).all();
  },

  async create(data: CreateInput<Contract, "Person">): Promise<Person> {
    return db.orm.public.Person.create(data);
  },

  async update(id: number, data: PersonUpdateInput): Promise<Person | null> {
    return db.orm.public.Person.where({ id }).update(data);
  },

  async delete(id: number): Promise<void> {
    await db.orm.public.Person.where({ id }).delete();
  },
};
