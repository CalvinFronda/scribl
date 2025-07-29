import { submitResponse } from "@/lib/db/submitResponse";

export async function submitPersonalResponse(
  userId: string,
  promptId: string,
  response: string
) {
  return await submitResponse({
    userId,
    promptId,
    response,
    type: "journal",
  });
}
