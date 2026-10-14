import type { KpiModel } from "@/components/dashboard/kpi-section";
import type { ConsumptionModel } from "@/components/dashboard/consumption-section";
import type { PopulationModel } from "@/components/dashboard/population-section";
import type { RespondentRow } from "@/components/dashboard/respondents-section";

export const kpiFixture: KpiModel = {
  households: 48000,
  persons: 49000,
  respondents: 49000,
  smoked: 16000,
  vaped: 2000,
};

export const consumptionFixture: ConsumptionModel = {
  total: 49000,
  smoked: 16000,
  vaped: 2000,
  rows: [
    { answer: "Sí", tabaco: 33, vapeo: 4 },
    { answer: "No", tabaco: 67, vapeo: 96 },
  ],
};

export const populationFixture: PopulationModel = {
  genders: [
    { key: "g1", label: "Mujer", count: 28000 },
    { key: "g2", label: "Hombre", count: 21000 },
  ],
  activities: [
    { label: "Trabajando", count: 28000 },
    { label: "Oficios del hogar", count: 9500 },
    { label: "Estudiando", count: 6300 },
    { label: "Buscando trabajo", count: 2200 },
    { label: "Pensionado", count: 1400 },
    { label: "Ocio", count: 650 },
    { label: "Otra actividad", count: 520 },
    { label: "Incapacitado permanente para trabajar", count: 310 },
  ],
};

const fixtureActivities = ["Oficios del hogar", "Trabajando", "Estudiando", "Buscando trabajo"];
const fixtureHealth = ["Bueno", "Muy bueno", "Regular", "Malo"];
const fixtureRisks = ["Gran riesgo", "Riesgo moderado", "Riesgo leve", "Ningún riesgo"];
const fixtureEducation = [
  "Universitaria",
  "Media (10-13)",
  "Básica secundaria (6-9)",
  "Técnica/tecnológica",
];

export const respondentsFixture: RespondentRow[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  activity: fixtureActivities[i % 4],
  health: fixtureHealth[(i + 1) % 4],
  risk: fixtureRisks[(i * 3) % 4],
  riskCode: ((i * 3) % 4) + 1,
  education: fixtureEducation[(i + 2) % 4],
}));
