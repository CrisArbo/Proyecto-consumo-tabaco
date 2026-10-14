import type { CreateInput } from "@prisma/orm-postgres/orm-client";
import type { Scalars } from "@prisma/orm-postgres/family-contract/types";
import type { Contract, Models } from "@/prisma/contract.d";
import { db } from "@/prisma/db";

type TobaccoUse = Scalars<Models.public_TobaccoUse>;
type TobaccoUseUpdateInput = Partial<Omit<TobaccoUse, "id">>;

export const tobaccoUseRepository = {
  async findAll(limit: number, offset: number): Promise<TobaccoUse[]> {
    return db.orm.public.TobaccoUse.orderBy((t) => t.id.asc())
      .limit(limit)
      .offset(offset)
      .all();
  },

  async count(): Promise<number> {
    const { count } = await db.orm.public.TobaccoUse.aggregate((a) => ({ count: a.count() }));
    return count;
  },

  async findOne(id: number): Promise<TobaccoUse | null> {
    return db.orm.public.TobaccoUse.first({ id });
  },

  async findByRespondent(respondentId: number): Promise<TobaccoUse | null> {
    return db.orm.public.TobaccoUse.where({ respondentId }).first();
  },

  async create(data: CreateInput<Contract, "TobaccoUse">): Promise<TobaccoUse> {
    return db.orm.public.TobaccoUse.create(data);
  },

  async update(id: number, data: TobaccoUseUpdateInput): Promise<TobaccoUse | null> {
    return db.orm.public.TobaccoUse.where({ id }).update(data);
  },

  async delete(id: number): Promise<void> {
    await db.orm.public.TobaccoUse.where({ id }).delete();
  },
};
