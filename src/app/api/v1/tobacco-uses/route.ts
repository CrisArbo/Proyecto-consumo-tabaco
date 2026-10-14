import type { NextRequest } from "next/server";
import { errorFromUnknown, successResponse } from "@/app/lib/api/response";
import { parsePagination } from "@/app/lib/api/pagination";
import { tobaccoUseService } from "@/app/lib/services/tobacco-use.service";

export async function GET(req: NextRequest) {
  try {
    const { limit, offset } = parsePagination(req.nextUrl.searchParams);
    const [items, total] = await Promise.all([
      tobaccoUseService.list(limit, offset),
      tobaccoUseService.count(),
    ]);
    return successResponse({ items, limit, offset, total });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
