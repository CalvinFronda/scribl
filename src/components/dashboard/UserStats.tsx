import React, { useEffect, useState } from "react";
import { Calendar, Flame, TrendingUp, Clock } from "lucide-react";
import { supabase } from "../../lib/supabase/client";
import { useAuth } from "../../contexts/AuthContext";
import { UserStats as UserStatsType } from "../../types";
import { Card, CardContent } from "../ui/Card";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { formatMonthYear } from "@/lib/utils";

export const UserStats: React.FC = () => {
  const [stats, setStats] = useState<UserStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get total submissions
      const { count: totalSubmissions } = await supabase
        .from("responses")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      // Get responses ordered by date to calculate streaks
      const { data: responses } = await supabase
        .from("responses")
        .select("created_at, prompt(date)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Calculate streaks
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;

      if (responses && responses.length > 0) {
        const today = new Date();
        const dates = responses.map((r) => new Date(r.created_at));

        // Sort dates in descending order
        dates.sort((a, b) => b.getTime() - a.getTime());

        // Calculate current streak from today backwards
        const currentDate = new Date(today);
        currentDate.setHours(0, 0, 0, 0);

        for (const responseDate of dates) {
          const respDate = new Date(responseDate);
          respDate.setHours(0, 0, 0, 0);

          const diffDays = Math.floor(
            (currentDate.getTime() - respDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (diffDays === currentStreak) {
            currentStreak++;
          } else if (diffDays === currentStreak + 1 && currentStreak === 0) {
            // Allow for today not having a response yet
            continue;
          } else {
            break;
          }
        }

        // Calculate longest streak
        tempStreak = 1;
        for (let i = 1; i < dates.length; i++) {
          const currentDate = new Date(dates[i - 1]);
          const prevDate = new Date(dates[i]);

          const diffDays = Math.floor(
            (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (diffDays === 1) {
            tempStreak++;
          } else {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
          }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      }

      setStats({
        totalSubmissions: totalSubmissions || 0,
        currentStreak,
        longestStreak,
        joinDate: user.created_at,
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="text-center">
        <CardContent className="py-8">
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your stats...</p>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="text-center">
        <CardContent className="pt-6">
          <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
          <div className="text-sm text-muted-foreground">Total Submissions</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.currentStreak}</div>
          <div className="text-sm text-muted-foreground">Current Streak</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.longestStreak}</div>
          <div className="text-sm text-muted-foreground">Longest Streak</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-sm font-bold">
            {formatMonthYear(stats.joinDate)}
          </div>
          <div className="text-sm text-muted-foreground">Member Since</div>
        </CardContent>
      </Card>
    </div>
  );
};
