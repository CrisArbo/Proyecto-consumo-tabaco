import { z } from "zod";
import {
  personUpdateSchema,
  respondentUpdateSchema,
  surveyResponseInputSchema,
  tobaccoUseUpdateSchema,
  vapeUseUpdateSchema,
} from "@/app/lib/schemas/entities";
import { catalogSlugs } from "@/app/lib/api/catalog-slugs";
import { statSlugs } from "@/app/lib/api/stat-slugs";

const js = (schema: z.ZodType) => z.toJSONSchema(schema, { target: "openapi-3.0" });

const household = {
  type: "object",
  properties: { id: { type: "integer" } },
  required: ["id"],
};

const person = {
  type: "object",
  properties: {
    id: { type: "integer" },
    householdId: { type: "integer" },
    personOrder: { type: "integer" },
    surveySequence: { type: "integer" },
    pSequence: { type: "integer" },
    genderId: { type: "integer" },
    age: { type: "integer" },
  },
  required: ["id", "householdId", "personOrder", "surveySequence", "pSequence", "genderId", "age"],
};

const respondent = {
  type: "object",
  properties: {
    id: { type: "integer" },
    personId: { type: "integer" },
    mainActivityId: { type: "integer" },
    healthStatusId: { type: "integer" },
    smokingRiskId: { type: "integer" },
    educationLevelId: { type: "integer" },
  },
  required: [
    "id",
    "personId",
    "mainActivityId",
    "healthStatusId",
    "smokingRiskId",
    "educationLevelId",
  ],
};

const tobaccoUse = {
  type: "object",
  properties: {
    id: { type: "integer" },
    respondentId: { type: "integer" },
    everSmokedId: { type: "integer" },
    ageFirstUse: { type: "integer", nullable: true },
    firstUseTimingId: { type: "integer", nullable: true },
    smokedLast12mId: { type: "integer", nullable: true },
    smokedLast30dId: { type: "integer", nullable: true },
  },
  required: ["id", "respondentId", "everSmokedId"],
};

const vapeUse = {
  type: "object",
  properties: {
    id: { type: "integer" },
    respondentId: { type: "integer" },
    everVapedId: { type: "integer" },
    ageFirstUse: { type: "integer", nullable: true },
    vapedLast30dId: { type: "integer", nullable: true },
  },
  required: ["id", "respondentId", "everVapedId"],
};

const catalogItem = {
  type: "object",
  properties: {
    id: { type: "integer" },
    code: { type: "integer" },
    label: { type: "string" },
  },
  required: ["id", "code", "label"],
};

const respondentDetail = {
  allOf: [
    respondent,
    {
      type: "object",
      properties: {
        person,
        mainActivity: catalogItem,
        healthStatus: catalogItem,
        smokingRisk: catalogItem,
        educationLevel: catalogItem,
        tobaccoUse: { ...tobaccoUse, nullable: true },
        vapeUse: { ...vapeUse, nullable: true },
      },
    },
  ],
};

const statCount = {
  type: "object",
  description: "Group-by key field name varies per stat; `count` is always present.",
  properties: { count: { type: "integer" } },
  additionalProperties: { type: "integer" },
  required: ["count"],
};

const errorBody = {
  type: "object",
  properties: { error: { type: "string" } },
  required: ["error"],
};

function wrap(schema: object) {
  return { type: "object", properties: { data: schema }, required: ["data"] };
}

function list(itemSchema: object, extraProps: Record<string, object> = {}) {
  return wrap({
    type: "object",
    properties: {
      items: { type: "array", items: itemSchema },
      ...extraProps,
    },
    required: ["items"],
  });
}

const limitParam = {
  name: "limit",
  in: "query",
  schema: { type: "integer", minimum: 1, maximum: 100, default: 20 },
};
const offsetParam = {
  name: "offset",
  in: "query",
  schema: { type: "integer", minimum: 0, default: 0 },
};
const idParam = (name: string, description: string) => ({
  name,
  in: "path",
  required: true,
  description,
  schema: { type: "integer" },
});

const errorResponses = {
  "400": {
    description: "Validation error",
    content: { "application/json": { schema: errorBody } },
  },
  "404": { description: "Not found", content: { "application/json": { schema: errorBody } } },
};

const json = (schema: object) => ({ content: { "application/json": { schema } } });

const deleted = {
  description: "Deleted",
  ...json(wrap({ type: "object", properties: { deleted: { type: "boolean" } } })),
};

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Prevalencia API",
    version: "1.0.0",
    description:
      "Survey data on tobacco and e-cigarette consumption in Colombia (ENCSPA). Read endpoints serve the seeded survey data; survey-responses lets you record a new response.",
  },
  servers: [{ url: "/api/v1" }],
  tags: [
    { name: "Health", description: "Service status" },
    { name: "Households", description: "Household records" },
    { name: "Persons", description: "Household members" },
    { name: "Respondents", description: "Survey respondents and their demographics" },
    { name: "Tobacco Use", description: "Tobacco-use records" },
    { name: "Vape Use", description: "Vape-use records" },
    { name: "Catalogs", description: "Read-only reference/lookup tables" },
    { name: "Stats", description: "Group-by counts over the survey data" },
    { name: "Survey Responses", description: "Record a new full survey response" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: { "200": { description: "OK", ...json(wrap({ type: "string" })) } },
      },
    },
    "/households": {
      get: {
        tags: ["Households"],
        summary: "List households",
        parameters: [limitParam, offsetParam],
        responses: {
          "200": {
            description: "OK",
            ...json(
              list(household, {
                limit: { type: "integer" },
                offset: { type: "integer" },
                total: { type: "integer" },
              }),
            ),
          },
        },
      },
    },
    "/households/{id}": {
      get: {
        tags: ["Households"],
        summary: "Get a household",
        parameters: [idParam("id", "Household id")],
        responses: { "200": { description: "OK", ...json(wrap(household)) }, ...errorResponses },
      },
      delete: {
        tags: ["Households"],
        summary: "Delete a household",
        parameters: [idParam("id", "Household id")],
        responses: { "200": deleted, ...errorResponses },
      },
    },
    "/households/{id}/persons": {
      get: {
        tags: ["Households"],
        summary: "List persons in a household",
        parameters: [idParam("id", "Household id")],
        responses: { "200": { description: "OK", ...json(list(person)) }, ...errorResponses },
      },
    },
    "/persons": {
      get: {
        tags: ["Persons"],
        summary: "List persons",
        parameters: [limitParam, offsetParam],
        responses: {
          "200": {
            description: "OK",
            ...json(
              list(person, {
                limit: { type: "integer" },
                offset: { type: "integer" },
                total: { type: "integer" },
              }),
            ),
          },
        },
      },
    },
    "/persons/{id}": {
      get: {
        tags: ["Persons"],
        summary: "Get a person",
        parameters: [idParam("id", "Person id")],
        responses: { "200": { description: "OK", ...json(wrap(person)) }, ...errorResponses },
      },
      patch: {
        tags: ["Persons"],
        summary: "Update a person",
        parameters: [idParam("id", "Person id")],
        requestBody: { ...json(js(personUpdateSchema)) },
        responses: { "200": { description: "OK", ...json(wrap(person)) }, ...errorResponses },
      },
      delete: {
        tags: ["Persons"],
        summary: "Delete a person",
        parameters: [idParam("id", "Person id")],
        responses: { "200": deleted, ...errorResponses },
      },
    },
    "/persons/{id}/respondent": {
      get: {
        tags: ["Persons"],
        summary: "Get the respondent record for a person",
        parameters: [idParam("id", "Person id")],
        responses: { "200": { description: "OK", ...json(wrap(respondent)) }, ...errorResponses },
      },
    },
    "/respondents": {
      get: {
        tags: ["Respondents"],
        summary: "List respondents",
        parameters: [limitParam, offsetParam],
        responses: {
          "200": {
            description: "OK",
            ...json(
              list(respondent, {
                limit: { type: "integer" },
                offset: { type: "integer" },
                total: { type: "integer" },
              }),
            ),
          },
        },
      },
    },
    "/respondents/{id}": {
      get: {
        tags: ["Respondents"],
        summary: "Get a respondent (full aggregate: demographics, catalogs, tobacco/vape use)",
        parameters: [idParam("id", "Respondent id")],
        responses: {
          "200": { description: "OK", ...json(wrap(respondentDetail)) },
          ...errorResponses,
        },
      },
      patch: {
        tags: ["Respondents"],
        summary: "Update a respondent",
        parameters: [idParam("id", "Respondent id")],
        requestBody: { ...json(js(respondentUpdateSchema)) },
        responses: { "200": { description: "OK", ...json(wrap(respondent)) }, ...errorResponses },
      },
      delete: {
        tags: ["Respondents"],
        summary: "Delete a respondent",
        parameters: [idParam("id", "Respondent id")],
        responses: { "200": deleted, ...errorResponses },
      },
    },
    "/respondents/{id}/tobacco-use": {
      get: {
        tags: ["Respondents", "Tobacco Use"],
        summary: "Get the tobacco-use record for a respondent",
        parameters: [idParam("id", "Respondent id")],
        responses: { "200": { description: "OK", ...json(wrap(tobaccoUse)) }, ...errorResponses },
      },
    },
    "/respondents/{id}/vape-use": {
      get: {
        tags: ["Respondents", "Vape Use"],
        summary: "Get the vape-use record for a respondent",
        parameters: [idParam("id", "Respondent id")],
        responses: { "200": { description: "OK", ...json(wrap(vapeUse)) }, ...errorResponses },
      },
    },
    "/tobacco-uses": {
      get: {
        tags: ["Tobacco Use"],
        summary: "List tobacco-use records",
        parameters: [limitParam, offsetParam],
        responses: {
          "200": {
            description: "OK",
            ...json(
              list(tobaccoUse, {
                limit: { type: "integer" },
                offset: { type: "integer" },
                total: { type: "integer" },
              }),
            ),
          },
        },
      },
    },
    "/tobacco-uses/{id}": {
      get: {
        tags: ["Tobacco Use"],
        summary: "Get a tobacco-use record",
        parameters: [idParam("id", "TobaccoUse id")],
        responses: { "200": { description: "OK", ...json(wrap(tobaccoUse)) }, ...errorResponses },
      },
      patch: {
        tags: ["Tobacco Use"],
        summary: "Update a tobacco-use record",
        parameters: [idParam("id", "TobaccoUse id")],
        requestBody: { ...json(js(tobaccoUseUpdateSchema)) },
        responses: { "200": { description: "OK", ...json(wrap(tobaccoUse)) }, ...errorResponses },
      },
      delete: {
        tags: ["Tobacco Use"],
        summary: "Delete a tobacco-use record",
        parameters: [idParam("id", "TobaccoUse id")],
        responses: { "200": deleted, ...errorResponses },
      },
    },
    "/vape-uses": {
      get: {
        tags: ["Vape Use"],
        summary: "List vape-use records",
        parameters: [limitParam, offsetParam],
        responses: {
          "200": {
            description: "OK",
            ...json(
              list(vapeUse, {
                limit: { type: "integer" },
                offset: { type: "integer" },
                total: { type: "integer" },
              }),
            ),
          },
        },
      },
    },
    "/vape-uses/{id}": {
      get: {
        tags: ["Vape Use"],
        summary: "Get a vape-use record",
        parameters: [idParam("id", "VapeUse id")],
        responses: { "200": { description: "OK", ...json(wrap(vapeUse)) }, ...errorResponses },
      },
      patch: {
        tags: ["Vape Use"],
        summary: "Update a vape-use record",
        parameters: [idParam("id", "VapeUse id")],
        requestBody: { ...json(js(vapeUseUpdateSchema)) },
        responses: { "200": { description: "OK", ...json(wrap(vapeUse)) }, ...errorResponses },
      },
      delete: {
        tags: ["Vape Use"],
        summary: "Delete a vape-use record",
        parameters: [idParam("id", "VapeUse id")],
        responses: { "200": deleted, ...errorResponses },
      },
    },
    "/catalogs/{catalog}": {
      get: {
        tags: ["Catalogs"],
        summary: "List a catalog's entries",
        parameters: [
          {
            name: "catalog",
            in: "path",
            required: true,
            schema: { type: "string", enum: Object.keys(catalogSlugs) },
          },
        ],
        responses: {
          "200": { description: "OK", ...json(list(catalogItem)) },
          "404": errorResponses["404"],
        },
      },
    },
    "/stats/{stat}": {
      get: {
        tags: ["Stats"],
        summary: "Group-by counts for one of the known stats",
        parameters: [
          {
            name: "stat",
            in: "path",
            required: true,
            schema: { type: "string", enum: Object.keys(statSlugs) },
          },
        ],
        responses: {
          "200": { description: "OK", ...json(list(statCount)) },
          "404": errorResponses["404"],
        },
      },
    },
    "/survey-responses": {
      post: {
        tags: ["Survey Responses"],
        summary:
          "Import one full survey response (household + person + respondent + tobacco/vape use), atomically",
        requestBody: { required: true, ...json(js(surveyResponseInputSchema)) },
        responses: {
          "201": {
            description: "Created",
            ...json(
              wrap({
                type: "object",
                properties: { household, person, respondent, tobaccoUse, vapeUse },
                required: ["household", "person", "respondent", "tobaccoUse", "vapeUse"],
              }),
            ),
          },
          "400": errorResponses["400"],
        },
      },
    },
  },
};
