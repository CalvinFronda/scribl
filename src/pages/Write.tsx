"use client";

import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  PenTool,
  ArrowLeft,
  Save,
  Share2,
  Calendar,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

const todaysPrompt = {
  id: 1,
  date: "January 22, 2024",
  category: "Personal Growth",
  prompt:
    "Write about a moment when you had to choose between what was easy and what was right. What did you choose, and how did that decision shape who you are today?",
  estimatedTime: "10-15 minutes",
};

export default function WritePage() {
  const [response, setResponse] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast(isPublic ? "Response published!" : "Response saved privately", {
      description: isPublic
        ? "Your response is now visible to the community."
        : "Your response has been saved to your private collection.",
    });
  };

  const wordCount = response
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600 hover:text-gray-900">
                  Back to Home
                </span>
              </Link>
              <div className="flex items-center space-x-2">
                <PenTool className="h-6 w-6 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">
                  WriteDaily
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Prompt Card */}
          <Card className="mb-8 border-l-4 border-l-indigo-600">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="secondary"
                    className="bg-indigo-100 text-indigo-800"
                  >
                    {todaysPrompt.category}
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{todaysPrompt.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{todaysPrompt.estimatedTime}</span>
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl leading-relaxed">
                Today's Writing Prompt
              </CardTitle>
              <CardDescription className="text-lg leading-relaxed text-gray-700">
                {todaysPrompt.prompt}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Writing Area */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Response</CardTitle>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="public-toggle"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                    <Label htmlFor="public-toggle" className="text-sm">
                      {isPublic ? "Public" : "Private"}
                    </Label>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Start writing your response here... Take your time and let your thoughts flow naturally."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="min-h-[400px] text-base leading-relaxed resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                {/* Prompt Reminder - Sticky when scrolling */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <p className="text-sm text-indigo-800 font-medium mb-1">
                    Prompt Reminder:
                  </p>
                  <p className="text-sm text-indigo-700">
                    {todaysPrompt.prompt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-gray-500">
                    {isPublic ? (
                      <div className="flex items-center space-x-2">
                        <Share2 className="h-4 w-4" />
                        <span>
                          This response will be visible to the community
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>This response will be saved privately</span>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleSave}
                    disabled={!response.trim() || isSaving}
                    className="px-8"
                  >
                    {isSaving
                      ? "Saving..."
                      : isPublic
                      ? "Publish Response"
                      : "Save Response"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Writing Tips */}
          <Card className="mt-8 bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-lg text-amber-800">
                Writing Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-amber-700">
                <li>
                  • Don't worry about perfect grammar or spelling in your first
                  draft
                </li>
                <li>
                  • Write continuously for at least 5 minutes without stopping
                </li>
                <li>• Be honest and authentic in your response</li>
                <li>
                  • Use specific details and examples to bring your story to
                  life
                </li>
                <li>
                  • Remember: there are no wrong answers, only your unique
                  perspective
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
