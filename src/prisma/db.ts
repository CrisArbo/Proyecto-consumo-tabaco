import { config } from "dotenv";
import { expand } from "dotenv-expand";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

expand(config());

export const db = postgres<Contract>({
  contractJson,
  url: process.env["DATABASE_URL"]!,
});
