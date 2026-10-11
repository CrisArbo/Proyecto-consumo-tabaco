import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";
import { parseId } from "@/app/lib/api/params";
import { vapeUseService } from "@/app/lib/services/vape-use.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const respondentId = parseId((await params).id);
    const vapeUse = await vapeUseService.getByRespondent(respondentId);
    if (vapeUse === null) {
      return errorResponse("Vape use record not found for this respondent", 404);
    }
    return successResponse(vapeUse);
  } catch (err) {
    return errorFromUnknown(err);
  }
}
