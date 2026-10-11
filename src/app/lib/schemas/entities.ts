import { z } from "zod";

const nonEmpty = <T extends z.ZodObject>(schema: T) =>
  schema.strict().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const personUpdateSchema = nonEmpty(
  z.object({
    personOrder: z.number().int().min(1).optional(),
    surveySequence: z.number().int().min(1).optional(),
    pSequence: z.number().int().min(1).optional(),
    genderId: z.number().int().positive().optional(),
    age: z.number().int().min(0).max(120).optional(),
  }),
);

export const respondentUpdateSchema = nonEmpty(
  z.object({
    mainActivityId: z.number().int().positive().optional(),
    healthStatusId: z.number().int().positive().optional(),
    smokingRiskId: z.number().int().positive().optional(),
    educationLevelId: z.number().int().positive().optional(),
  }),
);

export const tobaccoUseUpdateSchema = nonEmpty(
  z.object({
    everSmokedId: z.number().int().positive().optional(),
    ageFirstUse: z.number().int().min(0).max(120).nullable().optional(),
    firstUseTimingId: z.number().int().positive().nullable().optional(),
    smokedLast12mId: z.number().int().positive().nullable().optional(),
    smokedLast30dId: z.number().int().positive().nullable().optional(),
  }),
);

export const vapeUseUpdateSchema = nonEmpty(
  z.object({
    everVapedId: z.number().int().positive().optional(),
    ageFirstUse: z.number().int().min(0).max(120).nullable().optional(),
    vapedLast30dId: z.number().int().positive().nullable().optional(),
  }),
);

export const personCreateSchema = z.object({
  personOrder: z.number().int().min(1),
  surveySequence: z.number().int().min(1),
  pSequence: z.number().int().min(1),
  genderId: z.number().int().positive(),
  age: z.number().int().min(0).max(120),
});

export const respondentCreateSchema = z.object({
  mainActivityId: z.number().int().positive(),
  healthStatusId: z.number().int().positive(),
  smokingRiskId: z.number().int().positive(),
  educationLevelId: z.number().int().positive(),
});

export const tobaccoUseCreateSchema = z.object({
  everSmokedId: z.number().int().positive(),
  ageFirstUse: z.number().int().min(0).max(120).nullable().optional(),
  firstUseTimingId: z.number().int().positive().nullable().optional(),
  smokedLast12mId: z.number().int().positive().nullable().optional(),
  smokedLast30dId: z.number().int().positive().nullable().optional(),
});

export const vapeUseCreateSchema = z.object({
  everVapedId: z.number().int().positive(),
  ageFirstUse: z.number().int().min(0).max(120).nullable().optional(),
  vapedLast30dId: z.number().int().positive().nullable().optional(),
});

export const surveyResponseInputSchema = z.object({
  person: personCreateSchema,
  respondent: respondentCreateSchema,
  tobaccoUse: tobaccoUseCreateSchema,
  vapeUse: vapeUseCreateSchema,
});
