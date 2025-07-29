import React from "react";
import { MessageCircle } from "lucide-react";
import { PublicResponse } from "../../types";
import { Card, CardContent } from "../ui/Card";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface PublicResponsesListProps {
  responses: PublicResponse[];
  loading: boolean;
}

export const PublicResponsesList: React.FC<PublicResponsesListProps> = ({
  responses,
  loading,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Card className="text-center">
        <CardContent className="py-8">
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading responses...</p>
        </CardContent>
      </Card>
    );
  }

  if (responses.length === 0) {
    return (
      <Card className="text-center">
        <CardContent className="py-8">
          <MessageCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">
            No public responses yet. Be the first to share!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Community Responses</h3>

      {responses.map((response) => (
        <Card key={response.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-medium text-primary">
                {response.user_email}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatDate(response.created_at)}
              </span>
            </div>

            <p className="leading-relaxed">{response.response_text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
