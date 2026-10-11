import { z } from "zod";

const idSchema = z.coerce.number().int().positive();

export function parseId(raw: string): number {
  return idSchema.parse(raw);
}
