import type { CreateInput } from "@prisma/orm-postgres/orm-client";
import type { Contract } from "@/prisma/contract.d";
import { db } from "@/prisma/db";

type PersonInput = Omit<CreateInput<Contract, "Person">, "householdId">;
type RespondentInput = Omit<CreateInput<Contract, "Respondent">, "personId">;
type TobaccoUseInput = Omit<CreateInput<Contract, "TobaccoUse">, "respondentId">;
type VapeUseInput = Omit<CreateInput<Contract, "VapeUse">, "respondentId">;

export type SurveyResponseInput = {
  person: PersonInput;
  respondent: RespondentInput;
  tobaccoUse: TobaccoUseInput;
  vapeUse: VapeUseInput;
};

type OrmClient = Pick<typeof db, "orm">;

async function importOne(input: SurveyResponseInput, client: OrmClient) {
  const household = await client.orm.public.Household.create({});

  const person = await client.orm.public.Person.create({
    householdId: household.id,
    ...input.person,
  });

  const respondent = await client.orm.public.Respondent.create({
    personId: person.id,
    ...input.respondent,
  });

  const tobaccoUse = await client.orm.public.TobaccoUse.create({
    respondentId: respondent.id,
    ...input.tobaccoUse,
  });

  const vapeUse = await client.orm.public.VapeUse.create({
    respondentId: respondent.id,
    ...input.vapeUse,
  });

  return { household, person, respondent, tobaccoUse, vapeUse };
}

export const surveyImportService = {
  importOne: (input: SurveyResponseInput) => importOne(input, db),

  importMany: (inputs: SurveyResponseInput[]) =>
    db.transaction(async (tx) => {
      const results = [];
      for (const input of inputs) {
        results.push(await importOne(input, tx));
      }
      return results;
    }),
};
