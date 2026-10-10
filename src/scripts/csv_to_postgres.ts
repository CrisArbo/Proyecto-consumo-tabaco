import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  surveyImportService,
  type SurveyResponseInput,
} from "@/app/lib/services/survey-import.service";
import { db } from "@/prisma/db";

const CSV_PATH =
  process.env["CSV_PATH"] ??
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../dataset/Base_ENCSPA_respuestas_final.csv",
  );

const BATCH_SIZE = 500;

const CATALOG_SEEDS = {
  gender: ["Mujer", "Hombre"],
  answer: ["Sí", "No", "No contesta"],
  activity: [
    "Trabajando",
    "Oficios del hogar",
    "Estudiando",
    "Buscando trabajo",
    "Pensionado",
    "Ocio",
    "Otra actividad",
    "Incapacitado permanente para trabajar",
  ],
  healthStatus: ["Muy bueno", "Bueno", "Regular", "Malo", "Muy malo"],
  risk: [
    "Ningún riesgo",
    "Riesgo leve",
    "Riesgo moderado",
    "Gran riesgo",
    "No sé qué riesgo corre",
  ],
  educationLevel: [
    "Ninguno",
    "Preescolar",
    "Básica primaria (1-5)",
    "Básica secundaria (6-9)",
    "Media (10-13)",
    "Técnica/tecnológica",
    "Universitaria",
    "Postgrado",
    "No sabe/No informa",
  ],
  firstUseTiming: [
    "En los últimos 30 días",
    "Hace más de 30 días pero menos de 12 meses",
    "Hace más de 12 meses",
  ],
} as const;

type CsvRow = {
  surveySequence: number;
  pSequence: number;
  personOrder: number;
  gender: string;
  age: number;
  mainActivity: string;
  healthStatus: string;
  smokingRisk: string;
  educationLevel: string;
  everSmoked: string;
  ageFirstUseTobacco: number | null;
  firstUseTiming: string | null;
  smokedLast12m: string | null;
  smokedLast30d: string | null;
  everVaped: string;
  ageFirstUseVape: number | null;
  vapedLast30d: string | null;
};

function parseCsv(raw: string): CsvRow[] {
  const lines = raw
    .replace(/^﻿/, "")
    .split("\n")
    .filter((line) => line.trim().length > 0);
  const dataLines = lines.slice(1);

  const text = (value: string) => value.trim();
  const optionalText = (value: string) => (value.trim() === "" ? null : value.trim());
  const optionalNumber = (value: string) => (value.trim() === "" ? null : Number(value.trim()));

  return dataLines.map((line) => {
    const c = line.split(",");

    return {
      surveySequence: Number(c[1]),
      pSequence: Number(c[2]),
      personOrder: Number(c[3]),
      gender: text(c[4]),
      age: Number(c[5]),
      mainActivity: text(c[6]),
      healthStatus: text(c[7]),
      smokingRisk: text(c[8]),
      educationLevel: text(c[9]),
      everSmoked: text(c[10]),
      ageFirstUseTobacco: optionalNumber(c[11]),
      firstUseTiming: optionalText(c[12]),
      smokedLast12m: optionalText(c[13]),
      smokedLast30d: optionalText(c[14]),
      everVaped: text(c[15]),
      ageFirstUseVape: optionalNumber(c[16]),
      vapedLast30d: optionalText(c[17]),
    };
  });
}

async function seedCatalog(
  create: (data: { code: number; label: string }) => Promise<{ id: number }>,
  labels: readonly string[],
): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  for (const [index, label] of labels.entries()) {
    const row = await create({ code: index + 1, label });
    map.set(label, row.id);
  }
  return map;
}

function lookup(map: Map<string, number>, label: string, column: string): number {
  const id = map.get(label);
  if (id === undefined) {
    throw new Error(`Unknown ${column} label in CSV: "${label}"`);
  }
  return id;
}

async function main() {
  console.log(`Reading ${CSV_PATH}...`);
  const rows = parseCsv(readFileSync(CSV_PATH, "utf-8"));
  console.log(`Parsed ${rows.length} rows.`);

  const existingHousehold = await db.orm.public.Household.first();
  if (existingHousehold !== null) {
    console.log("Household table is not empty — aborting to avoid seeding duplicates.");
    await db.close();
    return;
  }

  console.log("Seeding catalog tables...");
  const genderMap = await seedCatalog(
    (d) => db.orm.public.CatGender.create(d),
    CATALOG_SEEDS.gender,
  );
  const answerMap = await seedCatalog(
    (d) => db.orm.public.CatAnswer.create(d),
    CATALOG_SEEDS.answer,
  );
  const activityMap = await seedCatalog(
    (d) => db.orm.public.CatActivity.create(d),
    CATALOG_SEEDS.activity,
  );
  const healthStatusMap = await seedCatalog(
    (d) => db.orm.public.CatHealthStatus.create(d),
    CATALOG_SEEDS.healthStatus,
  );
  const riskMap = await seedCatalog((d) => db.orm.public.CatRisk.create(d), CATALOG_SEEDS.risk);
  const educationLevelMap = await seedCatalog(
    (d) => db.orm.public.CatEducationLevel.create(d),
    CATALOG_SEEDS.educationLevel,
  );
  const firstUseTimingMap = await seedCatalog(
    (d) => db.orm.public.CatFirstUseTiming.create(d),
    CATALOG_SEEDS.firstUseTiming,
  );

  console.log("Seeding households, persons, respondents and their tobacco/vape use...");
  let processed = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch: SurveyResponseInput[] = rows.slice(i, i + BATCH_SIZE).map((row) => ({
      person: {
        personOrder: row.personOrder,
        surveySequence: row.surveySequence,
        pSequence: row.pSequence,
        genderId: lookup(genderMap, row.gender, "Género"),
        age: row.age,
      },
      respondent: {
        mainActivityId: lookup(activityMap, row.mainActivity, "Actividad-principal"),
        healthStatusId: lookup(healthStatusMap, row.healthStatus, "Estado-salud"),
        smokingRiskId: lookup(riskMap, row.smokingRisk, "Riesgo-fumar"),
        educationLevelId: lookup(educationLevelMap, row.educationLevel, "Nivel-educativo"),
      },
      tobaccoUse: {
        everSmokedId: lookup(answerMap, row.everSmoked, "Fumó-alguna-vez"),
        ageFirstUse: row.ageFirstUseTobacco,
        firstUseTimingId: row.firstUseTiming
          ? lookup(firstUseTimingMap, row.firstUseTiming, "Primera-vez-tabaco")
          : null,
        smokedLast12mId: row.smokedLast12m
          ? lookup(answerMap, row.smokedLast12m, "Fumó-últimos-12-meses")
          : null,
        smokedLast30dId: row.smokedLast30d
          ? lookup(answerMap, row.smokedLast30d, "Fumó-últimos-30-días")
          : null,
      },
      vapeUse: {
        everVapedId: lookup(answerMap, row.everVaped, "Vapeó-alguna-vez"),
        ageFirstUse: row.ageFirstUseVape,
        vapedLast30dId: row.vapedLast30d
          ? lookup(answerMap, row.vapedLast30d, "Vapeó-últimos-30-días")
          : null,
      },
    }));

    await surveyImportService.importMany(batch);

    processed += batch.length;
    console.log(`  ${processed}/${rows.length}`);
  }

  console.log("Done.");
  await db.close();
}

main().catch(async (err) => {
  console.error(err);
  await db.close();
  process.exit(1);
});
