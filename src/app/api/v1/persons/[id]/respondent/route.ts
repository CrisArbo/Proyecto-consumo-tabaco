import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";
import { parseId } from "@/app/lib/api/params";
import { respondentService } from "@/app/lib/services/respondent.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const personId = parseId((await params).id);
    const respondent = await respondentService.getByPerson(personId);
    if (respondent === null) {
      return errorResponse("Respondent not found for this person", 404);
    }
    return successResponse(respondent);
  } catch (err) {
    return errorFromUnknown(err);
  }
}
