import type { NextRequest } from "next/server";
import { errorFromUnknown, successResponse } from "@/app/lib/api/response";
import { parsePagination } from "@/app/lib/api/pagination";
import { vapeUseService } from "@/app/lib/services/vape-use.service";

export async function GET(req: NextRequest) {
  try {
    const { limit, offset } = parsePagination(req.nextUrl.searchParams);
    const items = await vapeUseService.list(limit, offset);
    return successResponse({ items, limit, offset });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
