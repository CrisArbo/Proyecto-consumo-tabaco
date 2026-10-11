import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";
import { parseId } from "@/app/lib/api/params";
import { tobaccoUseService } from "@/app/lib/services/tobacco-use.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const respondentId = parseId((await params).id);
    const tobaccoUse = await tobaccoUseService.getByRespondent(respondentId);
    if (tobaccoUse === null) {
      return errorResponse("Tobacco use record not found for this respondent", 404);
    }
    return successResponse(tobaccoUse);
  } catch (err) {
    return errorFromUnknown(err);
  }
}
