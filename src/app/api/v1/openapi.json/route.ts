import { NextResponse } from "next/server";
import { openApiSpec } from "@/app/lib/openapi/spec";

export async function GET() {
  return NextResponse.json(openApiSpec);
}
