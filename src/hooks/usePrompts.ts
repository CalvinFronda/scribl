import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";

import { PromptWithCategories } from "../types";

export const usePrompts = () => {
  const [currentPrompt, setCurrentPrompt] =
    useState<PromptWithCategories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentPrompt();
  }, []);

  const fetchCurrentPrompt = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("prompt")
        .select(
          `
    *,
    prompt_categories (
      category (
        id,
        name,
        color
      )
    )
  `,
        )
        .eq("date", today)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      setCurrentPrompt(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch prompt");
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomPrompt = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("random_prompts")
        .select(
          `
    *,
    prompt_categories (
      category (
        id,
        name,
        color
      )
    )
  `,
        )
        .limit(1)
        .single();

      if (error) {
        throw error;
      }

      setCurrentPrompt(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch random prompt",
      );
      setCurrentPrompt(null);
    } finally {
      setLoading(false);
    }
  };

  return { currentPrompt, loading, error, refetch: fetchRandomPrompt };
};
