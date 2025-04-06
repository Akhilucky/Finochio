"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Flame, Coins, Target, TrendingUp, Zap, ShieldCheck } from "lucide-react"
import { CreateSavingsGoal } from "@/components/create-savingsgoal";

const badges = [
  {
    icon: Flame,
    title: "3-Day Streak",
    description: "Stayed under budget for 3 days",
    color: "bg-orange-500",
  },
  {
    icon: Coins,
    title: "₹5000 Saved",
    description: "Saved ₹5000 this month",
    color: "bg-yellow-500",
  },
  {
    icon: Target,
    title: "Goal Crusher",
    description: "Completed your first savings goal",
    color: "bg-green-500",
  },
  {
    icon: TrendingUp,
    title: "Investor",
    description: "Made your first investment",
    color: "bg-blue-500",
  },
  {
    icon: Zap,
    title: "Quick Learner",
    description: "Completed 5 financial lessons",
    color: "bg-purple-500",
  },
  {
    icon: ShieldCheck,
    title: "Budget Master",
    description: "Stayed under budget for a month",
    color: "bg-teal-500",
  },
]

const streakHistory = [
  { date: "Apr 4", status: "success" },
  { date: "Apr 3", status: "success" },
  { date: "Apr 2", status: "success" },
  { date: "Apr 1", status: "success" },
  { date: "Mar 31", status: "success" },
  { date: "Mar 30", status: "failed" },
  { date: "Mar 29", status: "success" },
]

export function GamificationPanel() {
  const [savingsGoals, setSavingsGoals] = useState([]);

  const handleNewGoal = (newGoal) => {
    setSavingsGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Savings Goals</CardTitle>
          <CardDescription>Track your progress towards financial freedom</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Coffee Budget</h4>
                    <p className="text-sm text-muted-foreground">₹500 / ₹800</p>
                  </div>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Entertainment</h4>
                    <p className="text-sm text-muted-foreground">₹1200 / ₹2000</p>
                  </div>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Emergency Fund</h4>
                    <p className="text-sm text-muted-foreground">₹15,000 / ₹50,000</p>
                  </div>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">New Laptop</h4>
                    <p className="text-sm text-muted-foreground">₹25,000 / ₹80,000</p>
                  </div>
                  <span className="text-sm font-medium">31%</span>
                </div>
                <Progress value={31} className="h-2" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Add Savings Goal</CardTitle>
          <CardDescription>Set up a new savings target</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateSavingsGoal onGoalCreated={handleNewGoal} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Badges you've earned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`rounded-full p-3 ${badge.color} text-white mb-2`}>
                  <badge.icon className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-medium">{badge.title}</h4>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Savings Streak</CardTitle>
              <CardDescription>Current streak: 5 days</CardDescription>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-xl font-bold">5</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Streak History</h4>
            </div>
            <div className="space-y-2">
              {streakHistory.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{day.date}</span>
                  <Badge variant={day.status === "success" ? "default" : "destructive"}>
                    {day.status === "success" ? "Under Budget" : "Over Budget"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

