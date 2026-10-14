import { Activity, Cigarette, LayoutDashboard, Table2, Users, Wind } from "lucide-react";

export const sections = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "indicadores", label: "Indicadores", icon: Activity },
  { id: "consumo", label: "Tabaco y vapeo", icon: Cigarette },
  { id: "poblacion", label: "Población", icon: Users },
  { id: "encuestados", label: "Encuestados", icon: Table2 },
] as const;

export const BrandIcon = Wind;
