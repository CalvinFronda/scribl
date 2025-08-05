import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Link, useNavigate } from "react-router";
import { Badge } from "@/components/ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import {
  BookOpen,
  Search,
  Calendar,
  Heart,
  PenTool,
  Filter,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

import { useUserResponses } from "@/hooks/useResponses";
import { colorMap } from "@/lib/utils";

export default function PrivateHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user } = useAuth();
  const navigate = useNavigate();

  // TODO: figure out the TS fix for this
  if (!user) return;

  const { responses } = useUserResponses(user.id);

  const categories = [
    "all",
    ...Array.from(
      new Set(
        responses.flatMap((response) => response.category.map((pc) => pc.name))
      )
    ),
  ];

  const filteredResponses = responses.filter((writing) => {
    const promptText = writing.prompt || "";
    const previewText = writing.preview || "";

    const matchesSearch =
      promptText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      previewText.toLowerCase().includes(searchTerm.toLowerCase());

    const categories = writing.category.map((pc) => pc.name) || [];

    const matchesCategory =
      selectedCategory === "all" || categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const totalWords = responses.reduce(
    (sum, writing) => sum + (writing.wordCount || 0),
    0
  );
  const totalTime = responses.reduce((sum, writing) => {
    const start = writing.startTime ? new Date(writing.startTime).getTime() : 0;
    const end = writing.endTime ? new Date(writing.endTime).getTime() : 0;

    if (!start || !end || end < start) return sum;

    const minutes = Math.round((end - start) / 60000); // ms to minutes
    return sum + minutes;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Private Writing Journey
            </h1>
            <p className="text-gray-600">
              Revisit your thoughts, reflections, and personal growth
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Writings
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{responses.length}</div>
                <p className="text-xs text-muted-foreground">
                  Personal reflections saved
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Words
                </CardTitle>
                <PenTool className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalWords.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average: {Math.round(totalWords / responses.length)} per
                  writing
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Time Spent
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(totalTime / 60)}h {totalTime % 60}m
                </div>
                <p className="text-xs text-muted-foreground">
                  Invested in self-reflection
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Find Your Writings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search your writings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Writings List */}
          <div className="space-y-6">
            {filteredResponses.map((response) => (
              <Card
                key={response.id}
                className="bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all cursor-pointer"
                onClick={() => navigate(`/private/history/${response.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
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
                      <CardTitle className="text-lg mb-2 line-clamp-2">
                        {response.prompt}
                      </CardTitle>
                      <CardDescription className="text-base line-clamp-3 leading-relaxed">
                        {response.text}
                      </CardDescription>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-500">
                          {response.wordCount} words
                        </span>
                        <Button variant="outline" size="sm">
                          Read Full Writing
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {filteredResponses.length === 0 && (
            <Card className="text-center py-12 bg-white/70 backdrop-blur-sm">
              <CardContent>
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No writings found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Start your private writing journey today."}
                </p>
                <Link to="/private">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <PenTool className="h-4 w-4 mr-2" />
                    Write Your First Entry
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
