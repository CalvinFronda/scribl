import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import {
  Badge as BadgeIcon,
  Heart,
  Lock,
  PenTool,
  RefreshCw,
  Shuffle,
  Save,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

import { submitPersonalResponse } from "@/lib/supabase/responses";
import { usePrompts } from "@/hooks/usePrompts";
import {
  colorMap,
  getLocalStorage,
  setLocalStorage,
  getWordCount,
} from "@/lib/utils";

const PrivateJournalPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [response, setResponse] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const wordCount = getWordCount(response);

  const { currentPrompt, refetch: getRandomPrompt } = usePrompts();

  const [startTimes, setStartTimes] = useState<Record<string, string>>(() => {
    return getLocalStorage("startTimes") || {};
  });

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !response) return;

    setIsSaving(true);
    setLoading(true);
    setError(null);

    const endTime = new Date().toISOString();
    try {
      if (currentPrompt) {
        await submitPersonalResponse(
          user.id,
          currentPrompt.id,
          response,
          startTimes[currentPrompt.id],
          endTime,
          wordCount,
        );
      }
    } catch (err) {
      console.error("the error", err);
      setError(
        err instanceof Error ? err.message : "Failed to submit response",
      );
      throw error;
    } finally {
      setLoading(false);
      setIsSaving(false);
      setResponse("");
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

  const handleGetRandomPrompt = () => {
    getRandomPrompt();
    setResponse("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Private Writing Space
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This is your personal sanctuary for thoughts, reflections, and
              creative expression. Everything you write here stays completely
              private.
            </p>
          </div>

          {/* Prompt Selection Controls */}
          <Card className="mb-6 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Choose Your Writing Prompt
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {/* {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    // onClick={handleNewPrompt}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <Shuffle className="h-4 w-4" />
                    <span>New Prompt</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Current Prompt */}
          <Card className="mb-8 border-l-4 border-l-sky-500 bg-gradient-to-r from-sky-50 to-sky-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BadgeIcon className="bg-sky-100 text-sky-800" />
                  {currentPrompt?.prompt_categories.map(({ category }) => (
                    <Badge
                      key={category.id}
                      className={
                        colorMap[category.color as keyof typeof colorMap]
                      }
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleGetRandomPrompt()}
                  className="text-sky-600 hover:text-sky-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Switch Prompt
                </Button>
              </div>
              <CardDescription className="text-lg leading-relaxed text-gray-700 mt-4">
                {currentPrompt?.prompt_text}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Writing Area */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <PenTool className="h-5 w-5 text-sky-600" />
                  <span>Your Private Thoughts</span>
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-sky-600">
                    <Lock className="h-4 w-4" />
                    <span>Private</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {loading && <div> loading...</div>}
                <Textarea
                  placeholder="Let your thoughts flow freely... This is your private space to explore ideas, reflect on experiences, and express yourself without any judgment. Take your time and write from the heart."
                  value={response}
                  onChange={(e) => handleTextInput(e)}
                  className="min-h-[500px] text-base leading-relaxed resize-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white/50"
                />

                {/* Gentle Prompt Reminder */}
                {response.length > 100 && (
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                    <p className="text-sm text-sky-800 font-medium mb-1">
                      Reflecting on:
                    </p>
                    <p className="text-sm text-sky-700">
                      {currentPrompt && currentPrompt.prompt_text}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Your writing is automatically saved privately</span>
                    </div>
                  </div>
                  <Button
                    onClick={(e) => handleSubmit(e)}
                    disabled={!response.trim() || isSaving}
                    className="px-8 bg-sky-600 hover:bg-sky-700"
                  >
                    {isSaving ? "Saving..." : "Save to Journal"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Encouragement Section */}
          <Card className="mt-8 bg-gradient-to-r from-grey-50 to-sky-50 border-grey-200">
            <CardHeader>
              <CardTitle className="text-lg text-sky-800 flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Writing Reminders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-sky-700">
                <div>
                  <h4 className="font-medium mb-2">For Your Eyes Only</h4>
                  <ul className="space-y-1">
                    <li>• Write without fear of judgment</li>
                    <li>• Be completely honest with yourself</li>
                    <li>• Don't worry about grammar or structure</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Make It Meaningful</h4>
                  <ul className="space-y-1">
                    <li>• Use specific details and examples</li>
                    <li>• Explore your emotions and reactions</li>
                    <li>• Let your authentic voice shine through</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Prompt Browser */}
          {/* <Card className="mt-8 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Browse Other Prompts</CardTitle>
              <CardDescription>
                Click any prompt to switch to it instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3"></div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default PrivateJournalPage;
