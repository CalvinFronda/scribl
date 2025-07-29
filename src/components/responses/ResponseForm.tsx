import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { submitDailyResponse } from "@/actions/submitDaily";

interface ResponseFormProps {
  promptId: string;
  onSubmit: () => void;
  existingResponse?: string;
  responseId?: string;
}

export const ResponseForm: React.FC<ResponseFormProps> = ({
  promptId,
  onSubmit,
  existingResponse = "",
  responseId,
}) => {
  const [response, setResponse] = useState(existingResponse);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !response.trim()) return;

    setLoading(true);
    setError(null);

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
        return await submitDailyResponse(user.id, promptId, response);
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
            onChange={(e) => setResponse(e.target.value)}
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
