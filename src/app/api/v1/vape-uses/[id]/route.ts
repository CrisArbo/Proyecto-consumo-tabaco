import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";
import { parseId } from "@/app/lib/api/params";
import { vapeUseUpdateSchema } from "@/app/lib/schemas/entities";
import { vapeUseService } from "@/app/lib/services/vape-use.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    const vapeUse = await vapeUseService.get(id);
    if (vapeUse === null) {
      return errorResponse("Vape use record not found", 404);
    }
    return successResponse(vapeUse);
  } catch (err) {
    return errorFromUnknown(err);
  }
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    const data = vapeUseUpdateSchema.parse(await req.json());
    const vapeUse = await vapeUseService.update(id, data);
    if (vapeUse === null) {
      return errorResponse("Vape use record not found", 404);
    }
    return successResponse(vapeUse);
  } catch (err) {
    return errorFromUnknown(err);
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    await vapeUseService.remove(id);
    return successResponse({ deleted: true });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
