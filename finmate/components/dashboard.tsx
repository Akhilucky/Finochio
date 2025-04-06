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

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      router.push("/login"); // Redirect to login if not logged in
    } else {
      setUserName(storedName);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  if (!userName) {
    return null; // Render nothing while redirecting
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
            <div className="text-3xl font-bold text-blue-900">₹12,450</div>
            <p className="text-xs text-blue-700 mt-1">
              <span className="text-red-500 font-medium">↑ 12%</span> from last week
            </p>
            <button className="mt-3 text-sm text-blue-800 underline">View Details</button>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Remaining Budget</CardTitle>
            <CardDescription className="text-green-600">This week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">₹7,550</div>
            <Progress value={38} className="h-2 mt-2 bg-green-200" />
            <p className="text-xs text-green-700 mt-1">38% of your weekly budget left</p>
            <button className="mt-3 text-sm text-green-800 underline">Adjust Budget</button>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Top Spending Category</CardTitle>
            <CardDescription className="text-yellow-600">This week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900">Food & Dining</div>
            <p className="text-xs text-yellow-700 mt-1">
              <span className="text-red-500 font-medium">₹4,850</span> spent on food
            </p>
            <button className="mt-3 text-sm text-yellow-800 underline">Explore Categories</button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="overview" className="px-4 py-2 text-sm font-medium">Overview</TabsTrigger>
          <TabsTrigger value="gamification" className="px-4 py-2 text-sm font-medium">Gamification</TabsTrigger>
          <TabsTrigger value="leaderboard" className="px-4 py-2 text-sm font-medium">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1 shadow-md">
              <CardHeader>
                <CardTitle>Needs vs Wants</CardTitle>
                <CardDescription>Your spending breakdown</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SpendingChart data={[{ name: "Essentials", value: 60, color: "#4CAF50" }, { name: "Luxuries", value: 40, color: "#FFC107" }]} />
                <button className="mt-3 text-sm text-primary underline">Analyze Spending</button>
              </CardContent>
            </Card>
            <Card className="col-span-1 shadow-md">
              <CardHeader>
                <CardTitle>Financial Nudges</CardTitle>
                <CardDescription>Personalized tips for you</CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialNudges />
                <button className="mt-3 text-sm text-primary underline">View Tips</button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="gamification" className="space-y-6">
          <GamificationPanel />
          <button className="mt-3 text-sm text-primary underline">View Achievements</button>
        </TabsContent>
        <TabsContent value="leaderboard" className="space-y-6">
          <Leaderboard />
          <button className="mt-3 text-sm text-primary underline">View Rankings</button>
        </TabsContent>
      </Tabs>
    </div>
  );
}