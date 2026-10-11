import { catalogSlugs, type CatalogSlug } from "@/app/lib/api/catalog-slugs";
import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";

type RouteContext = { params: Promise<{ catalog: string }> };

function isCatalogSlug(value: string): value is CatalogSlug {
  return value in catalogSlugs;
}

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { catalog } = await params;
    if (!isCatalogSlug(catalog)) {
      return errorResponse(
        `Unknown catalog "${catalog}". Valid values: ${Object.keys(catalogSlugs).join(", ")}`,
        404,
      );
    }
    const items = await catalogSlugs[catalog]();
    return successResponse({ items });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
