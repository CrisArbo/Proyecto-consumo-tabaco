import { errorFromUnknown, errorResponse, successResponse } from "@/app/lib/api/response";
import { parseId } from "@/app/lib/api/params";
import { personUpdateSchema } from "@/app/lib/schemas/entities";
import { personService } from "@/app/lib/services/person.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    const person = await personService.get(id);
    if (person === null) {
      return errorResponse("Person not found", 404);
    }
    return successResponse(person);
  } catch (err) {
    return errorFromUnknown(err);
  }
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    const data = personUpdateSchema.parse(await req.json());
    const person = await personService.update(id, data);
    if (person === null) {
      return errorResponse("Person not found", 404);
    }
    return successResponse(person);
  } catch (err) {
    return errorFromUnknown(err);
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const id = parseId((await params).id);
    await personService.remove(id);
    return successResponse({ deleted: true });
  } catch (err) {
    return errorFromUnknown(err);
  }
}
