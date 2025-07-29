import { submitResponse } from "@/lib/db/submitResponse";

export async function submitDailyResponse(
  userId: string,
  promptId: string,
  response: string
) {
  try {
    return await submitResponse({ userId, promptId, response, type: "daily" });
  } catch (error) {
    console.error("Failed to submit daily response", error);
    throw error;
  }
}
