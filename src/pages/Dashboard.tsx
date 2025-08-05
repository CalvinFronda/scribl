import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useUserResponses } from "../hooks/useResponses";
import { UserStats } from "../components/dashboard/UserStats";
import { ResponseHistory } from "../components/dashboard/ResponseHistory";
import { ResponseForm } from "../components/responses/ResponseForm";
import { Button } from "../components/ui/Button";
import { FormattedResponse } from "../types";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const { user } = useAuth();
  const { responses, loading, refetch } = useUserResponses(user?.id);
  const [editingResponse, setEditingResponse] =
    useState<FormattedResponse | null>(null);
  const navigate = useNavigate();
  const handleEditResponse = (response: FormattedResponse) => {
    setEditingResponse(response);
  };

  const handleResponseUpdate = () => {
    setEditingResponse(null);
    refetch();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Today's Prompt
        </Button>

        <h1 className="text-3xl font-bold mb-2">Your Writing Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress and manage your responses
        </p>
      </div>

      <UserStats />

      {editingResponse && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Edit Response</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingResponse(null)}
            >
              Cancel
            </Button>
          </div>

          <ResponseForm
            promptId={editingResponse.promptId}
            responseId={editingResponse.id}
            existingResponse={editingResponse.text}
            onSubmit={handleResponseUpdate}
          />
        </div>
      )}

      <ResponseHistory
        responses={responses}
        loading={loading}
        onEditResponse={handleEditResponse}
      />
    </div>
  );
};
