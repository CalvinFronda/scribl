import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import { PublicResponse, FormattedResponse } from "../types";
import { formatResponse } from "@/lib/utils";

export const usePublicResponses = (promptId?: string) => {
  const [responses, setResponses] = useState<PublicResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (promptId) {
      fetchPublicResponses();
    }
  }, [promptId]);

  const fetchPublicResponses = async () => {
    if (!promptId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("responses")
        .select(
          `
          id,
          response_text,
          created_at,
          user_id
        `,
        )
        .eq("prompt_id", promptId)
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      // Anonymize user data
      const anonymizedResponses = data.map((response) => ({
        id: response.id,
        response_text: response.response_text,
        created_at: response.created_at,
        user_email: `User ${response.user_id.slice(-4)}`,
      }));

      setResponses(anonymizedResponses);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch responses",
      );
    } finally {
      setLoading(false);
    }
  };

  return { responses, loading, error, refetch: fetchPublicResponses };
};

export const useUserResponses = (userId?: string) => {
  const [responses, setResponses] = useState<FormattedResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserResponses();
    }
  }, [userId]);

  const fetchUserResponses = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("responses")
        .select(
          `
    *,
    prompt (
      id,
      prompt_text,
      date,
      prompt_categories (
        category (
          id,
          name
        )
      )
    )
    `,
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      const res = data.map((item) => formatResponse(item));
      setResponses(res || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch user responses",
      );
    } finally {
      setLoading(false);
    }
  };

  return { responses, loading, error, refetch: fetchUserResponses };
};
