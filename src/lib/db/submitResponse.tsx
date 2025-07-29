import { supabase } from "../supabase";

type ResponseType = "daily" | "journal";

export async function submitResponse({
  userId,
  promptId,
  response,
  type,
}: {
  userId: string;
  promptId: string;
  response: string;
  type: ResponseType;
}) {
  if (!userId || !response) return;

  const { error, data } = await supabase.from("responses").insert({
    user_id: userId,
    prompt_id: promptId,
    response_text: response.trim(),
    is_public: false,
    type: type,
  });

  if (error) {
    throw error;
  }
  return data;
}
