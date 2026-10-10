import { successResponse } from "@/app/lib/api/response";

export async function GET() {
  return successResponse("Prevalencia server is up and running!");
}
