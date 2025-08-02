import React, { useState } from "react";
import { supabase } from "../../lib/supabase/client";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { submitDailyResponse } from "@/lib/supabase/responses";
import { getLocalStorage, getWordCount, setLocalStorage } from "@/lib/utils";
import { Prompt } from "@/types";

interface ResponseFormProps {
  currentPrompt: Prompt;
  onSubmit: () => void;
  existingResponse?: string;
  responseId?: string;
}

export const ResponseForm: React.FC<ResponseFormProps> = ({
  currentPrompt,
  onSubmit,
  existingResponse = "",
  responseId,
}) => {
  const [response, setResponse] = useState(existingResponse);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTimes, setStartTimes] = useState<Record<string, string>>(() => {
    return getLocalStorage("startTimes") || {};
  });
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !response.trim()) return;

    setLoading(true);
    setError(null);
    const endTime = new Date().toISOString();

    const wordCount = getWordCount(response);
    try {
      if (responseId) {
        // Update existing response
        const { error } = await supabase
          .from("responses")
          .update({
            response_text: response.trim(),
            is_public: isPublic,
            type: "daily",
            updated_at: new Date().toISOString(),
          })
          .eq("id", responseId);

        if (error) throw error;
      } else {
        // Create new response
        if (currentPrompt.id) {
          return await submitDailyResponse(
            user.id,
            currentPrompt.id,
            response,
            startTimes[currentPrompt.id],
            endTime,
            wordCount
          );
        }
      }

      onSubmit();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit response"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentPrompt && !startTimes[currentPrompt.id]) {
      const now = new Date().toISOString();
      const updated = {
        ...startTimes,
        [currentPrompt.id]: now,
      };
      setStartTimes(updated);
      setLocalStorage("startTimes", updated);
    }
    setResponse(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {responseId ? "Edit Your Response" : "Share Your Writing"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            label="Your Response"
            value={response}
            onChange={(e) => handleTextInput(e)}
            placeholder="Write your response to today's prompt..."
            rows={8}
            required
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
            />
            <label htmlFor="isPublic" className="text-sm">
              Make my response public (anonymous)
            </label>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full">
            {responseId ? "Update Response" : "Submit Response"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
