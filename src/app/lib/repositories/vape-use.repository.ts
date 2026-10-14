import type { CreateInput } from "@prisma/orm-postgres/orm-client";
import type { Scalars } from "@prisma/orm-postgres/family-contract/types";
import type { Contract, Models } from "@/prisma/contract.d";
import { db } from "@/prisma/db";

type VapeUse = Scalars<Models.public_VapeUse>;
type VapeUseUpdateInput = Partial<Omit<VapeUse, "id">>;

export const vapeUseRepository = {
  async findAll(limit: number, offset: number): Promise<VapeUse[]> {
    return db.orm.public.VapeUse.orderBy((v) => v.id.asc())
      .limit(limit)
      .offset(offset)
      .all();
  },

  async count(): Promise<number> {
    const { count } = await db.orm.public.VapeUse.aggregate((a) => ({ count: a.count() }));
    return count;
  },

  async findOne(id: number): Promise<VapeUse | null> {
    return db.orm.public.VapeUse.first({ id });
  },

  async findByRespondent(respondentId: number): Promise<VapeUse | null> {
    return db.orm.public.VapeUse.where({ respondentId }).first();
  },

  async create(data: CreateInput<Contract, "VapeUse">): Promise<VapeUse> {
    return db.orm.public.VapeUse.create(data);
  },

  async update(id: number, data: VapeUseUpdateInput): Promise<VapeUse | null> {
    return db.orm.public.VapeUse.where({ id }).update(data);
  },

  async delete(id: number): Promise<void> {
    await db.orm.public.VapeUse.where({ id }).delete();
  },
};
