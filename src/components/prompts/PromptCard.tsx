import React from "react";
import { Calendar } from "lucide-react";
import { Prompt } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

interface PromptCardProps {
  prompt: Prompt;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="flex items-center justify-center mb-2">
          <Calendar className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm font-medium text-muted-foreground">
            {formatDate(prompt.date)}
          </span>
        </div>
        <CardTitle>Today's Writing Prompt</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-lg leading-relaxed">{prompt.prompt_text}</p>
      </CardContent>
    </Card>
  );
};
