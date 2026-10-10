import type { CodecField } from "@prisma/orm-postgres/orm-client";
import type { Contract } from "@/prisma/contract.d";
import { db } from "@/prisma/db";

type CodeField = CodecField<Contract, "pg/int2@1">;
const byCode = (code: number) => (row: { code: CodeField }) => row.code.eq(code);

export const catGenderRepository = {
  findAll: () => db.orm.public.CatGender.all(),
  findByCode: (code: number) => db.orm.public.CatGender.where(byCode(code)).first(),
};

export const catAnswerRepository = {
  findAll: () => db.orm.public.CatAnswer.all(),
  findByCode: (code: number) => db.orm.public.CatAnswer.where(byCode(code)).first(),
};

export const catActivityRepository = {
  findAll: () => db.orm.public.CatActivity.all(),
  findByCode: (code: number) => db.orm.public.CatActivity.where(byCode(code)).first(),
};

export const catHealthStatusRepository = {
  findAll: () => db.orm.public.CatHealthStatus.all(),
  findByCode: (code: number) => db.orm.public.CatHealthStatus.where(byCode(code)).first(),
};

export const catRiskRepository = {
  findAll: () => db.orm.public.CatRisk.all(),
  findByCode: (code: number) => db.orm.public.CatRisk.where(byCode(code)).first(),
};

export const catEducationLevelRepository = {
  findAll: () => db.orm.public.CatEducationLevel.all(),
  findByCode: (code: number) => db.orm.public.CatEducationLevel.where(byCode(code)).first(),
};

export const catFirstUseTimingRepository = {
  findAll: () => db.orm.public.CatFirstUseTiming.all(),
  findByCode: (code: number) => db.orm.public.CatFirstUseTiming.where(byCode(code)).first(),
};
