import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";
import { parseId } from "@/app/lib/api/params";
import { respondentUpdateSchema } from "@/app/lib/schemas/entities";
import { respondentService } from "@/app/lib/services/respondent.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    const respondent = await respondentService.get(id);
    if (respondent === null) {
      return errorResponse("Respondent not found", 404);
    }
    return successResponse(respondent);
  } catch (err) {
    return errorFromUnknown(err);
  }
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    const data = respondentUpdateSchema.parse(await req.json());
    const respondent = await respondentService.update(id, data);
    if (respondent === null) {
      return errorResponse("Respondent not found", 404);
    }
    return successResponse(respondent);
  } catch (err) {
    return errorFromUnknown(err);
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    await respondentService.remove(id);
    return successResponse({ deleted: true });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
