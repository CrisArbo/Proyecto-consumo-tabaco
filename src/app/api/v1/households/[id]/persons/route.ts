import { errorFromUnknown, successResponse } from "@/app/lib/api/response";
import { parseId } from "@/app/lib/api/params";
import { personService } from "@/app/lib/services/person.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const householdId = parseId((await params).id);
    const items = await personService.listByHousehold(householdId);
    return successResponse({ items });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
