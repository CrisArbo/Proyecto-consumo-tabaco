import type { Scalars } from "@prisma/orm-postgres/family-contract/types";
import type { Models } from "@/prisma/contract.d";
import { db } from "@/prisma/db";

type Household = Scalars<Models.public_Household>;

export const householdRepository = {
  async findAll(limit: number, offset: number): Promise<Household[]> {
    return db.orm.public.Household.orderBy((h) => h.id.asc())
      .limit(limit)
      .offset(offset)
      .all();
  },

  async count(): Promise<number> {
    const { count } = await db.orm.public.Household.aggregate((a) => ({ count: a.count() }));
    return count;
  },

  async findOne(id: number): Promise<Household | null> {
    return db.orm.public.Household.first({ id });
  },

  async create(): Promise<Household> {
    return db.orm.public.Household.create({});
  },

  async delete(id: number): Promise<void> {
    await db.orm.public.Household.where({ id }).delete();
  },
};
