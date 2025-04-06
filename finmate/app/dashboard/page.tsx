"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpendingChart } from "@/components/spending-chart";
import { GamificationPanel } from "@/components/gamification-panel";
import { Leaderboard } from "@/components/leaderboard";
import { FinancialNudges } from "@/components/financial-nudges";
import { Input } from "@/components/ui/input";
import { CreateSavingsGoal } from "@/components/create-savingsgoal";

interface DashboardData {
  spendingBreakdown?: { name: string; value: number; color: string }[];
  totalSpent?: number;
  remainingBudget?: number;
  topCategory?: string;
  gamification?: { wheelSpinsLeft: number };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [tips, setTips] = useState<string[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [newGoal, setNewGoal] = useState<string>("");
  const router = useRouter();

  const handleAnalyzeSpending = () => {
    const analyzeSpendingUrl = "http://127.0.0.1:3000/analyze-spending-input";
    window.open(analyzeSpendingUrl, "_blank");
  };

  const handleViewTips = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://127.0.0.1:3000/api/view-tips", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setTips(data.tips);
        alert("Tips fetched successfully!");
      } else {
        alert(data.message || "Failed to fetch tips");
      }
    } catch {
      alert("An unexpected error occurred while fetching tips");
    }
  };

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("You need to log in to view your goals.");
        return;
      }

      const response = await fetch("http://127.0.0.1:3000/api/goals", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (response.ok) {
        setGoals(result.data);
      } else {
        alert(result.message || "Failed to fetch goals.");
      }
    } catch (error) {
      alert("An unexpected error occurred while fetching goals.");
    }
  };

  const handleAddGoal = async (goal: string) => {
    if (!goal) {
      alert("Please enter a goal.");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("You need to log in to add a goal.");
        return;
      }

      const response = await fetch("http://127.0.0.1:3000/api/create-goal", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ goal }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Goal added successfully!");
        fetchGoals(); // Refresh goals list
      } else {
        alert(result.message || "Failed to add goal.");
      }
    } catch (error) {
      alert("An unexpected error occurred while adding the goal.");
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch("http://127.0.0.1:3000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setDashboardData(data);
          setUserName(data.name);
        } else {
          setError(data.message || "Failed to fetch dashboard data");
        }
      } catch {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    fetchGoals();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dashboardData) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 p-6 bg-muted/10 rounded-lg">
      {/* Welcome Section */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-md">
        <Avatar className="h-16 w-16 border-4 border-primary">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="FinMate" />
          <AvatarFallback>FM</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-muted-foreground text-sm">Let’s check your financial health today.</p>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Spent</CardTitle>
            <CardDescription className="text-blue-600">This week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">₹{dashboardData.totalSpent}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Remaining Budget</CardTitle>
            <CardDescription className="text-green-600">This week</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              value={dashboardData.remainingBudget || 0}
              onChange={(e) =>
                setDashboardData((prev) => ({
                  ...prev,
                  remainingBudget: Number(e.target.value),
                }))
              }
              className="mb-2"
            />
            <div className="text-3xl font-bold text-green-900">₹{dashboardData.remainingBudget}</div>
            <Progress
              value={
                (dashboardData.remainingBudget! /
                  (dashboardData.totalSpent! + dashboardData.remainingBudget!)) *
                100
              }
              className="h-2 mt-2 bg-green-200"
            />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Top Spending Category</CardTitle>
            <CardDescription className="text-yellow-600">This week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900">{dashboardData.topCategory}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="overview" className="px-4 py-2 text-sm font-medium">
            Overview
          </TabsTrigger>
          <TabsTrigger value="gamification" className="px-4 py-2 text-sm font-medium">
            Gamification
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="px-4 py-2 text-sm font-medium">
            Leaderboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1 shadow-md">
              <CardHeader>
                <CardTitle>Needs vs Wants</CardTitle>
                <CardDescription>Your spending breakdown</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {dashboardData.spendingBreakdown ? (
                  <SpendingChart data={dashboardData.spendingBreakdown} />
                ) : (
                  <div>No spending data available</div>
                )}
                <button onClick={handleAnalyzeSpending} className="mt-3 text-sm text-primary underline">
                  Analyze Spending
                </button>
              </CardContent>
            </Card>
            <Card className="col-span-1 shadow-md">
              <CardHeader>
                <CardTitle>Financial Nudges</CardTitle>
                <CardDescription>Personalized tips for you</CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialNudges />
                <button onClick={handleViewTips} className="mt-3 text-sm text-primary underline">
                  View Tips
                </button>
                {tips.length > 0 && (
                  <ul className="mt-4 text-sm text-muted-foreground">
                    {tips.map((tip, index) => (
                      <li key={index}>- {tip}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="gamification" className="space-y-6">
          <GamificationPanel />
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Your Goals</h2>
            <CreateSavingsGoal onGoalCreated={handleAddGoal} />
            <ul className="list-disc pl-6 mt-4">
              {goals.map((goal, index) => (
                <li key={index} className="text-sm">
                  {goal.goal}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="leaderboard" className="space-y-6">
          <Leaderboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
