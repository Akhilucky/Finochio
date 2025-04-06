"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function LoanRequest() {
  const [amount, setAmount] = useState<number | "">("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid loan amount." });
      return;
    }

    if (!reason.trim()) {
      toast({ title: "Missing Reason", description: "Please provide a reason for the loan." });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:3000/request-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, reason }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast({
          title: "Success",
          description: data.message || "Loan successfully requested.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to process loan request.",
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">
          {success ? "Request Successful 🎉" : "Request a Loan"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">Your loan has been approved!</p>
            <p className="text-sm text-muted-foreground">
              ₹{amount} has been successfully requested.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="loan-amount" className="block text-sm font-medium mb-1">
                Loan Amount (₹)
              </label>
              <Input
                id="loan-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="e.g., 20000"
                min={0}
                required
              />
            </div>
            <div>
              <label htmlFor="loan-reason" className="block text-sm font-medium mb-1">
                Reason for Loan
              </label>
              <Input
                id="loan-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Medical emergency, education"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Request Loan"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
