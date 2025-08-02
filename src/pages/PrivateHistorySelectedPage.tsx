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
const mockResponse = {
  category: "Places & Memories",
  date: "January 21, 2024",
  id: 2,
  preview:
    "The small coffee shop on Fifth Street has become my sanctuary. It's not much to look at from the outside - just a narrow storefront squeezed between a dry cleaner and a bookstore. But the moment I step inside, something in my chest loosens. The familiar smell of roasted beans and the soft murmur of conversations...",
  prompt:
    "Describe a place that feels like home to you, even if it's not where you live...",
  timeSpent: "8 minutes",
  wordCount: 287,
};
const PrivatHistorySelectedPage = () => {
  const [response, setResponse] = useState(mockResponse);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    const fetchResponse = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("responses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching response:", error);
      } else {
        setResponse(data);
      }
      setLoading(false);
    };

    if (id) {
      fetchResponse();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            // onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-sm text-purple-700 hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to History
          </button>
          {/* Writing Details */}
          <Card className="mb-6 border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    {response.category}
                  </Badge>
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
                <PenTool className="h-5 w-5 text-purple-600" />
                <span>Your Writing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {response.preview}
                  {"\n\n"}
                  This would continue with the full text of the writing. The
                  preview shown here would normally be just the first few
                  sentences, but in a real implementation, this would display
                  the complete writing that the user saved.
                  {"\n\n"}
                  The writing would continue here with all the thoughts,
                  reflections, and stories that the user poured onto the page
                  during their private writing session. This is their personal
                  space to revisit their thoughts and see how their writing has
                  evolved over time.
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
