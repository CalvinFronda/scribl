import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Calendar, Heart, PenTool } from "lucide-react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import { colorMap, formatResponse } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FormattedResponse } from "@/types";

const PrivatHistorySelectedPage = () => {
  const [response, setResponse] = useState<FormattedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponse = async () => {
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
          name,
          color
        )
      )
    )
    `,
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching response:", error);
        setLoading(false);
      }

      const d = formatResponse(data);
      setResponse(d);
      setLoading(false);
    };

    if (id) {
      fetchResponse();
    }
  }, [id]);

  if (!response || loading) {
    return <LoadingSpinner />;
  }
  console.log(response);
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-sm  hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to History
          </button>
          {/* Writing Details */}
          <Card className="mb-6 border-l-4 ">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {response.category.map((cat) => (
                    <Badge
                      variant="secondary"
                      color={colorMap[cat.color as keyof typeof colorMap]}
                    >
                      {cat.name}
                    </Badge>
                  ))}

                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{response.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Heart className="h-4 w-4" />
                    <span>{response.timeSpent}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {response.wordCount} words
                </span>
              </div>
              <CardTitle className="text-xl leading-relaxed">
                Original Prompt
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-gray-700">
                {response.prompt}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Full Writing Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PenTool className="h-5 w-5 " />
                <span>Your Writing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {response.text}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivatHistorySelectedPage;
