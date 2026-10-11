import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function errorFromUnknown(err: unknown) {
  if (err instanceof ZodError) {
    return errorResponse(
      err.issues.map((issue) => `${issue.path.join(".") || "body"}: ${issue.message}`).join("; "),
      400,
    );
  }
  if (err instanceof Error) {
    return errorResponse(err.message, 400);
  }
  return errorResponse("Unknown error", 500);
}
