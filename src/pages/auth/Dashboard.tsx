import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PenTool,
  ArrowLeft,
  Calendar,
  Eye,
  EyeOff,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";

const mockResponses = [
  {
    id: 1,
    date: "January 22, 2024",
    prompt:
      "Write about a moment when you had to choose between what was easy and what was right...",
    wordCount: 342,
    isPublic: false,
    category: "Personal Growth",
  },
  {
    id: 2,
    date: "January 21, 2024",
    prompt:
      "Describe a place that feels like home to you, even if it's not where you live...",
    wordCount: 287,
    isPublic: true,
    category: "Places & Memories",
  },
  {
    id: 3,
    date: "January 20, 2024",
    prompt: "Write about a skill you wish you had and why it appeals to you...",
    wordCount: 195,
    isPublic: false,
    category: "Self-Reflection",
  },
  {
    id: 4,
    date: "January 19, 2024",
    prompt:
      "Tell the story of an ordinary object that holds extraordinary meaning for you...",
    wordCount: 428,
    isPublic: true,
    category: "Storytelling",
  },
];

const stats = {
  totalResponses: 15,
  currentStreak: 4,
  totalWords: 4250,
  publicResponses: 6,
};

export default function DashboardPage() {
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
              <Link to="/write">
                <Button>Today's Prompt</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Writing Dashboard
            </h1>
            <p className="text-gray-600">
              Track your progress and revisit your writing journey
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Responses
                </CardTitle>
                <PenTool className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalResponses}</div>
                <p className="text-xs text-muted-foreground">
                  Keep writing to reach 20!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Streak
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.currentStreak} days
                </div>
                <p className="text-xs text-muted-foreground">
                  Your longest streak: 7 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Words
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalWords.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average: {Math.round(stats.totalWords / stats.totalResponses)}{" "}
                  per response
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.publicResponses}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(
                    (stats.publicResponses / stats.totalResponses) * 100
                  )}
                  % of your responses
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Responses */}
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Responses</CardTitle>
              <CardDescription>
                Review and manage your writing responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockResponses.map((response) => (
                  <div
                    key={response.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {response.category}
                          </Badge>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{response.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            {response.isPublic ? (
                              <>
                                <Eye className="h-4 w-4" />
                                <span>Public</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-4 w-4" />
                                <span>Private</span>
                              </>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2 line-clamp-2">
                          {response.prompt}
                        </p>
                        <p className="text-sm text-gray-500">
                          {response.wordCount} words
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
