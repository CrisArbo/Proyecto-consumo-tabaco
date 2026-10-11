import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";
import { parseId } from "@/app/lib/api/params";
import { householdService } from "@/app/lib/services/household.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    const household = await householdService.get(id);
    if (household === null) {
      return errorResponse("Household not found", 404);
    }
    return successResponse(household);
  } catch (err) {
    return errorFromUnknown(err);
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    await householdService.remove(id);
    return successResponse({ deleted: true });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
