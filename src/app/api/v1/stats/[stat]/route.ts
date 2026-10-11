import { statSlugs, type StatSlug } from "@/app/lib/api/stat-slugs";
import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";

type RouteContext = { params: Promise<{ stat: string }> };

function isStatSlug(value: string): value is StatSlug {
  return value in statSlugs;
}

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { stat } = await params;
    if (!isStatSlug(stat)) {
      return errorResponse(
        `Unknown stat "${stat}". Valid values: ${Object.keys(statSlugs).join(", ")}`,
        404,
      );
    }
    const items = await statSlugs[stat]();
    return successResponse({ items });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
