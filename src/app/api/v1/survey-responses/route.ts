import { errorFromUnknown, successResponse } from "@/app/lib/api/response";
import { surveyResponseInputSchema } from "@/app/lib/schemas/entities";
import { surveyImportService } from "@/app/lib/services/survey-import.service";

export async function POST(req: Request) {
  try {
    const input = surveyResponseInputSchema.parse(await req.json());
    const result = await surveyImportService.importOne(input);
    return successResponse(result, 201);
  } catch (err) {
    return errorFromUnknown(err);
  }
}
