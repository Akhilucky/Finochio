"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Target, Calendar, Trash2, Edit, Trophy } from "lucide-react"
import { GamificationPanel } from "@/components/gamification-panel"

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      targetAmount: 50000,
      currentAmount: 15000,
      startDate: "2023-01-15",
      endDate: "2023-06-30",
      monthlyContribution: 5000,
    },
    {
      id: 2,
      name: "New Laptop",
      targetAmount: 80000,
      currentAmount: 25000,
      startDate: "2023-02-01",
      endDate: "2023-12-31",
      monthlyContribution: 8000,
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    startDate: "",
    endDate: "",
    monthlyContribution: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreateGoal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = goals.length + 1;
    const currentAmount = 0; // New goals start with 0 progress
    setGoals((prev) => [
      ...prev,
      {
        id,
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount,
        startDate: newGoal.startDate,
        endDate: newGoal.endDate,
        monthlyContribution: parseFloat(newGoal.monthlyContribution),
      },
    ]);
    setNewGoal({ name: "", targetAmount: "", startDate: "", endDate: "", monthlyContribution: "" });
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Goals & Achievements</h1>
        <p className="text-muted-foreground">Track your financial goals and celebrate your wins</p>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Financial Goals</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Goal
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle>{goal.name}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    ₹{goal.currentAmount} of ₹{goal.targetAmount} (
                    {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={(goal.currentAmount / goal.targetAmount) * 100}
                    className="h-2 mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Started: {goal.startDate}</span>
                    <span>Target: {goal.endDate}</span>
                  </div>
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Monthly contribution: ₹{goal.monthlyContribution}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
              <CardDescription>Set up a new savings target</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleCreateGoal}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Goal Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Vacation Fund"
                      value={newGoal.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount</Label>
                    <div className="flex">
                      <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                        ₹
                      </div>
                      <Input
                        id="targetAmount"
                        type="number"
                        className="rounded-l-none"
                        placeholder="50000"
                        value={newGoal.targetAmount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newGoal.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Target Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newGoal.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                      ₹
                    </div>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      className="rounded-l-none"
                      placeholder="5000"
                      value={newGoal.monthlyContribution}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button className="w-full" type="submit">
                  Create Goal
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Completed Goals</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500/10 p-2">
                      <Trophy className="h-4 w-4 text-green-500" />
                    </div>
                    <CardTitle>Smartphone</CardTitle>
                  </div>
                </div>
                <CardDescription>₹25,000 (Completed)</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={100} className="h-2 mb-2 bg-green-200" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Started: Oct 1, 2022</span>
                  <span>Completed: Jan 15, 2023</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <GamificationPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

