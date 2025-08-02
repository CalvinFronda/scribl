import { submitResponse } from "@/lib/db/submitResponse";
import { supabase } from "./client";
import { User } from "@/types";

export async function submitPersonalResponse(
  userId: string,
  promptId: string,
  response: string,
  startTime: string,
  endTime: string,
  wordCount: number
) {
  return await submitResponse({
    userId,
    promptId,
    response,
    type: "journal",
    startTime,
    endTime,
    wordCount,
  });
}

export async function submitDailyResponse(
  userId: string,
  promptId: string,
  response: string,
  startTime: string,
  endTime: string,
  wordCount: number
) {
  return await submitResponse({
    userId,
    promptId,
    response,
    type: "daily",
    startTime,
    endTime,
    wordCount,
  });
}

export const getResponse = async (user: User) => {
  return await supabase.from("responses").select("*").eq("user_id", user.id);
};

export const getResponseById = async (id: string) => {
  return await supabase.from("responses").select("*").eq("id", id).single();
};
