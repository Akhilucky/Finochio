"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function CreateSavingsGoal({ onGoalCreated }) {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | "">("");
  const [savingsFrequency, setSavingsFrequency] = useState<number | "">(""); // Weekly or Monthly savings
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newGoal = {
        goal_name: goalName,
        target_amount: targetAmount,
        savings_frequency: savingsFrequency,
      };

      const token = localStorage.getItem("userToken");
      if (!token) {
        toast({ title: "Error", description: "You must be logged in to create a goal." });
        return;
      }

      const res = await fetch("http://127.0.0.1:3000/api/create-goal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newGoal),
      });

      const data = await res.json();
      if (res.ok) {
        toast({ title: "Success", description: data.message });
        setGoalName("");
        setTargetAmount("");
        setSavingsFrequency("");
        if (onGoalCreated) onGoalCreated(newGoal);
      } else {
        toast({ title: "Error", description: data.error || "Failed to create goal." });
      }
    } catch (error) {
      toast({ title: "Error", description: "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Savings Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="goal-name" className="block text-sm font-medium">
              Goal Name
            </label>
            <Input
              id="goal-name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g., Vacation Fund"
              required
            />
          </div>
          <div>
            <label htmlFor="target-amount" className="block text-sm font-medium">
              Target Amount (₹)
            </label>
            <Input
              id="target-amount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              placeholder="e.g., 50000"
              required
            />
          </div>
          <div>
            <label htmlFor="savings-frequency" className="block text-sm font-medium">
              Weekly or Monthly Savings (₹)
            </label>
            <Input
              id="savings-frequency"
              type="number"
              value={savingsFrequency}
              onChange={(e) => setSavingsFrequency(Number(e.target.value))}
              placeholder="e.g., 5000"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Goal..." : "Create Goal"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}