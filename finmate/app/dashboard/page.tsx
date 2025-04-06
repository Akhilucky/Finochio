"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamificationPanel } from "@/components/gamification-panel";
import { Leaderboard } from "@/components/leaderboard";
import { FinancialNudges } from "@/components/financial-nudges";
import { Input } from "@/components/ui/input";
import { LoanRequest } from "@/components/loan-request";
import dynamic from "next/dynamic";
import { FinancialClutch } from "@/components/financial-clutch";
import { Sidebar } from "@/components/sidebar";

// Dynamically import PieChart to avoid module errors
const PieChart = dynamic(() => import("@/components/pie-chart").catch(() => () => <div>PieChart not available</div>), { ssr: false });

interface DashboardData {
  spendingBreakdown?: { name: string; value: number; color: string }[];
  totalSpent?: number;
  balance?: number;
  topCategory?: string;
  weeklySpending?: number;
  remainingBudget?: number; // Added remainingBudget property
  gamification?: { wheelSpinsLeft: number };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [tips, setTips] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState<string>(""); // State for new goal input
  const [currentTipIndex, setCurrentTipIndex] = useState(0); // State to track the current tip index
  const [displayedTips, setDisplayedTips] = useState<{text: string, emoji: string}[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const allTips = [
    { text: "Save 10% of your income every month.", emoji: "💰" },
    { text: "Avoid impulse purchases by waiting 24 hours before buying.", emoji: "⏱️" },
    { text: "Track your expenses to identify unnecessary spending.", emoji: "📊" },
    { text: "Set financial goals and review them regularly.", emoji: "🎯" },
    { text: "Use cash instead of credit cards to limit spending.", emoji: "💵" },
    { text: "Invest in a diversified portfolio for long-term growth.", emoji: "📈" },
    { text: "Create a monthly budget and stick to it.", emoji: "📝" },
    { text: "Automate your savings to ensure consistency.", emoji: "🤖" },
    { text: "Cut down on subscriptions you no longer use.", emoji: "✂️" },
    { text: "Shop during sales to save money on essentials.", emoji: "🛒" },
  ]; // List of tips with emojis
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
        router.push("/login");
        return;
      }

      const response = await fetch("http://127.0.0.1:3000/api/goals", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (response.ok) {
        setGoals(result.data.map((goal: any) => goal.goal));
      }
    } catch (error) {
      // Silently handle error without showing alerts
      console.error("Error fetching goals:", error);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal) {
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://127.0.0.1:3000/api/create-goal", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ goal: newGoal }),
      });

      const result = await response.json();
      if (response.ok) {
        setNewGoal(""); // Clear input field
        fetchGoals(); // Refresh goals list
      }
    } catch (error) {
      // Silently handle error without showing alerts
      console.error("Error adding goal:", error);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % allTips.length); // Rotate tips
    }, 5000); // Change tip every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    // Function to shuffle and pick random tips
    const shuffleTips = () => {
      const shuffled = [...allTips].sort(() => 0.5 - Math.random());
      setDisplayedTips(shuffled.slice(0, 3)); // Show 3 tips at a time
    };
    
    // Initial shuffle
    shuffleTips();
    
    // Set interval to shuffle tips every 8 seconds
    const interval = setInterval(shuffleTips, 8000);
    
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const handleBalanceUpdate = (event: CustomEvent) => {
      setBalance(prev => prev + event.detail.amount);
      setDashboardData(prev => ({
        ...prev!,
        balance: (prev?.balance || 0) + event.detail.amount
      }));
    };

    window.addEventListener('balanceUpdate', handleBalanceUpdate as EventListener);
    return () => {
      window.removeEventListener('balanceUpdate', handleBalanceUpdate as EventListener);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const pieChartData = [
    { name: "Needs", value: 50, color: "#6A0DAD" }, // Purple for Needs
    { name: "Wants", value: 50, color: "#4CAF50" }, // Green for Wants
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-8 bg-muted/10 rounded-lg">
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
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-800">Current Balance</CardTitle>
                <CardDescription className="text-purple-600">Available Funds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-900">₹100000</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Weekly Spending</CardTitle>
                <CardDescription className="text-blue-600">This week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900">₹9900</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Monthly Spending</CardTitle>
                <CardDescription className="text-green-600">This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900">₹124500</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Total Available</CardTitle>
                <CardDescription className="text-green-600">After Spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900">
                  ₹{(dashboardData?.balance || 0) - (dashboardData?.weeklySpending || 0)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Total Spent</CardTitle>
                <CardDescription className="text-blue-600">This week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900">₹{dashboardData?.totalSpent}</div>
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
                  value={dashboardData?.remainingBudget || 0}
                  onChange={(e) =>
                    setDashboardData((prev) => ({
                      ...prev!,
                      remainingBudget: Number(e.target.value),
                    }))
                  }
                  className="mb-2"
                />
                <div className="text-3xl font-bold text-green-900">₹{dashboardData?.remainingBudget}</div>
                <Progress
                  value={
                    (dashboardData?.remainingBudget! /
                      (dashboardData?.totalSpent! + dashboardData?.remainingBudget!)) *
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
                <div className="text-3xl font-bold text-yellow-900">{dashboardData?.topCategory}</div>
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
              <TabsTrigger value="financial-clutch" className="px-4 py-2 text-sm font-medium">
                Financial Clutch
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1 shadow-md">
                  <CardHeader>
                    <CardTitle>Financial Nudges</CardTitle>
                    <CardDescription>Personalized tips for you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="tips-container bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100 shadow-inner">
                      {displayedTips.map((tip, index) => (
                        <div 
                          key={index} 
                          className="tip-item flex items-start gap-3 mb-3 p-2 bg-white/80 rounded-md shadow-sm transition-all duration-500 animate-fadeIn hover:bg-blue-50"
                        >
                          <div className="emoji-container text-xl flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full">
                            {tip.emoji}
                          </div>
                          <p className="text-sm text-gray-700">{tip.text}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleViewTips} className="mt-3 text-sm text-primary underline">
                      View All Tips
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
                <Card className="col-span-1 shadow-md">
                  <CardHeader>
                    <CardTitle>Needs vs Wants</CardTitle>
                    <CardDescription>Analyze your spending habits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-center h-[300px]">
                      <PieChart
                        data={[
                          { name: "Needs", value: 70, color: "#6A0DAD" },
                          { name: "Wants", value: 30, color: "#4CAF50" }
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="gamification" className="space-y-6">
              <GamificationPanel />
              <div className="mt-6">
                <ul className="list-disc pl-6">
                  {goals.map((goal, index) => (
                    <li key={index} className="text-sm">
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="leaderboard" className="space-y-6">
              <Leaderboard />
            </TabsContent>
            <TabsContent value="financial-clutch" className="space-y-6">
              <FinancialClutch />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
