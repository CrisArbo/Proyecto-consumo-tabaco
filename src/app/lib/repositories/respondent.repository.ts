import type { CreateInput } from "@prisma/orm-postgres/orm-client";
import type { Scalars } from "@prisma/orm-postgres/family-contract/types";
import type { Contract, Models } from "@/prisma/contract.d";
import { db } from "@/prisma/db";

type Respondent = Scalars<Models.public_Respondent>;
type RespondentUpdateInput = Partial<Omit<Respondent, "id">>;

export const respondentRepository = {
  async findAll(limit: number, offset: number): Promise<Respondent[]> {
    return db.orm.public.Respondent.orderBy((r) => r.id.asc())
      .limit(limit)
      .offset(offset)
      .all();
  },

  async count(): Promise<number> {
    const { count } = await db.orm.public.Respondent.aggregate((a) => ({ count: a.count() }));
    return count;
  },

  findOne(id: number) {
    return db.orm.public.Respondent.where({ id })
      .include("person")
      .include("mainActivity")
      .include("healthStatus")
      .include("smokingRisk")
      .include("educationLevel")
      .include("tobaccoUse")
      .include("vapeUse")
      .first();
  },

  async findByPerson(personId: number): Promise<Respondent | null> {
    return db.orm.public.Respondent.where({ personId }).first();
  },

  async create(data: CreateInput<Contract, "Respondent">): Promise<Respondent> {
    return db.orm.public.Respondent.create(data);
  },

  async update(id: number, data: RespondentUpdateInput): Promise<Respondent | null> {
    return db.orm.public.Respondent.where({ id }).update(data);
  },

  async delete(id: number): Promise<void> {
    await db.orm.public.Respondent.where({ id }).delete();
  },
};
