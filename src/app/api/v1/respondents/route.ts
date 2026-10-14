import type { NextRequest } from "next/server";
import { errorFromUnknown, successResponse } from "@/app/lib/api/response";
import { parsePagination } from "@/app/lib/api/pagination";
import { respondentService } from "@/app/lib/services/respondent.service";

export async function GET(req: NextRequest) {
  try {
    const { limit, offset } = parsePagination(req.nextUrl.searchParams);
    const [items, total] = await Promise.all([
      respondentService.list(limit, offset),
      respondentService.count(),
    ]);
    return successResponse({ items, limit, offset, total });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
