import { supabase } from "../supabase/client";

type ResponseType = "daily" | "journal";

export async function submitResponse({
  userId,
  promptId,
  response,
  type,
  startTime,
  endTime,
  wordCount,
}: {
  userId: string;
  promptId: string;
  response: string;
  type: ResponseType;
  startTime: string;
  endTime: string;
  wordCount: number;
}) {
  if (!userId || !response) return;
  const now = new Date().toISOString();
  const { error, data } = await supabase.from("responses").insert({
    user_id: userId,
    prompt_id: promptId,
    response_text: response.trim(),
    is_public: false,
    type: type,
    start_time: startTime,
    end_time: endTime,
    word_count: wordCount,
    updated_at: now,
  });

  if (error) {
    throw error;
  }
  return data;
}
