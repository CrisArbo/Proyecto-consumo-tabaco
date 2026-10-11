import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";
import { parseId } from "@/app/lib/api/params";
import { tobaccoUseUpdateSchema } from "@/app/lib/schemas/entities";
import { tobaccoUseService } from "@/app/lib/services/tobacco-use.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    const tobaccoUse = await tobaccoUseService.get(id);
    if (tobaccoUse === null) {
      return errorResponse("Tobacco use record not found", 404);
    }
    return successResponse(tobaccoUse);
  } catch (err) {
    return errorFromUnknown(err);
  }
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    const data = tobaccoUseUpdateSchema.parse(await req.json());
    const tobaccoUse = await tobaccoUseService.update(id, data);
    if (tobaccoUse === null) {
      return errorResponse("Tobacco use record not found", 404);
    }
    return successResponse(tobaccoUse);
  } catch (err) {
    return errorFromUnknown(err);
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    await tobaccoUseService.remove(id);
    return successResponse({ deleted: true });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
